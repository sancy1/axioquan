
// /lib/db/queries/assessments.ts

import { sql } from '../index';
import { Assessment, CreateAssessmentData, UpdateAssessmentData } from '@/types/assessments';

/**
 * Get assessments for a course
 */
/**
 * Get assessments for a course
 */
export async function getCourseAssessments(courseId: string): Promise<Assessment[]> {
  try {
    const assessments = await sql`
      SELECT 
        a.*,
        c.title as course_title,
        l.title as lesson_title,
        c.instructor_id as course_instructor_id,
        COUNT(q.id) as question_count
      FROM assessments a
      LEFT JOIN courses c ON a.course_id = c.id
      LEFT JOIN lessons l ON a.lesson_id = l.id
      LEFT JOIN questions q ON a.id = q.assessment_id
      WHERE a.course_id = ${courseId}
      GROUP BY a.id, c.title, l.title, c.instructor_id
      ORDER BY a.created_at DESC
    `;
    
    return assessments as Assessment[];
  } catch (error) {
    console.error('❌ Error fetching course assessments:', error);
    return [];
  }
}

/**
 * Get assessments for an instructor
 */
export async function getInstructorAssessments(instructorId: string): Promise<Assessment[]> {
  try {
    const assessments = await sql`
      SELECT 
        a.*,
        c.title as course_title,
        l.title as lesson_title,
        COUNT(q.id) as question_count
      FROM assessments a
      JOIN courses c ON a.course_id = c.id AND c.instructor_id = ${instructorId}
      LEFT JOIN lessons l ON a.lesson_id = l.id
      LEFT JOIN questions q ON a.id = q.assessment_id
      GROUP BY a.id, c.title, l.title
      ORDER BY a.created_at DESC
    `;
    
    return assessments as Assessment[];
  } catch (error) {
    console.error('❌ Error fetching instructor assessments:', error);
    return [];
  }
}

/**
 * Get assessment by ID with course validation
 */
export async function getAssessmentById(assessmentId: string, instructorId?: string): Promise<Assessment | null> {
  try {
    let query = sql`
      SELECT 
        a.*,
        c.title as course_title,
        l.title as lesson_title,
        c.instructor_id,
        COUNT(q.id) as question_count
      FROM assessments a
      JOIN courses c ON a.course_id = c.id
      LEFT JOIN lessons l ON a.lesson_id = l.id
      LEFT JOIN questions q ON a.id = q.assessment_id
      WHERE a.id = ${assessmentId}
    `;
    
    if (instructorId) {
      query = sql`${query} AND c.instructor_id = ${instructorId}`;
    }
    
    query = sql`${query} GROUP BY a.id, c.title, l.title, c.instructor_id LIMIT 1`;
    
    const assessments = await query;
    
    if (assessments.length === 0) {
      return null;
    }
    
    return assessments[0] as Assessment;
  } catch (error) {
    console.error('❌ Error fetching assessment by ID:', error);
    return null;
  }
}

/**
 * Create a new assessment
 */
