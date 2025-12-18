
// // src/app/api/student/assessments/[id]/attempts/route.ts:

// import { NextRequest } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// export async function POST(request: NextRequest, { params }: RouteParams) {
//   console.log('🚀 Student Attempts API called');
  
//   try {
//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       console.log('❌ No session');
//       return Response.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }
    
//     const { id } = await params;
//     console.log('🔍 Assessment ID:', id);
    
//     // 1. Get assessment info
//     console.log('🔍 Getting assessment info...');
//     const assessmentQuery = await sql`
//       SELECT 
//         a.*,
//         c.is_published as course_published
//       FROM assessments a
//       JOIN courses c ON a.course_id = c.id
//       WHERE a.id = ${id}
//       LIMIT 1
//     `;
    
//     if (assessmentQuery.length === 0) {
//       console.log('❌ Assessment not found');
//       return Response.json(
//         { error: 'Assessment not found' },
//         { status: 404 }
//       );
//     }
    
//     const assessment = assessmentQuery[0];
//     console.log('✅ Assessment found');
    
//     // 2. Check enrollment
//     console.log('🔍 Checking enrollment...');
//     const enrollment = await sql`
//       SELECT id FROM enrollments 
//       WHERE user_id = ${session.userId} 
//         AND course_id = ${assessment.course_id}
//       LIMIT 1
//     `;
    
//     if (enrollment.length === 0) {
//       console.log('❌ User not enrolled');
//       return Response.json(
//         { error: 'You are not enrolled in this course' },
//         { status: 403 }
//       );
//     }
    
//     console.log('✅ User is enrolled');
    
//     // 3. Check existing active attempt
//     console.log('🔍 Checking existing attempts...');
//     const existingAttempt = await sql`
//       SELECT id FROM assessment_attempts 
//       WHERE user_id = ${session.userId} 
//         AND assessment_id = ${id}
//         AND submitted_at IS NULL
//       LIMIT 1
//     `;
    
//     if (existingAttempt.length > 0) {
//       console.log('✅ Resuming existing attempt:', existingAttempt[0].id);
//       return Response.json({
//         attempt: { id: existingAttempt[0].id },
//         message: 'Resuming existing attempt'
//       });
//     }
    
//     // 4. Create new attempt
//     console.log('🔍 Creating new attempt...');
//     const newAttempt = await sql`
//       INSERT INTO assessment_attempts (
//         id,
//         user_id,
//         assessment_id,
//         course_id,
//         enrollment_id,
//         attempt_number,
//         started_at,
//         time_remaining,
//         max_score,
//         grading_status
//       ) VALUES (
//         gen_random_uuid(),
//         ${session.userId},
//         ${id},
//         ${assessment.course_id},
//         ${enrollment[0].id},
//         1,
//         NOW(),
//         ${assessment.time_limit},
//         ${assessment.total_points},
//         'pending'
//       )
//       RETURNING id
//     `;
    
//     console.log('✅ New attempt created:', newAttempt[0].id);
    
//     return Response.json({
//       attempt: { id: newAttempt[0].id },
//       message: 'Attempt started successfully'
//     });
    
//   } catch (error: any) {
//     console.error('💥 Student Attempts API Error:', error);
//     return Response.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
























// /src/app/api/student/assessments/[id]/attempts/route.ts - FIXED VERSION

