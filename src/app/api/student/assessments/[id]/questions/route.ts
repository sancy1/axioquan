

// src/app/api/student/assessments/[id]/questions/route.ts

import { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  console.log('🚀 Student Questions API called');
  
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      console.log('❌ No session');
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await params;
    console.log('🔍 Assessment ID:', id);
    
    // 1. Get assessment info
    console.log('🔍 Getting assessment info...');
    const assessmentQuery = await sql`
      SELECT 
        a.*,
        c.is_published as course_published,
        a.show_correct_answers
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      WHERE a.id = ${id}
      LIMIT 1
    `;
    
    if (assessmentQuery.length === 0) {
      console.log('❌ Assessment not found');
      return Response.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }
    
    const assessment = assessmentQuery[0];
    console.log('✅ Assessment found, show_correct_answers:', assessment.show_correct_answers);
    
    // 2. Check enrollment
    console.log('🔍 Checking enrollment...');
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${session.userId} 
        AND course_id = ${assessment.course_id}
      LIMIT 1
    `;
    
    if (enrollment.length === 0) {
      console.log('❌ User not enrolled');
      return Response.json(
        { error: 'You are not enrolled in this course' },
        { status: 403 }
      );
    }
    
    console.log('✅ User is enrolled');
    
    // 3. Get questions
    console.log('🔍 Getting questions...');
    let questions;
    
    if (assessment.show_correct_answers) {
      // Include correct answers
      questions = await sql`
        SELECT * FROM questions 
        WHERE assessment_id = ${id}
        ORDER BY order_index
      `;
    } else {
      // Don't include correct answers in options
      questions = await sql`
        SELECT 
          id,
          assessment_id,
          question_text,
          question_type,
          points,
          image_url,
          video_url,
          explanation,
          hints,
          order_index,
          created_at,
          updated_at
        FROM questions 
        WHERE assessment_id = ${id}
        ORDER BY order_index
      `;
    }
    
    console.log(`✅ Found ${questions.length} questions`);
    console.log('Sample question:', questions[0]);
    
    return Response.json({
      questions: questions || []
    });
    
  } catch (error: any) {
    console.error('💥 Student Questions API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}