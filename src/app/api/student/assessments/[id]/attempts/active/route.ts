
// /src/app/api/student/assessments/[id]/attempts/active/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getActiveAttempt } from '@/lib/db/queries/assessment-attempts';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('🔍 Active Attempt API called');
  
  try {
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

    const assessmentId = params.id;
    console.log('🔍 Checking active attempt for:', {
      userId: session.userId,
      assessmentId
    });

    const attempt = await getActiveAttempt(session.userId, assessmentId);

    if (!attempt) {
      console.log('ℹ️ No active attempt found');
      return NextResponse.json(
        { 
          success: false,
          message: 'No active attempt found',
          attempt: null
        },
        { status: 404 }
      );
    }

    console.log('✅ Active attempt found:', attempt.id);
    
    return NextResponse.json({
      success: true,
      attempt,
      message: 'Active attempt found'
    });
  } catch (error: any) {
    console.error('💥 Active Attempt API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'Failed to check for active attempt'
      },
      { status: 500 }
    );
  }
}