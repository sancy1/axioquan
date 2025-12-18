

// /lib/db/queries/assessment-attempts.ts

import { sql } from '../index';
import { AssessmentAttempt, CreateAttemptData, UpdateAttemptData, UserAnswer } from '@/types/assessment-attempts';

/**
 * Get assessment attempt by ID
 */
export async function getAssessmentAttemptById(attemptId: string): Promise<AssessmentAttempt | null> {
  try {
    const attempts = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.passing_score,
        a.max_attempts,
        a.time_limit,
        a.show_correct_answers,
        a.show_results_immediately,
        c.title as course_title
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      JOIN courses c ON aa.course_id = c.id
      WHERE aa.id = ${attemptId}
      LIMIT 1
    `;
    
    return attempts[0] as AssessmentAttempt || null;
  } catch (error) {
    console.error('❌ Error fetching assessment attempt by ID:', error);
    return null;
  }
}

/**
 * Get user's attempts for an assessment
 */
export async function getUserAssessmentAttempts(
  userId: string, 
  assessmentId: string
): Promise<AssessmentAttempt[]> {
  try {
    const attempts = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.passing_score,
        a.max_attempts,
        a.time_limit
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE aa.user_id = ${userId} AND aa.assessment_id = ${assessmentId}
      ORDER BY aa.attempt_number DESC
    `;
    
    return attempts as AssessmentAttempt[];
  } catch (error) {
    console.error('❌ Error fetching user assessment attempts:', error);
    return [];
  }
}

/**
 * Get active (in-progress) attempt for a user
 */
