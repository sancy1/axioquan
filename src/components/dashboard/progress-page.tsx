
// // /components/dashboard/progress-page.tsx

// 'use client'

// const progressData = {
//   coursesInProgress: 3,
//   hoursLearned: 24,
//   certificatesEarned: 2,
//   currentStreak: 7,
//   courses: [
//     {
//       id: 1,
//       title: "Introduction to Python Programming",
//       category: "Programming",
//       progress: 85,
//       lastUpdated: "2 days ago",
//       nextLesson: "Advanced Functions",
//     },
//     {
//       id: 2,
//       title: "Modern Web Design Principles",
//       category: "Design",
//       progress: 60,
//       lastUpdated: "Today",
//       nextLesson: "Responsive Design",
//     },
//     {
//       id: 3,
//       title: "Data Structures and Algorithms",
//       category: "Programming",
//       progress: 25,
//       lastUpdated: "5 days ago",
//       nextLesson: "Linked Lists",
//     },
//   ],
// }

// const achievements = [
//   { id: 1, name: "Python Basics", icon: "🐍", description: "Completed Python fundamentals module" },
//   { id: 2, name: "Quiz Master", icon: "🏆", description: "Scored 100% on 5 quizzes" },
//   { id: 3, name: "Week Warrior", icon: "⚡", description: "Learned 7 days in a row" },
// ]

// export default function ProgressPage() {
//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Course Progress</h1>
//         <p className="text-gray-600 mt-1">Track your learning journey and achievements</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Courses in Progress</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.coursesInProgress}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📚</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Hours Learned</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.hoursLearned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">⏱️</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Certificates</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.certificatesEarned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📜</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Current Streak</p>
//               <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2">
//                 {progressData.currentStreak} days
//               </p>
//             </div>
//             <div className="text-3xl md:text-4xl">🔥</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Course Progress Details */}
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Course Progress</h2>
//           {progressData.courses.map((course) => (
//             <div key={course.id} className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base md:text-lg">{course.title}</h3>
//                   <p className="text-xs md:text-sm text-gray-600">{course.category}</p>
//                 </div>
//                 <span className="text-sm md:text-base font-bold text-blue-600">{course.progress}%</span>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden mb-4">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all"
//                   style={{ width: `${course.progress}%` }}
//                 ></div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
//                 <div>
//                   <p className="text-gray-600">Last Updated</p>
//                   <p className="font-medium text-gray-900">{course.lastUpdated}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Next Lesson</p>
//                   <p className="font-medium text-gray-900">{course.nextLesson}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Weekly Goal and Achievements */}
//         <div className="space-y-6">
//           {/* Weekly Goal */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Weekly Goal</h3>
//             <div className="text-center">
//               <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="3"
//                     strokeDasharray={`${(5 / 7) * 282.74}`}
//                     strokeDashoffset="0"
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#3b82f6" />
//                       <stop offset="100%" stopColor="#1e40af" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-lg md:text-2xl font-bold text-gray-900">5/7</p>
//                     <p className="text-xs md:text-sm text-gray-600">hours</p>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xs md:text-sm text-gray-600 mt-4">2 more hours to reach your weekly goal</p>
//             </div>
//           </div>

//           {/* Recent Achievements */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Recent Achievements</h3>
//             <div className="space-y-3">
//               {achievements.map((achievement) => (
//                 <div
//                   key={achievement.id}
//                   className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 text-sm md:text-base">{achievement.name}</p>
//                     <p className="text-xs md:text-sm text-gray-600">{achievement.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
























// // /components/dashboard/progress-page.tsx

// 'use client'

// interface ProgressData {
//   totalCourses: number;
//   completedCourses: number;
//   inProgressCourses: number;
//   totalTimeSpent: number;
//   averageProgress: number;
//   recentActivity: Array<{
//     id: string;
//     course_title: string;
//     lesson_title: string;
//     activity_type: string;
//     created_at: Date;
//   }>;
//   courseProgress: Array<{
//     course_id: string;
//     title: string;
//     progress_percentage: number;
//     completed_lessons: number;
//     total_lessons: number;
//     last_accessed_at: Date;
//   }>;
// }

// interface ProgressPageProps {
//   initialProgressData?: ProgressData;
// }

