
// /lib/db/queries/course-analytics.ts

import { sql } from '../index';

export async function getCourseAnalyticsSummary(courseId: string, instructorId: string) {
  try {
    // Verify instructor owns this course
    const courseCheck = await sql`
      SELECT id FROM courses 
      WHERE id = ${courseId} AND instructor_id = ${instructorId} 
      LIMIT 1
    `;

    if (courseCheck.length === 0) {
      return null;
    }

    // Get assessments count
    const assessmentsResult = await sql`
      SELECT COUNT(*) as count
      FROM assessments
      WHERE course_id = ${courseId}
    `;

    // Get student enrollment count
    const studentsResult = await sql`
      SELECT COUNT(DISTINCT user_id) as count
      FROM enrollments
      WHERE course_id = ${courseId} AND status = 'active'
    `;

    // Get average quiz score
    const averageScoreResult = await sql`
      SELECT AVG(aa.percentage) as average_score
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE a.course_id = ${courseId} 
        AND aa.submitted_at IS NOT NULL
        AND aa.percentage IS NOT NULL
    `;

    // Get students who passed (score >= 70%)
    const passedStudentsResult = await sql`
      SELECT COUNT(DISTINCT aa.user_id) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE a.course_id = ${courseId} 
        AND aa.submitted_at IS NOT NULL
        AND aa.percentage >= 70
    `;

    // Get recent quiz submissions (last 7 days)
    const recentSubmissionsResult = await sql`
      SELECT COUNT(*) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE a.course_id = ${courseId} 
        AND aa.submitted_at >= NOW() - INTERVAL '7 days'
        AND aa.submitted_at IS NOT NULL
    `;

    // Get certificate eligible students
    const certificateEligibleResult = await sql`
      SELECT COUNT(DISTINCT aa.user_id) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE a.course_id = ${courseId} 
        AND aa.submitted_at IS NOT NULL
        AND aa.percentage >= 70
        AND NOT EXISTS (
          SELECT 1 FROM certificates c 
          WHERE c.user_id = aa.user_id 
          AND c.course_id = ${courseId}
        )
    `;

    return {
      assessments_count: parseInt(assessmentsResult[0]?.count || '0'),
      students_count: parseInt(studentsResult[0]?.count || '0'),
      average_quiz_score: parseFloat(averageScoreResult[0]?.average_score || '0'),
      students_passed: parseInt(passedStudentsResult[0]?.count || '0'),
      recent_submissions: parseInt(recentSubmissionsResult[0]?.count || '0'),
      certificate_eligible: parseInt(certificateEligibleResult[0]?.count || '0'),
      total_quizzes: parseInt(assessmentsResult[0]?.count || '0')
    };
  } catch (error) {
    console.error('Error getting course analytics summary:', error);
    return null;
  }
}

export async function getCourseAssessments(courseId: string) {
  try {
    const assessments = await sql`
      SELECT 
        a.*,
        COUNT(DISTINCT aa.id) as total_attempts,
        COUNT(DISTINCT aa.user_id) as unique_students,
        AVG(aa.percentage) as average_score,
        COUNT(CASE WHEN aa.percentage >= a.passing_score THEN 1 END) as passed_count
      FROM assessments a
      LEFT JOIN assessment_attempts aa ON a.id = aa.assessment_id AND aa.submitted_at IS NOT NULL
      WHERE a.course_id = ${courseId}
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `;

    return assessments.map((a: any) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      passing_score: a.passing_score,
      max_attempts: a.max_attempts,
      total_attempts: parseInt(a.total_attempts || '0'),
      unique_students: parseInt(a.unique_students || '0'),
      average_score: parseFloat(a.average_score || '0'),
      pass_rate: a.total_attempts > 0 
        ? (parseInt(a.passed_count || '0') / parseInt(a.total_attempts || '1')) * 100 
        : 0
    }));
  } catch (error) {
    console.error('Error getting course assessments:', error);
    return [];
  }
}