

// // /src/app/api/assessments/[id]/route.ts

// import { NextRequest } from 'next/server';
// import { 
//   getAssessmentByIdAction,
//   updateAssessmentAction,
//   deleteAssessmentAction 
// } from '@/lib/assessments/actions';
// import { requireRole } from '@/lib/auth/utils';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   try {
//     // Check instructor role
//     await requireRole(['instructor', 'admin']);
    
//     const { id } = await params;
//     const result = await getAssessmentByIdAction(id);
    
//     if (!result.success) {
//       return Response.json(
//         { error: result.message },
//         { status: 404 }
//       );
//     }

//     return Response.json({
//       assessment: result.assessment
//     });
//   } catch (error: any) {
//     console.error('❌ API Error fetching assessment:', error);
    
//     if (error.message?.includes('unauthorized')) {
//       return Response.json(
//         { error: 'Unauthorized' },
//         { status: 403 }
//       );
//     }
    
//     return Response.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: NextRequest, { params }: RouteParams) {
//   try {
//     // Check instructor role
//     await requireRole(['instructor', 'admin']);
    
//     const { id } = await params;
//     const body = await request.json();
    
//     const result = await updateAssessmentAction(id, body);
    
//     if (!result.success) {
//       return Response.json(
//         { 
//           error: result.message,
//           details: result.errors
//         },
//         { status: 400 }
//       );
//     }

//     return Response.json({
//       message: result.message,
//       assessment: result.assessment
//     });
//   } catch (error: any) {
//     console.error('❌ API Error updating assessment:', error);
    
//     if (error.message?.includes('unauthorized')) {
//       return Response.json(
//         { error: 'Unauthorized' },
//         { status: 403 }
//       );
//     }
    
//     return Response.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest, { params }: RouteParams) {
//   try {
//     // Check instructor role
//     await requireRole(['instructor', 'admin']);
    
//     const { id } = await params;
//     const result = await deleteAssessmentAction(id);
    
//     if (!result.success) {
//       return Response.json(
//         { error: result.message },
//         { status: 400 }
//       );
//     }

//     return Response.json({
//       message: result.message
//     });
//   } catch (error: any) {
//     console.error('❌ API Error deleting assessment:', error);
    
//     if (error.message?.includes('unauthorized')) {
//       return Response.json(
//         { error: 'Unauthorized' },
//         { status: 403 }
//       );
//     }
    
//     return Response.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }




















// // src/app/api/assessments/[id]/route.ts - CORRECTED
// import { NextRequest } from 'next/server';
// import { getSession } from '@/lib/auth/session';
// import { sql } from '@/lib/db';

// interface RouteParams {
//   params: Promise<{ id: string }>;
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//   console.log('🚀 API CALLED: GET /api/assessments/[id]');
  
//   try {
//     // 1. Get session
//     console.log('🔍 Getting session...');
//     const session = await getSession();
//     console.log('Session data:', {
//       hasSession: !!session,
//       userId: session?.userId,
//       email: session?.email,  // FIXED: session.email, not session.user?.email
//       name: session?.name,     // FIXED: session.name, not session.user?.name
//       roles: session?.roles,
//       primaryRole: session?.primaryRole
//     });
    
//     if (!session || !session.userId) {
//       console.log('❌ No valid session found');
//       return Response.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }
    
//     // 2. Get params
//     const { id } = await params;
//     console.log('🔍 Assessment ID requested:', id);
    
//     // 3. Simple test query first
//     console.log('🔍 Testing database connection...');
//     const testQuery = await sql`SELECT NOW() as db_time`;
//     console.log('✅ Database connection OK:', testQuery[0].db_time);
    
//     // 4. Get assessment with course info
//     console.log('🔍 Querying assessment...');
//     const assessmentQuery = await sql`
//       SELECT 
//         a.*,
//         c.instructor_id,
//         c.title as course_title,
//         c.is_published as course_published
//       FROM assessments a
//       JOIN courses c ON a.course_id = c.id
//       WHERE a.id = ${id}
//       LIMIT 1
//     `;
    
