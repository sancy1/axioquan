

// /src/app/api/assessments/courses/[id]/lessons/route.ts

import { NextRequest } from 'next/server';
import { getCourseLessonsAction } from '@/lib/assessments/actions';
import { requireRole } from '@/lib/auth/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const result = await getCourseLessonsAction(id);
    
    if (!result.success) {
      return Response.json(
        { error: result.message },
        { status: 404 }
      );
    }

    return Response.json({
      lessons: result.lessons
    });
  } catch (error: any) {
    console.error('❌ API Error fetching course lessons:', error);
    
    if (error.message?.includes('unauthorized')) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}