

// /types/assessment-attempts.ts

export interface UserAnswer {
  questionId: string;
  answer: string | string[] | number | null;
  timeSpent: number;
  markedForReview: boolean;
}

export interface AssessmentAttempt {
  id: string;
  user_id: string;
  assessment_id: string;
  course_id: string;
  enrollment_id: string;
  attempt_number: number;
  started_at: Date;
  submitted_at: Date | null;
  time_spent: number;
  time_remaining: number | null;
  score: number;
  max_score: number;
  percentage: number;
  passed: boolean;
  grade_letter: string;
  grading_status: 'pending' | 'graded' | 'in_progress' | 'needs_review';
  graded_by: string | null;
  graded_at: Date | null;
  grading_feedback: string | null;
  answers_json: UserAnswer[];
  question_breakdown: Array<{
    questionId: string;
    questionType: string;
    userAnswer: any;
    correctAnswer: any;
    points: number;
    score: number;
    isCorrect: boolean;
  }>;
  cheating_indicators: any;
  last_activity_at: Date;
  
  // Joined fields
  assessment_title?: string;
  course_title?: string;
  passing_score?: number;
  max_attempts?: number;
  time_limit?: number;
  show_correct_answers?: boolean;
  show_results_immediately?: boolean;
}

export interface CreateAttemptData {
  user_id: string;
  assessment_id: string;
}

export interface UpdateAttemptData {
  answers_json?: UserAnswer[];
  time_remaining?: number;
  time_spent?: number;
}