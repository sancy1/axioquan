
// /src/app/dashboard/instructor/quizzes/[id]/analytics/page.tsx

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getAssessmentById } from '@/lib/db/queries/assessments';
import { checkInstructorAccess } from '@/lib/auth/utils';
import { InstructorQuizAnalytics } from '@/components/dashboard/instructor-quiz-analytics';

interface AnalyticsPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    range?: string;
  }>;
}

export default async function QuizAnalyticsPage({ params, searchParams }: AnalyticsPageProps) {
  const { id } = await params;
  const { range } = await searchParams;
  
  const session = await getSession();
  
  if (!session || !session.userId) {
    redirect('/login');
  }

  // Verify instructor access
  const assessment = await getAssessmentById(id);
  if (!assessment) {
    redirect('/dashboard/instructor/quizzes');
  }

  const hasAccess = await checkInstructorAccess(session.userId, assessment.course_id);
  if (!hasAccess) {
    redirect('/dashboard/instructor/quizzes');
  }

  return (
    <div className="container max-w-7xl py-6">
      <InstructorQuizAnalytics 
        assessmentId={id}
        courseId={assessment.course_id}
      />
    </div>
  );
}