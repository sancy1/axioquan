
// // /src/app/api/assessments/[id]/attempts/[attemptId]/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { getAssessmentAttemptById } from '@/lib/db/queries/assessment-attempts';
// import { saveAttemptProgress } from '@/lib/assessments/attempt-actions';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string; attemptId: string } }
// ) {
//   try {
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const attemptId = params.attemptId;
//     const attempt = await getAssessmentAttemptById(attemptId);

//     if (!attempt) {
//       return NextResponse.json(
//         { error: 'Attempt not found' },
//         { status: 404 }
//       );
//     }

//     // Verify user owns the attempt
//     if (attempt.user_id !== session.userId) {
//       return NextResponse.json(
//         { error: 'Access denied' },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json({ attempt });
//   } catch (error) {
//     console.error('❌ Error fetching assessment attempt:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch assessment attempt' },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string; attemptId: string } }
// ) {
//   try {
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const attemptId = params.attemptId;
//     const body = await request.json();
//     const { answers, timeRemaining } = body;

//     const result = await saveAttemptProgress(attemptId, answers, timeRemaining);

//     if (!result.success) {
//       return NextResponse.json(
//         { error: result.message, errors: result.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       attempt: result.attempt,
//       message: result.message
//     });
//   } catch (error) {
//     console.error('❌ Error updating assessment attempt:', error);
//     return NextResponse.json(
//       { error: 'Failed to update assessment attempt' },
//       { status: 500 }
//     );
//   }
// }
























// /src/app/api/assessments/[id]/attempts/[attemptId]/route.ts - UPDATED VERSION

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getAssessmentAttemptById } from '@/lib/db/queries/assessment-attempts';
import { saveAttemptProgress } from '@/lib/assessments/attempt-actions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to view progress',
          errors: ['Authentication required']
        },
        { status: 401 }
      );
    }

    const attemptId = params.attemptId;
    const attempt = await getAssessmentAttemptById(attemptId);

    if (!attempt) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Attempt not found',
          message: 'Assessment attempt not found'
        },
        { status: 404 }
      );
    }

    // Verify user owns the attempt
    if (attempt.user_id !== session.userId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Access denied',
          message: 'You do not have permission to view this attempt'
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ 
      success: true,
      attempt,
      message: 'Attempt retrieved successfully'
    });
  } catch (error) {
    console.error('❌ Error fetching assessment attempt:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch assessment attempt',
        message: 'An unexpected error occurred',
        errors: ['Internal server error']
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; attemptId: string } }
) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized',
          message: 'You must be logged in to save progress',
          errors: ['Authentication required']
        },
        { status: 401 }
      );
    }

    const attemptId = params.attemptId;
    const body = await request.json();
    const { answers, timeRemaining } = body;

    console.log('📦 PATCH request body:', { 
      attemptId, 
      answersCount: answers?.length,
      timeRemaining 
    });

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request',
          message: 'Answers must be provided as an array',
          errors: ['Invalid answers format']
        },
        { status: 400 }
      );
    }

    // Convert answers to the format expected by saveAttemptProgress
    const formattedAnswers = answers.map((answer: any) => ({
      questionId: answer.questionId,
      answer: answer.answer,
      timeSpent: answer.timeSpent || 0,
      markedForReview: answer.markedForReview || false
    }));

    const result = await saveAttemptProgress(attemptId, formattedAnswers, timeRemaining);

    console.log('📤 PATCH action result:', result);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.message,
          message: result.message,
          errors: result.errors || [result.message]
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      attempt: result.attempt,
      message: result.message
    });
  } catch (error: any) {
    console.error('❌ Error updating assessment attempt:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update assessment attempt',
        message: 'An unexpected error occurred',
        errors: [error.message || 'Internal server error']
      },
      { status: 500 }
    );
  }
}