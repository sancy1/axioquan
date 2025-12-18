

// /src/app/api/student/courses/[id]/unenroll/route.ts
// FIXED for Next.js 16 Promise params

import { NextRequest, NextResponse } from 'next/server';
import { unenrollFromCourseAction } from '@/lib/courses/unenrollment-actions';
import { getSession } from '@/lib/auth/session';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Note: params is a Promise
) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // FIX: Await the params to get the id
    const { id: courseId } = await params; // Use await params.id or destructure
    
    console.log(`API route: Unenrolling from course ${courseId}`);
    
    if (!courseId) {
      return NextResponse.json(
        { success: false, message: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Call the server action
    const result = await unenrollFromCourseAction(courseId, 'soft_delete');
    
    console.log('Unenrollment result:', result);
    
    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          message: result.message,
          data: { courseId }
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: result.message,
          errors: result.errors 
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error in unenrollment API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error.message 
      },
      { status: 500 }
    );
  }
}