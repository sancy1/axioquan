

// // /src/app/api/student/quiz-analytics/route.ts  NEW-FILE

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

//     // Get all quiz results for the student
//     const quizResults = await sql`
//       SELECT 
//         aa.*,
//         a.title as assessment_title,
//         a.course_id,
//         c.title as course_title,
//         a.passing_score,
//         a.max_attempts
//       FROM assessment_attempts aa
//       JOIN assessments a ON aa.assessment_id = a.id
//       JOIN courses c ON a.course_id = c.id
//       WHERE aa.user_id = ${session.userId}
//         AND aa.submitted_at IS NOT NULL
//       ORDER BY aa.submitted_at DESC
//     `;

//     if (quizResults.length === 0) {
//       return NextResponse.json({
//         success: true,
//         analytics: null,
//         message: 'No quiz results found'
//       });
//     }

//     // Calculate overall statistics
//     const totalQuizzes = quizResults.length;
//     const averageScore = quizResults.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / totalQuizzes;
//     const passedQuizzes = quizResults.filter(r => parseFloat(r.percentage) >= parseFloat(r.passing_score || 70)).length;

//     // Group by course for certificate progress
//     const coursesMap = new Map();
//     quizResults.forEach(result => {
//       const courseId = result.course_id;
//       if (!coursesMap.has(courseId)) {
//         coursesMap.set(courseId, {
//           courseId,
//           courseTitle: result.course_title,
//           scores: [],
//           attempts: 0,
//           passingScore: result.passing_score || 70,
//           maxAttempts: result.max_attempts || 3,
//         });
//       }
      
//       const course = coursesMap.get(courseId);
//       course.scores.push(parseFloat(result.percentage));
//       course.attempts++;
//     });

//     // Generate certificate progress
//     const certificateProgress = Array.from(coursesMap.values()).map(course => {
//       const currentScore = Math.max(...course.scores);
//       const attemptsUsed = course.attempts;
//       const requiredScore = course.passingScore;
//       const maxAttempts = course.maxAttempts;
      
//       let status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued' = 'not_eligible';
      
//       // Check if certificate already issued
//       const issuedCertificate = false; // You would query certificates table here
      
//       if (issuedCertificate) {
//         status = 'issued';
//       } else if (currentScore >= requiredScore) {
//         status = 'eligible';
//       } else if (attemptsUsed < maxAttempts) {
//         status = 'in_progress';
//       }

//       return {
//         courseId: course.courseId,
//         courseTitle: course.courseTitle,
//         currentScore,
//         requiredScore,
//         attemptsUsed,
//         maxAttempts,
//         status,
//       };
//     });

//     // Generate performance trend
//     const performanceTrend = quizResults
//       .sort((a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime())
//       .map(result => ({
//         date: result.submitted_at,
//         score: parseFloat(result.percentage),
//         quizTitle: result.assessment_title,
//         courseTitle: result.course_title,
//       }));

//     // Count certificates
//     const certificatesEligible = certificateProgress.filter(c => c.status === 'eligible').length;
//     const certificatesIssued = certificateProgress.filter(c => c.status === 'issued').length;

//     // Generate weak areas (this would be more sophisticated in production)
//     const weakAreas = [
//       {
//         topic: 'JavaScript Fundamentals',
//         score: 65,
//         averageScore: 75,
//         recommendations: ['Review variables and data types', 'Practice functions', 'Study scope and hoisting'],
//       },
//       {
//         topic: 'React Components',
//         score: 70,
//         averageScore: 80,
//         recommendations: ['Master component lifecycle', 'Practice props and state', 'Study hooks'],
//       },
//     ];

//     const analytics = {
//       overallScore: averageScore,
//       averageScore,
//       quizzesCompleted: totalQuizzes,
//       totalQuizzes: Math.max(totalQuizzes, 10), // Assuming more quizzes available
//       certificatesEligible,
//       certificatesIssued,
//       performanceTrend,
//       certificateProgress,
//       weakAreas,
//     };

//     return NextResponse.json({
//       success: true,
//       analytics,
//     });
//   } catch (error) {
//     console.error('Error fetching student quiz analytics:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to load analytics',
//         message: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// }























