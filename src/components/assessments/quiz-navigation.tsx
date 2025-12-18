
// /src/components/assessments/quiz-navigation.tsx

'use client'

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Flag, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionStatus {
  id: string;
  order: number;
  answered: boolean;
  markedForReview: boolean;
  current: boolean;
}

interface QuizNavigationProps {
  questions: QuestionStatus[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  showSubmit?: boolean;
  disabled?: boolean;
  className?: string;
}

export function QuizNavigation({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  onPrevious,
  onNext,
  onSubmit,
  showSubmit = false,
  disabled = false,
  className
}: QuizNavigationProps) {
  const totalQuestions = questions.length;
  const answeredCount = questions.filter(q => q.answered).length;
  const markedCount = questions.filter(q => q.markedForReview).length;

  const getQuestionStatusIcon = (question: QuestionStatus) => {
    if (question.current) {
      return <Circle className="h-3 w-3 fill-current" />;
    }
    if (question.answered && question.markedForReview) {
      return <Flag className="h-3 w-3 text-amber-500" />;
    }
    if (question.answered) {
      return <CheckCircle2 className="h-3 w-3 text-green-500" />;
    }
    if (question.markedForReview) {
      return <Flag className="h-3 w-3 text-destructive" />;
    }
    return <Circle className="h-3 w-3 text-muted-foreground" />;
  };

  const getQuestionStatusClass = (question: QuestionStatus) => {
    if (question.current) {
      return "border-primary bg-primary text-primary-foreground";
    }
    if (question.answered && question.markedForReview) {
      return "border-amber-300 bg-amber-50 text-amber-800";
    }
    if (question.answered) {
      return "border-green-300 bg-green-50 text-green-800";
    }
    if (question.markedForReview) {
      return "border-destructive/30 bg-destructive/10 text-destructive";
    }
    return "border-border bg-card text-muted-foreground hover:bg-muted";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center p-3 rounded-lg bg-card border">
          <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
          <div className="text-muted-foreground">Total</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-card border">
          <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
          <div className="text-muted-foreground">Answered</div>
        </div>
        <div className="text-center p-3 rounded-lg bg-card border">
          <div className="text-2xl font-bold text-amber-600">{markedCount}</div>
          <div className="text-muted-foreground">Marked</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {answeredCount}/{totalQuestions} ({Math.round((answeredCount / totalQuestions) * 100)}%)
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Grid */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Questions</h4>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              disabled={disabled}
              className={cn(
                "relative flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                getQuestionStatusClass(question)
              )}
            >
              <div className="flex items-center justify-center w-6 h-6 mb-1">
                {getQuestionStatusIcon(question)}
              </div>
              <span className="text-xs font-medium">{question.order + 1}</span>
              
              {question.current && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0 || disabled}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {showSubmit ? (
            <Button
              onClick={onSubmit}
              disabled={disabled}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={currentQuestionIndex === totalQuestions - 1 || disabled}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-semibold mb-2">Legend</h4>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 text-muted-foreground" />
            <span>Unanswered</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-1">
            <Flag className="h-3 w-3 text-destructive" />
            <span>Marked</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-primary" />
            <span>Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}