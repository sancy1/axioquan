
// // /src/app/api/student/assessments/[id]/attempts/[attemptId]/submit/route.ts

// // /src/app/api/student/assessments/[id]/attempts/[attemptId]/submit/route.ts - FIXED
// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// export async function POST(
//   request: NextRequest,
//   context: { params: Promise<{ id: string; attemptId: string }> }
// ) {
//   console.log('🚀 Student Quiz Submit API called');
  
//   try {
//     const params = await context.params;
//     const assessmentId = params.id;
//     const attemptId = params.attemptId;
    
//     console.log('🔍 Submit API Params:', { assessmentId, attemptId });
    
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       console.log('❌ No session');
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Unauthorized',
//           message: 'Authentication required'
//         },
//         { status: 401 }
//       );
//     }
    
//     console.log('🔍 Student quiz submission for:', {
//       userId: session.userId,
//       assessmentId,
//       attemptId
//     });
    
//     // Parse request body
//     let submitData;
//     try {
//       submitData = await request.json();
//     } catch (validationError) {
//       console.error('❌ Request validation error:', validationError);
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Invalid request',
//           message: 'Invalid request data'
//         },
//         { status: 400 }
//       );
//     }
    
//     console.log('📊 Submit data received:', {
//       answersCount: submitData.answers?.length || 0,
//       finalTimeRemaining: submitData.finalTimeRemaining
//     });
    
//     // 1. Check if attempt exists and belongs to user
//     console.log('🔍 Checking attempt ownership...');
//     const attemptCheck = await sql`
//       SELECT aa.*, e.user_id as enrollment_user_id
//       FROM assessment_attempts aa
//       JOIN enrollments e ON aa.enrollment_id = e.id
//       WHERE aa.id = ${attemptId} 
//         AND aa.assessment_id = ${assessmentId}
//         AND e.user_id = ${session.userId}
//         AND aa.submitted_at IS NULL
//       LIMIT 1
//     `;
    
//     if (attemptCheck.length === 0) {
//       console.log('❌ Attempt not found or access denied');
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Access denied',
//           message: 'You do not have permission to submit this attempt'
//         },
//         { status: 403 }
//       );
//     }
    
//     const attempt = attemptCheck[0];
//     console.log('✅ Attempt verified:', attempt.id);
    
//     // 2. Get assessment questions for grading
//     console.log('🔍 Getting assessment questions for grading...');
//     const questions = await sql`
//       SELECT 
//         id,
//         question_type,
//         correct_answer,
//         options,
//         points,
//         possible_answers
//       FROM questions 
//       WHERE assessment_id = ${assessmentId}
//       ORDER BY order_index
//     `;
    
//     console.log('📊 Questions found:', questions.length);
    
//     // 3. Calculate score
//     let totalScore = 0;
//     let maxScore = 0;
//     const questionBreakdown: any[] = [];
    
//     questions.forEach((question: any) => {
//       maxScore += question.points || 1;
      
//       const userAnswer = submitData.answers?.find((a: any) => a.questionId === question.id);
//       let score = 0;
//       let isCorrect = false;
      
//       console.log(`🔍 Grading question ${question.id}:`, {
//         type: question.question_type,
//         userAnswer: userAnswer?.answer,
//         correctAnswer: question.correct_answer
//       });
      
//       switch (question.question_type) {
//         case 'multiple_choice':
//           const correctOption = question.options?.find((opt: any) => opt.correct);
//           if (correctOption && userAnswer?.answer === correctOption.text) {
//             score = question.points || 1;
//             isCorrect = true;
//             console.log(`✅ Multiple choice correct: ${userAnswer.answer} matches ${correctOption.text}`);
//           } else {
//             console.log(`❌ Multiple choice incorrect: ${userAnswer?.answer} vs ${correctOption?.text}`);
//           }
//           break;
          
//         case 'true_false':
//           if (userAnswer?.answer === question.correct_answer) {
//             score = question.points || 1;
//             isCorrect = true;
//             console.log(`✅ True/False correct: ${userAnswer.answer}`);
//           } else {
//             console.log(`❌ True/False incorrect: ${userAnswer?.answer} vs ${question.correct_answer}`);
//           }
//           break;
          
