
// /src/app/(auth)/reset-password/page.tsx

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">
              {token ? 'Set new password' : 'Check your email'}
            </CardTitle>
            <CardDescription>
              {token 
                ? "Enter your new password below" 
                : "Check your email for the reset link"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="text-blue-600 hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}