
// /src/app/api/assessments/[id]/analytics/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { getQuizAnalytics } from '@/lib/assessments/analytics-actions';

// interface RouteContext {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export async function GET(
//   request: NextRequest,
//   context: RouteContext
// ) {
//   try {
//     const { id } = await context.params;
//     const searchParams = request.nextUrl.searchParams;
//     const timeRange = searchParams.get('range') || '30d';
//     const courseId = searchParams.get('courseId');

//     if (!courseId) {
//       return NextResponse.json(
//         { error: 'Course ID is required' },
//         { status: 400 }
//       );
//     }

//     const session = await getSession();
    
//     if (!session || !session.userId) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     const result = await getQuizAnalytics(id, courseId, timeRange);
    
//     if (!result.success) {
//       return NextResponse.json(
//         { error: result.error },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       analytics: result.analytics,
//     });
//   } catch (error) {
//     console.error('Error in analytics API:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
























import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';
import { getQuizAnalytics } from '@/lib/assessments/analytics-actions';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('range') || '30d';
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      // Get course ID from assessment
      const assessment = await sql`
        SELECT course_id FROM assessments WHERE id = ${id} LIMIT 1
      `;
      
      if (assessment.length === 0) {
        return NextResponse.json(
          { error: 'Assessment not found' },
          { status: 404 }
        );
      }
      
      // Use getQuizAnalytics server action
      const result = await getQuizAnalytics(id, assessment[0].course_id, timeRange);
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        );
      }
      
      return NextResponse.json({
        success: true,
        analytics: result.analytics
      });
    }

    // Use getQuizAnalytics server action with provided courseId
    const result = await getQuizAnalytics(id, courseId, timeRange);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      analytics: result.analytics
    });
  } catch (error) {
    console.error('Error fetching quiz analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}