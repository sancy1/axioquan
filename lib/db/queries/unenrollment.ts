// /lib/db/queries/unenrollment.ts - UPDATED VERSION
import { sql } from '../index';

/**
 * Unenroll/delete user from a course
 * This sets the enrollment status to 'dropped' or deletes it
 */
export async function unenrollUserFromCourse(
  userId: string,
  courseId: string,
  method: 'soft_delete' | 'hard_delete' = 'soft_delete'
): Promise<{ 
  success: boolean; 
  message: string;
  errors?: string[];
}> {
  try {
    console.log(`Attempting to unenroll user ${userId} from course ${courseId}`);
    
    // First, check if the enrollment exists
    const existingEnrollment = await sql`
      SELECT id, status FROM enrollments 
      WHERE user_id = ${userId} AND course_id = ${courseId}
      LIMIT 1
    `;

    console.log('Existing enrollment:', existingEnrollment);

    if (existingEnrollment.length === 0) {
      return {
        success: false,
        message: 'Enrollment not found',
        errors: ['You are not enrolled in this course']
      };
    }

    if (method === 'soft_delete') {
      // Soft delete: change status to 'dropped' - WITHOUT dropped_at column
      const result = await sql`
        UPDATE enrollments 
        SET 
          status = 'dropped',
          last_accessed_at = NOW()
        WHERE user_id = ${userId} AND course_id = ${courseId}
        RETURNING id, status
      `;

      console.log('Soft delete result:', result);

      if (result.length > 0) {
        // Try to delete related user progress for this course (optional)
        try {
          await sql`
            DELETE FROM user_progress 
            WHERE user_id = ${userId} AND course_id = ${courseId}
          `;
          console.log('Deleted user progress records');
        } catch (progressError) {
          console.log('Note: Could not delete user progress (table might not exist)');
        }

        return {
          success: true,
          message: 'Successfully unenrolled from course'
        };
      }
    } else {
      // Hard delete: remove the enrollment record completely
      const result = await sql`
        DELETE FROM enrollments 
        WHERE user_id = ${userId} AND course_id = ${courseId}
        RETURNING id
      `;

      console.log('Hard delete result:', result);

      if (result.length > 0) {
        // Try to delete related user progress
        try {
          await sql`
            DELETE FROM user_progress 
            WHERE user_id = ${userId} AND course_id = ${courseId}
          `;
          console.log('Deleted user progress records');
        } catch (progressError) {
          console.log('Note: Could not delete user progress');
        }

        return {
          success: true,
          message: 'Successfully unenrolled from course'
        };
      }
    }

    return {
      success: false,
      message: 'Failed to unenroll',
      errors: ['An unexpected error occurred']
    };
  } catch (error: any) {
    console.error('❌ Error unenrolling from course:', error);
    return {
      success: false,
      message: 'Failed to unenroll from course',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * SIMPLIFIED: Check if user can unenroll from a course
 */
export async function canUnenrollFromCourse(
  userId: string,
  courseId: string
): Promise<{
  canUnenroll: boolean;
  reason?: string;
}> {
  try {
    const enrollment = await sql`
      SELECT status, progress_percentage
      FROM enrollments 
      WHERE user_id = ${userId} AND course_id = ${courseId}
      LIMIT 1
    `;

    if (enrollment.length === 0) {
      return {
        canUnenroll: false,
        reason: 'Not enrolled in this course'
      };
    }

    const progress = enrollment[0].progress_percentage || 0;
    const status = enrollment[0].status;

    // Simple check - only prevent if already dropped
    if (status === 'dropped') {
      return {
        canUnenroll: false,
        reason: 'Already unenrolled from this course'
      };
    }

    return {
      canUnenroll: true,
      reason: 'Can unenroll'
    };
  } catch (error: any) {
    console.error('❌ Error checking unenrollment eligibility:', error);
    return {
      canUnenroll: true, // Allow by default if check fails
      reason: 'Error checking eligibility, allowing unenrollment'
    };
  }
}

// Remove getEnrollmentDetails if not needed