// // Default data to maintain your UI design
// const defaultProgressData = {
//   coursesInProgress: 3,
//   hoursLearned: 24,
//   certificatesEarned: 2,
//   currentStreak: 7,
//   courses: [
//     {
//       id: 1,
//       title: "Introduction to Python Programming",
//       category: "Programming",
//       progress: 85,
//       lastUpdated: "2 days ago",
//       nextLesson: "Advanced Functions",
//     },
//     {
//       id: 2,
//       title: "Modern Web Design Principles",
//       category: "Design",
//       progress: 60,
//       lastUpdated: "Today",
//       nextLesson: "Responsive Design",
//     },
//     {
//       id: 3,
//       title: "Data Structures and Algorithms",
//       category: "Programming",
//       progress: 25,
//       lastUpdated: "5 days ago",
//       nextLesson: "Linked Lists",
//     },
//   ],
// }

// const achievements = [
//   { id: 1, name: "Python Basics", icon: "🐍", description: "Completed Python fundamentals module" },
//   { id: 2, name: "Quiz Master", icon: "🏆", description: "Scored 100% on 5 quizzes" },
//   { id: 3, name: "Week Warrior", icon: "⚡", description: "Learned 7 days in a row" },
// ]

// export default function ProgressPage({ initialProgressData }: ProgressPageProps) {
//   // Use real data if available, otherwise use default mock data
//   const progressData = initialProgressData ? {
//     coursesInProgress: initialProgressData.inProgressCourses,
//     hoursLearned: Math.floor(initialProgressData.totalTimeSpent / 3600), // Convert seconds to hours
//     certificatesEarned: initialProgressData.completedCourses,
//     currentStreak: 7, // You can calculate this from activity data if needed
//     courses: initialProgressData.courseProgress.slice(0, 3).map((course, index) => ({
//       id: index + 1,
//       title: course.title,
//       category: "Programming", // You can map this from course data if available
//       progress: Math.round(course.progress_percentage),
//       lastUpdated: formatLastUpdated(course.last_accessed_at),
//       nextLesson: "Next Lesson", // You can get this from curriculum data
//     }))
//   } : defaultProgressData;

//   // Helper function to format last updated time
//   function formatLastUpdated(date: Date): string {
//     const now = new Date();
//     const lastUpdated = new Date(date);
//     const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "1 day ago";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//     return `${Math.floor(diffDays / 30)} months ago`;
//   }

//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Course Progress</h1>
//         <p className="text-gray-600 mt-1">Track your learning journey and achievements</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Courses in Progress</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.coursesInProgress}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📚</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Hours Learned</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.hoursLearned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">⏱️</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Certificates</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.certificatesEarned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📜</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Current Streak</p>
//               <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2">
//                 {progressData.currentStreak} days
//               </p>
//             </div>
//             <div className="text-3xl md:text-4xl">🔥</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Course Progress Details */}
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Course Progress</h2>
//           {progressData.courses.map((course) => (
//             <div key={course.id} className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base md:text-lg">{course.title}</h3>
//                   <p className="text-xs md:text-sm text-gray-600">{course.category}</p>
//                 </div>
//                 <span className="text-sm md:text-base font-bold text-blue-600">{course.progress}%</span>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden mb-4">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all"
//                   style={{ width: `${course.progress}%` }}
//                 ></div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
//                 <div>
//                   <p className="text-gray-600">Last Updated</p>
//                   <p className="font-medium text-gray-900">{course.lastUpdated}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Next Lesson</p>
//                   <p className="font-medium text-gray-900">{course.nextLesson}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Weekly Goal and Achievements */}
//         <div className="space-y-6">
//           {/* Weekly Goal */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Weekly Goal</h3>
//             <div className="text-center">
//               <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="3"
//                     strokeDasharray={`${(5 / 7) * 282.74}`}
//                     strokeDashoffset="0"
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#3b82f6" />
//                       <stop offset="100%" stopColor="#1e40af" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-lg md:text-2xl font-bold text-gray-900">5/7</p>
//                     <p className="text-xs md:text-sm text-gray-600">hours</p>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xs md:text-sm text-gray-600 mt-4">2 more hours to reach your weekly goal</p>
//             </div>
//           </div>

//           {/* Recent Achievements */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Recent Achievements</h3>
//             <div className="space-y-3">
//               {achievements.map((achievement) => (
//                 <div
//                   key={achievement.id}
//                   className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 text-sm md:text-base">{achievement.name}</p>
//                     <p className="text-xs md:text-sm text-gray-600">{achievement.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }






















// // /components/dashboard/progress-page.tsx