export async function getActiveAttempt(
  userId: string, 
  assessmentId: string
): Promise<AssessmentAttempt | null> {
  try {
    const attempts = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.passing_score,
        a.max_attempts,
        a.time_limit,
        a.show_correct_answers
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE aa.user_id = ${userId} 
        AND aa.assessment_id = ${assessmentId}
        AND aa.submitted_at IS NULL
        AND aa.grading_status = 'pending'
      ORDER BY aa.started_at DESC
      LIMIT 1
    `;
    
    return attempts[0] as AssessmentAttempt || null;
  } catch (error) {
    console.error('❌ Error fetching active attempt:', error);
    return null;
  }
}

/**
 * Get next attempt number for a user
 */
export async function getNextAttemptNumber(
  userId: string, 
  assessmentId: string
): Promise<number> {
  try {
    const result = await sql`
      SELECT COALESCE(MAX(attempt_number), 0) as max_attempt
      FROM assessment_attempts
      WHERE user_id = ${userId} AND assessment_id = ${assessmentId}
    `;
    
    return (result[0]?.max_attempt || 0) + 1;
  } catch (error) {
    console.error('❌ Error getting next attempt number:', error);
    return 1;
  }
}

/**
 * Create a new assessment attempt
 */
export async function createAssessmentAttempt(
  attemptData: CreateAttemptData
): Promise<{ 
  success: boolean; 
  message: string; 
  attempt?: AssessmentAttempt; 
  errors?: string[] 
}> {
  try {
    // Get assessment details
    const assessment = await sql`
      SELECT 
        id,
        title,
        passing_score,
        max_attempts,
        time_limit,
        total_points,
        course_id
      FROM assessments 
      WHERE id = ${attemptData.assessment_id} 
      LIMIT 1
    `;
    
    if (assessment.length === 0) {
      return {
        success: false,
        message: 'Assessment not found',
        errors: ['Assessment does not exist']
      };
    }

    // Get enrollment
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${attemptData.user_id} 
        AND course_id = ${assessment[0].course_id}
        AND status = 'active'
      LIMIT 1
    `;
    
    if (enrollment.length === 0) {
      return {
        success: false,
        message: 'Not enrolled',
        errors: ['User is not enrolled in this course']
      };
    }

    // Check attempt limit
    const attemptsCount = await sql`
      SELECT COUNT(*) as count
      FROM assessment_attempts
      WHERE user_id = ${attemptData.user_id} 
        AND assessment_id = ${attemptData.assessment_id}
        AND submitted_at IS NOT NULL
    `;
    
    const maxAttempts = assessment[0].max_attempts || 1;
    if (attemptsCount[0]?.count >= maxAttempts) {
      return {
        success: false,
        message: 'Attempt limit reached',
        errors: [`Maximum ${maxAttempts} attempt(s) allowed`]
      };
    }

    // Get next attempt number
    const attemptNumber = await getNextAttemptNumber(
      attemptData.user_id, 
      attemptData.assessment_id
    );

    // Calculate initial time remaining
    const timeLimit = assessment[0].time_limit;
    const timeRemaining = timeLimit ? timeLimit * 60 : null; // Convert minutes to seconds

    const newAttempt = await sql`
      INSERT INTO assessment_attempts (
        user_id,
        assessment_id,
        course_id,
        enrollment_id,
        attempt_number,
        started_at,
        time_remaining,
        max_score,
        grading_status
      ) VALUES (
        ${attemptData.user_id},
        ${attemptData.assessment_id},
        ${assessment[0].course_id},
        ${enrollment[0].id},
        ${attemptNumber},
        NOW(),
        ${timeRemaining},
        ${assessment[0].total_points || 0},
        'pending'
      )
      RETURNING *
    `;
    
    return {
      success: true,
      message: 'Assessment attempt started successfully',
      attempt: newAttempt[0] as AssessmentAttempt
    };
  } catch (error: any) {
    console.error('❌ Error creating assessment attempt:', error);
    return {
      success: false,
      message: 'Failed to start assessment attempt',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Update assessment attempt progress
 */
export async function updateAssessmentAttempt(
  attemptId: string, 
  attemptData: UpdateAttemptData
): Promise<{ 
  success: boolean; 
  message: string; 
  attempt?: AssessmentAttempt; 
  errors?: string[] 
}> {
  try {
    // Get current attempt
    const currentAttempt = await getAssessmentAttemptById(attemptId);
    if (!currentAttempt) {
      return {
        success: false,
        message: 'Attempt not found',
        errors: ['Assessment attempt not found']
      };
    }

    // Calculate time spent if time remaining is updated
    let timeSpent = attemptData.time_spent;
    if (attemptData.time_remaining !== undefined && currentAttempt.time_remaining !== null) {
      const initialTime = currentAttempt.time_remaining + (currentAttempt.time_spent || 0);
      timeSpent = initialTime - (attemptData.time_remaining || 0);
    }

    const updatedAttempt = await sql`
      UPDATE assessment_attempts 
      SET 
        answers_json = COALESCE(${JSON.stringify(attemptData.answers_json)}, answers_json),
        time_remaining = COALESCE(${attemptData.time_remaining}, time_remaining),
        time_spent = COALESCE(${timeSpent}, time_spent),
        last_activity_at = NOW()
      WHERE id = ${attemptId}
      RETURNING *
    `;
    
    if (updatedAttempt.length === 0) {
      return {
        success: false,
        message: 'Attempt not found',
        errors: ['Assessment attempt not found']
      };
    }
    
    return {
      success: true,
      message: 'Assessment attempt updated successfully',
      attempt: updatedAttempt[0] as AssessmentAttempt
    };
  } catch (error: any) {
    console.error('❌ Error updating assessment attempt:', error);
    return {
      success: false,
      message: 'Failed to update assessment attempt',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Submit assessment attempt
 */
export async function submitAssessmentAttempt(
  attemptId: string,
  answers: UserAnswer[],
  finalTimeRemaining?: number
): Promise<{ 
  success: boolean; 
  message: string; 
  attempt?: AssessmentAttempt; 
  errors?: string[] 
}> {
  try {
    // Get attempt with assessment details
    const attempt = await getAssessmentAttemptById(attemptId);
    if (!attempt) {
      return {
        success: false,
        message: 'Attempt not found',
        errors: ['Assessment attempt not found']
      };
    }

    // Get assessment questions for grading
    const questions = await sql`
      SELECT 
        id,
        question_type,
        correct_answer,
        options,
        points,
        possible_answers
      FROM questions 
      WHERE assessment_id = ${attempt.assessment_id}
      ORDER BY order_index
    `;

    let totalScore = 0;
    let maxScore = 0;
    const questionBreakdown: any[] = [];

    // Calculate scores
    questions.forEach((question: any) => {
      maxScore += question.points || 1;
      
      const userAnswer = answers.find(a => a.questionId === question.id);
      let score = 0;
      let isCorrect = false;

      if (userAnswer && question.question_type === 'multiple_choice') {
        const correctOption = question.options?.find((opt: any) => opt.correct);
        if (correctOption && userAnswer.answer === correctOption.text) {
          score = question.points || 1;
          isCorrect = true;
        }
      } else if (userAnswer && question.question_type === 'true_false') {
        if (userAnswer.answer === question.correct_answer) {
          score = question.points || 1;
          isCorrect = true;
        }
      } else if (userAnswer && question.question_type === 'short_answer') {
        const possibleAnswers = question.possible_answers || [question.correct_answer];
        const normalizedAnswer = (userAnswer.answer as string).toLowerCase().trim();
        if (possibleAnswers.some((ans: string) => 
          ans.toLowerCase().trim() === normalizedAnswer
        )) {
          score = question.points || 1;
          isCorrect = true;
        }
      }

      totalScore += score;
      questionBreakdown.push({
        questionId: question.id,
        questionType: question.question_type,
        userAnswer: userAnswer?.answer,
        correctAnswer: question.correct_answer,
        points: question.points || 1,
        score,
        isCorrect
      });
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    const passed = percentage >= (attempt.passing_score || 70);

    // Determine grade letter
    let gradeLetter = 'F';
    if (percentage >= 90) gradeLetter = 'A';
    else if (percentage >= 80) gradeLetter = 'B';
    else if (percentage >= 70) gradeLetter = 'C';
    else if (percentage >= 60) gradeLetter = 'D';

    // Calculate final time spent
    const finalTimeSpent = finalTimeRemaining !== undefined && attempt.time_remaining !== null
      ? (attempt.time_remaining + (attempt.time_spent || 0)) - finalTimeRemaining
      : attempt.time_spent || 0;

    const submittedAttempt = await sql`
      UPDATE assessment_attempts 
      SET 
        submitted_at = NOW(),
        answers_json = ${JSON.stringify(answers)},
        question_breakdown = ${JSON.stringify(questionBreakdown)},
        score = ${totalScore},
        max_score = ${maxScore},
        percentage = ${percentage},
        passed = ${passed},
        grade_letter = ${gradeLetter},
        time_remaining = ${finalTimeRemaining !== undefined ? finalTimeRemaining : attempt.time_remaining},
        time_spent = ${finalTimeSpent},
        grading_status = 'graded'
      WHERE id = ${attemptId}
      RETURNING *
    `;
    
    if (submittedAttempt.length === 0) {
      return {
        success: false,
        message: 'Attempt not found',
        errors: ['Assessment attempt not found']
      };
    }
    
    return {
      success: true,
      message: 'Assessment submitted successfully',
      attempt: submittedAttempt[0] as AssessmentAttempt
    };
  } catch (error: any) {
    console.error('❌ Error submitting assessment attempt:', error);
    return {
      success: false,
      message: 'Failed to submit assessment attempt',
      errors: [error.message || 'An unexpected error occurred']
    };
  }
}

/**
 * Get user's recent attempts for a course
 */
export async function getUserCourseAttempts(
  userId: string, 
  courseId: string,
  limit: number = 10
): Promise<AssessmentAttempt[]> {
  try {
    const attempts = await sql`
      SELECT 
        aa.*,
        a.title as assessment_title,
        a.type as assessment_type
      FROM assessment_attempts aa
      JOIN assessments a ON aa.assessment_id = a.id
      WHERE aa.user_id = ${userId} 
        AND aa.course_id = ${courseId}
        AND aa.submitted_at IS NOT NULL
      ORDER BY aa.submitted_at DESC
      LIMIT ${limit}
    `;
    
    return attempts as AssessmentAttempt[];
  } catch (error) {
    console.error('❌ Error fetching user course attempts:', error);
    return [];
  }
}

/**
 * Check if user can take assessment
 */
export async function canUserTakeAssessment(
  userId: string, 
  assessmentId: string
): Promise<{ 
  canTake: boolean; 
  reason?: string; 
  nextAttemptNumber?: number;
  maxAttempts?: number;
  usedAttempts?: number;
}> {
  try {
    // Get assessment
    const assessment = await sql`
      SELECT 
        id,
        max_attempts,
        available_from,
        available_until,
        course_id
      FROM assessments 
      WHERE id = ${assessmentId} 
      LIMIT 1
    `;
    
    if (assessment.length === 0) {
      return { canTake: false, reason: 'Assessment not found' };
    }

    // Check enrollment
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${userId} 
        AND course_id = ${assessment[0].course_id}
        AND status = 'active'
      LIMIT 1
    `;
    
    if (enrollment.length === 0) {
      return { canTake: false, reason: 'Not enrolled in course' };
    }

    // Check availability window
    const now = new Date();
    if (assessment[0].available_from && now < new Date(assessment[0].available_from)) {
      return { canTake: false, reason: 'Assessment not yet available' };
    }
    
    if (assessment[0].available_until && now > new Date(assessment[0].available_until)) {
      return { canTake: false, reason: 'Assessment deadline has passed' };
    }

    // Check attempt limits
    const attemptsCount = await sql`
      SELECT COUNT(*) as count
      FROM assessment_attempts
      WHERE user_id = ${userId} 
        AND assessment_id = ${assessmentId}
        AND submitted_at IS NOT NULL
    `;
    
    const maxAttempts = assessment[0].max_attempts || 1;
    const usedAttempts = attemptsCount[0]?.count || 0;
    
    if (usedAttempts >= maxAttempts) {
      return { 
        canTake: false, 
        reason: `Maximum ${maxAttempts} attempt(s) reached`,
        maxAttempts,
        usedAttempts
      };
    }

    // Check for active attempt
    const activeAttempt = await getActiveAttempt(userId, assessmentId);
    if (activeAttempt) {
      return { 
        canTake: true, 
        reason: 'Resume previous attempt',
        nextAttemptNumber: activeAttempt.attempt_number,
        maxAttempts,
        usedAttempts
      };
    }

    return { 
      canTake: true, 
      nextAttemptNumber: usedAttempts + 1,
      maxAttempts,
      usedAttempts
    };
  } catch (error) {
    console.error('❌ Error checking assessment access:', error);
    return { canTake: false, reason: 'Error checking access' };
  }
}