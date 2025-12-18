
// // /components/curriculum/lesson-card.tsx

// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Edit, Trash2, GripVertical, Play, FileText, Code, Mic } from 'lucide-react';
// import { Lesson } from '@/lib/db/queries/curriculum';

// interface LessonCardProps {
//   lesson: Lesson;
//   order: number;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export function LessonCard({ lesson, order, onEdit, onDelete }: LessonCardProps) {
//   const getLessonIcon = () => {
//     switch (lesson.lesson_type) {
//       case 'video': return <Play className="h-4 w-4" />;
//       case 'text': return <FileText className="h-4 w-4" />;
//       case 'document': return <FileText className="h-4 w-4" />;
//       case 'quiz': return <span>❓</span>;
//       case 'assignment': return <span>📋</span>;
//       case 'live_session': return <Mic className="h-4 w-4" />;
//       case 'code': return <Code className="h-4 w-4" />;
//       default: return <FileText className="h-4 w-4" />;
//     }
//   };

//   const getLessonTypeColor = () => {
//     switch (lesson.lesson_type) {
//       case 'video': return 'bg-red-100 text-red-800 border-red-200';
//       case 'text': return 'bg-blue-100 text-blue-800 border-blue-200';
//       case 'document': return 'bg-green-100 text-green-800 border-green-200';
//       case 'quiz': return 'bg-purple-100 text-purple-800 border-purple-200';
//       case 'assignment': return 'bg-orange-100 text-orange-800 border-orange-200';
//       case 'live_session': return 'bg-pink-100 text-pink-800 border-pink-200';
//       case 'code': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const formatDuration = (seconds: number) => {
//     if (!seconds) return '';
//     const minutes = Math.round(seconds / 60);
//     return minutes > 0 ? `${minutes}m` : '<1m';
//   };

//   return (
//     <Card className={`border-l-4 ${getLessonTypeColor()} hover:shadow-md transition-shadow`}>
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3 flex-1">
//             <div className="flex items-center space-x-2">
//               <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
//               <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
//                 {order + 1}
//               </div>
//             </div>
            
//             <div className="flex-1">
//               <div className="flex items-center space-x-2 mb-1">
//                 <div className="flex items-center justify-center w-6 h-6">
//                   {getLessonIcon()}
//                 </div>
//                 <h4 className="font-medium text-sm">{lesson.title}</h4>
//                 {lesson.is_preview && (
//                   <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
//                     Preview
//                   </Badge>
//                 )}
//                 {!lesson.is_published && (
//                   <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
//                     Draft
//                   </Badge>
//                 )}
//               </div>
              
//               {lesson.description && (
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {lesson.description}
//                 </p>
//               )}
              
//               <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
//                 <Badge variant="outline" className={getLessonTypeColor()}>
//                   {lesson.lesson_type}
//                 </Badge>
//                 {lesson.video_duration > 0 && (
//                   <span>{formatDuration(lesson.video_duration)}</span>
//                 )}
//                 {lesson.difficulty && lesson.difficulty !== 'beginner' && (
//                   <span className="capitalize">{lesson.difficulty}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-1">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onEdit}
//               className="h-8 w-8 p-0"
//             >
//               <Edit className="h-3 w-3" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onDelete}
//               className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
//             >
//               <Trash2 className="h-3 w-3" />
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }























// /src/components/curriculum/lesson-card.tsx (MODIFIED)

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical, Play, FileText, Code, Mic, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { Lesson } from '@/lib/db/queries/curriculum';
import Link from 'next/link';
import { useState } from 'react';

interface LessonCardProps {
  lesson: Lesson;
  order: number;
  onEdit: () => void;
  onDelete: () => void;
  courseId: string;
  moduleId: string;
}

export function LessonCard({ lesson, order, onEdit, onDelete, courseId, moduleId }: LessonCardProps) {
  const [isCheckingQuiz, setIsCheckingQuiz] = useState(false);

  const getLessonIcon = () => {
    switch (lesson.lesson_type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'quiz': return <span className="text-lg">❓</span>;
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'live_session': return <Mic className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getLessonTypeColor = () => {
    switch (lesson.lesson_type) {
      case 'video': return 'bg-red-100 text-red-800 border-red-200';
      case 'text': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'document': return 'bg-green-100 text-green-800 border-green-200';
      case 'quiz': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assignment': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'live_session': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'code': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return '';
    const minutes = Math.round(seconds / 60);
    return minutes > 0 ? `${minutes}m` : '<1m';
  };

  const handleStartQuiz = async () => {
    if (lesson.lesson_type !== 'quiz') return;
    
    setIsCheckingQuiz(true);
    try {
      // First, we need to get the assessment ID for this lesson
      // Since lessons and assessments are linked by lesson_id in assessments table
      const response = await fetch(`/api/assessments?lessonId=${lesson.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      
      const data = await response.json();
      if (data.assessments && data.assessments.length > 0) {
        const assessment = data.assessments[0];
        window.location.href = `/courses/learn/${courseId}/quiz/${assessment.id}`;
      } else {
        // If no assessment linked, try to create one or show error
        alert('No quiz available for this lesson.');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Please try again.');
    } finally {
      setIsCheckingQuiz(false);
    }
  };

  const getActionButton = () => {
    if (lesson.lesson_type === 'quiz') {
      return (
        <Button
          size="sm"
          onClick={handleStartQuiz}
          disabled={isCheckingQuiz}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isCheckingQuiz ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              Loading...
            </>
          ) : (
            'Start Quiz'
          )}
        </Button>
      );
    }

    // For other lesson types, show edit/delete buttons
    return (
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    );
  };

  return (
    <Card className={`border-l-4 ${getLessonTypeColor()} hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-2">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                {order + 1}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center justify-center w-6 h-6">
                  {getLessonIcon()}
                </div>
                <h4 className="font-medium text-sm">{lesson.title}</h4>
                {lesson.is_preview && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Preview
                  </Badge>
                )}
                {!lesson.is_published && (
                  <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                    Draft
                  </Badge>
                )}
              </div>
              
              {lesson.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {lesson.description}
                </p>
              )}
              
              <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                <Badge variant="outline" className={getLessonTypeColor()}>
                  {lesson.lesson_type}
                </Badge>
                {lesson.video_duration > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {formatDuration(lesson.video_duration)}
                  </span>
                )}
                {lesson.difficulty && lesson.difficulty !== 'beginner' && (
                  <span className="capitalize">{lesson.difficulty}</span>
                )}
              </div>
            </div>
          </div>

          {getActionButton()}
        </div>
      </CardContent>
    </Card>
  );
}