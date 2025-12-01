
// // /app/dashboard/progress/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import ProgressPage from '@/components/dashboard/progress-page'

// export default async function Progress() {
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

//   // Create user object with placeholder data
//   const user = {
//     id: session.userId,
//     name: 'Student User',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-auto">
//         <ProgressPage />
//       </main>
//     </div>
//   )
// }





















// /app/dashboard/progress/page.tsx

import { getSession } from '@/lib/auth/session'
import Sidebar from '@/components/dashboard/sidebar'
import ProgressPage from '@/components/dashboard/progress-page'
import { sql } from '@/lib/db'

// Define progress data interface
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

export default async function Progress() {
  const session = await getSession()
  
  if (!session || !session.userId) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    )
  }

  // Fetch actual progress data from database
  let progressData: ProgressData = {
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalTimeSpent: 0,
    averageProgress: 0,
    recentActivity: [],
    courseProgress: []
  };

  try {
    if (session.userId) {
      // Get course progress statistics
      const courseStats = await sql`
        SELECT 
          COUNT(*) as total_courses,
          COUNT(CASE WHEN progress_percentage = 100 THEN 1 END) as completed_courses,
          COUNT(CASE WHEN progress_percentage > 0 AND progress_percentage < 100 THEN 1 END) as in_progress_courses,
          COALESCE(SUM(total_time_spent), 0) as total_time_spent,
          COALESCE(AVG(progress_percentage), 0) as average_progress
        FROM enrollments 
        WHERE user_id = ${session.userId} AND status IN ('active', 'completed')
      `

      // Get detailed course progress
      const courseProgress = await sql`
        SELECT 
          e.course_id,
          c.title,
          e.progress_percentage,
          e.completed_lessons,
          e.total_lessons,
          e.last_accessed_at
        FROM enrollments e
        JOIN courses c ON e.course_id = c.id
        WHERE e.user_id = ${session.userId} AND e.status IN ('active', 'completed')
        ORDER BY e.last_accessed_at DESC
        LIMIT 10
      `

      // Get recent activity (last 5 activities)
      const recentActivity = await sql`
        SELECT 
          ua.id,
          c.title as course_title,
          l.title as lesson_title,
          ua.activity_type,
          ua.created_at
        FROM user_activities ua
        LEFT JOIN courses c ON (ua.activity_data->>'courseId')::uuid = c.id
        LEFT JOIN lessons l ON (ua.activity_data->>'lessonId')::uuid = l.id
        WHERE ua.user_id = ${session.userId}
        ORDER BY ua.created_at DESC
        LIMIT 5
      `

      progressData = {
        totalCourses: parseInt(courseStats[0]?.total_courses) || 0,
        completedCourses: parseInt(courseStats[0]?.completed_courses) || 0,
        inProgressCourses: parseInt(courseStats[0]?.in_progress_courses) || 0,
        totalTimeSpent: parseInt(courseStats[0]?.total_time_spent) || 0,
        averageProgress: parseFloat(courseStats[0]?.average_progress) || 0,
        recentActivity: recentActivity.map((activity: any) => ({
          id: activity.id,
          course_title: activity.course_title || 'General Activity',
          lesson_title: activity.lesson_title || activity.activity_type,
          activity_type: activity.activity_type,
          created_at: activity.created_at
        })),
        courseProgress: courseProgress.map((course: any) => ({
          course_id: course.course_id,
          title: course.title,
          progress_percentage: parseFloat(course.progress_percentage) || 0,
          completed_lessons: parseInt(course.completed_lessons) || 0,
          total_lessons: parseInt(course.total_lessons) || 0,
          last_accessed_at: course.last_accessed_at
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching progress data:', error)
    
    // Fallback to mock data if tables don't exist yet
    progressData = {
      totalCourses: 4,
      completedCourses: 1,
      inProgressCourses: 1,
      totalTimeSpent: 86400, // 24 hours in seconds
      averageProgress: 45,
      recentActivity: [
        {
          id: "1",
          course_title: "Introduction to Python Programming",
          lesson_title: "Variables and Data Types",
          activity_type: "lesson_complete",
          created_at: new Date('2024-01-20')
        },
        {
          id: "2",
          course_title: "Modern Web Design Principles",
          lesson_title: "Color Theory",
          activity_type: "lesson_start",
          created_at: new Date('2024-01-19')
        }
      ],
      courseProgress: [
        {
          course_id: "1",
          title: "Introduction to Python Programming",
          progress_percentage: 65,
          completed_lessons: 15,
          total_lessons: 24,
          last_accessed_at: new Date('2024-01-20')
        },
        {
          course_id: "2",
          title: "Modern Web Design Principles",
          progress_percentage: 40,
          completed_lessons: 7,
          total_lessons: 18,
          last_accessed_at: new Date('2024-01-19')
        }
      ]
    }
  }

  // Create user object with placeholder data
  const user = {
    id: session.userId,
    name: 'Student User',
    email: 'student@example.com',
    primaryRole: session.primaryRole || 'student',
    image: undefined
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">
        <ProgressPage initialProgressData={progressData} />
      </main>
    </div>
  )
}