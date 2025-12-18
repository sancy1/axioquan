
// //  /app/courses/learn/[id]/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import CourseLearningPage from '@/components/courses/course-learning'

// interface LearnCoursePageProps {
//   params: {
//     id: string
//   }
// }

// export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
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
//       <Sidebar user={user} />
//       <CourseLearningPage courseId={params.id} />
//     </div>
//   )
// }
















// //  /app/courses/learn/[id]/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import CourseLearningPage from '@/components/courses/course-learning'
// import { sql } from '@/lib/db'
// import { redirect } from 'next/navigation'

// interface LearnCoursePageProps {
//   params: Promise<{ id: string }>
// }

// export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
//   const session = await getSession()
//   const { id } = await params
  
//   if (!session || !session.userId) {
//     redirect('/login')
//   }

//   // SIMPLE enrollment check
//   let isEnrolled = true // Default to true for now to avoid blocking
//   try {
//     const enrollment = await sql`
//       SELECT id FROM enrollments 
//       WHERE course_id = ${id} AND user_id = ${session.userId} AND status = 'active'
//       LIMIT 1
//     `
//     isEnrolled = enrollment.length > 0
//   } catch (error) {
//     console.log('Enrollments table might not exist, allowing access')
//     isEnrolled = true // Allow access during development
//   }

//   if (!isEnrolled) {
//     redirect(`/courses/${id}?error=not_enrolled`)
//   }

//   // SIMPLE curriculum fetch - only essential data
//   let courseData = null
//   let curriculumData = []
  
//   try {
//     // Get basic course info
//     const course = await sql`
//       SELECT 
//         c.id,
//         c.title,
//         c.short_description,
//         c.description_html,
//         u.name as instructor_name
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       WHERE c.id = ${id}
//       LIMIT 1
//     `

//     if (course.length > 0) {
//       courseData = course[0]

//       // Get ONLY essential curriculum data
//       const curriculum = await sql`
//         SELECT 
//           m.id as module_id,
//           m.title as module_title,
//           m.description as module_description,
//           m.order_index as module_order,
//           l.id as lesson_id,
//           l.title as lesson_title,
//           l.description as lesson_description,
//           l.content_type,
//           l.video_url,
//           l.order_index as lesson_order
//         FROM modules m
//         LEFT JOIN lessons l ON m.id = l.module_id
//         WHERE m.course_id = ${id}
//         ORDER BY m.order_index, l.order_index
//       `

//       // Simple grouping
//       const modulesMap = new Map()
      
//       curriculum.forEach((row: any) => {
//         if (!modulesMap.has(row.module_id)) {
//           modulesMap.set(row.module_id, {
//             id: row.module_id,
//             title: row.module_title,
//             description: row.module_description,
//             order: row.module_order,
//             lessons: []
//           })
//         }

//         if (row.lesson_id) {
//           modulesMap.get(row.module_id).lessons.push({
//             id: row.lesson_id,
//             title: row.lesson_title,
//             description: row.lesson_description,
//             contentType: row.content_type || 'video',
//             videoUrl: row.video_url,
//             duration: 1800, // Default 30 minutes
//             order: row.lesson_order
//           })
//         }
//       })

//       curriculumData = Array.from(modulesMap.values())
//     }
//   } catch (error: any) {
//     console.error('Error in learning portal:', error)
    
//     // Fallback data
//     courseData = {
//       id: id,
//       title: "Course Learning",
//       short_description: "Start your learning journey",
//       instructor_name: "Instructor"
//     }
    
//     curriculumData = [
//       {
//         id: "1",
//         title: "Getting Started",
//         description: "Begin your learning",
//         order: 1,
//         lessons: [
//           { 
//             id: "1-1", 
//             title: "Welcome to the Course", 
//             duration: 600, 
//             contentType: "video", 
//             videoUrl: null,
//             order: 1
//           }
//         ]
//       }
//     ]
//   }

