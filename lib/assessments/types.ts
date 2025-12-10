

// /lib/assessments/types.ts

export interface AssessmentFormData {
  title: string;
  description: string;
  instructions: string;
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
  available_from: string;
  available_until: string;
  duration_minutes: number | null;
  lesson_id: string;
  course_id: string;
}

export interface QuestionFormData {
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
  options: Array<{
    text: string;
    correct: boolean;
    explanation: string;
  }>;
  correct_answer: string;
  possible_answers: string[];
  explanation: string;
  hints: string[];
  points: number;
  image_url: string;
  video_url: string;
  order_index: number;
  difficulty: string;
}

export interface Option {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
}

export interface ValidationResult {
  success: boolean;
  message?: string;
  errors?: string[];
}