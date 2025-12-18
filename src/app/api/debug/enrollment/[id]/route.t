
// /src/app/api/debug/enrollment/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id: courseId } = await params;
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    }
    
    // Get all enrollments for this user/course
    const enrollments = await sql`
      SELECT id, status, progress_percentage, enrolled_at, last_accessed_at
      FROM enrollments 
      WHERE user_id = ${session.userId} AND course_id = ${courseId}
      ORDER BY enrolled_at DESC
    `;
    
    // Get course info
    const course = await sql`
      SELECT id, title, slug, price_cents FROM courses WHERE id = ${courseId} LIMIT 1
    `;
    
    return NextResponse.json({
      userId: session.userId,
      courseId,
      course: course[0] || null,
      enrollments,
      hasActiveEnrollment: enrollments.some(e => e.status === 'active' || e.status === 'completed'),
      hasDroppedEnrollment: enrollments.some(e => e.status === 'dropped'),
      canReenroll: enrollments.some(e => e.status === 'dropped') // Can re-enroll if dropped exists
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}