//   const user = {
//     id: session.userId,
//     name: 'Student',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar user={user} />
//       <CourseLearningPage 
//         courseId={id}
//         courseData={courseData}
//         curriculumData={curriculumData}
//       />
//     </div>
//   )
// }






















// //  /app/courses/learn/[id]/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import CourseLearningPage from '@/components/courses/course-learning'
// import { sql } from '@/lib/db'
// import { redirect } from 'next/navigation'

// interface LearnCoursePageProps {
//   params: Promise<{ id: string }>
// }

// // This is the default export - must be a React component
// export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
//   const session = await getSession()
//   const { id } = await params
  
//   if (!session || !session.userId) {
//     redirect('/login')
//   }

//   // SIMPLE enrollment check
//   let isEnrolled = true
//   try {
//     const enrollment = await sql`
//       SELECT id FROM enrollments 
//       WHERE course_id = ${id} AND user_id = ${session.userId} AND status = 'active'
//       LIMIT 1
//     `
//     isEnrolled = enrollment.length > 0
//   } catch (error) {
//     console.log('Enrollments table might not exist, allowing access')
//     isEnrolled = true
//   }

//   if (!isEnrolled) {
//     redirect(`/courses/${id}?error=not_enrolled`)
//   }

//   // Fetch curriculum with VIDEO URLs
//   let courseData = null
//   let curriculumData = []
  
//   try {
//     // Get basic course info
//     const course = await sql`
//       SELECT 
//         c.id,
//         c.title,
//         c.short_description,
//         c.description_html,
//         u.name as instructor_name
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       WHERE c.id = ${id}
//       LIMIT 1
//     `

//     if (course.length > 0) {
//       courseData = course[0]

//       // Get curriculum with VIDEO data
//       const curriculum = await sql`
//         SELECT 
//           m.id as module_id,
//           m.title as module_title,
//           m.description as module_description,
//           m.order_index as module_order,
//           l.id as lesson_id,
//           l.title as lesson_title,
//           l.description as lesson_description,
//           l.content_type,
//           l.lesson_type,
//           l.video_url,
//           l.video_duration,
//           l.video_thumbnail,
//           l.document_url,
//           l.order_index as lesson_order,
//           l.is_preview
//         FROM modules m
//         LEFT JOIN lessons l ON m.id = l.module_id
//         WHERE m.course_id = ${id}
//         ORDER BY m.order_index, l.order_index
//       `

//       // Group lessons by modules
//       const modulesMap = new Map()
      
//       curriculum.forEach((row: any) => {
//         if (!modulesMap.has(row.module_id)) {
//           modulesMap.set(row.module_id, {
//             id: row.module_id,
//             title: row.module_title,
//             description: row.module_description,
//             order: row.module_order,
//             lessons: []
//           })
//         }

//         if (row.lesson_id) {
//           modulesMap.get(row.module_id).lessons.push({
//             id: row.lesson_id,
//             title: row.lesson_title,
//             description: row.lesson_description,
//             contentType: row.content_type,
//             lessonType: row.lesson_type,
//             videoUrl: row.video_url,
//             videoDuration: row.video_duration,
//             videoThumbnail: row.video_thumbnail,
//             documentUrl: row.document_url,
//             duration: row.video_duration || 1800,
//             order: row.lesson_order,
//             isPreview: row.is_preview
//           })
//         }
//       })

//       curriculumData = Array.from(modulesMap.values())
//     }
//   } catch (error: any) {
//     console.error('Error in learning portal:', error)
    
//     // Fallback data
//     courseData = {
//       id: id,
//       title: "Course Learning",
//       short_description: "Start your learning journey",
//       instructor_name: "Instructor"
//     }
    
//     curriculumData = [
//       {
//         id: "1",
//         title: "Getting Started",
//         description: "Begin your learning",
//         order: 1,
//         lessons: [
//           { 
//             id: "1-1", 
//             title: "Welcome to the Course", 
//             duration: 600, 
//             contentType: "video", 
//             lessonType: "video",
//             videoUrl: null,
//             videoDuration: 600,
//             order: 1
//           }
//         ]
//       }
//     ]
//   }

