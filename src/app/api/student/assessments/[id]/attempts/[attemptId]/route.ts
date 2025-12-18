
// /src/app/api/student/assessments/[id]/attempts/[attemptId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string; attemptId: string }> }
) {
  console.log('🚀 Student Attempt Update API called - START');
  
  try {
    // Await the params
    const params = await context.params;
    const assessmentId = params.id;
    const attemptId = params.attemptId;
    
    console.log('🔍 API Params:', { assessmentId, attemptId });
    
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
    
    console.log('🔍 User ID:', session.userId);
    
    // Parse request body
    let updateData;
    try {
      updateData = await request.json();
      console.log('📊 Request body parsed successfully');
    } catch (parseError: any) {
      console.error('❌ Failed to parse request body:', parseError.message);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request',
          message: 'Invalid JSON in request body'
        },
        { status: 400 }
      );
    }
    
    console.log('💾 Update data received:', {
      hasAnswers: !!updateData.answers,
      answersCount: updateData.answers?.length || 0,
      timeRemaining: updateData.timeRemaining
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
          message: 'You do not have permission to update this attempt'
        },
        { status: 403 }
      );
    }
    
    const attempt = attemptCheck[0];
    console.log('✅ Attempt verified:', attempt.id);
    
    // 2. Prepare update values - USING ACTUAL COLUMN NAMES FROM YOUR SCHEMA
    // Your schema shows: time_remaining (integer), answers_json (jsonb)
    const timeRemaining = updateData.timeRemaining !== undefined 
      ? updateData.timeRemaining 
      : attempt.time_remaining;
    
    const answersJson = updateData.answers 
      ? JSON.stringify(updateData.answers) 
      : attempt.answers_json;
    
    console.log('💾 Preparing update with:', {
      timeRemaining,
      answersJsonLength: answersJson?.length || 0
    });
    
    // 3. Update the attempt - USING CORRECT COLUMN NAMES FROM YOUR SCHEMA
    console.log('📝 Executing update query...');
    
    // Your schema: UPDATE assessment_attempts SET time_remaining = ?, answers_json = ?
    const updateQuery = `
      UPDATE assessment_attempts 
      SET 
        time_remaining = $1,
        answers_json = $2
      WHERE id = $3
      RETURNING id, time_remaining, answers_json
    `;
    
    const updateValues = [
      timeRemaining,
      answersJson,
      attemptId
    ];
    
    console.log('🔍 Update query:', updateQuery);
    console.log('🔍 Update values:', updateValues);
    
    const updatedAttempt = await sql.query(updateQuery, updateValues);
    
    console.log('✅ Database update successful:', updatedAttempt[0]);
    
    return NextResponse.json({
      success: true,
      attempt: {
        id: updatedAttempt[0].id,
        time_remaining: updatedAttempt[0].time_remaining,
        answers_json: updatedAttempt[0].answers_json
      },
      message: 'Progress saved successfully'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('💥💥💥 UNEXPECTED ERROR in PATCH endpoint:', error);
    console.error('💥 Error message:', error.message);
    console.error('💥 Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  } finally {
    console.log('🚀 Student Attempt Update API called - END');
  }
}

// GET method (already working, but keeping it for reference)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string; attemptId: string }> }
) {
  console.log('🚀 Student Attempt GET API called');
  
  try {
    const params = await context.params;
    const assessmentId = params.id;
    const attemptId = params.attemptId;
    
    console.log('🔍 GET Params:', { assessmentId, attemptId });
    
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
    
    const attemptCheck = await sql`
      SELECT aa.*, e.user_id as enrollment_user_id
      FROM assessment_attempts aa
      JOIN enrollments e ON aa.enrollment_id = e.id
      WHERE aa.id = ${attemptId} 
        AND aa.assessment_id = ${assessmentId}
        AND e.user_id = ${session.userId}
      LIMIT 1
    `;
    
    if (attemptCheck.length === 0) {
      console.log('❌ Attempt not found or access denied');
      return NextResponse.json(
        { 
          success: false,
          error: 'Access denied',
          message: 'You do not have permission to view this attempt'
        },
        { status: 403 }
      );
    }
    
    const attempt = attemptCheck[0];
    console.log('✅ Attempt found:', attempt.id);
    
    return NextResponse.json({
      success: true,
      attempt,
      message: 'Attempt retrieved successfully'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('💥 GET endpoint error:', error);
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