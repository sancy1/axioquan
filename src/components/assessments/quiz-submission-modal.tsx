
// /src/components/assessments/quiz-submission-modal.tsx

'use client'

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  totalQuestions: number;
  answeredQuestions: number;
  markedQuestions: number;
  timeRemaining?: number | null;
  isLoading?: boolean;
}

export function QuizSubmissionModal({
  isOpen,
  onClose,
  onSubmit,
  totalQuestions,
  answeredQuestions,
  markedQuestions,
  timeRemaining,
  isLoading = false
}: QuizSubmissionModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  const unansweredQuestions = totalQuestions - answeredQuestions;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const handleSubmit = () => {
    onSubmit();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Submit Quiz</DialogTitle>
          <DialogDescription>
            Review your quiz before submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Progress Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Answered</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {answeredQuestions}
              </div>
            </div>

            <div className="space-y-1 p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Unanswered</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">
                {unansweredQuestions}
              </div>
            </div>

            <div className="space-y-1 p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Marked</span>
              </div>
              <div className="text-2xl font-bold text-destructive">
                {markedQuestions}
              </div>
            </div>

            {timeRemaining !== null && (
              <div className="space-y-1 p-3 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Time Left</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor((timeRemaining || 0) / 60)}:{(timeRemaining || 0) % 60 < 10 ? '0' : ''}{(timeRemaining || 0) % 60}
                </div>
              </div>
            )}
          </div>

          {/* Warnings */}
          {unansweredQuestions > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    You have {unansweredQuestions} unanswered question{unansweredQuestions !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Make sure you've answered all questions before submitting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {markedQuestions > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    You have {markedQuestions} question{markedQuestions !== 1 ? 's' : ''} marked for review
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Consider reviewing marked questions before submitting.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="confirm-submit"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5"
              />
              <label htmlFor="confirm-submit" className="text-sm">
                <span className="font-medium">I confirm that I want to submit my quiz.</span>
                <p className="text-muted-foreground mt-1">
                  Once submitted, you cannot change your answers. Your attempt will be graded immediately.
                </p>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!confirmed || isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Submitting...
              </>
            ) : (
              'Submit Quiz'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}