//   const user = {
//     id: session.userId,
//     name: 'Student',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   }

//   // Return the actual React component
//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar user={user} />
//       <CourseLearningPage 
//         courseId={id}
//         courseData={courseData}
//         curriculumData={curriculumData}
//       />
//     </div>
//   )
// }

























// // /src/app/courses/learn/[courseId]/page.tsx (FIXED)

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import CourseLearningPage from '@/components/courses/course-learning'
// import { sql } from '@/lib/db'
// import { redirect } from 'next/navigation'

// interface LearnCoursePageProps {
//   params: Promise<{ courseId: string }>
// }

// export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
//   const session = await getSession()
//   const { courseId } = await params

//   if (!session || !session.userId) {
//     redirect('/login')
//   }

//   // SIMPLE enrollment check
//   let isEnrolled = true
//   try {
//     const enrollment = await sql`
//       SELECT id FROM enrollments 
//       WHERE course_id = ${courseId} AND user_id = ${session.userId} AND status = 'active'
//       LIMIT 1
//     `
//     isEnrolled = enrollment.length > 0
//   } catch (error) {
//     console.log('Enrollments table might not exist, allowing access')
//     isEnrolled = true
//   }

//   if (!isEnrolled) {
//     redirect(`/courses/${courseId}?error=not_enrolled`)
//   }

//   // Fetch curriculum with VIDEO URLs
//   let courseData = null
//   let curriculumData: any[] = []

//   try {
//     const course = await sql`
//       SELECT 
//         c.id,
//         c.title,
//         c.short_description,
//         c.description_html,
//         u.name as instructor_name
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       WHERE c.id = ${courseId}
//       LIMIT 1
//     `

//     if (course.length > 0) {
//       courseData = course[0]

//       const curriculum = await sql`
//         SELECT 
//           m.id as module_id,
//           m.title as module_title,
//           m.description as module_description,
//           m.order_index as module_order,
//           l.id as lesson_id,
//           l.title as lesson_title,
//           l.description as lesson_description,
//           l.content_type,
//           l.lesson_type,
//           l.video_url,
//           l.video_duration,
//           l.video_thumbnail,
//           l.document_url,
//           l.order_index as lesson_order,
//           l.is_preview
//         FROM modules m
//         LEFT JOIN lessons l ON m.id = l.module_id
//         WHERE m.course_id = ${courseId}
//         ORDER BY m.order_index, l.order_index
//       `

//       const modulesMap = new Map()

//       curriculum.forEach((row: any) => {
//         if (!modulesMap.has(row.module_id)) {
//           modulesMap.set(row.module_id, {
//             id: row.module_id,
//             title: row.module_title,
//             description: row.module_description,
//             order: row.module_order,
//             lessons: []
//           })
//         }

//         if (row.lesson_id) {
//           modulesMap.get(row.module_id).lessons.push({
//             id: row.lesson_id,
//             title: row.lesson_title,
//             description: row.lesson_description,
//             contentType: row.content_type,
//             lessonType: row.lesson_type,
//             videoUrl: row.video_url,
//             videoDuration: row.video_duration,
//             videoThumbnail: row.video_thumbnail,
//             documentUrl: row.document_url,
//             duration: row.video_duration || 1800,
//             order: row.lesson_order,
//             isPreview: row.is_preview
//           })
//         }
//       })

//       curriculumData = Array.from(modulesMap.values())
//     }
//   } catch (error: any) {
//     console.error('Error in learning portal:', error)

//     courseData = {
//       id: courseId,
//       title: "Course Learning",
//       short_description: "Start your learning journey",
//       instructor_name: "Instructor"
//     }

