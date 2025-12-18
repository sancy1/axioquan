
// /src/app/api/courses/[id]/debug-enrollment/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('🔍 DEBUG: Enrollment debug endpoint called');
  
  try {
    // Get session using your custom session system
    const session = await getSession();
    console.log('🔍 DEBUG: Session found:', session ? 'YES' : 'NO');
    
    if (!session?.userId) {
      console.log('❌ DEBUG: Unauthorized: No session or userId');
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. Please log in.',
        session: null
      });
    }

    const courseId = params.id;
    const userId = session.userId;
    
    console.log('🔍 DEBUG: User ID:', userId);
    console.log('🔍 DEBUG: Course ID:', courseId);

    // Check enrollment in multiple ways
    const enrollmentCheck = await sql`
      SELECT 
        e.id,
        e.status,
        e.enrolled_at,
        e.user_id,
        e.course_id,
        u.id as user_db_id,
        c.id as course_db_id
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = ${userId} 
        AND e.course_id = ${courseId} 
        AND e.status = 'active'
      LIMIT 1
    `;

    console.log('🔍 DEBUG: Database enrollment check result:', enrollmentCheck);

    // Also check if user exists
    const userCheck = await sql`
      SELECT id, email, name FROM users WHERE id = ${userId} LIMIT 1
    `;

    console.log('🔍 DEBUG: User check result:', userCheck);

    // Check if course exists
    const courseCheck = await sql`
      SELECT id, title, slug FROM courses WHERE id = ${courseId} LIMIT 1
    `;

    console.log('🔍 DEBUG: Course check result:', courseCheck);

    return NextResponse.json({
      success: true,
      debug: {
        session: {
          userId: session.userId,
          email: session.email,
          name: session.name
        },
        database: {
          userExists: userCheck.length > 0,
          courseExists: courseCheck.length > 0,
          enrollmentExists: enrollmentCheck.length > 0,
          enrollmentDetails: enrollmentCheck.length > 0 ? enrollmentCheck[0] : null
        },
        analysis: {
          isEnrolled: enrollmentCheck.length > 0,
          reason: enrollmentCheck.length === 0 ? 'No active enrollment found in database' : 'Enrollment found'
        }
      }
    });
  } catch (error) {
    console.error('❌ DEBUG: Error in debug endpoint:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}