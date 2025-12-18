
// /app/api/instructor/quick-stats/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get total students across all courses
    const totalStudentsResult = await sql`
      SELECT COUNT(DISTINCT e.user_id) as count
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE c.instructor_id = ${session.userId} 
        AND e.status = 'active'
    `;

    // Get average quiz scores
    const averageScoreResult = await sql`
      SELECT AVG(aa.percentage) as average_score
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE c.instructor_id = ${session.userId}
        AND aa.submitted_at IS NOT NULL
        AND aa.percentage IS NOT NULL
    `;

    // Get pending certificate approvals (students with score >= 70 but no certificate)
    const pendingCertificatesResult = await sql`
      SELECT COUNT(DISTINCT aa.user_id) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE c.instructor_id = ${session.userId}
        AND aa.submitted_at IS NOT NULL
        AND aa.percentage >= 70
        AND NOT EXISTS (
          SELECT 1 FROM certificates cert 
          WHERE cert.user_id = aa.user_id 
          AND cert.course_id = c.id
        )
    `;

    // Get recent quiz submissions (last 7 days)
    const recentSubmissionsResult = await sql`
      SELECT COUNT(*) as count
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE c.instructor_id = ${session.userId}
        AND aa.submitted_at >= NOW() - INTERVAL '7 days'
        AND aa.submitted_at IS NOT NULL
    `;

    // Get total courses
    const totalCoursesResult = await sql`
      SELECT COUNT(*) as count
      FROM courses
      WHERE instructor_id = ${session.userId}
    `;

    // Get total assessments
    const totalAssessmentsResult = await sql`
      SELECT COUNT(*) as count
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE c.instructor_id = ${session.userId}
    `;

    const stats = {
      totalStudents: parseInt(totalStudentsResult[0]?.count || '0'),
      averageScore: parseFloat(averageScoreResult[0]?.average_score || '0'),
      pendingCertificates: parseInt(pendingCertificatesResult[0]?.count || '0'),
      recentSubmissions: parseInt(recentSubmissionsResult[0]?.count || '0'),
      totalCourses: parseInt(totalCoursesResult[0]?.count || '0'),
      totalAssessments: parseInt(totalAssessmentsResult[0]?.count || '0'),
    };

    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching quick stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

