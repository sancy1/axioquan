
// // /app/api/instructor/students/quiz-results/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// export async function GET(request: NextRequest) {
//   try {
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const searchParams = request.nextUrl.searchParams;
//     const courseId = searchParams.get('courseId');
//     const studentId = searchParams.get('studentId');

//     // Build query based on parameters
//     let query = sql`
//       WITH student_quiz_results AS (
//         SELECT 
//           u.id as student_id,
//           u.name as student_name,
//           u.email as student_email,
//           u.image as student_image,
//           c.id as course_id,
//           c.title as course_title,
//           a.id as assessment_id,
//           a.title as assessment_title,
//           a.passing_score,
//           a.max_attempts,
//           aa.id as attempt_id,
//           aa.attempt_number,
//           aa.score,
//           aa.percentage,
//           aa.passed,
//           aa.grade_letter,
//           aa.submitted_at,
//           aa.time_spent,
//           ROW_NUMBER() OVER (PARTITION BY u.id, a.id ORDER BY aa.percentage DESC) as best_attempt_rank
//         FROM users u
//         JOIN enrollments e ON u.id = e.user_id AND e.status = 'active'
//         JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
//         JOIN assessments a ON c.id = a.course_id
//         LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND a.id = aa.assessment_id
//         WHERE aa.submitted_at IS NOT NULL
//     `;

//     if (courseId) {
//       query = sql`${query} AND c.id = ${courseId}`;
//     }

//     if (studentId) {
//       query = sql`${query} AND u.id = ${studentId}`;
//     }

//     query = sql`${query} )
//       SELECT 
//         student_id,
//         student_name,
//         student_email,
//         student_image,
//         course_id,
//         course_title,
//         assessment_id,
//         assessment_title,
//         passing_score,
//         max_attempts,
//         COUNT(*) as total_attempts,
//         MAX(percentage) as best_score,
//         MIN(percentage) as worst_score,
//         AVG(percentage) as average_score,
//         MAX(CASE WHEN passed THEN 1 ELSE 0 END) as has_passed,
//         MAX(submitted_at) as last_attempt_date,
//         SUM(time_spent) as total_time_spent
//       FROM student_quiz_results
//       WHERE best_attempt_rank = 1
//       GROUP BY 
//         student_id, student_name, student_email, student_image,
//         course_id, course_title, assessment_id, assessment_title,
//         passing_score, max_attempts
//       ORDER BY student_name, course_title, assessment_title
//     `;

//     const results = await query;

//     // Transform data for frontend
//     const studentQuizData = results.map((row: any) => ({
//       studentId: row.student_id,
//       studentName: row.student_name,
//       studentEmail: row.student_email,
//       studentImage: row.student_image,
//       courseId: row.course_id,
//       courseTitle: row.course_title,
//       assessmentId: row.assessment_id,
//       assessmentTitle: row.assessment_title,
//       passingScore: row.passing_score || 70,
//       maxAttempts: row.max_attempts || 3,
//       totalAttempts: parseInt(row.total_attempts) || 0,
//       bestScore: parseFloat(row.best_score) || 0,
//       worstScore: parseFloat(row.worst_score) || 0,
//       averageScore: parseFloat(row.average_score) || 0,
//       hasPassed: row.has_passed === 1,
//       lastAttemptDate: row.last_attempt_date,
//       totalTimeSpent: parseInt(row.total_time_spent) || 0,
//       isCertificateEligible: parseFloat(row.best_score) >= (row.passing_score || 70),
//       status: parseFloat(row.best_score) >= (row.passing_score || 70) 
//         ? 'eligible' 
//         : (parseInt(row.total_attempts) < (row.max_attempts || 3) ? 'in_progress' : 'not_eligible')
//     }));

//     return NextResponse.json({
//       success: true,
//       data: studentQuizData,
//       total: studentQuizData.length
//     });
//   } catch (error) {
//     console.error('Error fetching student quiz results:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch student quiz results' },
//       { status: 500 }
//     );
//   }
// }
























