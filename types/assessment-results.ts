
// /types/assessment-results.ts

export interface QuizAnalytics {
  overview: {
    averageScore: number;
    totalStudents: number;
    studentsTaken: number;
    participationRate: number;
    passRate: number;
    averageAttempts: number;
    totalAttempts: number;
  };
  scoreDistribution: {
    '90-100': number;
    '80-89': number;
    '70-79': number;
    '60-69': number;
    '0-59': number;
  };
  studentPerformance: Array<{
    studentId: string;
    studentName: string;
    email: string;
    score: number;
    grade: string;
    attempts: number;
    maxAttempts: number;
    timeSpent: number;
    lastAttemptDate: string;
    certificateEligible: boolean;
    status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
    progress: number;
  }>;
  questionAnalysis: Array<{
    questionId: string;
    questionText: string;
    questionType: string;
    correctRate: number;
    averageTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  }>;
  timeSeries: Array<{
    date: string;
    averageScore: number;
    attempts: number;
    newStudents: number;
  }>;
  certificateSummary: {
    eligible: number;
    inProgress: number;
    notEligible: number;
    issued: number;
    total: number;
  };
}

export interface StudentQuizAnalytics {
  overallScore: number;
  averageScore: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  certificatesEligible: number;
  performanceTrend: Array<{
    date: string;
    score: number;
    quizTitle: string;
  }>;
  certificateProgress: Array<{
    courseId: string;
    courseTitle: string;
    currentScore: number;
    requiredScore: number;
    attemptsUsed: number;
    maxAttempts: number;
    status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
  }>;
}

export interface CertificateEligibility {
  isEligible: boolean;
  score: number;
  requiredScore: number;
  attemptsUsed: number;
  maxAttempts: number;
  completedAt: Date | null;
  certificateId: string | null;
  status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
  progress: number;
}

export interface ExportData {
  format: 'csv' | 'pdf' | 'json';
  data: any;
  filename: string;
  generatedAt: Date;
}