// 'use client'

// interface ProgressData {
//   totalCourses: number;
//   completedCourses: number;
//   inProgressCourses: number;
//   totalTimeSpent: number;
//   averageProgress: number;
//   recentActivity: Array<{
//     id: string;
//     course_title: string;
//     lesson_title: string;
//     activity_type: string;
//     created_at: Date;
//   }>;
//   courseProgress: Array<{
//     course_id: string;
//     title: string;
//     progress_percentage: number;
//     completed_lessons: number;
//     total_lessons: number;
//     last_accessed_at: Date;
//   }>;
// }

// interface ProgressPageProps {
//   initialProgressData?: ProgressData;
// }

// // Default data to maintain your UI design
// const defaultProgressData = {
//   coursesInProgress: 3,
//   hoursLearned: 24,
//   certificatesEarned: 2,
//   currentStreak: 7,
//   courses: [
//     {
//       id: 1,
//       title: "Introduction to Python Programming",
//       category: "Programming",
//       progress: 85,
//       lastUpdated: "2 days ago",
//       nextLesson: "Advanced Functions",
//     },
//     {
//       id: 2,
//       title: "Modern Web Design Principles",
//       category: "Design",
//       progress: 60,
//       lastUpdated: "Today",
//       nextLesson: "Responsive Design",
//     },
//     {
//       id: 3,
//       title: "Data Structures and Algorithms",
//       category: "Programming",
//       progress: 25,
//       lastUpdated: "5 days ago",
//       nextLesson: "Linked Lists",
//     },
//   ],
// }

// const achievements = [
//   { id: 1, name: "Python Basics", icon: "🐍", description: "Completed Python fundamentals module" },
//   { id: 2, name: "Quiz Master", icon: "🏆", description: "Scored 100% on 5 quizzes" },
//   { id: 3, name: "Week Warrior", icon: "⚡", description: "Learned 7 days in a row" },
// ]

// export default function ProgressPage({ initialProgressData }: ProgressPageProps) {
//   // Use real data if available, otherwise use default mock data
//   const progressData = initialProgressData ? {
//     coursesInProgress: initialProgressData.inProgressCourses,
//     hoursLearned: calculateRealHoursLearned(initialProgressData),
//     certificatesEarned: initialProgressData.completedCourses,
//     currentStreak: calculateCurrentStreak(initialProgressData.recentActivity),
//     courses: initialProgressData.courseProgress.slice(0, 3).map((course, index) => ({
//       id: index + 1,
//       title: course.title,
//       category: getCategoryFromTitle(course.title),
//       progress: Math.round(course.progress_percentage),
//       lastUpdated: formatLastUpdated(course.last_accessed_at),
//       nextLesson: getNextLesson(course.progress_percentage),
//     }))
//   } : defaultProgressData;

//   // NEW: Calculate hours learned from multiple sources
//   function calculateRealHoursLearned(data: ProgressData): number {
//     // First try: Use total_time_spent from enrollments (most accurate)
//     if (data.totalTimeSpent > 0) {
//       const hoursFromTimeSpent = Math.floor(data.totalTimeSpent / 3600);
//       if (hoursFromTimeSpent > 0) return hoursFromTimeSpent;
//     }

//     // Second try: Estimate from completed lessons (fallback)
//     const estimatedMinutesPerLesson = 30; // Average 30 minutes per lesson
//     const totalCompletedLessons = data.courseProgress.reduce(
//       (total, course) => total + (course.completed_lessons || 0), 0
//     );
//     const hoursFromLessons = Math.floor((totalCompletedLessons * estimatedMinutesPerLesson) / 60);
    
//     // Third try: Estimate from progress percentage (last resort)
//     const totalCourseDuration = data.courseProgress.reduce(
//       (total, course) => {
//         const estimatedCourseHours = 10; // Average 10 hours per course
//         return total + (course.progress_percentage / 100) * estimatedCourseHours;
//       }, 0
//     );

//     // Return the most reasonable estimate
//     return Math.max(hoursFromLessons, Math.floor(totalCourseDuration), 1);
//   }

//   // Helper function to format last updated time
//   function formatLastUpdated(date: Date): string {
//     const now = new Date();
//     const lastUpdated = new Date(date);
//     const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "1 day ago";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//     return `${Math.floor(diffDays / 30)} months ago`;
//   }