// /app/api/instructor/students/quiz-results/route.ts - FIXED VERSION

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

    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get('courseId');
    const studentId = searchParams.get('studentId');

    // FIXED: Get ALL attempts, not just best attempts
    let query = sql`
      WITH student_attempt_data AS (
        SELECT 
          u.id as student_id,
          u.name as student_name,
          u.email as student_email,
          u.image as student_image,
          c.id as course_id,
          c.title as course_title,
          a.id as assessment_id,
          a.title as assessment_title,
          a.passing_score,
          a.max_attempts,
          aa.id as attempt_id,
          aa.attempt_number,
          aa.score,
          aa.percentage,
          aa.passed,
          aa.grade_letter,
          aa.submitted_at,
          aa.time_spent,
          -- Get best score for each student-assessment
          MAX(aa.percentage) OVER (PARTITION BY u.id, a.id) as best_score,
          -- Count total attempts for each student-assessment
          COUNT(*) OVER (PARTITION BY u.id, a.id) as total_attempts_count
        FROM users u
        JOIN enrollments e ON u.id = e.user_id AND e.status = 'active'
        JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
        JOIN assessments a ON c.id = a.course_id
        LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND a.id = aa.assessment_id
        WHERE aa.submitted_at IS NOT NULL
    `;

    if (courseId) {
      query = sql`${query} AND c.id = ${courseId}`;
    }

    if (studentId) {
      query = sql`${query} AND u.id = ${studentId}`;
    }

    query = sql`${query} )
      SELECT DISTINCT ON (student_id, assessment_id)
        student_id,
        student_name,
        student_email,
        student_image,
        course_id,
        course_title,
        assessment_id,
        assessment_title,
        passing_score,
        max_attempts,
        total_attempts_count as total_attempts,
        best_score,
        MAX(submitted_at) as last_attempt_date,
        SUM(time_spent) as total_time_spent,
        -- Calculate average score from all attempts
        AVG(percentage) as average_score,
        -- Check if passed based on best score
        CASE WHEN best_score >= passing_score THEN true ELSE false END as has_passed
      FROM student_attempt_data
      GROUP BY 
        student_id, student_name, student_email, student_image,
        course_id, course_title, assessment_id, assessment_title,
        passing_score, max_attempts, best_score, total_attempts_count
      ORDER BY student_id, assessment_id, last_attempt_date DESC
    `;

    const results = await query;

    // Transform data for frontend
    const studentQuizData = results.map((row: any) => ({
      studentId: row.student_id,
      studentName: row.student_name,
      studentEmail: row.student_email,
      studentImage: row.student_image,
      courseId: row.course_id,
      courseTitle: row.course_title,
      assessmentId: row.assessment_id,
      assessmentTitle: row.assessment_title,
      passingScore: row.passing_score || 70,
      maxAttempts: row.max_attempts || 3,
      totalAttempts: parseInt(row.total_attempts) || 0, // This should now be correct
      bestScore: parseFloat(row.best_score) || 0,
      averageScore: parseFloat(row.average_score) || 0,
      hasPassed: row.has_passed || false,
      lastAttemptDate: row.last_attempt_date,
      totalTimeSpent: parseInt(row.total_time_spent) || 0, // This is in SECONDS
      isCertificateEligible: parseFloat(row.best_score) >= (row.passing_score || 70),
      status: parseFloat(row.best_score) >= (row.passing_score || 70) 
        ? 'eligible' 
        : (parseInt(row.total_attempts) < (row.max_attempts || 3) ? 'in_progress' : 'not_eligible')
    }));

    return NextResponse.json({
      success: true,
      data: studentQuizData,
      total: studentQuizData.length
    });
  } catch (error) {
    console.error('Error fetching student quiz results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student quiz results' },
      { status: 500 }
    );
  }
}