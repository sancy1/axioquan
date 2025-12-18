
// // /src/app/api/student/assessments/[id]/attempts/[attemptId]/results/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db/index';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string; attemptId: string } }
// ) {
//   try {
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       return NextResponse.json(
//         { success: false, message: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const assessmentId = params.id;
//     const attemptId = params.attemptId;

//     // Fetch attempt with detailed results
//     const attemptResult = await sql`
//       SELECT 
//         aa.*,
//         a.title as assessment_title,
//         a.passing_score,
//         a.time_limit,
//         a.max_attempts,
//         a.show_correct_answers,
//         c.title as course_title
//       FROM assessment_attempts aa
//       JOIN assessments a ON aa.assessment_id = a.id
//       JOIN courses c ON aa.course_id = c.id
//       WHERE aa.id = ${attemptId}
//         AND aa.user_id = ${session.userId}
//         AND aa.assessment_id = ${assessmentId}
//       LIMIT 1
//     `;

//     if (attemptResult.length === 0) {
//       return NextResponse.json(
//         { success: false, message: 'Attempt not found' },
//         { status: 404 }
//       );
//     }

//     const attempt = attemptResult[0];

//     // Parse question breakdown
//     let questionBreakdown = [];
//     try {
//       questionBreakdown = Array.isArray(attempt.question_breakdown)
//         ? attempt.question_breakdown
//         : JSON.parse(attempt.question_breakdown || '[]');
//     } catch (error) {
//       console.error('Error parsing question breakdown:', error);
//     }

//     // Fetch questions for context
//     const questionsResult = await sql`
//       SELECT 
//         q.id,
//         q.question_text,
//         q.question_type,
//         q.options,
//         q.correct_answer,
//         q.explanation,
//         q.points
//       FROM questions q
//       WHERE q.assessment_id = ${assessmentId}
//       ORDER BY q.order_index
//     `;

//     // Combine question data with attempt results
//     const detailedQuestions = questionsResult.map((dbQuestion: any) => {
//       const breakdown = questionBreakdown.find((q: any) => q.questionId === dbQuestion.id);
      
//       return {
//         id: dbQuestion.id,
//         questionText: dbQuestion.question_text,
//         questionType: dbQuestion.question_type,
//         userAnswer: breakdown?.userAnswer || null,
//         correctAnswer: dbQuestion.correct_answer,
//         points: dbQuestion.points || 1,
//         awardedPoints: breakdown?.score || 0,
//         isCorrect: breakdown?.isCorrect || false,
//         explanation: dbQuestion.explanation
//       };
//     });

//     const results = {
//       attemptId: attempt.id,
//       assessmentId: attempt.assessment_id,
//       courseId: attempt.course_id,
//       userId: attempt.user_id,
//       score: parseFloat(attempt.score) || 0,
//       maxScore: parseFloat(attempt.max_score) || 0,
//       percentage: parseFloat(attempt.percentage) || 0,
//       passed: attempt.passed || false,
//       gradeLetter: attempt.grade_letter || 'F',
//       timeSpent: attempt.time_spent || 0,
//       timeLimit: attempt.time_limit,
//       attemptNumber: attempt.attempt_number || 1,
//       maxAttempts: attempt.max_attempts || 1,
//       submittedAt: attempt.submitted_at || new Date().toISOString(),
//       questions: detailedQuestions,
//       assessment: {
//         title: attempt.assessment_title,
//         passingScore: attempt.passing_score || 70,
//         showCorrectAnswers: attempt.show_correct_answers || true
//       }
//     };

//     return NextResponse.json({
//       success: true,
//       results
//     });
//   } catch (error: any) {
//     console.error('Error fetching quiz results:', error);
//     return NextResponse.json(
//       { success: false, message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }










// /src/app/api/student/assessments/[id]/attempts/[attemptId]/results/route.ts - FIXED

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string; attemptId: string }> } // params is a Promise
) {
  try {
    // FIX: await the params Promise
    const params = await context.params;
    const assessmentId = params.id;
    const attemptId = params.attemptId;
    
    console.log('🚀 [Results API] Fetching results:', { assessmentId, attemptId });
    
    const session = await getSession();
    
    if (!session || !session.userId) {
      console.log('❌ [Results API] No session');
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch attempt with detailed results
    console.log('🔍 [Results API] Querying database...');
    const attemptResult = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.passing_score,
        a.time_limit,
        a.max_attempts,
        a.show_correct_answers,
        c.title as course_title
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON aa.course_id = c.id
      WHERE aa.id = ${attemptId}
        AND aa.user_id = ${session.userId}
        AND aa.assessment_id = ${assessmentId}
      LIMIT 1
    `;

    console.log('📊 [Results API] Query result:', {
      found: attemptResult.length > 0,
      attemptId: attemptResult[0]?.id,
      submittedAt: attemptResult[0]?.submitted_at,
      gradingStatus: attemptResult[0]?.grading_status
    });

    if (attemptResult.length === 0) {
      console.log('❌ [Results API] Attempt not found or access denied');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Attempt not found or you do not have permission to view these results',
          details: { attemptId, assessmentId, userId: session.userId }
        },
        { status: 404 }
      );
    }

    const attempt = attemptResult[0];
    console.log('✅ [Results API] Attempt found:', {
      id: attempt.id,
      submittedAt: attempt.submitted_at,
      score: attempt.score,
      percentage: attempt.percentage,
      gradingStatus: attempt.grading_status
    });

    // Parse question breakdown
    let questionBreakdown = [];
    try {
      questionBreakdown = Array.isArray(attempt.question_breakdown)
        ? attempt.question_breakdown
        : JSON.parse(attempt.question_breakdown || '[]');
      console.log('📊 [Results API] Parsed question breakdown:', questionBreakdown.length, 'questions');
    } catch (error) {
      console.error('❌ [Results API] Error parsing question breakdown:', error);
      questionBreakdown = [];
    }

    // Fetch questions for context
    const questionsResult = await sql`
      SELECT 
        q.id,
        q.question_text,
        q.question_type,
        q.options,
        q.correct_answer,
        q.explanation,
        q.points
      FROM questions q
      WHERE q.assessment_id = ${assessmentId}
      ORDER BY q.order_index
    `;

    console.log('📚 [Results API] Found questions:', questionsResult.length);

    // Combine question data with attempt results
    const detailedQuestions = questionsResult.map((dbQuestion: any) => {
      const breakdown = questionBreakdown.find((q: any) => q.questionId === dbQuestion.id);
      
      return {
        id: dbQuestion.id,
        questionText: dbQuestion.question_text,
        questionType: dbQuestion.question_type,
        userAnswer: breakdown?.userAnswer || null,
        correctAnswer: dbQuestion.correct_answer,
        points: dbQuestion.points || 1,
        awardedPoints: breakdown?.score || 0,
        isCorrect: breakdown?.isCorrect || false,
        explanation: dbQuestion.explanation
      };
    });

    const results = {
      attemptId: attempt.id,
      assessmentId: attempt.assessment_id,
      courseId: attempt.course_id,
      userId: attempt.user_id,
      score: parseFloat(attempt.score) || 0,
      maxScore: parseFloat(attempt.max_score) || 0,
      percentage: parseFloat(attempt.percentage) || 0,
      passed: attempt.passed || false,
      gradeLetter: attempt.grade_letter || 'F',
      timeSpent: attempt.time_spent || 0,
      timeLimit: attempt.time_limit,
      attemptNumber: attempt.attempt_number || 1,
      maxAttempts: attempt.max_attempts || 1,
      submittedAt: attempt.submitted_at || new Date().toISOString(),
      questions: detailedQuestions,
      assessment: {
        title: attempt.assessment_title,
        passingScore: attempt.passing_score || 70,
        showCorrectAnswers: attempt.show_correct_answers || true
      }
    };

    console.log('✅ [Results API] Results prepared successfully');
    
    return NextResponse.json({
      success: true,
      results
    });
  } catch (error: any) {
    console.error('❌ [Results API] Error fetching quiz results:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}