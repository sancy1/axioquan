
// app/api/courses/[id]/assessment/route.ts

import { NextRequest } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth/session';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    console.log('🔍 Getting assessment for course:', id);
    
    // 1. Check if user is enrolled in this course
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${session.userId} 
        AND course_id = ${id}
      LIMIT 1
    `;
    
    if (enrollment.length === 0) {
      return Response.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }
    
    // 2. Get first assessment for this course
    const assessments = await sql`
      SELECT 
        a.id, 
        a.title, 
        a.description,
        a.passing_score,
        a.max_attempts,
        a.total_points
      FROM assessments a
      WHERE a.course_id = ${id}
      ORDER BY a.created_at
      LIMIT 1
    `;
    
    console.log('🔍 Assessment query result:', assessments);
    
    if (assessments.length === 0) {
      return Response.json({
        hasAssessment: false,
        message: 'No assessments found for this course'
      });
    }
    
    return Response.json({
      hasAssessment: true,
      assessmentId: assessments[0].id,
      assessmentTitle: assessments[0].title,
      assessmentDescription: assessments[0].description,
      passingScore: assessments[0].passing_score,
      maxAttempts: assessments[0].max_attempts,
      totalPoints: assessments[0].total_points
    });
  } catch (error: any) {
    console.error('❌ Error fetching assessment:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}