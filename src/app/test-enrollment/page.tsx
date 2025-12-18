
// /src/app/test-enrollment/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function TestEnrollmentPage() {
  const [courseId, setCourseId] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testEnrollmentStatus = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/enrollment-status`);
      const data = await response.json();
      setEnrollmentStatus(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testDebugEndpoint = async () => {
    try {
      const response = await fetch('/api/debug/enrollment-test');
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Enrollment Debug Tool</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Course ID"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-2 mr-2"
        />
        <Button onClick={testEnrollmentStatus} className="mr-2">
          Test Enrollment Status
        </Button>
        <Button onClick={testDebugEndpoint}>
          Test Debug Endpoint
        </Button>
      </div>

      {enrollmentStatus && (
        <div className="mb-6 p-4 border">
          <h2 className="font-bold mb-2">Enrollment Status API Response:</h2>
          <pre className="bg-gray-100 p-2 overflow-auto">
            {JSON.stringify(enrollmentStatus, null, 2)}
          </pre>
        </div>
      )}

      {debugInfo && (
        <div className="p-4 border">
          <h2 className="font-bold mb-2">Debug Endpoint Response:</h2>
          <pre className="bg-gray-100 p-2 overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}