//     console.log('🔍 Assessment query result length:', assessmentQuery.length);
    
//     if (assessmentQuery.length === 0) {
//       console.log('❌ Assessment not found in database');
//       return Response.json(
//         { error: 'Assessment not found' },
//         { status: 404 }
//       );
//     }
    
//     const assessment = assessmentQuery[0];
//     console.log('✅ Assessment found:', {
//       id: assessment.id,
//       title: assessment.title,
//       course_id: assessment.course_id,
//       instructor_id: assessment.instructor_id,
//       course_published: assessment.course_published
//     });
    
//     // 5. Check if user is instructor
//     const isInstructor = assessment.instructor_id === session.userId;
//     console.log('🔍 Is user instructor?', isInstructor, {
//       sessionUserId: session.userId,
//       assessmentInstructorId: assessment.instructor_id
//     });
    
//     if (isInstructor) {
//       console.log('👨‍🏫 User is instructor, returning full data');
//       const fullAssessment = await sql`
//         SELECT 
//           a.*,
//           c.title as course_title,
//           l.title as lesson_title,
//           COUNT(q.id) as question_count
//         FROM assessments a
//         JOIN courses c ON a.course_id = c.id
//         LEFT JOIN lessons l ON a.lesson_id = l.id
//         LEFT JOIN questions q ON a.id = q.assessment_id
//         WHERE a.id = ${id}
//         GROUP BY a.id, c.title, l.title
//         LIMIT 1
//       `;
      
//       console.log('✅ Instructor assessment data:', fullAssessment[0]);
//       return Response.json({
//         assessment: fullAssessment[0],
//         role: 'instructor'
//       });
//     }
    
//     // 6. For students, check enrollment
//     console.log('🔍 Checking enrollment for student...');
//     console.log('User ID:', session.userId);
//     console.log('Course ID:', assessment.course_id);
    
//     const enrollment = await sql`
//       SELECT id, status FROM enrollments 
//       WHERE user_id = ${session.userId} 
//         AND course_id = ${assessment.course_id}
//       LIMIT 1
//     `;
    
//     console.log('🔍 Enrollment query result:', enrollment);
//     console.log('🔍 Enrollment found?', enrollment.length > 0);
    
//     if (enrollment.length === 0) {
//       console.log('❌ No enrollment found for this user and course');
//       return Response.json(
//         { error: 'You are not enrolled in this course' },
//         { status: 403 }
//       );
//     }
    
//     console.log('✅ User is enrolled, status:', enrollment[0].status);
    
//     // 7. Check if course is published
//     if (!assessment.course_published) {
//       console.log('❌ Course is not published');
//       return Response.json(
//         { error: 'Course is not available' },
//         { status: 403 }
//       );
//     }
    
//     // 8. Get student assessment
//     console.log('🔍 Getting student assessment data...');
//     const studentAssessment = await sql`
//       SELECT 
//         a.*,
//         c.title as course_title,
//         l.title as lesson_title
//       FROM assessments a
//       JOIN courses c ON a.course_id = c.id
//       LEFT JOIN lessons l ON a.lesson_id = l.id
//       WHERE a.id = ${id}
//         AND (a.available_from IS NULL OR a.available_from <= NOW())
//         AND (a.available_until IS NULL OR a.available_until >= NOW())
//       LIMIT 1
//     `;
    
//     console.log('🔍 Student assessment query result length:', studentAssessment.length);
    
//     if (studentAssessment.length === 0) {
//       console.log('❌ Student assessment query returned empty (date restrictions?)');
//       return Response.json(
//         { error: 'Assessment not available' },
//         { status: 403 }
//       );
//     }
    
//     console.log('✅ Student assessment data retrieved successfully');
//     console.log('✅ API SUCCESS - Returning assessment data');
    
