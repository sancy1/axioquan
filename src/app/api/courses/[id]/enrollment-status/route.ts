
// // /src/app/api/courses/[id]/enrollment-status/route.ts

// import { NextRequest } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return Response.json(
//         { 
//           isEnrolled: false,
//           message: 'Authentication required'
//         },
//         { status: 401 }
//       );
//     }

//     const { id } = await params;
    
//     if (!id) {
//       return Response.json(
//         { 
//           isEnrolled: false,
//           message: 'Course ID is required'
//         },
//         { status: 400 }
//       );
//     }

//     // Check if user is enrolled in this course
//     const enrollment = await sql`
//       SELECT id, status, enrolled_at 
//       FROM enrollments 
//       WHERE course_id = ${id} AND user_id = ${session.userId}
//       LIMIT 1
//     `;

//     const isEnrolled = enrollment.length > 0 && enrollment[0].status === 'active';

//     return Response.json({
//       isEnrolled,
//       enrollmentId: isEnrolled ? enrollment[0].id : undefined,
//       enrolledAt: isEnrolled ? enrollment[0].enrolled_at : undefined
//     });

//   } catch (error: any) {
//     console.error('❌ Error checking enrollment status:', error);
    
//     // If enrollments table doesn't exist yet, return false
//     if (error.message?.includes('relation "enrollments" does not exist')) {
//       return Response.json({
//         isEnrolled: false,
//         message: 'Enrollment system not available'
//       });
//     }

//     return Response.json(
//       { 
//         isEnrolled: false,
//         message: 'Error checking enrollment status'
//       },
//       { status: 500 }
//     );
//   }
// }















// // // /src/app/api/courses/[id]/enrollment-status/route.ts

// import { NextRequest } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return Response.json(
//         { 
//           isEnrolled: false,
//           message: 'Authentication required'
//         },
//         { status: 401 }
//       );
//     }

//     const { id } = await params;
    
//     if (!id) {
//       return Response.json(
//         { 
//           isEnrolled: false,
//           message: 'Course ID is required'
//         },
//         { status: 400 }
//       );
//     }

//     // Check if user is enrolled in this course with progress
//     const enrollment = await sql`
//       SELECT 
//         id, 
//         status, 
//         enrolled_at, 
//         progress_percentage,
//         completed_lessons,
//         total_lessons
//       FROM enrollments 
//       WHERE course_id = ${id} AND user_id = ${session.userId} AND status = 'active'
//       LIMIT 1
//     `;

//     const isEnrolled = enrollment.length > 0 && enrollment[0].status === 'active';

//     return Response.json({
//       isEnrolled,
//       enrollmentId: isEnrolled ? enrollment[0].id : undefined,
//       enrolledAt: isEnrolled ? enrollment[0].enrolled_at : undefined,
//       progressPercentage: isEnrolled ? enrollment[0].progress_percentage : 0,
//       completedLessons: isEnrolled ? enrollment[0].completed_lessons : 0,  // ADD THIS
//       totalLessons: isEnrolled ? enrollment[0].total_lessons : 0           // ADD THIS
//     });

//   } catch (error: any) {
//     console.error('❌ Error checking enrollment status:', error);
    
//     // If enrollments table doesn't exist yet, return false
//     if (error.message?.includes('relation "enrollments" does not exist')) {
//       return Response.json({
//         isEnrolled: false,
//         message: 'Enrollment system not available'
//       });
//     }

//     return Response.json(
//       { 
//         isEnrolled: false,
//         message: 'Error checking enrollment status'
//       },
//       { status: 500 }
//     );
//   }
// }






















// /src/app/api/courses/[id]/enrollment-status/route.ts - UPDATED
import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json(
        { 
          isEnrolled: false,
          message: 'Authentication required'
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    if (!id) {
      return Response.json(
        { 
          isEnrolled: false,
          message: 'Course ID is required'
        },
        { status: 400 }
      );
    }

    // Get ANY enrollment (including dropped)
    const enrollment = await sql`
      SELECT 
        id, 
        status, 
        enrolled_at, 
        progress_percentage,
        completed_lessons,
        total_lessons
      FROM enrollments 
      WHERE course_id = ${id} AND user_id = ${session.userId}
      LIMIT 1
    `;

    // User is considered "enrolled" only if status is 'active' or 'completed'
    const isEnrolled = enrollment.length > 0 && 
                     (enrollment[0].status === 'active' || enrollment[0].status === 'completed');
    
    // Also return the actual status for debugging
    const currentStatus = enrollment.length > 0 ? enrollment[0].status : 'none';

    return Response.json({
      isEnrolled,
      currentStatus, // Added for debugging
      enrollmentId: enrollment.length > 0 ? enrollment[0].id : undefined,
      enrolledAt: enrollment.length > 0 ? enrollment[0].enrolled_at : undefined,
      progressPercentage: enrollment.length > 0 ? enrollment[0].progress_percentage : 0,
      completedLessons: enrollment.length > 0 ? enrollment[0].completed_lessons : 0,
      totalLessons: enrollment.length > 0 ? enrollment[0].total_lessons : 0
    });

  } catch (error: any) {
    console.error('❌ Error checking enrollment status:', error);
    
    // If enrollments table doesn't exist yet, return false
    if (error.message?.includes('relation "enrollments" does not exist')) {
      return Response.json({
        isEnrolled: false,
        message: 'Enrollment system not available'
      });
    }

    return Response.json(
      { 
        isEnrolled: false,
        message: 'Error checking enrollment status'
      },
      { status: 500 }
    );
  }
}