//     curriculumData = [
//       {
//         id: "1",
//         title: "Getting Started",
//         description: "Begin your learning",
//         order: 1,
//         lessons: [
//           { 
//             id: "1-1", 
//             title: "Welcome to the Course", 
//             duration: 600, 
//             contentType: "video", 
//             lessonType: "video",
//             videoUrl: null,
//             videoDuration: 600,
//             order: 1
//           }
//         ]
//       }
//     ]
//   }

//   const user = {
//     id: session.userId,
//     name: 'Student',
//     email: 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar user={user} />
//       <CourseLearningPage 
//         courseId={courseId}
//         courseData={courseData}
//         curriculumData={curriculumData}
//       />
//     </div>
//   )
// }



















// // /src/app/courses/learn/[courseId]/page.tsx
// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import CourseLearningPage from '@/components/courses/course-learning'
// import { sql } from '@/lib/db'
// import { redirect } from 'next/navigation'
// import { getCourseResources } from '@/lib/courses/resources-actions';

// interface LearnCoursePageProps {
//   params: Promise<{ courseId: string }>
// }

// // Define proper type for user progress
// interface UserProgress {
//   [lessonId: string]: {
//     completed: boolean;
//     progress: number;
//     timeSpent: number;
//     lastPosition: number;
//     lastAccessedAt: string | null;
//   };
// }

// export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
//   const session = await getSession()
//   const { courseId } = await params

//   if (!session || !session.userId) {
//     redirect('/login')
//   }

//   // Check enrollment with session user ID
//   let isEnrolled = false
//   try {
//     const enrollment = await sql`
//       SELECT id FROM enrollments 
//       WHERE course_id = ${courseId} AND user_id = ${session.userId} AND status = 'active'
//       LIMIT 1
//     `
//     isEnrolled = enrollment.length > 0
//   } catch (error) {
//     console.error('Error checking enrollment:', error)
//     isEnrolled = false
//   }

//   if (!isEnrolled) {
//     redirect(`/courses/${courseId}?error=not_enrolled`)
//   }

//   // Fetch curriculum with VIDEO URLs
//   let courseData: any = null
//   let curriculumData: any[] = []

//   try {
//     const course = await sql`
//       SELECT 
//         c.id,
//         c.title,
//         c.short_description,
//         c.description_html,
//         u.name as instructor_name
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       WHERE c.id = ${courseId}
//       LIMIT 1
//     `

//     if (course.length > 0) {
//       courseData = course[0]

//       const curriculum = await sql`
//         SELECT 
//           m.id as module_id,
//           m.title as module_title,
//           m.description as module_description,
//           m.order_index as module_order,
//           l.id as lesson_id,
//           l.title as lesson_title,
//           l.description as lesson_description,
//           l.content_type,
//           l.lesson_type,
//           l.video_url,
//           l.video_duration,
//           l.video_thumbnail,
//           l.document_url,
//           l.order_index as lesson_order,
//           l.is_preview
//         FROM modules m
//         LEFT JOIN lessons l ON m.id = l.module_id
//         WHERE m.course_id = ${courseId}
//         ORDER BY m.order_index, l.order_index
//       `

//       const modulesMap = new Map()

//       curriculum.forEach((row: any) => {
//         if (!modulesMap.has(row.module_id)) {
//           modulesMap.set(row.module_id, {
//             id: row.module_id,
//             title: row.module_title,
//             description: row.module_description,
//             order: row.module_order,
//             lessons: []
//           })
//         }

//         if (row.lesson_id) {
//           modulesMap.get(row.module_id).lessons.push({
//             id: row.lesson_id,
//             title: row.lesson_title,
//             description: row.lesson_description,
//             contentType: row.content_type,
//             lessonType: row.lesson_type,
//             videoUrl: row.video_url,
//             videoDuration: row.video_duration,
//             videoThumbnail: row.video_thumbnail,
//             documentUrl: row.document_url,
//             duration: row.video_duration || 1800,
//             order: row.lesson_order,
//             isPreview: row.is_preview
//           })
//         }
//       })

