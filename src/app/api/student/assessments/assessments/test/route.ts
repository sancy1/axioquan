
// /src/app/api/student/assessments/test/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function PATCH(request: NextRequest) {
  console.log('🔍 TEST PATCH endpoint called');
  
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required'
        },
        { status: 401 }
      );
    }
    
    // Just return a simple success response
    return NextResponse.json({
      success: true,
      message: 'TEST: PATCH endpoint works!',
      userId: session.userId,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('💥 TEST endpoint error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'TEST GET endpoint works!',
    timestamp: new Date().toISOString()
  });
}