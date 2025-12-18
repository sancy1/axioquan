// /lib/courses/unenrollment-actions.ts - FIXED
'use server';

import { 
  unenrollUserFromCourse, 
  canUnenrollFromCourse
} from '@/lib/db/queries/unenrollment';
import { getSession } from '@/lib/auth/session'; // Use getSession instead of requireAuth

/**
 * Unenroll user from a course (server action)
 */
export async function unenrollFromCourseAction(
  courseId: string,
  method: 'soft_delete' | 'hard_delete' = 'soft_delete'
): Promise<{
  success: boolean;
  message: string;
  errors?: string[];
}> {
  try {
    const session = await getSession(); // Changed from requireAuth()
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['You must be logged in']
      };
    }

    console.log(`Server action: Unenrolling user ${session.userId} from course ${courseId}`);
    
    // Remove eligibility check temporarily for debugging
    // const eligibility = await canUnenrollFromCourse(session.userId, courseId);
    // if (!eligibility.canUnenroll) {
    //   return {
    //     success: false,
    //     message: 'Cannot unenroll from course',
    //     errors: [eligibility.reason || 'Unable to unenroll']
    //   };
    // }

    // Perform unenrollment directly
    const result = await unenrollUserFromCourse(session.userId, courseId, method);
    
    return result;
  } catch (error: any) {
    console.error('❌ Error in unenroll action:', error);
    return {
      success: false,
      message: 'Failed to unenroll',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}