import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db'; // Make sure this import is correct for your setup

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  console.log('🚀 Student Attempts API called - UPDATED VERSION');
  
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      console.log('❌ No session');
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    console.log('🔍 Assessment ID:', id);
    
    // 1. Get assessment info
    console.log('🔍 Getting assessment info...');
    const assessmentQuery = await sql`
      SELECT 
        a.*,
        c.is_published as course_published,
        a.max_attempts,
        a.total_points
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;
    
    if (assessmentQuery.length === 0) {
      console.log('❌ Assessment not found');
      return Response.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }
    
    const assessment = assessmentQuery[0];
    console.log('✅ Assessment found:', {
      title: assessment.title,
      maxAttempts: assessment.max_attempts,
      totalPoints: assessment.total_points
    });
    
    // 2. Check enrollment
    console.log('🔍 Checking enrollment...');
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${session.userId} 
        AND course_id = ${assessment.course_id}
        AND status = 'active'
      LIMIT 1
    `;
    
    if (enrollment.length === 0) {
      console.log('❌ User not enrolled or enrollment not active');
      return Response.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }
    
    console.log('✅ User is enrolled');
    
    // 3. Check existing active attempt
    console.log('🔍 Checking existing attempts...');
    const existingAttempt = await sql`
      SELECT id FROM assessment_attempts 
      WHERE user_id = ${session.userId} 
        AND assessment_id = ${id}
        AND submitted_at IS NULL
        AND grading_status = 'pending'
      LIMIT 1
    `;
    
    if (existingAttempt.length > 0) {
      console.log('✅ Resuming existing attempt:', existingAttempt[0].id);
      return Response.json({
        attempt: { id: existingAttempt[0].id },
        message: 'Resuming existing attempt',
        success: true
      });
    }
    
    // 4. Check attempt limits (NEW - to fix the multiple attempts bug)
    console.log('🔍 Checking attempt limits...');
    const submittedAttempts = await sql`
      SELECT COUNT(*) as count FROM assessment_attempts 
      WHERE user_id = ${session.userId} 
        AND assessment_id = ${id}
        AND submitted_at IS NOT NULL
    `;
    
    const maxAttempts = assessment.max_attempts || 1;
    const usedAttempts = parseInt(submittedAttempts[0]?.count || 0);
    
    console.log('📊 Attempt stats:', {
      usedAttempts,
      maxAttempts,
      canAttempt: usedAttempts < maxAttempts
    });
    
    if (usedAttempts >= maxAttempts) {
      console.log('❌ Maximum attempts reached:', { usedAttempts, maxAttempts });
      return Response.json(
        { 
          error: `Maximum attempts (${maxAttempts}) reached`,
          success: false
        },
        { status: 400 }
      );
    }
    
    // 5. Calculate next attempt number
    const nextAttemptNumber = usedAttempts + 1;
    console.log('🔢 Next attempt number:', nextAttemptNumber);
    
    // 6. Check availability (NEW)
    const now = new Date();
    if (assessment.available_from && now < new Date(assessment.available_from)) {
      console.log('❌ Assessment not yet available');
      return Response.json(
        { error: 'This assessment is not yet available', success: false },
        { status: 400 }
      );
    }
    
    if (assessment.available_until && now > new Date(assessment.available_until)) {
      console.log('❌ Assessment deadline passed');
      return Response.json(
        { error: 'The deadline for this assessment has passed', success: false },
        { status: 400 }
      );
    }
    
    // 7. Create new attempt
    console.log('🔍 Creating new attempt...');
    const timeRemaining = assessment.time_limit ? assessment.time_limit * 60 : null;
    
    const newAttempt = await sql`
      INSERT INTO assessment_attempts (
        id,
        user_id,
        assessment_id,
        course_id,
        enrollment_id,
        attempt_number,
        started_at,
        time_remaining,
        max_score,
        grading_status
      ) VALUES (
        gen_random_uuid(),
        ${session.userId},
        ${id},
        ${assessment.course_id},
        ${enrollment[0].id},
        ${nextAttemptNumber},
        NOW(),
        ${timeRemaining},
        ${assessment.total_points || 0},
        'pending'
      )
      RETURNING id
    `;
    
    if (newAttempt.length === 0) {
      throw new Error('Failed to create attempt');
    }
    
    console.log('✅ New attempt created:', newAttempt[0].id);
    
    return Response.json({
      attempt: { id: newAttempt[0].id },
      message: 'Attempt started successfully',
      success: true,
      attemptId: newAttempt[0].id, // Added for compatibility
      isResume: false // Added for compatibility
    });
    
  } catch (error: any) {
    console.error('💥 Student Attempts API Error:', error);
    return Response.json(
      { 
        error: 'Internal server error',
        details: error.message,
        success: false
      },
      { status: 500 }
    );
  }
}

// Also add a GET endpoint for checking attempts
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await getSession();
    
    if (!session || !session.userId) {
      return Response.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }
    
    const attempts = await sql`
      SELECT 
        id,
        attempt_number,
        submitted_at,
        score,
        percentage,
        passed,
        grading_status,
        started_at
      FROM assessment_attempts 
      WHERE user_id = ${session.userId} 
        AND assessment_id = ${id}
      ORDER BY attempt_number DESC
    `;
    
    return Response.json({
      attempts,
      success: true
    });
  } catch (error: any) {
    console.error('Error fetching assessment attempts:', error);
    return Response.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}