//   // Helper function to calculate current streak from recent activity
//   function calculateCurrentStreak(activities: any[]): number {
//     if (!activities || activities.length === 0) return 0;
    
//     const sortedActivities = [...activities].sort((a, b) => 
//       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );
    
//     let streak = 0;
//     let currentDate = new Date();
    
//     const today = new Date().toDateString();
//     const hasActivityToday = sortedActivities.some(activity => 
//       new Date(activity.created_at).toDateString() === today
//     );
    
//     if (!hasActivityToday) return 0;
    
//     streak = 1;
    
//     for (let i = 1; i < sortedActivities.length; i++) {
//       const currentActivityDate = new Date(sortedActivities[i].created_at);
//       const previousActivityDate = new Date(sortedActivities[i-1].created_at);
      
//       const diffTime = Math.abs(currentActivityDate.getTime() - previousActivityDate.getTime());
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 1) {
//         streak++;
//       } else {
//         break;
//       }
//     }
    
//     return Math.min(streak, 7);
//   }

//   // Helper function to extract category from course title
//   function getCategoryFromTitle(title: string): string {
//     if (title.toLowerCase().includes('python') || title.toLowerCase().includes('javascript') || title.toLowerCase().includes('programming')) {
//       return "Programming";
//     } else if (title.toLowerCase().includes('design') || title.toLowerCase().includes('web') || title.toLowerCase().includes('ui/ux')) {
//       return "Design";
//     } else if (title.toLowerCase().includes('data') || title.toLowerCase().includes('algorithm')) {
//       return "Data Science";
//     } else if (title.toLowerCase().includes('business') || title.toLowerCase().includes('marketing')) {
//       return "Business";
//     }
//     return "General";
//   }

//   // Helper function to generate next lesson based on progress
//   function getNextLesson(progress: number): string {
//     if (progress < 25) return "Getting Started";
//     if (progress < 50) return "Intermediate Concepts";
//     if (progress < 75) return "Advanced Topics";
//     if (progress < 100) return "Final Project";
//     return "Course Complete";
//   }

//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Course Progress</h1>
//         <p className="text-gray-600 mt-1">Track your learning journey and achievements</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Courses in Progress</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.coursesInProgress}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📚</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Hours Learned</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.hoursLearned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">⏱️</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Certificates</p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.certificatesEarned}</p>
//             </div>
//             <div className="text-3xl md:text-4xl">📜</div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm md:text-base">Current Streak</p>
//               <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2">
//                 {progressData.currentStreak} days
//               </p>
//             </div>
//             <div className="text-3xl md:text-4xl">🔥</div>
//           </div>
//         </div>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Course Progress Details */}
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Course Progress</h2>
//           {progressData.courses.map((course) => (
//             <div key={course.id} className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base md:text-lg">{course.title}</h3>
//                   <p className="text-xs md:text-sm text-gray-600">{course.category}</p>
//                 </div>
//                 <span className="text-sm md:text-base font-bold text-blue-600">{course.progress}%</span>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden mb-4">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all"
//                   style={{ width: `${course.progress}%` }}
//                 ></div>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
//                 <div>
//                   <p className="text-gray-600">Last Updated</p>
//                   <p className="font-medium text-gray-900">{course.lastUpdated}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Next Lesson</p>
//                   <p className="font-medium text-gray-900">{course.nextLesson}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Weekly Goal and Achievements */}
//         <div className="space-y-6">
//           {/* Weekly Goal */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Weekly Goal</h3>
//             <div className="text-center">
//               <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
//                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                   <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="45"
//                     fill="none"
//                     stroke="url(#gradient)"
//                     strokeWidth="3"
//                     strokeDasharray={`${(5 / 7) * 282.74}`}
//                     strokeDashoffset="0"
//                   />
//                   <defs>
//                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                       <stop offset="0%" stopColor="#3b82f6" />
//                       <stop offset="100%" stopColor="#1e40af" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center">
//                     <p className="text-lg md:text-2xl font-bold text-gray-900">5/7</p>
//                     <p className="text-xs md:text-sm text-gray-600">hours</p>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-xs md:text-sm text-gray-600 mt-4">2 more hours to reach your weekly goal</p>
//             </div>
//           </div>

//           {/* Recent Achievements */}
//           <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
//             <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Recent Achievements</h3>
//             <div className="space-y-3">
//               {achievements.map((achievement) => (
//                 <div
//                   key={achievement.id}
//                   className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 text-sm md:text-base">{achievement.name}</p>
//                     <p className="text-xs md:text-sm text-gray-600">{achievement.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }























// /components/dashboard/progress-page.tsx

'use client'

interface ProgressData {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalTimeSpent: number;
  averageProgress: number;
  recentActivity: Array<{
    id: string;
    course_title: string;
    lesson_title: string;
    activity_type: string;
    created_at: Date;
  }>;
  courseProgress: Array<{
    course_id: string;
    title: string;
    progress_percentage: number;
    completed_lessons: number;
    total_lessons: number;
    last_accessed_at: Date;
  }>;
}

interface ProgressPageProps {
  initialProgressData?: ProgressData;
}

// Default data to maintain your UI design
const defaultProgressData = {
  coursesInProgress: 3,
  hoursLearned: 24,
  certificatesEarned: 2,
  currentStreak: 7,
  courses: [
    {
      id: 1,
      title: "Introduction to Python Programming",
      category: "Programming",
      progress: 85,
      lastUpdated: "2 days ago",
      nextLesson: "Advanced Functions",
    },
    {
      id: 2,
      title: "Modern Web Design Principles",
      category: "Design",
      progress: 60,
      lastUpdated: "Today",
      nextLesson: "Responsive Design",
    },
    {
      id: 3,
      title: "Data Structures and Algorithms",
      category: "Programming",
      progress: 25,
      lastUpdated: "5 days ago",
      nextLesson: "Linked Lists",
    },
  ],
}

const achievements = [
  { id: 1, name: "Python Basics", icon: "🐍", description: "Completed Python fundamentals module" },
  { id: 2, name: "Quiz Master", icon: "🏆", description: "Scored 100% on 5 quizzes" },
  { id: 3, name: "Week Warrior", icon: "⚡", description: "Learned 7 days in a row" },
]

export default function ProgressPage({ initialProgressData }: ProgressPageProps) {
  // Use real data if available, otherwise use default mock data
  const progressData = initialProgressData ? {
    coursesInProgress: initialProgressData.inProgressCourses,
    hoursLearned: calculateRealHoursLearned(initialProgressData),
    certificatesEarned: initialProgressData.completedCourses,
    currentStreak: calculateCurrentStreak(initialProgressData.recentActivity),
    courses: initialProgressData.courseProgress.slice(0, 3).map((course, index) => ({
      id: index + 1,
      title: course.title,
      category: getCategoryFromTitle(course.title),
      progress: Math.round(course.progress_percentage),
      lastUpdated: formatLastUpdated(course.last_accessed_at),
      nextLesson: getNextLesson(course.progress_percentage),
    }))
  } : defaultProgressData;

  // SIMPLE & SAFE Learning Progress Calculation
  const calculateLearningProgress = () => {
    if (!initialProgressData) return 4; // Fallback to 4% if no data
    
    try {
      const { courseProgress, completedCourses, totalCourses } = initialProgressData;
      
      // Method 1: Use average of all course progress percentages
      if (courseProgress && courseProgress.length > 0) {
        const totalProgress = courseProgress.reduce((sum, course) => sum + (course.progress_percentage || 0), 0);
        const averageProgress = Math.round(totalProgress / courseProgress.length);
        return Math.max(4, averageProgress); // Minimum 4% to show some progress
      }
      
      // Method 2: Use course completion ratio
      if (totalCourses > 0) {
        const completionRatio = (completedCourses / totalCourses) * 100;
        return Math.max(4, Math.round(completionRatio));
      }
      
      return 4; // Default fallback
    } catch (error) {
      console.error('Error calculating learning progress:', error);
      return 4; // Safe fallback
    }
  };

  const learningProgress = calculateLearningProgress();

  // Calculate hours learned from multiple sources
  function calculateRealHoursLearned(data: ProgressData): number {
    // First try: Use total_time_spent from enrollments (most accurate)
    if (data.totalTimeSpent > 0) {
      const hoursFromTimeSpent = Math.floor(data.totalTimeSpent / 3600);
      if (hoursFromTimeSpent > 0) return hoursFromTimeSpent;
    }

    // Second try: Estimate from completed lessons (fallback)
    const estimatedMinutesPerLesson = 30; // Average 30 minutes per lesson
    const totalCompletedLessons = data.courseProgress.reduce(
      (total, course) => total + (course.completed_lessons || 0), 0
    );
    const hoursFromLessons = Math.floor((totalCompletedLessons * estimatedMinutesPerLesson) / 60);
    
    // Third try: Estimate from progress percentage (last resort)
    const totalCourseDuration = data.courseProgress.reduce(
      (total, course) => {
        const estimatedCourseHours = 10; // Average 10 hours per course
        return total + (course.progress_percentage / 100) * estimatedCourseHours;
      }, 0
    );

    // Return the most reasonable estimate
    return Math.max(hoursFromLessons, Math.floor(totalCourseDuration), 1);
  }

  // Helper function to format last updated time
  function formatLastUpdated(date: Date): string {
    const now = new Date();
    const lastUpdated = new Date(date);
    const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  // Helper function to calculate current streak from recent activity
  function calculateCurrentStreak(activities: any[]): number {
    if (!activities || activities.length === 0) return 0;
    
    const sortedActivities = [...activities].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    
    const today = new Date().toDateString();
    const hasActivityToday = sortedActivities.some(activity => 
      new Date(activity.created_at).toDateString() === today
    );
    
    if (!hasActivityToday) return 0;
    
    streak = 1;
    
    for (let i = 1; i < sortedActivities.length; i++) {
      const currentActivityDate = new Date(sortedActivities[i].created_at);
      const previousActivityDate = new Date(sortedActivities[i-1].created_at);
      
      const diffTime = Math.abs(currentActivityDate.getTime() - previousActivityDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return Math.min(streak, 7);
  }

  // Helper function to extract category from course title
  function getCategoryFromTitle(title: string): string {
    if (title.toLowerCase().includes('python') || title.toLowerCase().includes('javascript') || title.toLowerCase().includes('programming')) {
      return "Programming";
    } else if (title.toLowerCase().includes('design') || title.toLowerCase().includes('web') || title.toLowerCase().includes('ui/ux')) {
      return "Design";
    } else if (title.toLowerCase().includes('data') || title.toLowerCase().includes('algorithm')) {
      return "Data Science";
    } else if (title.toLowerCase().includes('business') || title.toLowerCase().includes('marketing')) {
      return "Business";
    }
    return "General";
  }

  // Helper function to generate next lesson based on progress
  function getNextLesson(progress: number): string {
    if (progress < 25) return "Getting Started";
    if (progress < 50) return "Intermediate Concepts";
    if (progress < 75) return "Advanced Topics";
    if (progress < 100) return "Final Project";
    return "Course Complete";
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Course Progress</h1>
        <p className="text-gray-600 mt-1">Track your learning journey and achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm md:text-base">Courses in Progress</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.coursesInProgress}</p>
            </div>
            <div className="text-3xl md:text-4xl">📚</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm md:text-base">Hours Learned</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.hoursLearned}</p>
            </div>
            <div className="text-3xl md:text-4xl">⏱️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm md:text-base">Certificates</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{progressData.certificatesEarned}</p>
            </div>
            <div className="text-3xl md:text-4xl">📜</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm md:text-base">Current Streak</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-2">
                {progressData.currentStreak} days
              </p>
            </div>
            <div className="text-3xl md:text-4xl">🔥</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Progress Details */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Course Progress</h2>
          {progressData.courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">{course.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{course.category}</p>
                </div>
                <span className="text-sm md:text-base font-bold text-blue-600">{course.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">{course.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-gray-600">Next Lesson</p>
                  <p className="font-medium text-gray-900">{course.nextLesson}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Goal and Achievements */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Weekly Goal</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray={`${(5 / 7) * 282.74}`}
                    strokeDashoffset="0"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg md:text-2xl font-bold text-gray-900">5/7</p>
                    <p className="text-xs md:text-sm text-gray-600">hours</p>
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-4">2 more hours to reach your weekly goal</p>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <div className="text-2xl md:text-3xl flex-shrink-0">{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm md:text-base">{achievement.name}</p>
                    <p className="text-xs md:text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SIMPLE & SAFE Learning Progress Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6 md:mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Overall Learning Progress</h2>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-900">Course Completion</span>
          <span className="text-2xl font-bold text-blue-600">{learningProgress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${learningProgress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>

        {/* Simple Progress Breakdown */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-700">{initialProgressData?.completedCourses || 0}</p>
            <p className="text-blue-600">Courses Completed</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-700">{initialProgressData?.inProgressCourses || 0}</p>
            <p className="text-green-600">In Progress</p>
          </div>
        </div>
      </div>
    </div>
  )
}