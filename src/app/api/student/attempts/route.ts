
// TO DELETE

// /api/student/attempts/route.ts
import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return Response.json(
        { error: 'Unauthorized', success: false },
        { status: 401 }
      );
    }
    
    const attempts = await sql`
      SELECT 
        aa.id,
        aa.assessment_id,
        aa.course_id,
        aa.attempt_number,
        aa.submitted_at,
        aa.score,
        aa.max_score,
        aa.percentage,
        aa.passed,
        aa.grade_letter,
        aa.time_spent,
        a.title as assessment_title,
        c.title as course_title
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON aa.course_id = c.id
      WHERE aa.user_id = ${session.userId}
        AND aa.submitted_at IS NOT NULL
      ORDER BY aa.submitted_at DESC
      LIMIT 50
    `;
    
    return Response.json({
      attempts,
      success: true
    });
  } catch (error: any) {
    console.error('Error fetching student attempts:', error);
    return Response.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}