//         case 'short_answer':
//           const possibleAnswers = question.possible_answers || [question.correct_answer];
//           const normalizedAnswer = (userAnswer?.answer as string || '').toLowerCase().trim();
//           const match = possibleAnswers.find((ans: string) => 
//             ans.toLowerCase().trim() === normalizedAnswer
//           );
//           if (match) {
//             score = question.points || 1;
//             isCorrect = true;
//             console.log(`✅ Short answer correct: "${userAnswer.answer}" matches "${match}"`);
//           } else {
//             console.log(`❌ Short answer incorrect: "${userAnswer?.answer}" not in`, possibleAnswers);
//           }
//           break;
          
//         case 'essay':
//           // For essays, give full points for now (manual grading later)
//           if (userAnswer?.answer && (userAnswer.answer as string).trim().length > 10) {
//             score = question.points || 1;
//             isCorrect = true;
//             console.log(`✅ Essay submitted: ${(userAnswer.answer as string).length} characters`);
//           }
//           break;
          
//         default:
//           console.log(`⚠️ Unknown question type: ${question.question_type}`);
//       }
      
//       totalScore += score;
//       questionBreakdown.push({
//         questionId: question.id,
//         questionType: question.question_type,
//         userAnswer: userAnswer?.answer,
//         correctAnswer: question.correct_answer,
//         points: question.points || 1,
//         score,
//         isCorrect
//       });
//     });
    
//     const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
//     const passed = percentage >= (attempt.passing_score || 70);
    
//     // Determine grade letter
//     let gradeLetter = 'F';
//     if (percentage >= 90) gradeLetter = 'A';
//     else if (percentage >= 80) gradeLetter = 'B';
//     else if (percentage >= 70) gradeLetter = 'C';
//     else if (percentage >= 60) gradeLetter = 'D';
    
//     console.log('📊 Grading results:', {
//       totalScore,
//       maxScore,
//       percentage,
//       passed,
//       gradeLetter,
//       questionsGraded: questions.length
//     });
    
//     // 4. Calculate final time spent
//     // 4. Calculate final time spent - CORRECTED VERSION
//     let finalTimeSpent = attempt.time_spent || 0;

//     if (submitData.finalTimeRemaining !== undefined) {
//       // Method 1: If we have total time limit
//       if (attempt.time_limit) {
//         const totalTimeSeconds = attempt.time_limit * 60; // Convert minutes to seconds
//         finalTimeSpent = Math.max(0, totalTimeSeconds - submitData.finalTimeRemaining);
//       }
//       // Method 2: If we track from start
//       else if (attempt.time_remaining !== null) {
//         // This assumes time_remaining started at total time and counts down
//         finalTimeSpent = Math.max(0, (attempt.time_remaining || 0) - submitData.finalTimeRemaining);
//       }
//     }

//     console.log('⏱️ Time calculation:', {
//       finalTimeRemaining: submitData.finalTimeRemaining,
//       attemptTimeSpent: attempt.time_spent,
//       attemptTimeLimit: attempt.time_limit,
//       calculatedTimeSpent: finalTimeSpent
//     });
//     // const finalTimeSpent = submitData.finalTimeRemaining !== undefined && attempt.time_remaining !== null
//     //   ? (attempt.time_remaining + (attempt.time_spent || 0)) - submitData.finalTimeRemaining
//     //   : attempt.time_spent || 0;
    
//     const now = new Date().toISOString();
    
//     // 5. Update the attempt with ALL grading information
//     console.log('💾 Updating attempt with grading results...');
    
