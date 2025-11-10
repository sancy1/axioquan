

// /src/app/admin/test-email/page.tsx

'use client';

import { useState } from 'react';
import { testEmailConfig } from '@/lib/email/utils';

export default function TestEmailPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTest = async () => {
    setIsTesting(true);
    setResult(null);
    
    try {
      const testResult = await testEmailConfig();
      setResult(testResult);
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Email Configuration Test</h1>
      
      <button
        onClick={handleTest}
        disabled={isTesting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isTesting ? 'Testing...' : 'Test Email Configuration'}
      </button>

      {result && (
        <div className={`mt-4 p-4 rounded ${
          result.success ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'
        }`}>
          {result.message}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Current Email Configuration:</h2>
        <pre className="text-sm">
          SMTP_HOST: {process.env.SMTP_HOST || 'Not set'}{'\n'}
          SMTP_PORT: {process.env.SMTP_PORT || 'Not set'}{'\n'}
          SMTP_USER: {process.env.SMTP_USER ? '***' : 'Not set'}{'\n'}
          SMTP_FROM: {process.env.SMTP_FROM || 'Not set'}
        </pre>
      </div>
    </div>
  );
}