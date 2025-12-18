
// /src/app/api/assessments/[id]/attempts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { startAssessmentAttempt, getUserAttempts } from '@/lib/assessments/attempt-actions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const assessmentId = params.id;
    const result = await getUserAttempts(assessmentId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      attempts: result.attempts,
      count: result.attempts.length
    });
  } catch (error) {
    console.error('❌ Error fetching assessment attempts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assessment attempts' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const assessmentId = params.id;
    const result = await startAssessmentAttempt(assessmentId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message, errors: result.errors },
        { status: result.errors?.[0]?.includes('Maximum') ? 403 : 400 }
      );
    }

    return NextResponse.json({
      attempt: result.attempt,
      message: result.message
    });
  } catch (error) {
    console.error('❌ Error creating assessment attempt:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment attempt' },
      { status: 500 }
    );
  }
}