//     // Using the correct sql tagged template literal syntax
//     const updatedAttempt = await sql`
//       UPDATE assessment_attempts 
//       SET 
//         submitted_at = ${now},
//         answers_json = ${JSON.stringify(submitData.answers)},
//         question_breakdown = ${JSON.stringify(questionBreakdown)},
//         score = ${totalScore},
//         max_score = ${maxScore},
//         percentage = ${percentage},
//         passed = ${passed},
//         grade_letter = ${gradeLetter},
//         time_remaining = ${submitData.finalTimeRemaining !== undefined ? submitData.finalTimeRemaining : attempt.time_remaining},
//         time_spent = ${finalTimeSpent},
//         grading_status = 'graded'
//       WHERE id = ${attemptId}
//       RETURNING id, submitted_at, grading_status, score, percentage, passed, grade_letter
//     `;
    
//     if (updatedAttempt.length === 0) {
//       throw new Error('Failed to update attempt');
//     }
    
//     console.log('✅ Quiz submitted and graded successfully:', updatedAttempt[0]);
    
//     return NextResponse.json({
//       success: true,
//       attempt: updatedAttempt[0],
//       message: 'Quiz submitted successfully',
//       results: {
//         score: totalScore,
//         maxScore,
//         percentage,
//         passed,
//         gradeLetter,
//         correctAnswers: questionBreakdown.filter(q => q.isCorrect).length,
//         totalQuestions: questions.length
//       }
//     }, { status: 200 });
    
//   } catch (error: any) {
//     console.error('💥 Student Quiz Submit API Error:', error);
//     console.error('💥 Error stack:', error.stack);
    
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Internal server error',
//         message: 'Failed to submit quiz',
//         errors: [error.message || 'An unexpected error occurred']
//       },
//       { status: 500 }
//     );
//   }
// }























