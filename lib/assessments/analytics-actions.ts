
// /lib/assessments/analytics-actions.ts

'use server';

import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';
import { QuizAnalytics } from '@/types/assessment-results';

export async function getQuizAnalytics(
  assessmentId: string,
  courseId: string,
  timeRange: string = '30d'
): Promise<{ success: boolean; analytics?: QuizAnalytics; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Verify instructor owns this assessment
    const assessment = await sql`
      SELECT a.*, c.instructor_id 
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${assessmentId} AND c.id = ${courseId}
      LIMIT 1
    `;

    if (assessment.length === 0) {
      return { success: false, error: 'Assessment not found' };
    }

    if (assessment[0].instructor_id !== session.userId && session.primaryRole !== 'admin') {
      return { success: false, error: 'Access denied' };
    }

    // Calculate date range
    const days = timeRange === '7d' ? 7 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get total enrolled students
    const enrolledStudents = await sql`
      SELECT COUNT(*) as count
      FROM enrollments
      WHERE course_id = ${courseId} AND status = 'active'
    `;
    const totalStudents = parseInt(enrolledStudents[0]?.count || '0');

    // Get all attempts for this assessment
    const attempts = await sql`
      SELECT 
        aa.*,
        u.name as student_name,
        u.email as student_email,
        u.id as student_id
      FROM assessment_attempts aa
      JOIN users u ON aa.user_id = u.id
      WHERE aa.assessment_id = ${assessmentId}
        AND aa.submitted_at >= ${startDate.toISOString()}
        AND aa.submitted_at IS NOT NULL
      ORDER BY aa.submitted_at DESC
    `;

    // Calculate overview metrics
    const submittedAttempts = attempts.filter((a: any) => a.submitted_at);
    const studentsTaken = new Set(submittedAttempts.map((a: any) => a.user_id)).size;
    const averageScore = submittedAttempts.length > 0 
      ? submittedAttempts.reduce((sum: number, a: any) => sum + parseFloat(a.percentage), 0) / submittedAttempts.length
      : 0;
    
    const passRate = submittedAttempts.length > 0
      ? (submittedAttempts.filter((a: any) => parseFloat(a.percentage) >= assessment[0].passing_score).length / submittedAttempts.length) * 100
      : 0;

    // Group attempts by student for average attempts calculation
    const attemptsByStudent: Record<string, any[]> = {};
    submittedAttempts.forEach((attempt: any) => {
      if (!attemptsByStudent[attempt.user_id]) {
        attemptsByStudent[attempt.user_id] = [];
      }
      attemptsByStudent[attempt.user_id].push(attempt);
    });

    const averageAttempts = Object.keys(attemptsByStudent).length > 0
      ? Object.values(attemptsByStudent).reduce((sum, studentAttempts) => sum + studentAttempts.length, 0) / Object.keys(attemptsByStudent).length
      : 0;

    // Calculate score distribution
    const scoreDistribution = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0,
    };

    submittedAttempts.forEach((attempt: any) => {
      const score = parseFloat(attempt.percentage);
      if (score >= 90) scoreDistribution['90-100']++;
      else if (score >= 80) scoreDistribution['80-89']++;
      else if (score >= 70) scoreDistribution['70-79']++;
      else if (score >= 60) scoreDistribution['60-69']++;
      else scoreDistribution['0-59']++;
    });

    // Prepare student performance data
    const studentPerformance = Object.entries(attemptsByStudent).map(([studentId, studentAttempts]) => {
      const latestAttempt = studentAttempts[0];
      const bestAttempt = studentAttempts.reduce((best, current) => 
        parseFloat(current.percentage) > parseFloat(best.percentage) ? current : best
      );
      const totalTimeSpent = studentAttempts.reduce((sum, attempt) => sum + (attempt.time_spent || 0), 0);

      const score = parseFloat(bestAttempt.percentage);
      const isEligible = score >= assessment[0].passing_score;
      const hasAttemptsLeft = studentAttempts.length < assessment[0].max_attempts;
      
      let status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued' = 'not_eligible';
      if (isEligible) {
        status = 'eligible';
        // Check if certificate already issued (you would need a certificates table for this)
      } else if (hasAttemptsLeft) {
        status = 'in_progress';
      }

      return {
        studentId: latestAttempt.user_id,
        studentName: latestAttempt.student_name || 'Unknown Student',
        email: latestAttempt.student_email,
        score,
        grade: calculateGradeLetter(score),
        attempts: studentAttempts.length,
        maxAttempts: assessment[0].max_attempts,
        timeSpent: totalTimeSpent,
        lastAttemptDate: latestAttempt.submitted_at,
        certificateEligible: isEligible,
        status,
        progress: score,
      };
    });

    // Get question analysis
    const questions = await sql`
      SELECT q.*, COUNT(aa.id) as total_attempts
      FROM questions q
      LEFT JOIN assessment_attempts aa ON aa.assessment_id = q.assessment_id
      WHERE q.assessment_id = ${assessmentId}
      GROUP BY q.id
      ORDER BY q.order_index
    `;

    const questionAnalysis = await Promise.all(
      questions.map(async (question: any) => {
        // Calculate correct rate for this question
        const correctAnswers = await sql`
          SELECT COUNT(*) as count
          FROM assessment_attempts aa
          WHERE aa.assessment_id = ${assessmentId}
            AND aa.question_breakdown @> ${
              JSON.stringify([{ questionId: question.id, isCorrect: true }])
            }::jsonb
        `;

        const correctRate = question.total_attempts > 0
          ? (parseInt(correctAnswers[0]?.count || '0') / question.total_attempts) * 100
          : 0;

        return {
          questionId: question.id,
          questionText: question.question_text,
          questionType: question.question_type,
          correctRate,
          averageTime: 0, // You would need to track time per question
          difficulty: determineDifficulty(correctRate),
          points: question.points || 1,
        };
      })
    );

    // Generate time series data
    const timeSeries = generateTimeSeriesData(attempts, days);

    // Certificate summary
    const certificateSummary = {
      eligible: studentPerformance.filter(s => s.status === 'eligible').length,
      inProgress: studentPerformance.filter(s => s.status === 'in_progress').length,
      notEligible: studentPerformance.filter(s => s.status === 'not_eligible').length,
      issued: 0, // You would need to query issued certificates
      total: studentPerformance.length,
    };

    const analytics: QuizAnalytics = {
      overview: {
        averageScore,
        totalStudents,
        studentsTaken,
        participationRate: totalStudents > 0 ? (studentsTaken / totalStudents) * 100 : 0,
        passRate,
        averageAttempts,
        totalAttempts: submittedAttempts.length,
      },
      scoreDistribution,
      studentPerformance,
      questionAnalysis,
      timeSeries,
      certificateSummary,
    };

    return { success: true, analytics };
  } catch (error) {
    console.error('Error getting quiz analytics:', error);
    return { success: false, error: 'Failed to load analytics' };
  }
}