//     return Response.json({
//       assessment: studentAssessment[0],
//       role: 'student'
//     });
    
//   } catch (error: any) {
//     console.error('💥💥💥 API ERROR DETAILS 💥💥💥');
//     console.error('Error message:', error.message);
//     console.error('Error stack:', error.stack);
//     console.error('Error name:', error.name);
    
//     // Check for specific SQL errors
//     if (error.message.includes('column') && error.message.includes('does not exist')) {
//       console.error('❌ SQL ERROR: Column does not exist');
//       console.error('Full error:', error);
//     }
    
//     return Response.json(
//       { 
//         error: 'Internal server error',
//         debug: process.env.NODE_ENV === 'development' ? {
//           message: error.message,
//           hint: 'Check database schema and column names'
//         } : undefined
//       },
//       { status: 500 }
//     );
//   }
// }
























// src/app/api/assessments/[id]/route.ts - COMPLETE VERSION
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  console.log('🚀 API CALLED: GET /api/assessments/[id]');
  
  try {
    // 1. Get session
    console.log('🔍 Getting session...');
    const session = await getSession();
    console.log('Session data:', {
      hasSession: !!session,
      userId: session?.userId,
      email: session?.email,
      name: session?.name,
      roles: session?.roles,
      primaryRole: session?.primaryRole
    });
    
    if (!session || !session.userId) {
      console.log('❌ No valid session found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // 2. Get params
    const { id } = await params;
    console.log('🔍 Assessment ID requested:', id);
    
    // 3. Simple test query first
    console.log('🔍 Testing database connection...');
    const testQuery = await sql`SELECT NOW() as db_time`;
    console.log('✅ Database connection OK:', testQuery[0].db_time);
    
    // 4. Get assessment with course info
    console.log('🔍 Querying assessment...');
    const assessmentQuery = await sql`
      SELECT 
        a.*,
        c.instructor_id,
        c.title as course_title,
        c.is_published as course_published
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;
    
    console.log('🔍 Assessment query result length:', assessmentQuery.length);
    
    if (assessmentQuery.length === 0) {
      console.log('❌ Assessment not found in database');
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }
    
    const assessment = assessmentQuery[0];
    console.log('✅ Assessment found:', {
      id: assessment.id,
      title: assessment.title,
      course_id: assessment.course_id,
      instructor_id: assessment.instructor_id,
      course_published: assessment.course_published
    });
    
    // 5. Check if user is instructor
    const isInstructor = assessment.instructor_id === session.userId;
    console.log('🔍 Is user instructor?', isInstructor, {
      sessionUserId: session.userId,
      assessmentInstructorId: assessment.instructor_id
    });
    
    if (isInstructor) {
      console.log('👨‍🏫 User is instructor, returning full data');
      const fullAssessment = await sql`
        SELECT 
          a.*,
          c.title as course_title,
          l.title as lesson_title,
          COUNT(q.id) as question_count
        FROM assessments a
        JOIN courses c ON a.course_id = c.id
        LEFT JOIN lessons l ON a.lesson_id = l.id
        LEFT JOIN questions q ON a.id = q.assessment_id
        WHERE a.id = ${id}
        GROUP BY a.id, c.title, l.title
        LIMIT 1
      `;
      
      console.log('✅ Instructor assessment data:', fullAssessment[0]);
      return NextResponse.json({
        success: true,
        assessment: fullAssessment[0],
        role: 'instructor'
      });
    }
    
    // 6. For students, check enrollment
    console.log('🔍 Checking enrollment for student...');
    console.log('User ID:', session.userId);
    console.log('Course ID:', assessment.course_id);
    
    const enrollment = await sql`
      SELECT id, status FROM enrollments 
      WHERE user_id = ${session.userId} 
        AND course_id = ${assessment.course_id}
      LIMIT 1
    `;
    
    console.log('🔍 Enrollment query result:', enrollment);
    console.log('🔍 Enrollment found?', enrollment.length > 0);
    
    if (enrollment.length === 0) {
      console.log('❌ No enrollment found for this user and course');
      return NextResponse.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }
    
    console.log('✅ User is enrolled, status:', enrollment[0].status);
    
    // 7. Check if course is published
    if (!assessment.course_published) {
      console.log('❌ Course is not published');
      return NextResponse.json(
        { error: 'Course is not available' },
        { status: 403 }
      );
    }
    
    // 8. Get student assessment
    console.log('🔍 Getting student assessment data...');
    const studentAssessment = await sql`
      SELECT 
        a.*,
        c.title as course_title,
        l.title as lesson_title
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      LEFT JOIN lessons l ON a.lesson_id = l.id
      WHERE a.id = ${id}
        AND (a.available_from IS NULL OR a.available_from <= NOW())
        AND (a.available_until IS NULL OR a.available_until >= NOW())
      LIMIT 1
    `;
    
    console.log('🔍 Student assessment query result length:', studentAssessment.length);
    
    if (studentAssessment.length === 0) {
      console.log('❌ Student assessment query returned empty (date restrictions?)');
      return NextResponse.json(
        { error: 'Assessment not available' },
        { status: 403 }
      );
    }
    
    console.log('✅ Student assessment data retrieved successfully');
    console.log('✅ API SUCCESS - Returning assessment data');
    
    return NextResponse.json({
      success: true,
      assessment: studentAssessment[0],
      role: 'student'
    });
    
  } catch (error: any) {
    console.error('💥💥💥 API ERROR DETAILS 💥💥💥');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    
    // Check for specific SQL errors
    if (error.message.includes('column') && error.message.includes('does not exist')) {
      console.error('❌ SQL ERROR: Column does not exist');
      console.error('Full error:', error);
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        debug: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          hint: 'Check database schema and column names'
        } : undefined
      },
      { status: 500 }
    );
  }
}

// ADD THIS PUT HANDLER FOR EDITING ASSESSMENTS
export async function PUT(request: NextRequest, { params }: RouteParams) {
  console.log('🚀 API CALLED: PUT /api/assessments/[id]');
  
  try {
    // 1. Get session
    console.log('🔍 Getting session...');
    const session = await getSession();
    
    if (!session || !session.userId) {
      console.log('❌ No valid session found');
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized' 
        },
        { status: 401 }
      );
    }
    
    // 2. Get params and request body
    const { id } = await params;
    console.log('🔍 Assessment ID to update:', id);
    
    let requestData;
    try {
      requestData = await request.json();
      console.log('📦 Request body:', requestData);
    } catch (error) {
      console.log('❌ Failed to parse request body:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid JSON in request body' 
        },
        { status: 400 }
      );
    }
    
    // 3. Check if assessment exists and user owns it
    console.log('🔍 Checking assessment ownership...');
    const assessmentCheck = await sql`
      SELECT a.*, c.instructor_id
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;
    
    if (assessmentCheck.length === 0) {
      console.log('❌ Assessment not found');
      return NextResponse.json(
        { 
          success: false,
          error: 'Assessment not found' 
        },
        { status: 404 }
      );
    }
    
    const assessment = assessmentCheck[0];
    
    // Check if user is the instructor of the course
    if (assessment.instructor_id !== session.userId) {
      console.log('❌ User is not the instructor of this course');
      console.log('Session userId:', session.userId);
      console.log('Course instructor_id:', assessment.instructor_id);
      return NextResponse.json(
        { 
          success: false,
          error: 'You do not have permission to update this assessment' 
        },
        { status: 403 }
      );
    }
    
    // 4. Validate required fields
    if (!requestData.title || !requestData.title.trim()) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Assessment title is required' 
        },
        { status: 400 }
      );
    }
    
    if (!requestData.course_id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Course ID is required' 
        },
        { status: 400 }
      );
    }
    
    // 5. Prepare update data
    const updateData = {
      title: requestData.title.trim(),
      description: requestData.description?.trim() || null,
      instructions: requestData.instructions?.trim() || null,
      type: requestData.type || 'quiz',
      difficulty: requestData.difficulty || 'medium',
      passing_score: requestData.passing_score || 70,
      max_attempts: requestData.max_attempts || 1,
      time_limit: requestData.time_limit || null,
      shuffle_questions: requestData.shuffle_questions || false,
      show_correct_answers: requestData.show_correct_answers || true,
      show_results_immediately: requestData.show_results_immediately || true,
      require_passing: requestData.require_passing || false,
      points_per_question: requestData.points_per_question || 1,
      lesson_id: requestData.lesson_id || null,
      available_from: requestData.available_from || null,
      available_until: requestData.available_until || null,
      duration_minutes: requestData.duration_minutes || null,
      updated_at: new Date()
    };
    
    console.log('📝 Update data:', updateData);
    
    // 6. Update assessment in database
    console.log('🔍 Updating assessment in database...');
    const updatedAssessment = await sql`
      UPDATE assessments 
      SET 
        title = ${updateData.title},
        description = ${updateData.description},
        instructions = ${updateData.instructions},
        type = ${updateData.type},
        difficulty = ${updateData.difficulty},
        passing_score = ${updateData.passing_score},
        max_attempts = ${updateData.max_attempts},
        time_limit = ${updateData.time_limit},
        shuffle_questions = ${updateData.shuffle_questions},
        show_correct_answers = ${updateData.show_correct_answers},
        show_results_immediately = ${updateData.show_results_immediately},
        require_passing = ${updateData.require_passing},
        points_per_question = ${updateData.points_per_question},
        lesson_id = ${updateData.lesson_id},
        available_from = ${updateData.available_from},
        available_until = ${updateData.available_until},
        duration_minutes = ${updateData.duration_minutes},
        updated_at = ${updateData.updated_at}
      WHERE id = ${id}
      RETURNING *
    `;
    
    console.log('✅ Assessment updated:', updatedAssessment[0]);
    
    // 7. Get full updated assessment with related data
    const fullUpdatedAssessment = await sql`
      SELECT 
        a.*,
        c.title as course_title,
        l.title as lesson_title,
        COUNT(q.id) as question_count
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      LEFT JOIN lessons l ON a.lesson_id = l.id
      LEFT JOIN questions q ON a.id = q.assessment_id
      WHERE a.id = ${id}
      GROUP BY a.id, c.title, l.title
      LIMIT 1
    `;
    
    console.log('✅ Full updated assessment:', fullUpdatedAssessment[0]);
    
    return NextResponse.json({
      success: true,
      message: 'Assessment updated successfully',
      assessment: fullUpdatedAssessment[0]
    });
    
  } catch (error: any) {
    console.error('💥💥💥 PUT API ERROR 💥💥💥');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Handle specific SQL errors
    if (error.message.includes('violates foreign key constraint')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid course or lesson reference' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update assessment',
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE handler if needed
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  console.log('🚀 API CALLED: DELETE /api/assessments/[id]');
  
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Check ownership
    const assessmentCheck = await sql`
      SELECT a.*, c.instructor_id
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;
    
    if (assessmentCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Assessment not found' },
        { status: 404 }
      );
    }
    
    const assessment = assessmentCheck[0];
    
    if (assessment.instructor_id !== session.userId) {
      return NextResponse.json(
        { success: false, error: 'You do not have permission to delete this assessment' },
        { status: 403 }
      );
    }
    
    // Delete assessment
    await sql`DELETE FROM assessments WHERE id = ${id}`;
    
    return NextResponse.json({
      success: true,
      message: 'Assessment deleted successfully'
    });
    
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete assessment'
      },
      { status: 500 }
    );
  }
}