// /src/app/api/student/assessments/[id]/attempts/[attemptId]/submit/route.ts - FIXED TIME CALCULATION
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string; attemptId: string }> }
) {
  console.log('🚀 Student Quiz Submit API called');
  
  try {
    const params = await context.params;
    const assessmentId = params.id;
    const attemptId = params.attemptId;
    
    console.log('🔍 Submit API Params:', { assessmentId, attemptId });
    
    const session = await getSession();
    
    if (!session || !session.userId) {
      console.log('❌ No session');
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required'
        },
        { status: 401 }
      );
    }
    
    console.log('🔍 Student quiz submission for:', {
      userId: session.userId,
      assessmentId,
      attemptId
    });
    
    // Parse request body
    let submitData;
    try {
      submitData = await request.json();
    } catch (validationError) {
      console.error('❌ Request validation error:', validationError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request',
          message: 'Invalid request data'
        },
        { status: 400 }
      );
    }
    
    console.log('📊 Submit data received:', {
      answersCount: submitData.answers?.length || 0,
      finalTimeRemaining: submitData.finalTimeRemaining
    });
    
    // 1. Check if attempt exists and belongs to user
    console.log('🔍 Checking attempt ownership...');
    const attemptCheck = await sql`
      SELECT aa.*, e.user_id as enrollment_user_id
      FROM assessment_attempts aa
      JOIN enrollments e ON aa.enrollment_id = e.id
      WHERE aa.id = ${attemptId} 
        AND aa.assessment_id = ${assessmentId}
        AND e.user_id = ${session.userId}
        AND aa.submitted_at IS NULL
      LIMIT 1
    `;
    
    if (attemptCheck.length === 0) {
      console.log('❌ Attempt not found or access denied');
      return NextResponse.json(
        { 
          success: false,
          error: 'Access denied',
          message: 'You do not have permission to submit this attempt'
        },
        { status: 403 }
      );
    }
    
    const attempt = attemptCheck[0];
    console.log('✅ Attempt verified:', attempt.id);
    
    // 2. Get assessment questions for grading
    console.log('🔍 Getting assessment questions for grading...');
    const questions = await sql`
      SELECT 
        id,
        question_type,
        correct_answer,
        options,
        points,
        possible_answers
      FROM questions 
      WHERE assessment_id = ${assessmentId}
      ORDER BY order_index
    `;
    
    console.log('📊 Questions found:', questions.length);
    
    // 3. Calculate score
    let totalScore = 0;
    let maxScore = 0;
    const questionBreakdown: any[] = [];
    
    questions.forEach((question: any) => {
      maxScore += question.points || 1;
      
      const userAnswer = submitData.answers?.find((a: any) => a.questionId === question.id);
      let score = 0;
      let isCorrect = false;
      
      console.log(`🔍 Grading question ${question.id}:`, {
        type: question.question_type,
        userAnswer: userAnswer?.answer,
        correctAnswer: question.correct_answer
      });
      
      switch (question.question_type) {
        case 'multiple_choice':
          const correctOption = question.options?.find((opt: any) => opt.correct);
          if (correctOption && userAnswer?.answer === correctOption.text) {
            score = question.points || 1;
            isCorrect = true;
            console.log(`✅ Multiple choice correct: ${userAnswer.answer} matches ${correctOption.text}`);
          } else {
            console.log(`❌ Multiple choice incorrect: ${userAnswer?.answer} vs ${correctOption?.text}`);
          }
          break;
          
        case 'true_false':
          if (userAnswer?.answer === question.correct_answer) {
            score = question.points || 1;
            isCorrect = true;
            console.log(`✅ True/False correct: ${userAnswer.answer}`);
          } else {
            console.log(`❌ True/False incorrect: ${userAnswer?.answer} vs ${question.correct_answer}`);
          }
          break;
          
        case 'short_answer':
          const possibleAnswers = question.possible_answers || [question.correct_answer];
          const normalizedAnswer = (userAnswer?.answer as string || '').toLowerCase().trim();
          const match = possibleAnswers.find((ans: string) => 
            ans.toLowerCase().trim() === normalizedAnswer
          );
          if (match) {
            score = question.points || 1;
            isCorrect = true;
            console.log(`✅ Short answer correct: "${userAnswer.answer}" matches "${match}"`);
          } else {
            console.log(`❌ Short answer incorrect: "${userAnswer?.answer}" not in`, possibleAnswers);
          }
          break;
          
        case 'essay':
          // For essays, give full points for now (manual grading later)
          if (userAnswer?.answer && (userAnswer.answer as string).trim().length > 10) {
            score = question.points || 1;
            isCorrect = true;
            console.log(`✅ Essay submitted: ${(userAnswer.answer as string).length} characters`);
          }
          break;
          
        default:
          console.log(`⚠️ Unknown question type: ${question.question_type}`);
      }
      
      totalScore += score;
      questionBreakdown.push({
        questionId: question.id,
        questionType: question.question_type,
        userAnswer: userAnswer?.answer,
        correctAnswer: question.correct_answer,
        points: question.points || 1,
        score,
        isCorrect
      });
    });
    
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const passed = percentage >= (attempt.passing_score || 70);
    
    // Determine grade letter
    let gradeLetter = 'F';
    if (percentage >= 90) gradeLetter = 'A';
    else if (percentage >= 80) gradeLetter = 'B';
    else if (percentage >= 70) gradeLetter = 'C';
    else if (percentage >= 60) gradeLetter = 'D';
    
    console.log('📊 Grading results:', {
      totalScore,
      maxScore,
      percentage,
      passed,
      gradeLetter,
      questionsGraded: questions.length
    });
    
    // =================================================================
    // 4. Calculate final time spent - CORRECTED VERSION (SURGICAL FIX)
    // =================================================================
    let finalTimeSpent = attempt.time_spent || 0;
    
    // Method 1: Calculate based on assessment time limit (if available)
    if (submitData.finalTimeRemaining !== undefined && submitData.finalTimeRemaining !== null) {
      // First, get the assessment time limit if not already in attempt
      let timeLimitSeconds = 0;
      
      if (attempt.time_limit) {
        // If time_limit is in minutes (as per your schema), convert to seconds
        timeLimitSeconds = attempt.time_limit * 60;
        console.log('⏱️ Using assessment time limit:', { 
          timeLimitMinutes: attempt.time_limit, 
          timeLimitSeconds 
        });
      } else {
        // Try to get time limit from assessment table
        try {
          const assessmentData = await sql`
            SELECT time_limit FROM assessments WHERE id = ${assessmentId}
          `;
          
          if (assessmentData.length > 0 && assessmentData[0].time_limit) {
            timeLimitSeconds = assessmentData[0].time_limit * 60;
            console.log('⏱️ Fetched assessment time limit from database:', { 
              timeLimitMinutes: assessmentData[0].time_limit, 
              timeLimitSeconds 
            });
          }
        } catch (error) {
          console.log('⚠️ Could not fetch assessment time limit:', error);
        }
      }
      
      // Calculate time spent based on time limit and remaining time
      if (timeLimitSeconds > 0) {
        // Time spent = total time limit - remaining time
        finalTimeSpent = Math.max(0, timeLimitSeconds - submitData.finalTimeRemaining);
        console.log('⏱️ Calculated time spent from time limit:', {
          timeLimitSeconds,
          finalTimeRemaining: submitData.finalTimeRemaining,
          calculatedTimeSpent: finalTimeSpent
        });
      }
      // Method 2: Calculate based on time elapsed since start
      else {
        const startedAt = new Date(attempt.started_at);
        const now = new Date();
        const elapsedSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
        
        // Use the greater of elapsed time or existing time_spent
        finalTimeSpent = Math.max(elapsedSeconds, finalTimeSpent);
        console.log('⏱️ Calculated time spent from elapsed time:', {
          startedAt: attempt.started_at,
          now: now.toISOString(),
          elapsedSeconds,
          calculatedTimeSpent: finalTimeSpent
        });
      }
    } else {
      // Fallback: Calculate from started_at timestamp
      const startedAt = new Date(attempt.started_at);
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
      finalTimeSpent = Math.max(elapsedSeconds, finalTimeSpent);
      console.log('⏱️ No finalTimeRemaining provided, using elapsed time:', {
        startedAt: attempt.started_at,
        now: now.toISOString(),
        elapsedSeconds,
        finalTimeSpent
      });
    }
    
    // Ensure time_spent is not negative
    finalTimeSpent = Math.max(0, finalTimeSpent);
    
    console.log('⏱️ Final time spent calculation:', {
      originalTimeSpent: attempt.time_spent,
      finalTimeSpent,
      finalTimeRemaining: submitData.finalTimeRemaining
    });
    // =================================================================
    // END OF TIME CALCULATION FIX
    // =================================================================
    
    const now = new Date().toISOString();
    
    // 5. Update the attempt with ALL grading information
    console.log('💾 Updating attempt with grading results...');
    
    // Using the correct sql tagged template literal syntax
    const updatedAttempt = await sql`
      UPDATE assessment_attempts 
      SET 
        submitted_at = ${now},
        answers_json = ${JSON.stringify(submitData.answers)},
        question_breakdown = ${JSON.stringify(questionBreakdown)},
        score = ${totalScore},
        max_score = ${maxScore},
        percentage = ${percentage},
        passed = ${passed},
        grade_letter = ${gradeLetter},
        time_remaining = ${submitData.finalTimeRemaining !== undefined ? submitData.finalTimeRemaining : attempt.time_remaining},
        time_spent = ${finalTimeSpent},
        grading_status = 'graded'
      WHERE id = ${attemptId}
      RETURNING id, submitted_at, grading_status, score, percentage, passed, grade_letter
    `;
    
    if (updatedAttempt.length === 0) {
      throw new Error('Failed to update attempt');
    }
    
    console.log('✅ Quiz submitted and graded successfully:', updatedAttempt[0]);
    
    return NextResponse.json({
      success: true,
      attempt: updatedAttempt[0],
      message: 'Quiz submitted successfully',
      results: {
        score: totalScore,
        maxScore,
        percentage,
        passed,
        gradeLetter,
        correctAnswers: questionBreakdown.filter(q => q.isCorrect).length,
        totalQuestions: questions.length,
        timeSpent: finalTimeSpent // Return calculated time for debugging
      }
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('💥 Student Quiz Submit API Error:', error);
    console.error('💥 Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Failed to submit quiz',
        errors: [error.message || 'An unexpected error occurred']
      },
      { status: 500 }
    );
  }
}