//       curriculumData = Array.from(modulesMap.values())
//     }
//   } catch (error: any) {
//     console.error('Error in learning portal:', error)
//     // Fallback data
//     courseData = {
//       id: courseId,
//       title: "Course Learning",
//       short_description: "Start your learning journey",
//       instructor_name: "Instructor"
//     }
//     curriculumData = [
//       {
//         id: "1",
//         title: "Getting Started",
//         description: "Begin your learning",
//         order: 1,
//         lessons: [
//           { 
//             id: "1-1", 
//             title: "Welcome to the Course", 
//             duration: 600, 
//             contentType: "video", 
//             lessonType: "video",
//             videoUrl: null,
//             videoDuration: 600,
//             order: 1
//           }
//         ]
//       }
//     ]
//   }

//   // CRITICAL: Fetch user-specific progress using proper types
//   let userProgress: UserProgress = {}
//   try {
//     // Use the existing API endpoint but ensure it's user-specific
//     const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/student/progress?courseId=${courseId}`, {
//       headers: {
//         'Cookie': `axioquan-user=${encodeURIComponent(JSON.stringify(session))}`
//       },
//       cache: 'no-store'
//     })
    
//     if (response.ok) {
//       const data = await response.json()
      
//       // Transform the data to match our UserProgress type
//       if (data.progress && typeof data.progress === 'object') {
//         Object.entries(data.progress).forEach(([lessonId, lessonData]: [string, any]) => {
//           userProgress[lessonId] = {
//             completed: lessonData.is_completed || lessonData.completed || false,
//             progress: lessonData.video_progress || lessonData.progress || 0,
//             timeSpent: lessonData.time_spent || 0,
//             lastPosition: lessonData.last_position || 0,
//             lastAccessedAt: lessonData.last_accessed_at || lessonData.last_accessed || null
//           }
//         })
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching user progress:', error)
//   }

//   const user = {
//     id: session.userId,
//     name: session.name || 'Student',
//     email: session.email || 'student@example.com',
//     primaryRole: session.primaryRole || 'student',
//     image: session.image
//   }

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar user={user} />
//       <CourseLearningPage 
//         courseId={courseId}
//         courseData={courseData}
//         curriculumData={curriculumData}
//         userId={session.userId}
//         initialUserProgress={userProgress}
//       />
//     </div>
//   )
// }
























