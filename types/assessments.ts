
// /types/assessments.ts

export interface Assessment {
  id: string;
  lesson_id: string | null;
  course_id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  type: 'quiz' | 'test' | 'exam' | 'assignment' | 'project' | 'practice';
  difficulty: string;
  passing_score: number;
  max_attempts: number;
  time_limit: number | null;
  shuffle_questions: boolean;
  show_correct_answers: boolean;
  show_results_immediately: boolean;
  require_passing: boolean;
  points_per_question: number;
  total_points: number;
  available_from: Date | null;
  available_until: Date | null;
  duration_minutes: number | null;
  created_at: Date;
  updated_at: Date;
  
  // Joined fields
  course_title?: string;
  lesson_title?: string;
  question_count?: number;
}

export interface Question {
  id: string;
  assessment_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
  options: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
  }> | null;
  correct_answer: string | null;
  possible_answers: string[] | null;
  explanation: string | null;
  hints: string[] | null;
  points: number;
  image_url: string | null;
  video_url: string | null;
  order_index: number;
  difficulty: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateAssessmentData {
  lesson_id?: string;
  course_id: string;
  title: string;
  description?: string;
  instructions?: string;
  type?: 'quiz' | 'test' | 'exam' | 'assignment' | 'project' | 'practice';
  difficulty?: string;
  passing_score?: number;
  max_attempts?: number;
  time_limit?: number;
  shuffle_questions?: boolean;
  show_correct_answers?: boolean;
  show_results_immediately?: boolean;
  require_passing?: boolean;
  points_per_question?: number;
  total_points?: number;
  available_from?: Date;
  available_until?: Date;
  duration_minutes?: number;
}

export interface UpdateAssessmentData {
  title?: string;
  description?: string;
  instructions?: string;
  type?: 'quiz' | 'test' | 'exam' | 'assignment' | 'project' | 'practice';
  difficulty?: string;
  passing_score?: number;
  max_attempts?: number;
  time_limit?: number;
  shuffle_questions?: boolean;
  show_correct_answers?: boolean;
  show_results_immediately?: boolean;
  require_passing?: boolean;
  points_per_question?: number;
  total_points?: number;
  available_from?: Date;
  available_until?: Date;
  duration_minutes?: number;
}

export interface CreateQuestionData {
  assessment_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
  options?: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
  }>;
  correct_answer?: string;
  possible_answers?: string[];
  explanation?: string;
  hints?: string[];
  points?: number;
  image_url?: string;
  video_url?: string;
  order_index?: number;
  difficulty?: string;
}

export interface UpdateQuestionData {
  question_text?: string;
  question_type?: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
  options?: Array<{
    text: string;
    correct: boolean;
    explanation?: string;
  }>;
  correct_answer?: string;
  possible_answers?: string[];
  explanation?: string;
  hints?: string[];
  points?: number;
  image_url?: string;
  video_url?: string;
  order_index?: number;
  difficulty?: string;
}