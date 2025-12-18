
// /lib/db/queries/assessment-analytics.ts

import { sql } from '../index';

export async function getAssessmentOverview(assessmentId: string) {
  try {
    const result = await sql`
      SELECT 
        a.*,
        c.title as course_title,
        c.instructor_id,
        COUNT(DISTINCT e.user_id) as total_students,
        COUNT(DISTINCT aa.user_id) as students_taken,
        COUNT(aa.id) as total_attempts,
        AVG(aa.percentage) as average_score,
        COUNT(CASE WHEN aa.percentage >= a.passing_score THEN 1 END) as passed_count
      FROM assessments a
      LEFT JOIN courses c ON a.course_id = c.id
      LEFT JOIN enrollments e ON a.course_id = e.course_id AND e.status = 'active'
      LEFT JOIN assessment_attempts aa ON a.id = aa.assessment_id AND aa.submitted_at IS NOT NULL
      WHERE a.id = ${assessmentId}
      GROUP BY a.id, c.id
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const data = result[0];
    const passRate = data.total_attempts > 0 
      ? (data.passed_count / data.total_attempts) * 100 
      : 0;

    return {
      averageScore: parseFloat(data.average_score) || 0,
      totalStudents: parseInt(data.total_students) || 0,
      studentsTaken: parseInt(data.students_taken) || 0,
      totalAttempts: parseInt(data.total_attempts) || 0,
      passRate,
    };
  } catch (error) {
    console.error('Error getting assessment overview:', error);
    return null;
  }
}

export async function getScoreDistribution(assessmentId: string) {
  try {
    const result = await sql`
      WITH score_ranges AS (
        SELECT 
          CASE 
            WHEN percentage >= 90 THEN '90-100'
            WHEN percentage >= 80 THEN '80-89'
            WHEN percentage >= 70 THEN '70-79'
            WHEN percentage >= 60 THEN '60-69'
            ELSE '0-59'
          END as score_range,
          COUNT(*) as count
        FROM assessment_attempts
        WHERE assessment_id = ${assessmentId}
          AND submitted_at IS NOT NULL
        GROUP BY 1
      )
      SELECT 
        COALESCE(sr.score_range, r.range) as range,
        COALESCE(sr.count, 0) as count
      FROM (
        VALUES ('90-100'), ('80-89'), ('70-79'), ('60-69'), ('0-59')
      ) r(range)
      LEFT JOIN score_ranges sr ON sr.score_range = r.range
      ORDER BY r.range DESC
    `;

    const distribution = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0,
    };

    result.forEach((row: any) => {
      distribution[row.range as keyof typeof distribution] = parseInt(row.count);
    });

    return distribution;
  } catch (error) {
    console.error('Error getting score distribution:', error);
    return null;
  }
}

export async function getStudentPerformance(assessmentId: string, courseId: string) {
  try {
    const result = await sql`
      WITH student_attempts AS (
        SELECT 
          u.id as student_id,
          u.name as student_name,
          u.email,
          aa.*,
          ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY aa.percentage DESC) as rank
        FROM users u
        JOIN enrollments e ON u.id = e.user_id AND e.course_id = ${courseId} AND e.status = 'active'
        LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND aa.assessment_id = ${assessmentId} AND aa.submitted_at IS NOT NULL
        WHERE u.is_active = true
      ),
      student_stats AS (
        SELECT 
          student_id,
          student_name,
          email,
          COUNT(*) as total_attempts,
          MAX(percentage) as best_score,
          MAX(submitted_at) as last_attempt,
          SUM(time_spent) as total_time_spent,
          BOOL_OR(passed) as has_passed
        FROM student_attempts
        GROUP BY student_id, student_name, email
      )
      SELECT 
        ss.*,
        COALESCE(ss.best_score, 0) as score,
        CASE 
          WHEN ss.best_score >= 90 THEN 'A'
          WHEN ss.best_score >= 80 THEN 'B'
          WHEN ss.best_score >= 70 THEN 'C'
          WHEN ss.best_score >= 60 THEN 'D'
          ELSE 'F'
        END as grade,
        (SELECT max_attempts FROM assessments WHERE id = ${assessmentId}) as max_attempts,
        ss.best_score >= (SELECT passing_score FROM assessments WHERE id = ${assessmentId}) as certificate_eligible
      FROM student_stats ss
      ORDER BY ss.best_score DESC NULLS LAST, ss.student_name
    `;

    return result.map((row: any) => ({
      studentId: row.student_id,
      studentName: row.student_name || 'Unknown Student',
      email: row.email,
      score: parseFloat(row.score) || 0,
      grade: row.grade,
      attempts: parseInt(row.total_attempts) || 0,
      maxAttempts: parseInt(row.max_attempts) || 1,
      timeSpent: parseInt(row.total_time_spent) || 0,
      lastAttemptDate: row.last_attempt,
      certificateEligible: row.certificate_eligible,
      status: determineCertificateStatus(
        parseFloat(row.score) || 0,
        row.certificate_eligible,
        parseInt(row.total_attempts) || 0,
        parseInt(row.max_attempts) || 1
      ),
      progress: parseFloat(row.score) || 0,
    }));
  } catch (error) {
    console.error('Error getting student performance:', error);
    return [];
  }
}

function determineCertificateStatus(
  score: number,
  isEligible: boolean,
  attemptsUsed: number,
  maxAttempts: number
): 'eligible' | 'in_progress' | 'not_eligible' | 'issued' {
  // First check if certificate is already issued
  // This would require querying a certificates table
  
  if (isEligible) {
    return 'eligible';
  } else if (attemptsUsed < maxAttempts) {
    return 'in_progress';
  } else {
    return 'not_eligible';
  }
}

export async function getQuestionAnalysis(assessmentId: string) {
  try {
    const result = await sql`
      SELECT 
        q.*,
        COUNT(aa.id) as total_attempts,
        COUNT(CASE WHEN qb->>'isCorrect' = 'true' THEN 1 END) as correct_count
      FROM questions q
      LEFT JOIN assessment_attempts aa ON q.assessment_id = aa.assessment_id AND aa.submitted_at IS NOT NULL
      LEFT JOIN LATERAL (
        SELECT jsonb_array_elements(aa.question_breakdown) as qb
      ) qb ON qb->>'questionId' = q.id::text
      WHERE q.assessment_id = ${assessmentId}
      GROUP BY q.id
      ORDER BY q.order_index
    `;

    return result.map((row: any) => {
      const correctRate = row.total_attempts > 0
        ? (parseInt(row.correct_count) / parseInt(row.total_attempts)) * 100
        : 0;

      return {
        questionId: row.id,
        questionText: row.question_text,
        questionType: row.question_type,
        correctRate,
        averageTime: 0, // You would need to track time per question
        difficulty: determineQuestionDifficulty(correctRate),
        points: row.points || 1,
      };
    });
  } catch (error) {
    console.error('Error getting question analysis:', error);
    return [];
  }
}

function determineQuestionDifficulty(correctRate: number): 'easy' | 'medium' | 'hard' {
  if (correctRate >= 70) return 'easy';
  if (correctRate >= 40) return 'medium';
  return 'hard';
}

export async function getTimeSeriesData(assessmentId: string, days: number = 30) {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await sql`
      WITH date_series AS (
        SELECT generate_series(
          ${startDate.toISOString()}::timestamp,
          NOW(),
          '1 day'::interval
        )::date as date
      ),
      daily_stats AS (
        SELECT 
          DATE(aa.submitted_at) as date,
          COUNT(*) as attempts,
          COUNT(DISTINCT aa.user_id) as unique_students,
          AVG(aa.percentage) as average_score
        FROM assessment_attempts aa
        WHERE aa.assessment_id = ${assessmentId}
          AND aa.submitted_at >= ${startDate.toISOString()}
        GROUP BY DATE(aa.submitted_at)
      )
      SELECT 
        ds.date,
        COALESCE(ds2.attempts, 0) as attempts,
        COALESCE(ds2.unique_students, 0) as new_students,
        COALESCE(ds2.average_score, 0) as average_score
      FROM date_series ds
      LEFT JOIN daily_stats ds2 ON ds.date = ds2.date
      ORDER BY ds.date
    `;

    return result.map((row: any) => ({
      date: row.date.toISOString(),
      averageScore: parseFloat(row.average_score) || 0,
      attempts: parseInt(row.attempts) || 0,
      newStudents: parseInt(row.new_students) || 0,
    }));
  } catch (error) {
    console.error('Error getting time series data:', error);
    return [];
  }
}