// /src/app/api/student/quiz-analytics/route.ts 

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

    // Get all quiz results for the student
    const quizResults = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.course_id,
        c.title as course_title,
        a.passing_score,
        a.max_attempts
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE aa.user_id = ${session.userId}
        AND aa.submitted_at IS NOT NULL
        AND aa.grading_status = 'graded'
      ORDER BY aa.submitted_at DESC
      LIMIT 100
    `;

    if (quizResults.length === 0) {
      return NextResponse.json({
        success: true,
        analytics: {
          overallScore: 0,
          averageScore: 0,
          quizzesCompleted: 0,
          totalQuizzes: 10, // Assuming more quizzes available
          certificatesEligible: 0,
          certificatesIssued: 0,
          performanceTrend: [],
          certificateProgress: [],
          weakAreas: [],
        },
        message: 'No quiz results found'
      });
    }

    // Calculate overall statistics
    const totalQuizzes = quizResults.length;
    const averageScore = quizResults.reduce((sum, r) => sum + parseFloat(r.percentage || 0), 0) / totalQuizzes;
    const passedQuizzes = quizResults.filter(r => parseFloat(r.percentage || 0) >= parseFloat(r.passing_score || 70)).length;

    // Group by course for certificate progress
    const coursesMap = new Map();
    quizResults.forEach(result => {
      const courseId = result.course_id;
      if (!coursesMap.has(courseId)) {
        coursesMap.set(courseId, {
          courseId,
          courseTitle: result.course_title,
          scores: [],
          attempts: 0,
          passingScore: result.passing_score || 70,
          maxAttempts: result.max_attempts || 3,
        });
      }
      
      const course = coursesMap.get(courseId);
      course.scores.push(parseFloat(result.percentage || 0));
      course.attempts++;
    });

    // Generate certificate progress
    const certificateProgress = Array.from(coursesMap.values()).map(course => {
      const currentScore = course.scores.length > 0 ? Math.max(...course.scores) : 0;
      const attemptsUsed = course.attempts;
      const requiredScore = course.passingScore;
      const maxAttempts = course.maxAttempts;
      
      let status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued' = 'not_eligible';
      
      // Check if certificate already issued (you would query certificates table here)
      const issuedCertificate = false;
      
      if (issuedCertificate) {
        status = 'issued';
      } else if (currentScore >= requiredScore) {
        status = 'eligible';
      } else if (attemptsUsed < maxAttempts) {
        status = 'in_progress';
      }

      return {
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        currentScore,
        requiredScore,
        attemptsUsed,
        maxAttempts,
        status,
      };
    });

    // Generate performance trend
    const performanceTrend = quizResults
      .slice(0, 10) // Limit to 10 most recent
      .map(result => ({
        date: result.submitted_at,
        score: parseFloat(result.percentage || 0),
        quizTitle: result.assessment_title,
        courseTitle: result.course_title,
      }));

    // Count certificates
    const certificatesEligible = certificateProgress.filter(c => c.status === 'eligible').length;
    const certificatesIssued = certificateProgress.filter(c => c.status === 'issued').length;

    // Generate weak areas based on actual quiz performance
    const weakAreas = [];
    if (averageScore < 70) {
      weakAreas.push({
        topic: 'Core Concepts',
        score: Math.round(averageScore),
        averageScore: 75,
        recommendations: ['Review fundamental concepts', 'Practice with more quizzes', 'Focus on weak areas'],
      });
    }

    const analytics = {
      overallScore: averageScore,
      averageScore,
      quizzesCompleted: totalQuizzes,
      totalQuizzes: Math.max(totalQuizzes, 10), // Assuming more quizzes available
      certificatesEligible,
      certificatesIssued,
      performanceTrend,
      certificateProgress,
      weakAreas,
    };

    return NextResponse.json({
      success: true,
      analytics,
      recentAttempts: quizResults.slice(0, 5), // Include recent attempts for display
    });
  } catch (error) {
    console.error('Error fetching student quiz analytics:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load analytics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}