function calculateGradeLetter(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function determineDifficulty(correctRate: number): 'easy' | 'medium' | 'hard' {
  if (correctRate >= 70) return 'easy';
  if (correctRate >= 40) return 'medium';
  return 'hard';
}

function generateTimeSeriesData(attempts: any[], days: number) {
  const timeSeries = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    
    const dayAttempts = attempts.filter((a: any) => {
      const attemptDate = new Date(a.submitted_at);
      return attemptDate >= date && attemptDate < nextDate;
    });
    
    const avgScore = dayAttempts.length > 0
      ? dayAttempts.reduce((sum: number, a: any) => sum + parseFloat(a.percentage), 0) / dayAttempts.length
      : 0;
    
    timeSeries.push({
      date: date.toISOString(),
      averageScore: avgScore,
      attempts: dayAttempts.length,
      newStudents: new Set(dayAttempts.map((a: any) => a.user_id)).size,
    });
  }
  
  return timeSeries;
}

export async function exportAnalyticsData(
  assessmentId: string,
  format: 'csv' | 'json'
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Verify access and get data (similar to getQuizAnalytics)
    // Return data in requested format

    return { success: true, data: {} };
  } catch (error) {
    console.error('Error exporting analytics:', error);
    return { success: false, error: 'Export failed' };
  }
}