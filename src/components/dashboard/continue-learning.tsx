
// // /components/dashboard/continue-learning.tsx

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'

// interface ContinueLearningProps {
//   courses: any[]
// }

// export default function ContinueLearning({ courses }: ContinueLearningProps) {
//   const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

//   if (courses.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
//         <div className="text-center py-8">
//           <div className="text-6xl mb-4">🎯</div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your learning journey</h3>
//           <p className="text-gray-600 mb-6">
//             Enroll in courses to track your progress and continue learning
//           </p>
//           <Link href="/courses">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
//               Browse Courses
//             </button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
      
//       <div className="space-y-4">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
//             className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//           >
//             <div className="flex items-start gap-4">
//               <div className="text-3xl">
//                 {course.icon || '📚'}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-semibold text-gray-900">{course.title}</h3>
//                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                     {course.category || 'General'}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-3">{course.description}</p>
//                 <div className="flex items-center gap-3">
//                   <div className="flex-1 bg-gray-300 rounded-full h-2">
//                     <div
//                       className="bg-blue-500 h-2 rounded-full transition-all"
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900">{course.progress || 0}%</span>
//                 </div>
//               </div>
//             </div>
            
//             {selectedCourse === course.id && (
//               <div className="mt-4 pt-4 border-t border-gray-300 flex space-x-2">
//                 <Link 
//                   href={`/courses/${course.slug || course.id}`}
//                   className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1 text-center"
//                 >
//                   Continue Course
//                 </Link>
//                 <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1">
//                   View Details
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



















// // /components/dashboard/continue-learning.tsx

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'

// interface ContinueLearningProps {
//   courses: any[]
// }

// export default function ContinueLearning({ courses }: ContinueLearningProps) {
//   const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

//   if (courses.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
//         <div className="text-center py-8">
//           <div className="text-6xl mb-4">🎯</div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your learning journey</h3>
//           <p className="text-gray-600 mb-6">
//             Enroll in courses to track your progress and continue learning
//           </p>
//           <Link href="/courses">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
//               Browse Courses
//             </button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
      
//       <div className="space-y-4">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
//             className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
//           >
//             <div className="flex items-start gap-4">
//               <div className="text-3xl">
//                 {course.icon || '📚'}
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-semibold text-gray-900">{course.title}</h3>
//                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                     {course.category || 'General'}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-3">{course.description}</p>
//                 <div className="flex items-center gap-3">
//                   <div className="flex-1 bg-gray-300 rounded-full h-2">
//                     <div
//                       className="bg-blue-500 h-2 rounded-full transition-all"
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-sm font-medium text-gray-900">{course.progress || 0}%</span>
//                 </div>
//               </div>
//             </div>
            
//             {selectedCourse === course.id && (
//               <div className="mt-4 pt-4 border-t border-gray-300 flex space-x-2">
//                 {/* FIXED: Updated URL to use the correct learning path */}
//                 <Link 
//                   href={`/courses/learn/${course.id}`}
//                   className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1 text-center"
//                 >
//                   Continue Learning
//                 </Link>
//                 <Link 
//                   href={`/courses/${course.slug || course.id}`}
//                   className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 text-center"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }























// /components/dashboard/continue-learning.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

interface ContinueLearningProps {
  courses: any[]
}

export default function ContinueLearning({ courses }: ContinueLearningProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  // Check if courses array is empty or undefined
  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Learning</h2>
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your learning journey</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Start your learning journey by exploring our course catalog.
          </p>
          <Link href="/courses">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Browse Courses
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
        {courses.length > 2 && (
          <Link 
            href="/dashboard/my-courses" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {courses.slice(0, 4).map((course) => {
          // Extract progress from either progress or progress_percentage field
          const progress = course.progress || course.progress_percentage || 0;
          const progressPercentage = Math.min(100, Math.max(0, progress));
          
          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Course Icon/Thumbnail */}
                <div className="flex-shrink-0">
                  {course.thumbnail_url ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  )}
                </div>
                
                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center gap-2">
                      {course.category_name && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {course.category_name}
                        </span>
                      )}
                      {course.difficulty_level && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          course.difficulty_level === 'beginner' ? 'bg-green-100 text-green-700' :
                          course.difficulty_level === 'intermediate' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {course.difficulty_level}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {course.instructor_name && (
                    <p className="text-sm text-gray-600 mb-1">
                      By {course.instructor_name}
                    </p>
                  )}
                  
                  {course.short_description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {course.short_description}
                    </p>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          progressPercentage === 100 ? 'bg-green-500' :
                          progressPercentage >= 50 ? 'bg-blue-500' :
                          'bg-blue-400'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {progressPercentage}% complete
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Expandable Action Buttons */}
              {selectedCourse === course.id && (
                <div className="mt-4 pt-4 border-t border-gray-300 flex flex-col sm:flex-row gap-2">
                  <Link 
                    href={`/courses/learn/${course.id}`}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex-1 text-center"
                  >
                    {progressPercentage === 100 ? 'Review Course' : 
                     progressPercentage > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Link>
                  <Link 
                    href={`/courses/${course.slug || course.id}`}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 text-center"
                  >
                    View Details
                  </Link>
                </div>
              )}
              
              {/* Quick Action without expanding */}
              {selectedCourse !== course.id && (
                <div className="mt-3 flex justify-end">
                  <Link 
                    href={`/courses/learn/${course.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    {progressPercentage === 100 ? 'Review' : 
                     progressPercentage > 0 ? 'Continue' : 'Start'}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Show browse courses prompt if user has few courses */}
      {courses.length > 0 && courses.length <= 2 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            You have {courses.length} course{courses.length !== 1 ? 's' : ''}. 
            <Link href="/courses" className="text-blue-600 hover:text-blue-800 ml-1 font-medium">
              Explore more courses →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}