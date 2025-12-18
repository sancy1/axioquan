
// // /app/courses/quiz/[id]/page.tsx

// import { getSession } from '@/lib/auth/session'
// // import Sidebar from '@/components/dashboard/sidebar'
// import QuizPage from '@/components/courses/quiz-page'

// interface QuizCoursePageProps {
//   params: {
//     id: string
//   }
// }

// export default async function QuizCoursePage({ params }: QuizCoursePageProps) {
//   const session = await getSession()
  
//   if (!session || !session.userId) {
//     return (
//       <div className="flex min-h-screen bg-gray-50 items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
//           <p className="text-gray-600">Please log in to access this page.</p>
//         </div>
//       </div>
//     )
//   }

//   const user = {
//     id: session.userId,
//     name: 'Student User',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* <Sidebar user={user} /> */}
//       <QuizPage quizId={params.id} />
//     </div>
//   )
// }


















// // /app/courses/quiz/[id]/page.tsx

// interface QuizCoursePageProps {
//   params: {
//     id: string
//   }
// }

// export default async function QuizCoursePage({ params }: QuizCoursePageProps) {
//   console.log('Full params object:', params);
//   console.log('Quiz ID:', params?.id);
  
//   if (!params?.id) {
//     return (
//       <div className="flex min-h-screen bg-background items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Invalid Quiz URL</h1>
//           <p className="text-gray-600">No quiz ID provided in the URL</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-background items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-2xl font-bold mb-4">Quiz Debug Page</h1>
//         <p className="text-gray-600">Quiz ID: {params.id}</p>
//         <p className="text-sm text-gray-500 mt-2">The QuizPage component will load here once fixed</p>
//       </div>
//     </div>
//   )
// }




















// // src/app/courses/quiz/[id]/page.tsx
// import { getSession } from '@/lib/auth/session';
// import QuizPage from '@/components/courses/quiz-page';

// export default async function QuizCoursePage({ 
//   params 
// }: { 
//   params: Promise<{ id: string }> 
// }) {
//   // Await the params Promise
//   const { id } = await params;
//   const session = await getSession();
  
//   if (!session || !session.userId) {
//     return (
//       <div className="flex min-h-screen bg-gray-50 items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
//           <p className="text-gray-600">Please log in to access this page.</p>
//         </div>
//       </div>
//     );
//   }

//   const user = {
//     id: session.userId,
//     name: 'Student User',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   };

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* <Sidebar user={user} /> */}
//       <QuizPage quizId={id} />
//     </div>
//   );
// }
























// /src/app/courses/quiz/[id]/page.tsx - UPDATE TO REDIRECT PROPERLY
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getAssessmentById } from '@/lib/db/queries/assessments';

export default async function QuizCoursePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const session = await getSession();
  
  console.log('🔍 [QuizRedirect] Old quiz route accessed:', {
    assessmentId: id,
    hasSession: !!session?.userId
  });
  
  if (!session || !session.userId) {
    redirect('/login');
  }

  try {
    // Get assessment to find the courseId
    const assessment = await getAssessmentById(id);
    
    console.log('🔍 [QuizRedirect] Assessment found:', {
      hasAssessment: !!assessment,
      courseId: assessment?.course_id,
      title: assessment?.title
    });
    
    if (assessment && assessment.course_id) {
      // Redirect to the correct URL with courseId
      const newUrl = `/courses/learn/${assessment.course_id}/quiz/${id}`;
      console.log('🔄 [QuizRedirect] Redirecting to:', newUrl);
      redirect(newUrl);
    } else {
      console.error('❌ [QuizRedirect] No assessment or courseId found');
      redirect('/dashboard/my-courses');
    }
  } catch (error) {
    console.error('❌ [QuizRedirect] Error:', error);
    redirect('/dashboard/my-courses');
  }
}