
// /components/courses/unenroll-debug-button.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, Bug } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DebugUnenrollButtonProps {
  courseId: string;
  courseTitle: string;
  onSuccess?: () => void;
}

export default function DebugUnenrollButton({
  courseId,
  courseTitle,
  onSuccess,
}: DebugUnenrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUnenroll = async () => {
    if (!confirm(`Unenroll from "${courseTitle}"?`)) return;

    setIsLoading(true);
    
    console.group('=== UNENROLL DEBUG INFO ===');
    console.log('Course ID:', courseId);
    console.log('Course Title:', courseTitle);
    
    try {
      // Test if API endpoint exists
      console.log('Testing API endpoint...');
      const testResponse = await fetch(`/api/student/courses/${courseId}/unenroll`);
      console.log('Test response status:', testResponse.status);
      
      // Make the actual request
      console.log('Making POST request...');
      const response = await fetch(`/api/student/courses/${courseId}/unenroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          method: 'soft_delete',
          debug: true 
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const result = await response.json();
      console.log('API Response:', result);

      if (result.success) {
        console.log('✅ Unenrollment successful!');
        toast({
          title: 'Successfully unenrolled',
          description: `Unenrolled from "${courseTitle}"`,
          variant: 'default',
        });

        if (onSuccess) {
          onSuccess();
        } else {
          setTimeout(() => window.location.reload(), 1000);
        }
      } else {
        console.error('❌ Unenrollment failed:', result);
        toast({
          title: 'Failed to unenroll',
          description: result.message || 'Unknown error',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('🚨 Network error:', error);
      toast({
        title: 'Network Error',
        description: 'Failed to connect. Check console for details.',
        variant: 'destructive',
      });
    } finally {
      console.groupEnd();
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleUnenroll}
      disabled={isLoading}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-1" />
      ) : (
        <>
          {/* <Bug className="h-4 w-4 mr-1" /> */}
          <Trash2 className="h-4 w-4 mr-1" />
        </>
      )}
      Unenroll
    </Button>
  );
}