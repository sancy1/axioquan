

// /app/api/instructor/students/quiz-summary/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get student quiz summary statistics
    const summary = await sql`
      WITH student_quiz_stats AS (
        SELECT 
          u.id as student_id,
          u.name as student_name,
          u.email as student_email,
          COUNT(DISTINCT a.id) as total_quizzes_available,
          COUNT(DISTINCT aa.assessment_id) as quizzes_attempted,
          COUNT(aa.id) as total_attempts,
          AVG(aa.percentage) as average_score,
          MAX(aa.percentage) as best_score,
          MIN(aa.percentage) as worst_score,
          COUNT(CASE WHEN aa.percentage >= a.passing_score THEN 1 END) as passed_attempts,
          COUNT(DISTINCT CASE WHEN aa.percentage >= a.passing_score THEN a.id END) as quizzes_passed,
          SUM(aa.time_spent) as total_time_spent,
          MAX(aa.submitted_at) as last_attempt_date
        FROM users u
        JOIN enrollments e ON u.id = e.user_id AND e.status = 'active'
        JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
        LEFT JOIN assessments a ON c.id = a.course_id
        LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND a.id = aa.assessment_id
        WHERE aa.submitted_at IS NOT NULL
        GROUP BY u.id, u.name, u.email
      )
      SELECT 
        COUNT(DISTINCT student_id) as total_students,
        SUM(total_quizzes_available) as total_quizzes_available,
        SUM(quizzes_attempted) as total_quizzes_attempted,
        AVG(average_score) as overall_average_score,
        SUM(total_attempts) as total_attempts,
        SUM(passed_attempts) as total_passed_attempts,
        SUM(quizzes_passed) as total_quizzes_passed,
        COUNT(CASE WHEN average_score >= 70 THEN 1 END) as students_eligible_certificates
      FROM student_quiz_stats
    `;

    // Get recent quiz submissions (last 7 days)
    const recentSubmissions = await sql`
      SELECT COUNT(*) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON a.course_id = c.id AND c.instructor_id = ${session.userId}
      WHERE aa.submitted_at >= NOW() - INTERVAL '7 days'
    `;

    // Get certificate statistics
    const certificateStats = await sql`
      WITH eligible_students AS (
        SELECT 
          u.id as student_id,
          u.name as student_name,
          c.id as course_id,
          c.title as course_title,
          MAX(aa.percentage) as best_score
        FROM users u
        JOIN enrollments e ON u.id = e.user_id AND e.status = 'active'
        JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
        JOIN assessments a ON c.id = a.course_id
        JOIN assessment_attempts aa ON u.id = aa.user_id AND a.id = aa.assessment_id
        WHERE aa.submitted_at IS NOT NULL
        GROUP BY u.id, u.name, c.id, c.title
        HAVING MAX(aa.percentage) >= 70
      )
      SELECT 
        COUNT(DISTINCT student_id) as eligible_students,
        COUNT(DISTINCT course_id) as eligible_courses
      FROM eligible_students
    `;

    return NextResponse.json({
      success: true,
      summary: {
        totalStudents: parseInt(summary[0]?.total_students || '0'),
        totalQuizzesAvailable: parseInt(summary[0]?.total_quizzes_available || '0'),
        totalQuizzesAttempted: parseInt(summary[0]?.total_quizzes_attempted || '0'),
        overallAverageScore: parseFloat(summary[0]?.overall_average_score || '0'),
        totalAttempts: parseInt(summary[0]?.total_attempts || '0'),
        totalPassedAttempts: parseInt(summary[0]?.total_passed_attempts || '0'),
        totalQuizzesPassed: parseInt(summary[0]?.total_quizzes_passed || '0'),
        studentsEligibleCertificates: parseInt(summary[0]?.students_eligible_certificates || '0'),
        recentSubmissions: parseInt(recentSubmissions[0]?.count || '0'),
        eligibleStudents: parseInt(certificateStats[0]?.eligible_students || '0'),
        eligibleCourses: parseInt(certificateStats[0]?.eligible_courses || '0')
      }
    });
  } catch (error) {
    console.error('Error fetching student quiz summary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student quiz summary' },
      { status: 500 }
    );
  }
}