
// /components/courses/unenroll-button.tsx
// Unenroll button component with confirmation dialog

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, XCircle, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UnenrollButtonProps {
  courseId: string;
  courseTitle: string;
  onUnenrollSuccess?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showIcon?: boolean;
}

export default function UnenrollButton({
  courseId,
  courseTitle,
  onUnenrollSuccess,
  variant = 'outline',
  size = 'sm',
  className = '',
  showIcon = true,
}: UnenrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUnenroll = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/student/courses/${courseId}/unenroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method: 'soft_delete' }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Successfully unenrolled',
          description: `You have been unenrolled from "${courseTitle}"`,
          variant: 'default',
        });

        // Close dialog
        setIsDialogOpen(false);
        
        // Call success callback if provided
        if (onUnenrollSuccess) {
          onUnenrollSuccess();
        } else {
          // Refresh the page to update course list
          window.location.reload();
        }
      } else {
        toast({
          title: 'Failed to unenroll',
          description: result.message || 'An error occurred',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      toast({
        title: 'Error',
        description: 'Failed to unenroll from course',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`gap-1.5 ${className} ${
            variant === 'destructive' ? 'hover:bg-red-700' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : showIcon ? (
            <LogOut className="h-4 w-4" />
          ) : null}
          <span>Unenroll</span>
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Confirm Unenrollment
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            <div className="space-y-3">
              <p className="font-medium text-foreground">
                Are you sure you want to unenroll from &quot;{courseTitle}&quot;?
              </p>
              
              <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
                <h4 className="font-semibold text-amber-800 text-sm mb-1">
                  What will happen:
                </h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Your progress will be lost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>Course will be removed from your dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>You can re-enroll anytime if the course is still available</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-sm text-muted-foreground pt-1">
                This action cannot be undone. Your progress and quiz results will be deleted.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUnenroll}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Yes, Unenroll'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}