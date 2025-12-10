
// /src/app/api/assessments/route.ts

import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { 
  getCourseAssessments, 
  getInstructorAssessments 
} from '@/lib/db/queries/assessments';
import { 
  getInstructorAssessmentsAction,
  createAssessmentAction 
} from '@/lib/assessments/actions';
import { requireRole } from '@/lib/auth/utils';

// In the GET function of /src/app/api/assessments/route.ts
export async function GET(request: NextRequest) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    // Get course_id from query params
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('course_id');
    
    const session = await getSession();
    if (!session || !session.userId) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    let assessments;
    if (courseId) {
      // Get assessments for specific course
      assessments = await getCourseAssessments(courseId);
      // Filter to ensure instructor owns the course
      assessments = assessments.filter((assessment: any) => 
        assessment.course_instructor_id === session.userId
      );
    } else {
      // Get all instructor assessments
      assessments = await getInstructorAssessments(session.userId);
    }
    
    return Response.json({
      assessments
    });
  } catch (error: any) {
    console.error('❌ API Error fetching assessments:', error);
    
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

export async function POST(request: NextRequest) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.course_id) {
      return Response.json(
        { error: 'Title and course ID are required' },
        { status: 400 }
      );
    }
    
    const result = await createAssessmentAction(body);
    
    if (!result.success) {
      return Response.json(
        { 
          error: result.message,
          details: result.errors
        },
        { status: 400 }
      );
    }

    return Response.json({
      message: result.message,
      assessment: result.assessment
    });
  } catch (error: any) {
    console.error('❌ API Error creating assessment:', error);
    
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