export async function createAssessment(assessmentData: CreateAssessmentData): Promise<{ 
  success: boolean; 
  message: string; 
  assessment?: Assessment; 
  errors?: string[] 
}> {
  try {
    // Validate course exists and instructor owns it
    const course = await sql`
      SELECT id, instructor_id FROM courses WHERE id = ${assessmentData.course_id} LIMIT 1
    `;
    
    if (course.length === 0) {
      return {
        success: false,
        message: 'Course not found',
        errors: ['Course does not exist']
      };
    }
    
    // If lesson_id is provided, validate it belongs to the course
    if (assessmentData.lesson_id) {
      const lesson = await sql`
        SELECT id FROM lessons 
        WHERE id = ${assessmentData.lesson_id} AND course_id = ${assessmentData.course_id} 
        LIMIT 1
      `;
      
      if (lesson.length === 0) {
        return {
          success: false,
          message: 'Lesson not found in course',
          errors: ['Lesson does not belong to the specified course']
        };
      }
    }
    
    const newAssessment = await sql`
      INSERT INTO assessments (
        lesson_id,
        course_id,
        title,
        description,
        instructions,
        type,
        difficulty,
        passing_score,
        max_attempts,
        time_limit,
        shuffle_questions,
        show_correct_answers,
        show_results_immediately,
        require_passing,
        points_per_question,
        total_points,
        available_from,
        available_until,
        duration_minutes
      ) VALUES (
        ${assessmentData.lesson_id || null},
        ${assessmentData.course_id},
        ${assessmentData.title},
        ${assessmentData.description || null},
        ${assessmentData.instructions || null},
        ${assessmentData.type || 'quiz'},
        ${assessmentData.difficulty || 'medium'},
        ${assessmentData.passing_score || 70},
        ${assessmentData.max_attempts || 1},
        ${assessmentData.time_limit || null},
        ${assessmentData.shuffle_questions || false},
        ${assessmentData.show_correct_answers || true},
        ${assessmentData.show_results_immediately || true},
        ${assessmentData.require_passing || false},
        ${assessmentData.points_per_question || 1},
        ${assessmentData.total_points || 0},
        ${assessmentData.available_from || null},
        ${assessmentData.available_until || null},
        ${assessmentData.duration_minutes || null}
      )
      RETURNING *
    `;
    
    return {
      success: true,
      message: 'Assessment created successfully',
      assessment: newAssessment[0] as Assessment
    };
  } catch (error: any) {
    console.error('❌ Error creating assessment:', error);
    return {
      success: false,
      message: 'Failed to create assessment',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Update assessment
 */
export async function updateAssessment(
  assessmentId: string, 
  assessmentData: UpdateAssessmentData
): Promise<{ 
  success: boolean; 
  message: string; 
  assessment?: Assessment; 
  errors?: string[] 
}> {
  try {
    const updatedAssessment = await sql`
      UPDATE assessments 
      SET 
        title = COALESCE(${assessmentData.title}, title),
        description = COALESCE(${assessmentData.description}, description),
        instructions = COALESCE(${assessmentData.instructions}, instructions),
        type = COALESCE(${assessmentData.type}, type),
        difficulty = COALESCE(${assessmentData.difficulty}, difficulty),
        passing_score = COALESCE(${assessmentData.passing_score}, passing_score),
        max_attempts = COALESCE(${assessmentData.max_attempts}, max_attempts),
        time_limit = COALESCE(${assessmentData.time_limit}, time_limit),
        shuffle_questions = COALESCE(${assessmentData.shuffle_questions}, shuffle_questions),
        show_correct_answers = COALESCE(${assessmentData.show_correct_answers}, show_correct_answers),
        show_results_immediately = COALESCE(${assessmentData.show_results_immediately}, show_results_immediately),
        require_passing = COALESCE(${assessmentData.require_passing}, require_passing),
        points_per_question = COALESCE(${assessmentData.points_per_question}, points_per_question),
        total_points = COALESCE(${assessmentData.total_points}, total_points),
        available_from = COALESCE(${assessmentData.available_from}, available_from),
        available_until = COALESCE(${assessmentData.available_until}, available_until),
        duration_minutes = COALESCE(${assessmentData.duration_minutes}, duration_minutes),
        updated_at = NOW()
      WHERE id = ${assessmentId}
      RETURNING *
    `;
    
    if (updatedAssessment.length === 0) {
      return {
        success: false,
        message: 'Assessment not found',
        errors: ['Assessment not found']
      };
    }
    
    return {
      success: true,
      message: 'Assessment updated successfully',
      assessment: updatedAssessment[0] as Assessment
    };
  } catch (error: any) {
    console.error('❌ Error updating assessment:', error);
    return {
      success: false,
      message: 'Failed to update assessment',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Delete assessment
 */
export async function deleteAssessment(assessmentId: string): Promise<{ 
  success: boolean; 
  message: string; 
  errors?: string[] 
}> {
  try {
    // Delete associated questions first
    await sql`DELETE FROM questions WHERE assessment_id = ${assessmentId}`;
    
    const result = await sql`
      DELETE FROM assessments WHERE id = ${assessmentId}
      RETURNING id
    `;
    
    if (result.length === 0) {
      return {
        success: false,
        message: 'Assessment not found',
        errors: ['Assessment not found']
      };
    }
    
    return {
      success: true,
      message: 'Assessment deleted successfully'
    };
  } catch (error: any) {
    console.error('❌ Error deleting assessment:', error);
    return {
      success: false,
      message: 'Failed to delete assessment',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Get lessons for a course (for dropdown selection)
 */
export async function getCourseLessons(courseId: string): Promise<Array<{ id: string; title: string; module_title: string }>> {
  try {
    const lessons = await sql`
      SELECT 
        l.id,
        l.title,
        m.title as module_title
      FROM lessons l
      JOIN modules m ON l.module_id = m.id
      WHERE l.course_id = ${courseId} AND l.is_published = true
      ORDER BY m.order_index, l.order_index
    `;
    
    return lessons as Array<{ id: string; title: string; module_title: string }>;
  } catch (error) {
    console.error('❌ Error fetching course lessons:', error);
    return [];
  }
}