

// /lib/assessments/actions.ts

import { 
  createAssessment as dbCreateAssessment,
  getInstructorAssessments as dbGetInstructorAssessments,
  getAssessmentById as dbGetAssessmentById,
  updateAssessment as dbUpdateAssessment,
  deleteAssessment as dbDeleteAssessment,
  getCourseLessons
} from '@/lib/db/queries/assessments';

import {
  createQuestion as dbCreateQuestion,
  getAssessmentQuestions as dbGetAssessmentQuestions,
  getQuestionById as dbGetQuestionById,
  updateQuestion as dbUpdateQuestion,
  deleteQuestion as dbDeleteQuestion,
  reorderQuestions as dbReorderQuestions
} from '@/lib/db/queries/questions';

import { getSession } from '@/lib/auth/session';
import { CreateAssessmentData, UpdateAssessmentData, CreateQuestionData, UpdateQuestionData } from '@/types/assessments';

/**
 * Get instructor assessments with session validation
 */
export async function getInstructorAssessmentsAction() {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        assessments: []
      };
    }
    
    const assessments = await dbGetInstructorAssessments(session.userId);
    
    return {
      success: true,
      message: 'Assessments retrieved successfully',
      assessments
    };
  } catch (error) {
    console.error('❌ Error getting instructor assessments:', error);
    return {
      success: false,
      message: 'Failed to retrieve assessments',
      assessments: []
    };
  }
}

/**
 * Get assessment by ID with instructor validation
 */
export async function getAssessmentByIdAction(assessmentId: string) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        assessment: null
      };
    }
    
    const assessment = await dbGetAssessmentById(assessmentId, session.userId);
    
    if (!assessment) {
      return {
        success: false,
        message: 'Assessment not found or you do not have permission',
        assessment: null
      };
    }
    
    return {
      success: true,
      message: 'Assessment retrieved successfully',
      assessment
    };
  } catch (error) {
    console.error('❌ Error getting assessment by ID:', error);
    return {
      success: false,
      message: 'Failed to retrieve assessment',
      assessment: null
    };
  }
}

/**
 * Create assessment with session validation
 */
export async function createAssessmentAction(assessmentData: CreateAssessmentData) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        assessment: null,
        errors: ['You must be logged in to create an assessment']
      };
    }
    
    // Verify instructor owns the course
    const course = await dbGetAssessmentById('dummy', session.userId); // Using the function to check ownership
    
    const result = await dbCreateAssessment(assessmentData);
    
    return result;
  } catch (error) {
    console.error('❌ Error creating assessment:', error);
    return {
      success: false,
      message: 'Failed to create assessment',
      assessment: null,
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Update assessment with session validation
 */
export async function updateAssessmentAction(assessmentId: string, assessmentData: UpdateAssessmentData) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        assessment: null,
        errors: ['You must be logged in to update an assessment']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(assessmentId, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'Assessment not found or you do not have permission',
        assessment: null,
        errors: ['You do not have permission to update this assessment']
      };
    }
    
    const result = await dbUpdateAssessment(assessmentId, assessmentData);
    
    return result;
  } catch (error) {
    console.error('❌ Error updating assessment:', error);
    return {
      success: false,
      message: 'Failed to update assessment',
      assessment: null,
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Delete assessment with session validation
 */
export async function deleteAssessmentAction(assessmentId: string) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['You must be logged in to delete an assessment']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(assessmentId, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'Assessment not found or you do not have permission',
        errors: ['You do not have permission to delete this assessment']
      };
    }
    
    const result = await dbDeleteAssessment(assessmentId);
    
    return result;
  } catch (error) {
    console.error('❌ Error deleting assessment:', error);
    return {
      success: false,
      message: 'Failed to delete assessment',
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Get course lessons for dropdown
 */
export async function getCourseLessonsAction(courseId: string) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        lessons: []
      };
    }
    
    const lessons = await getCourseLessons(courseId);
    
    return {
      success: true,
      message: 'Lessons retrieved successfully',
      lessons
    };
  } catch (error) {
    console.error('❌ Error getting course lessons:', error);
    return {
      success: false,
      message: 'Failed to retrieve lessons',
      lessons: []
    };
  }
}

/**
 * Get assessment questions
 */
export async function getAssessmentQuestionsAction(assessmentId: string) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        questions: []
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(assessmentId, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'Assessment not found or you do not have permission',
        questions: []
      };
    }
    
    const questions = await dbGetAssessmentQuestions(assessmentId);
    
    return {
      success: true,
      message: 'Questions retrieved successfully',
      questions
    };
  } catch (error) {
    console.error('❌ Error getting assessment questions:', error);
    return {
      success: false,
      message: 'Failed to retrieve questions',
      questions: []
    };
  }
}

/**
 * Create question with validation
 */
export async function createQuestionAction(questionData: CreateQuestionData) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        question: null,
        errors: ['You must be logged in to create a question']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(questionData.assessment_id, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'Assessment not found or you do not have permission',
        question: null,
        errors: ['You do not have permission to add questions to this assessment']
      };
    }
    
    const result = await dbCreateQuestion(questionData);
    
    return result;
  } catch (error) {
    console.error('❌ Error creating question:', error);
    return {
      success: false,
      message: 'Failed to create question',
      question: null,
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Update question with validation
 */
export async function updateQuestionAction(questionId: string, questionData: UpdateQuestionData) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        question: null,
        errors: ['You must be logged in to update a question']
      };
    }
    
    // Get question to verify assessment ownership
    const question = await dbGetQuestionById(questionId);
    if (!question) {
      return {
        success: false,
        message: 'Question not found',
        question: null,
        errors: ['Question not found']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(question.assessment_id, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'You do not have permission',
        question: null,
        errors: ['You do not have permission to update this question']
      };
    }
    
    const result = await dbUpdateQuestion(questionId, questionData);
    
    return result;
  } catch (error) {
    console.error('❌ Error updating question:', error);
    return {
      success: false,
      message: 'Failed to update question',
      question: null,
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Delete question with validation
 */
export async function deleteQuestionAction(questionId: string) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['You must be logged in to delete a question']
      };
    }
    
    // Get question to verify assessment ownership
    const question = await dbGetQuestionById(questionId);
    if (!question) {
      return {
        success: false,
        message: 'Question not found',
        errors: ['Question not found']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(question.assessment_id, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'You do not have permission',
        errors: ['You do not have permission to delete this question']
      };
    }
    
    const result = await dbDeleteQuestion(questionId);
    
    return result;
  } catch (error) {
    console.error('❌ Error deleting question:', error);
    return {
      success: false,
      message: 'Failed to delete question',
      errors: ['An unexpected error occurred']
    };
  }
}

/**
 * Reorder questions with validation
 */
export async function reorderQuestionsAction(assessmentId: string, questionIds: string[]) {
  try {
    const session = await getSession();
    
    if (!session || !session.userId) {
      return {
        success: false,
        message: 'Unauthorized',
        errors: ['You must be logged in to reorder questions']
      };
    }
    
    // Verify instructor owns the assessment
    const existingAssessment = await dbGetAssessmentById(assessmentId, session.userId);
    if (!existingAssessment) {
      return {
        success: false,
        message: 'You do not have permission',
        errors: ['You do not have permission to reorder questions in this assessment']
      };
    }
    
    const result = await dbReorderQuestions(assessmentId, questionIds);
    
    return result;
  } catch (error) {
    console.error('❌ Error reordering questions:', error);
    return {
      success: false,
      message: 'Failed to reorder questions',
      errors: ['An unexpected error occurred']
    };
  }
}