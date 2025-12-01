
// /components/courses/course-enrollment.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';

interface CourseEnrollmentProps {
  courseId: string;
  courseSlug: string;
  priceCents: number;
}

export function CourseEnrollment({ courseId, courseSlug, priceCents }: CourseEnrollmentProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const router = useRouter();

  // Check enrollment status on component mount
  useEffect(() => {
    checkEnrollmentStatus();
  }, [courseId]);

  // Check if user is enrolled in the course
  const checkEnrollmentStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/courses/${courseId}/enrollment-status`);
      
      if (response.ok) {
        const data = await response.json();
        setIsEnrolled(data.isEnrolled);
      }
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle course enrollment
  const handleEnroll = async () => {
    try {
      setIsEnrolling(true);
      
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsEnrolled(true);
          // Refresh the page to update UI state
          router.refresh();
        }
      } else {
        console.error('Failed to enroll in course');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Handle start learning - redirect to learning portal
  const handleStartLearning = () => {
    router.push(`/courses/learn/${courseId}`);
  };

  if (isLoading) {
    return (
      <Button disabled className="w-full py-3 px-4 rounded-lg font-bold text-lg">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (isEnrolled) {
    return (
      <div className="space-y-3">
        <Button
          onClick={handleStartLearning}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition"
        >
          <Check className="w-5 h-5 mr-2" />
          Start Learning
        </Button>
        <p className="text-sm text-green-600 text-center">
          ✓ Successfully enrolled in this course
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleEnroll}
        disabled={isEnrolling}
        className="w-full py-3 px-4 bg-white text-gray-900 hover:bg-gray-100 rounded-lg font-bold text-lg transition"
      >
        {isEnrolling ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Enrolling...
          </>
        ) : (
          `Enroll Now ${priceCents === 0 ? 'Free' : `- $${(priceCents / 100).toFixed(2)}`}`
        )}
      </Button>
      
      {priceCents === 0 ? (
        <p className="text-xs text-gray-500 text-center">
          Free enrollment - start learning immediately
        </p>
      ) : (
        <p className="text-xs text-gray-500 text-center">
          30-day money-back guarantee
        </p>
      )}
    </div>
  );
}