// /src/app/courses/learn/[courseId]/page.tsx
import { getSession } from '@/lib/auth/session'
import Sidebar from '@/components/dashboard/sidebar'
import CourseLearningPage from '@/components/courses/course-learning'
import { sql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { getCourseResources } from '@/lib/courses/resources-actions';

interface LearnCoursePageProps {
  params: Promise<{ courseId: string }>
}

// Define proper type for user progress
interface UserProgress {
  [lessonId: string]: {
    completed: boolean;
    progress: number;
    timeSpent: number;
    lastPosition: number;
    lastAccessedAt: string | null;
  };
}

export default async function LearnCoursePage({ params }: LearnCoursePageProps) {
  const session = await getSession()
  const { courseId } = await params

  if (!session || !session.userId) {
    redirect('/login')
  }

  // Check enrollment with session user ID
  let isEnrolled = false
  try {
    const enrollment = await sql`
      SELECT id FROM enrollments 
      WHERE course_id = ${courseId} AND user_id = ${session.userId} AND status = 'active'
      LIMIT 1
    `
    isEnrolled = enrollment.length > 0
  } catch (error) {
    console.error('Error checking enrollment:', error)
    isEnrolled = false
  }

  if (!isEnrolled) {
    redirect(`/courses/${courseId}?error=not_enrolled`)
  }

  // Fetch curriculum with VIDEO URLs
  let courseData: any = null
  let curriculumData: any[] = []

  try {
    const course = await sql`
      SELECT 
        c.id,
        c.title,
        c.short_description,
        c.description_html,
        u.name as instructor_name
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      WHERE c.id = ${courseId}
      LIMIT 1
    `

    if (course.length > 0) {
      courseData = course[0]

      const curriculum = await sql`
        SELECT 
          m.id as module_id,
          m.title as module_title,
          m.description as module_description,
          m.order_index as module_order,
          l.id as lesson_id,
          l.title as lesson_title,
          l.description as lesson_description,
          l.content_type,
          l.lesson_type,
          l.video_url,
          l.video_duration,
          l.video_thumbnail,
          l.document_url,
          l.order_index as lesson_order,
          l.is_preview
        FROM modules m
        LEFT JOIN lessons l ON m.id = l.module_id
        WHERE m.course_id = ${courseId}
        ORDER BY m.order_index, l.order_index
      `

      const modulesMap = new Map()

      curriculum.forEach((row: any) => {
        if (!modulesMap.has(row.module_id)) {
          modulesMap.set(row.module_id, {
            id: row.module_id,
            title: row.module_title,
            description: row.module_description,
            order: row.module_order,
            lessons: []
          })
        }

        if (row.lesson_id) {
          modulesMap.get(row.module_id).lessons.push({
            id: row.lesson_id,
            title: row.lesson_title,
            description: row.lesson_description,
            contentType: row.content_type,
            lessonType: row.lesson_type,
            videoUrl: row.video_url,
            videoDuration: row.video_duration,
            videoThumbnail: row.video_thumbnail,
            documentUrl: row.document_url,
            duration: row.video_duration || 1800,
            order: row.lesson_order,
            isPreview: row.is_preview
          })
        }
      })

      curriculumData = Array.from(modulesMap.values())
    }
  } catch (error: any) {
    console.error('Error in learning portal:', error)
    // Fallback data
    courseData = {
      id: courseId,
      title: "Course Learning",
      short_description: "Start your learning journey",
      instructor_name: "Instructor"
    }
    curriculumData = [
      {
        id: "1",
        title: "Getting Started",
        description: "Begin your learning",
        order: 1,
        lessons: [
          { 
            id: "1-1", 
            title: "Welcome to the Course", 
            duration: 600, 
            contentType: "video", 
            lessonType: "video",
            videoUrl: null,
            videoDuration: 600,
            order: 1
          }
        ]
      }
    ]
  }

  // CRITICAL: Fetch user-specific progress using proper types
  let userProgress: UserProgress = {}
  try {
    // Use the existing API endpoint but ensure it's user-specific
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/student/progress?courseId=${courseId}`, {
      headers: {
        'Cookie': `axioquan-user=${encodeURIComponent(JSON.stringify(session))}`
      },
      cache: 'no-store'
    })
    
    if (response.ok) {
      const data = await response.json()
      
      // Transform the data to match our UserProgress type
      if (data.progress && typeof data.progress === 'object') {
        Object.entries(data.progress).forEach(([lessonId, lessonData]: [string, any]) => {
          userProgress[lessonId] = {
            completed: lessonData.is_completed || lessonData.completed || false,
            progress: lessonData.video_progress || lessonData.progress || 0,
            timeSpent: lessonData.time_spent || 0,
            lastPosition: lessonData.last_position || 0,
            lastAccessedAt: lessonData.last_accessed_at || lessonData.last_accessed || null
          }
        })
      }
    }
  } catch (error) {
    console.error('Error fetching user progress:', error)
  }

  // CRITICAL: Fetch course resources
  let courseResources: any[] = []
  try {
    courseResources = await getCourseResources(courseId)
  } catch (error) {
    console.error('Error fetching course resources:', error)
  }

  const user = {
    id: session.userId,
    name: session.name || 'Student',
    email: session.email || 'student@example.com',
    primaryRole: session.primaryRole || 'student',
    image: session.image
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <CourseLearningPage 
        courseId={courseId}
        courseData={courseData}
        curriculumData={curriculumData}
        userId={session.userId}
        initialUserProgress={userProgress}
        courseResources={courseResources} // PASS RESOURCES TO COMPONENT
      />
    </div>
  )
}