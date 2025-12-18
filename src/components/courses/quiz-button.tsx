
// // components/courses/quiz-button.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { AlertTriangle, Loader2, CheckCircle } from 'lucide-react';

// interface QuizButtonProps {
//   courseId: string;
//   courseTitle: string;
//   isCompleted: boolean;
// }

// export default function QuizButton({ courseId, courseTitle, isCompleted }: QuizButtonProps) {
//   const [assessmentId, setAssessmentId] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [assessmentData, setAssessmentData] = useState<any>(null);

//   useEffect(() => {
//     async function fetchAssessmentId() {
//       try {
//         console.log('🔍 Fetching assessment for course:', courseId);
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch(`/api/courses/${courseId}/assessment`);
        
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.log('❌ API Error:', errorData);
          
//           if (response.status === 403) {
//             setError('Not enrolled in this course');
//           } else if (response.status === 404) {
//             setError('available');
//           } else {
//             setError(errorData.error || 'Failed to load quiz');
//           }
          
//           setAssessmentId(null);
//           return;
//         }
        
//         const data = await response.json();
//         console.log('✅ Assessment data:', data);
        
//         if (data.hasAssessment) {
//           setAssessmentId(data.assessmentId);
//           setAssessmentData(data);
//         } else {
//           setError('available');
//           setAssessmentId(null);
//         }
//       } catch (error: any) {
//         console.error('💥 Error fetching assessment:', error);
//         setError('Failed to load quiz');
//         setAssessmentId(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAssessmentId();
//   }, [courseId]);

//   if (loading) {
//     return (
//       <button 
//         disabled 
//         className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
//       >
//         <Loader2 className="h-4 w-4 animate-spin" />
//         Loading Quiz...
//       </button>
//     );
//   }

//   if (error) {
//     return (
//       <button 
//         disabled 
//         className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
//         title={error}
//       >
//         <AlertTriangle className="h-4 w-4" />
//         No Quiz
//       </button>
//     );
//   }

//   if (!assessmentId) {
//     return (
//       <button 
//         disabled 
//         className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed"
//       >
//         Available
//       </button>
//     );
//   }

//   return (
//     <Link href={`/courses/quiz/${assessmentId}`}>
//       <button 
//         className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 group"
//         title={`Take quiz: ${assessmentData?.assessmentTitle || 'Course Quiz'}`}
//       >
//         <CheckCircle className="h-4 w-4 text-green-600 group-hover:text-green-700" />
//         Take Quiz
//       </button>
//     </Link>
//   );
// }























// /src/components/courses/quiz-button.tsx - FIXED VERSION
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Loader2, CheckCircle, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface QuizButtonProps {
  courseId: string;
  courseTitle: string;
  isCompleted: boolean;
}

export default function QuizButton({ courseId, courseTitle, isCompleted }: QuizButtonProps) {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    async function fetchAssessmentId() {
      try {
        console.log('🔍 [QuizButton] Fetching assessment for course:', {
          courseId,
          courseTitle,
          isCompleted
        });
        
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/courses/${courseId}/assessment`);
        
        console.log('🔍 [QuizButton] API Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ [QuizButton] API Error response:', errorText);
          
          let errorMessage = 'Failed to load quiz';
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch {
            // Not JSON
          }
          
          if (response.status === 403) {
            setError('Not enrolled in this course');
          } else if (response.status === 404) {
            setError('available');
          } else {
            setError(errorMessage);
          }
          
          setAssessmentId(null);
          return;
        }
        
        const data = await response.json();
        console.log('✅ [QuizButton] Assessment data:', data);
        
        if (data.hasAssessment && data.assessmentId) {
          setAssessmentId(data.assessmentId);
          setAssessmentData(data);
          console.log('✅ [QuizButton] Quiz found:', {
            assessmentId: data.assessmentId,
            assessmentTitle: data.assessmentTitle,
            courseId // Keep this for debugging
          });
        } else {
          setError('available');
          setAssessmentId(null);
        }
      } catch (error: any) {
        console.error('💥 [QuizButton] Error fetching assessment:', error);
        setError('Failed to load quiz: ' + error.message);
        setAssessmentId(null);
      } finally {
        setLoading(false);
      }
    }

    if (courseId && courseId !== 'undefined') {
      fetchAssessmentId();
    } else {
      console.error('❌ [QuizButton] Invalid courseId:', courseId);
      setError('Invalid course ID');
      setLoading(false);
    }
  }, [courseId]);

  if (loading) {
    return (
      <button 
        disabled 
        className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading Quiz...
      </button>
    );
  }

  if (error) {
    return (
      <button 
        disabled 
        className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
        title={error}
      >
        <AlertTriangle className="h-4 w-4" />
        No Quiz
        <span className="text-xs text-gray-500 ml-1">({error})</span>
      </button>
    );
  }

  if (!assessmentId) {
    return (
      <button 
        disabled 
        className="w-full border border-gray-300 text-gray-400 px-4 py-2.5 rounded-lg font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
      >
        <FileText className="h-4 w-4" />
        Available
      </button>
    );
  }

  // FIXED: Use the correct URL format with courseId
  const quizUrl = `/courses/learn/${courseId}/quiz/${assessmentId}`;
  
  console.log('📍 [QuizButton] Generated quiz URL:', quizUrl);

  return (
    <Link href={quizUrl}>
      <button 
        className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2 group"
        title={`Take quiz: ${assessmentData?.assessmentTitle || 'Course Quiz'}`}
        onClick={() => {
          console.log('🎯 [QuizButton] Navigating to:', {
            quizUrl,
            courseId,
            assessmentId,
            hasCourseId: !!courseId && courseId !== 'undefined'
          });
        }}
      >
        <CheckCircle className="h-4 w-4 text-green-600 group-hover:text-green-700" />
        {isCompleted ? 'Retake Quiz' : 'Take Quiz'}
      </button>
    </Link>
  );
}