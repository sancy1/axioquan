
// /src/components/assessments/quiz-timer.tsx

'use client'

import { Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { useQuizTimer } from '@/hooks/use-quiz-timer';
import { cn } from '@/lib/utils';

interface QuizTimerProps {
  timeLimit: number | null; // in minutes
  initialTimeRemaining?: number | null; // in seconds
  onTimeUp?: () => void;
  onAutoSave?: () => void;
  className?: string;
  showIcon?: boolean;
  showWarning?: boolean;
}

export function QuizTimer({
  timeLimit,
  initialTimeRemaining = null,
  onTimeUp,
  onAutoSave,
  className,
  showIcon = true,
  showWarning = true
}: QuizTimerProps) {
  const initialSeconds = initialTimeRemaining !== null 
    ? initialTimeRemaining 
    : timeLimit ? timeLimit * 60 : null;

  const {
    formattedTime,
    isWarning,
    isCritical,
    isTimeUp
  } = useQuizTimer({
    initialTimeRemaining: initialSeconds,
    onTimeUp,
    onAutoSave,
    autoSaveInterval: 30000
  });

  if (timeLimit === null && initialTimeRemaining === null) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showIcon && <Clock className="h-4 w-4 text-muted-foreground" />}
        <span className="font-mono text-lg font-medium">No time limit</span>
      </div>
    );
  }

  const getTimerColor = () => {
    if (isTimeUp) return 'text-destructive';
    if (isCritical) return 'text-destructive animate-pulse';
    if (isWarning) return 'text-amber-500';
    return 'text-primary';
  };

  const getTimerBg = () => {
    if (isTimeUp) return 'bg-destructive/10';
    if (isCritical) return 'bg-destructive/10 animate-pulse';
    if (isWarning) return 'bg-amber-500/10';
    return 'bg-primary/10';
  };

  const getIcon = () => {
    if (isTimeUp) return <AlertCircle className="h-4 w-4" />;
    if (isCritical) return <AlertCircle className="h-4 w-4" />;
    if (isWarning) return <AlertTriangle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className={cn("p-1.5 rounded-full", getTimerBg())}>
          {getIcon()}
        </div>
      )}
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={cn("font-mono text-2xl font-bold", getTimerColor())}>
            {formattedTime}
          </span>
          {timeLimit !== null && (
            <span className="text-xs text-muted-foreground">
              / {timeLimit}:00
            </span>
          )}
        </div>
        
        {showWarning && (isWarning || isCritical) && (
          <p className={cn("text-xs font-medium mt-0.5", getTimerColor())}>
            {isCritical ? 'Time is almost up!' : 'Time is running low!'}
          </p>
        )}
      </div>
    </div>
  );
}