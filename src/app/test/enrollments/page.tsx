
// /src/app/test/enrollments/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function TestEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/student/courses');
      if (response.ok) {
        const data = await response.json();
        console.log('All enrollments:', data);
        setEnrollments(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const testDebugEndpoint = async (courseId?: string) => {
    try {
      if (!courseId) {
        alert('Please enter a course ID');
        return;
      }
      const response = await fetch(`/api/courses/${courseId}/debug-enrollment`);
      const data = await response.json();
      console.log('Debug endpoint response:', data);
      setDebugInfo(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testEnrollmentStatus = async (courseId?: string) => {
    try {
      if (!courseId) {
        alert('Please enter a course ID');
        return;
      }
      const response = await fetch(`/api/courses/${courseId}/enrollment-status`);
      const data = await response.json();
      console.log('Enrollment status:', data);
      alert(`Enrollment status: ${data.isEnrolled ? 'ENROLLED' : 'NOT ENROLLED'}\n${JSON.stringify(data.debug, null, 2)}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Enrollment Debug Tool</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Current Enrollments</h2>
        {loading ? (
          <p>Loading enrollments...</p>
        ) : enrollments.length === 0 ? (
          <p className="text-gray-600">No enrollments found</p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((course) => (
              <div key={course.id} className="p-4 border rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{course.title}</h3>
                    <p className="text-sm text-gray-600">ID: {course.id}</p>
                    <p className="text-sm">Progress: {course.progress_percentage}%</p>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testEnrollmentStatus(course.id)}
                    >
                      Test Status
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testDebugEndpoint(course.id)}
                    >
                      Debug
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Manual Test</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Course ID to test"
            id="courseIdInput"
            className="border p-2 flex-1"
          />
          <Button onClick={() => {
            const input = document.getElementById('courseIdInput') as HTMLInputElement;
            testEnrollmentStatus(input.value);
          }}>
            Test Enrollment Status
          </Button>
          <Button variant="outline" onClick={() => {
            const input = document.getElementById('courseIdInput') as HTMLInputElement;
            testDebugEndpoint(input.value);
          }}>
            Debug Endpoint
          </Button>
        </div>
      </div>

      {debugInfo && (
        <div className="p-4 border rounded bg-blue-50">
          <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
          <pre className="bg-white p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 border rounded bg-yellow-50">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Check your enrollments above</li>
          <li>Find the course ID that shows as enrolled in UI but not in API</li>
          <li>Use the manual test to debug that specific course</li>
          <li>Check browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  );
}