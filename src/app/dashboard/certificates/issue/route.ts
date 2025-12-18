
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is instructor or admin
    if (session.primaryRole !== 'instructor' && session.primaryRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { studentIds, assessmentIds, courseIds } = body;

    if (!studentIds || !assessmentIds || !courseIds || 
        studentIds.length !== assessmentIds.length || 
        assessmentIds.length !== courseIds.length) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Verify instructor has access to these courses
    const instructorCourses = await sql`
      SELECT id FROM courses 
      WHERE instructor_id = ${session.userId} 
        AND id = ANY(${courseIds})
    `;

    if (instructorCourses.length !== new Set(courseIds).size) {
      return NextResponse.json(
        { error: 'Unauthorized access to some courses' },
        { status: 403 }
      );
    }

    // Issue certificates
    const certificates = [];
    const now = new Date();

    for (let i = 0; i < studentIds.length; i++) {
      const certificateId = `cert_${studentIds[i]}_${assessmentIds[i]}_${Date.now()}_${i}`;
      
      // Check if certificate already exists
      const existingCertificate = await sql`
        SELECT id FROM certificates 
        WHERE user_id = ${studentIds[i]} 
          AND assessment_id = ${assessmentIds[i]}
        LIMIT 1
      `;

      if (existingCertificate.length === 0) {
        // Create new certificate
        await sql`
          INSERT INTO certificates (
            id,
            user_id,
            assessment_id,
            course_id,
            issued_by,
            issued_at,
            certificate_number,
            status
          ) VALUES (
            ${certificateId},
            ${studentIds[i]},
            ${assessmentIds[i]},
            ${courseIds[i]},
            ${session.userId},
            ${now.toISOString()},
            ${`CERT-${Date.now()}-${i}`},
            'issued'
          )
        `;

        certificates.push({
          certificateId,
          studentId: studentIds[i],
          assessmentId: assessmentIds[i],
          courseId: courseIds[i],
          issuedAt: now.toISOString(),
        });
      }
    }

    return NextResponse.json({
      success: true,
      certificates,
      count: certificates.length,
      message: `${certificates.length} certificates issued successfully`
    });
  } catch (error) {
    console.error('Error issuing certificates:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to issue certificates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}