
// /src/app/api/assessments/[id]/stats/route.ts
// Create this file if it doesn't exist

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get assessment details to verify access
    const assessment = await sql`
      SELECT a.*, c.instructor_id, c.id as course_id
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;

    if (assessment.length === 0) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Check if user has access (instructor or admin)
    if (assessment[0].instructor_id !== session.userId && session.primaryRole !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get basic statistics
    const statsResult = await sql`
      WITH attempt_stats AS (
        SELECT 
          COUNT(*) as total_attempts,
          COUNT(DISTINCT user_id) as unique_students,
          AVG(percentage) as average_score,
          COUNT(CASE WHEN percentage >= ${assessment[0].passing_score} THEN 1 END) as passed_attempts
        FROM assessment_attempts
        WHERE assessment_id = ${id}
          AND submitted_at IS NOT NULL
      )
      SELECT 
        total_attempts,
        unique_students,
        COALESCE(average_score, 0) as average_score,
        CASE 
          WHEN total_attempts > 0 THEN (passed_attempts::float / total_attempts) * 100
          ELSE 0
        END as pass_rate
      FROM attempt_stats
    `;

    const stats = statsResult[0] || {
      total_attempts: 0,
      unique_students: 0,
      average_score: 0,
      pass_rate: 0
    };

    return NextResponse.json({
      success: true,
      stats: {
        averageScore: parseFloat(stats.average_score) || 0,
        studentsTaken: parseInt(stats.unique_students) || 0,
        passRate: parseFloat(stats.pass_rate) || 0,
        totalAttempts: parseInt(stats.total_attempts) || 0,
      }
    });
  } catch (error) {
    console.error('Error fetching assessment stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}