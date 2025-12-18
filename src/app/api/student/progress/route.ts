
// // /app/api/student/progress/route.ts

// import { NextRequest } from 'next/server'
// import { getSession } from '@/lib/auth/session'

// export async function GET(request: NextRequest) {
//   try {
//     const session = await getSession()
    
//     if (!session || !session.userId) {
//       return Response.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     // Mock data - replace with actual database queries later
//     const progressData = {
//       coursesInProgress: 3,
//       hoursLearned: 24,
//       certificatesEarned: 2,
//       currentStreak: 7,
//       weeklyGoal: { completed: 5, target: 7 },
//       courses: [
//         {
//           id: 1,
//           title: "Introduction to Python Programming",
//           category: "Programming",
//           progress: 85,
//           lastUpdated: "2 days ago",
//           nextLesson: "Advanced Functions",
//         },
//         {
//           id: 2,
//           title: "Modern Web Design Principles",
//           category: "Design",
//           progress: 60,
//           lastUpdated: "Today",
//           nextLesson: "Responsive Design",
//         },
//         {
//           id: 3,
//           title: "Data Structures and Algorithms",
//           category: "Programming",
//           progress: 25,
//           lastUpdated: "5 days ago",
//           nextLesson: "Linked Lists",
//         },
//       ],
//       achievements: [
//         { id: 1, name: "Python Basics", icon: "🐍", description: "Completed Python fundamentals module" },
//         { id: 2, name: "Quiz Master", icon: "🏆", description: "Scored 100% on 5 quizzes" },
//         { id: 3, name: "Week Warrior", icon: "⚡", description: "Learned 7 days in a row" },
//       ]
//     }

//     return Response.json(progressData)

//   } catch (error) {
//     console.error('Student progress API error:', error)
//     return Response.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

















// import { NextRequest, NextResponse } from 'next/server'
// import { sql } from '@/lib/db'

// // Helper to get user from session (using your existing auth system)
// async function getCurrentUser(request: NextRequest) {
//   // Get session from your existing auth system
//   // This is a simplified version - adapt to your actual auth system
//   const authHeader = request.headers.get('authorization')
//   const cookieHeader = request.headers.get('cookie')
  
//   // You'll need to implement this based on your actual auth system
//   // For now, this is a mock implementation
//   try {
//     // If you have a way to get user from session, implement it here
//     // This should match how your existing auth system works
//     return { id: 'mock-user-id', email: 'user@example.com' }
//   } catch (error) {
//     return null
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const user = await getCurrentUser(request)
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { courseId, lessonId, completed, progress, timeSpent, lastPosition } = await request.json()

//     if (!courseId || !lessonId) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
//     }

//     // Use mock user ID for now - replace with actual user ID from your auth
//     const userId = user.id

//     // Get enrollment ID
//     const enrollments = await sql`
//       SELECT id FROM enrollments 
//       WHERE user_id = ${userId} AND course_id = ${courseId}
//     `
//     let enrollmentId
//     if (enrollments.length === 0) {
//       // Create enrollment if it doesn't exist
//       const newEnrollments = await sql`
//         INSERT INTO enrollments (user_id, course_id, enrolled_at, status)
//         VALUES (${userId}, ${courseId}, NOW(), 'active')
//         RETURNING id
//       `
//       enrollmentId = newEnrollments[0].id
//     } else {
//       enrollmentId = enrollments[0].id
//     }

//     // Check if progress record exists
//     const existingProgress = await sql`
//       SELECT id FROM user_progress 
//       WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//     `

//     if (existingProgress.length > 0) {
//       // Update existing progress
//       await sql`
//         UPDATE user_progress SET
//           is_completed = ${completed || false},
//           completed_at = ${completed ? new Date().toISOString() : null},
//           last_accessed_at = NOW(),
//           time_spent = COALESCE(${timeSpent}, time_spent),
//           video_progress = COALESCE(${progress}, video_progress),
//           last_position = COALESCE(${lastPosition}, last_position),
//           completion_status = ${completed ? 'completed' : 'in_progress'}
//         WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//       `
//     } else {
//       // Create new progress record
//       await sql`
//         INSERT INTO user_progress (
//           user_id, lesson_id, course_id, enrollment_id,
//           is_completed, completed_at, last_accessed_at,
//           time_spent, video_progress, last_position, completion_status
//         ) VALUES (
//           ${userId}, ${lessonId}, ${courseId}, ${enrollmentId},
//           ${completed || false}, 
//           ${completed ? new Date().toISOString() : null},
//           NOW(),
//           ${timeSpent || 0},
//           ${progress || 0},
//           ${lastPosition || 0},
//           ${completed ? 'completed' : 'in_progress'}
//         )
//       `
//     }

//     // Update enrollment progress
//     await updateEnrollmentProgress(userId, courseId, enrollmentId)

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Error saving progress:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// async function updateEnrollmentProgress(userId: string, courseId: string, enrollmentId: string) {
//   // Calculate overall course progress
//   const progressData = await sql`
//     SELECT 
//       COUNT(*) as total_lessons,
//       COUNT(CASE WHEN up.is_completed THEN 1 END) as completed_lessons,
//       COALESCE(SUM(up.time_spent), 0) as total_time_spent
//     FROM lessons l
//     LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ${userId}
//     WHERE l.course_id = ${courseId}
//   `

//   const totalLessons = parseInt(progressData[0].total_lessons) || 0
//   const completedLessons = parseInt(progressData[0].completed_lessons) || 0
//   const totalTimeSpent = parseInt(progressData[0].total_time_spent) || 0
//   const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

//   // Update enrollment
//   await sql`
//     UPDATE enrollments SET
//       progress_percentage = ${progressPercentage},
//       completed_lessons = ${completedLessons},
//       total_lessons = ${totalLessons},
//       total_time_spent = ${totalTimeSpent},
//       last_accessed_at = NOW(),
//       last_activity_at = NOW(),
//       ${completedLessons === totalLessons && totalLessons > 0 ? sql`
//         completed_at = NOW(),
//         status = 'completed'
//       ` : sql`
//         status = 'active'
//       `}
//     WHERE id = ${enrollmentId}
//   `
// }

// export async function GET(request: NextRequest) {
//   try {
//     const user = await getCurrentUser(request)
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { searchParams } = new URL(request.url)
//     const courseId = searchParams.get('courseId')

//     if (!courseId) {
//       return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
//     }

//     // Use mock user ID for now - replace with actual user ID from your auth
//     const userId = user.id

//     // Get user progress for this course
//     const progress = await sql`
//       SELECT 
//         up.lesson_id,
//         up.is_completed,
//         up.completed_at,
//         up.time_spent,
//         up.video_progress,
//         up.last_position,
//         up.completion_status,
//         up.last_accessed_at
//       FROM user_progress up
//       JOIN lessons l ON up.lesson_id = l.id
//       WHERE up.user_id = ${userId} AND l.course_id = ${courseId}
//     `

//     const progressMap = progress.reduce((acc, item) => {
//       acc[item.lesson_id] = {
//         completed: item.is_completed,
//         completed_at: item.completed_at,
//         time_spent: item.time_spent,
//         progress: item.video_progress,
//         last_position: item.last_position,
//         status: item.completion_status,
//         last_accessed: item.last_accessed_at
//       }
//       return acc
//     }, {})

//     return NextResponse.json({ progress: progressMap })
//   } catch (error) {
//     console.error('Error fetching progress:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }


















// // /app/api/student/progress/route.ts

// import { NextRequest, NextResponse } from 'next/server'
// import { sql } from '@/lib/db'

// // TEMPORARY: Using real user ID for testing
// // Replace this with your actual authentication later
// async function getCurrentUser() {
//   try {
//     // TEMPORARY: Using the real user ID you found
//     return { id: '0fd07c1d-685a-48a8-bd37-160d13874cd6', email: 'real-user@example.com' }
    
//     // TODO: Later implement your actual authentication:
//     // const session = await getYourSession()
//     // if (!session?.user) return null
//     // return { id: session.user.id, email: session.user.email }
//   } catch (error) {
//     console.error('Auth error:', error)
//     return null
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const user = await getCurrentUser()
//     console.log('🔐 Current user:', user)
    
//     if (!user) {
//       console.error('❌ No user found - authentication required')
//       return NextResponse.json({ error: 'Unauthorized - please log in' }, { status: 401 })
//     }

//     const body = await request.json()
//     console.log('📦 Received progress data:', body)
    
//     const { courseId, lessonId, completed, progress, timeSpent, lastPosition } = body

//     if (!courseId || !lessonId) {
//       console.error('❌ Missing required fields:', { courseId, lessonId })
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
//     }

//     const userId = user.id
//     console.log('👤 Using user ID:', userId)

//     // Get or create enrollment
//     const enrollments = await sql`
//       SELECT id FROM enrollments 
//       WHERE user_id = ${userId} AND course_id = ${courseId}
//     `
    
//     let enrollmentId
//     if (enrollments.length === 0) {
//       console.log('📝 Creating new enrollment for user:', userId)
//       const newEnrollments = await sql`
//         INSERT INTO enrollments (user_id, course_id, enrolled_at, status)
//         VALUES (${userId}, ${courseId}, NOW(), 'active')
//         RETURNING id
//       `
//       enrollmentId = newEnrollments[0].id
//       console.log('✅ Created enrollment:', enrollmentId)
//     } else {
//       enrollmentId = enrollments[0].id
//       console.log('📖 Found existing enrollment:', enrollmentId)
//     }

//     // Check if progress record exists
//     const existingProgress = await sql`
//       SELECT id, is_completed, video_progress 
//       FROM user_progress 
//       WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//     `

//     if (existingProgress.length > 0) {
//       console.log('🔄 Updating existing progress record')
//       const result = await sql`
//         UPDATE user_progress SET
//           is_completed = ${completed || false},
//           completed_at = ${completed ? new Date().toISOString() : null},
//           last_accessed_at = NOW(),
//           time_spent = COALESCE(${timeSpent}, time_spent),
//           video_progress = COALESCE(${progress}, video_progress),
//           last_position = COALESCE(${lastPosition}, last_position),
//           completion_status = ${completed ? 'completed' : 'in_progress'}
//         WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//         RETURNING *
//       `
//       console.log('✅ Progress updated successfully:', result[0])
//     } else {
//       console.log('🆕 Creating new progress record')
//       const result = await sql`
//         INSERT INTO user_progress (
//           user_id, lesson_id, course_id, enrollment_id,
//           is_completed, completed_at, last_accessed_at,
//           time_spent, video_progress, last_position, completion_status
//         ) VALUES (
//           ${userId}, ${lessonId}, ${courseId}, ${enrollmentId},
//           ${completed || false}, 
//           ${completed ? new Date().toISOString() : null},
//           NOW(),
//           ${timeSpent || 0},
//           ${progress || 0},
//           ${lastPosition || 0},
//           ${completed ? 'completed' : 'in_progress'}
//         )
//         RETURNING *
//       `
//       console.log('✅ Progress created successfully:', result[0])
//     }

//     // Update enrollment progress
//     await updateEnrollmentProgress(userId, courseId, enrollmentId)

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Progress saved successfully',
//       data: {
//         userId,
//         courseId,
//         lessonId,
//         completed,
//         progress,
//         enrollmentId
//       }
//     })
//   } catch (error) {
//     console.error('❌ Database error saving progress:', error)
    
//     let errorMessage = 'Internal server error'
//     if (error instanceof Error) {
//       errorMessage = error.message
//     }
    
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 }
//     )
//   }
// }

// async function updateEnrollmentProgress(userId: string, courseId: string, enrollmentId: string) {
//   try {
//     console.log('📊 Updating enrollment progress...')
    
//     const progressData = await sql`
//       SELECT 
//         COUNT(*) as total_lessons,
//         COUNT(CASE WHEN up.is_completed THEN 1 END) as completed_lessons,
//         COALESCE(SUM(up.time_spent), 0) as total_time_spent
//       FROM lessons l
//       LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ${userId}
//       WHERE l.course_id = ${courseId}
//     `

//     const totalLessons = parseInt(progressData[0].total_lessons) || 0
//     const completedLessons = parseInt(progressData[0].completed_lessons) || 0
//     const totalTimeSpent = parseInt(progressData[0].total_time_spent) || 0
//     const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

//     console.log('📈 Progress stats:', {
//       totalLessons,
//       completedLessons,
//       progressPercentage,
//       totalTimeSpent
//     })

//     const result = await sql`
//       UPDATE enrollments SET
//         progress_percentage = ${progressPercentage},
//         completed_lessons = ${completedLessons},
//         total_lessons = ${totalLessons},
//         total_time_spent = ${totalTimeSpent},
//         last_accessed_at = NOW(),
//         last_activity_at = NOW(),
//         ${completedLessons === totalLessons && totalLessons > 0 ? sql`
//           completed_at = NOW(),
//           status = 'completed'
//         ` : sql`
//           status = 'active'
//         `}
//       WHERE id = ${enrollmentId}
//       RETURNING *
//     `
    
//     console.log('✅ Enrollment progress updated:', result[0])
//   } catch (error) {
//     console.error('❌ Error updating enrollment progress:', error)
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const user = await getCurrentUser()
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { searchParams } = new URL(request.url)
//     const courseId = searchParams.get('courseId')

//     if (!courseId) {
//       return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
//     }

//     const userId = user.id

//     const progress = await sql`
//       SELECT 
//         up.lesson_id,
//         up.is_completed,
//         up.completed_at,
//         up.time_spent,
//         up.video_progress,
//         up.last_position,
//         up.completion_status,
//         up.last_accessed_at
//       FROM user_progress up
//       JOIN lessons l ON up.lesson_id = l.id
//       WHERE up.user_id = ${userId} AND l.course_id = ${courseId}
//     `

//     const progressMap = progress.reduce((acc, item) => {
//       acc[item.lesson_id] = {
//         completed: item.is_completed,
//         completed_at: item.completed_at,
//         time_spent: item.time_spent,
//         progress: item.video_progress,
//         last_position: item.last_position,
//         status: item.completion_status,
//         last_accessed: item.last_accessed_at
//       }
//       return acc
//     }, {})

//     console.log('📥 Loaded progress for user:', userId, 'course:', courseId, 'lessons:', Object.keys(progressMap).length)

//     return NextResponse.json({ 
//       progress: progressMap,
//       user: { id: userId },
//       courseId 
//     })
//   } catch (error) {
//     console.error('Error fetching progress:', error)
    
//     let errorMessage = 'Internal server error'
//     if (error instanceof Error) {
//       errorMessage = error.message
//     }
    
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 }
//     )
//   }
// }























// // /app/api/student/progress/route.ts

// import { NextRequest, NextResponse } from 'next/server'
// import { sql } from '@/lib/db'

// // TEMPORARY: Using real user ID for testing
// async function getCurrentUser() {
//   try {
//     // TEMPORARY: Using the real user ID you found
//     return { id: '0fd07c1d-685a-48a8-bd37-160d13874cd6', email: 'real-user@example.com' }
//   } catch (error) {
//     console.error('Auth error:', error)
//     return null
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const user = await getCurrentUser()
//     console.log('🔐 Current user:', user)
    
//     if (!user) {
//       console.error('❌ No user found - authentication required')
//       return NextResponse.json({ error: 'Unauthorized - please log in' }, { status: 401 })
//     }

//     const body = await request.json()
//     console.log('📦 Received progress data:', body)
    
//     const { courseId, lessonId, completed, progress, timeSpent, lastPosition } = body

//     if (!courseId || !lessonId) {
//       console.error('❌ Missing required fields:', { courseId, lessonId })
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
//     }

//     const userId = user.id
//     console.log('👤 Using user ID:', userId)

//     // Get or create enrollment
//     const enrollments = await sql`
//       SELECT id FROM enrollments 
//       WHERE user_id = ${userId} AND course_id = ${courseId}
//     `
    
//     let enrollmentId
//     if (enrollments.length === 0) {
//       console.log('📝 Creating new enrollment for user:', userId)
//       const newEnrollments = await sql`
//         INSERT INTO enrollments (user_id, course_id, enrolled_at, status)
//         VALUES (${userId}, ${courseId}, NOW(), 'active')
//         RETURNING id
//       `
//       enrollmentId = newEnrollments[0].id
//       console.log('✅ Created enrollment:', enrollmentId)
//     } else {
//       enrollmentId = enrollments[0].id
//       console.log('📖 Found existing enrollment:', enrollmentId)
//     }

//     // Check if progress record exists
//     const existingProgress = await sql`
//       SELECT id, is_completed, video_progress, time_spent 
//       FROM user_progress 
//       WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//     `

//     if (existingProgress.length > 0) {
//       console.log('🔄 Updating existing progress record')
      
//       // Calculate total time spent for this lesson
//       const currentTimeSpent = existingProgress[0].time_spent || 0
//       const newTimeSpent = currentTimeSpent + (timeSpent || 0)
      
//       const result = await sql`
//         UPDATE user_progress SET
//           is_completed = ${completed || false},
//           completed_at = ${completed ? new Date().toISOString() : null},
//           last_accessed_at = NOW(),
//           time_spent = ${newTimeSpent},
//           video_progress = COALESCE(${progress}, video_progress),
//           last_position = COALESCE(${lastPosition}, last_position),
//           completion_status = ${completed ? 'completed' : 'in_progress'}
//         WHERE user_id = ${userId} AND lesson_id = ${lessonId}
//         RETURNING *
//       `
//       console.log('✅ Progress updated successfully:', result[0])
//     } else {
//       console.log('🆕 Creating new progress record')
//       const result = await sql`
//         INSERT INTO user_progress (
//           user_id, lesson_id, course_id, enrollment_id,
//           is_completed, completed_at, last_accessed_at,
//           time_spent, video_progress, last_position, completion_status
//         ) VALUES (
//           ${userId}, ${lessonId}, ${courseId}, ${enrollmentId},
//           ${completed || false}, 
//           ${completed ? new Date().toISOString() : null},
//           NOW(),
//           ${timeSpent || 0},
//           ${progress || 0},
//           ${lastPosition || 0},
//           ${completed ? 'completed' : 'in_progress'}
//         )
//         RETURNING *
//       `
//       console.log('✅ Progress created successfully:', result[0])
//     }

//     // NEW: Calculate and update total_time_spent in enrollments
//     await updateTotalTimeSpent(userId, courseId, enrollmentId)

//     // Update enrollment progress
//     await updateEnrollmentProgress(userId, courseId, enrollmentId)

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Progress saved successfully',
//       data: {
//         userId,
//         courseId,
//         lessonId,
//         completed,
//         progress,
//         enrollmentId
//       }
//     })
//   } catch (error) {
//     console.error('❌ Database error saving progress:', error)
    
//     let errorMessage = 'Internal server error'
//     if (error instanceof Error) {
//       errorMessage = error.message
//     }
    
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 }
//     )
//   }
// }

// // NEW FUNCTION: Update total_time_spent in enrollments
// async function updateTotalTimeSpent(userId: string, courseId: string, enrollmentId: string) {
//   try {
//     console.log('⏱️ Calculating total_time_spent for enrollment:', enrollmentId)
    
//     // Calculate total time spent across all lessons in this course
//     const totalTimeResult = await sql`
//       SELECT COALESCE(SUM(time_spent), 0) as total_course_time
//       FROM user_progress 
//       WHERE user_id = ${userId} AND course_id = ${courseId}
//     `

//     const totalTimeSpent = parseInt(totalTimeResult[0]?.total_course_time) || 0

//     console.log(`📊 Total time spent for course ${courseId}: ${totalTimeSpent} seconds`)

//     // Update enrollments table with total time spent
//     await sql`
//       UPDATE enrollments 
//       SET total_time_spent = ${totalTimeSpent},
//           last_activity_at = NOW()
//       WHERE id = ${enrollmentId}
//     `

//     console.log(`✅ Updated total_time_spent for enrollment ${enrollmentId}: ${totalTimeSpent} seconds (${Math.floor(totalTimeSpent / 3600)} hours)`)
//   } catch (error) {
//     console.error('❌ Error updating total_time_spent:', error)
//   }
// }

// async function updateEnrollmentProgress(userId: string, courseId: string, enrollmentId: string) {
//   try {
//     console.log('📊 Updating enrollment progress...')
    
//     const progressData = await sql`
//       SELECT 
//         COUNT(*) as total_lessons,
//         COUNT(CASE WHEN up.is_completed THEN 1 END) as completed_lessons,
//         COALESCE(SUM(up.time_spent), 0) as total_time_spent
//       FROM lessons l
//       LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ${userId}
//       WHERE l.course_id = ${courseId}
//     `

//     const totalLessons = parseInt(progressData[0].total_lessons) || 0
//     const completedLessons = parseInt(progressData[0].completed_lessons) || 0
//     const totalTimeSpent = parseInt(progressData[0].total_time_spent) || 0
//     const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

//     console.log('📈 Progress stats:', {
//       totalLessons,
//       completedLessons,
//       progressPercentage,
//       totalTimeSpent
//     })

//     const result = await sql`
//       UPDATE enrollments SET
//         progress_percentage = ${progressPercentage},
//         completed_lessons = ${completedLessons},
//         total_lessons = ${totalLessons},
//         total_time_spent = ${totalTimeSpent},
//         last_accessed_at = NOW(),
//         last_activity_at = NOW(),
//         ${completedLessons === totalLessons && totalLessons > 0 ? sql`
//           completed_at = NOW(),
//           status = 'completed'
//         ` : sql`
//           status = 'active'
//         `}
//       WHERE id = ${enrollmentId}
//       RETURNING *
//     `
    
//     console.log('✅ Enrollment progress updated:', result[0])
//   } catch (error) {
//     console.error('❌ Error updating enrollment progress:', error)
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const user = await getCurrentUser()
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { searchParams } = new URL(request.url)
//     const courseId = searchParams.get('courseId')

//     if (!courseId) {
//       return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
//     }

//     const userId = user.id

//     const progress = await sql`
//       SELECT 
//         up.lesson_id,
//         up.is_completed,
//         up.completed_at,
//         up.time_spent,
//         up.video_progress,
//         up.last_position,
//         up.completion_status,
//         up.last_accessed_at
//       FROM user_progress up
//       JOIN lessons l ON up.lesson_id = l.id
//       WHERE up.user_id = ${userId} AND l.course_id = ${courseId}
//     `

//     const progressMap = progress.reduce((acc, item) => {
//       acc[item.lesson_id] = {
//         completed: item.is_completed,
//         completed_at: item.completed_at,
//         time_spent: item.time_spent,
//         progress: item.video_progress,
//         last_position: item.last_position,
//         status: item.completion_status,
//         last_accessed: item.last_accessed_at
//       }
//       return acc
//     }, {})

//     console.log('📥 Loaded progress for user:', userId, 'course:', courseId, 'lessons:', Object.keys(progressMap).length)

//     return NextResponse.json({ 
//       progress: progressMap,
//       user: { id: userId },
//       courseId 
//     })
//   } catch (error) {
//     console.error('Error fetching progress:', error)
    
//     let errorMessage = 'Internal server error'
//     if (error instanceof Error) {
//       errorMessage = error.message
//     }
    
//     return NextResponse.json(
//       { error: errorMessage },
//       { status: 500 }
//     )
//   }
// }

























// /app/api/student/progress/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    // Get the actual user session
    const session = await getSession()
    
    if (!session || !session.userId) {
      console.error('❌ No user session found - authentication required')
      return NextResponse.json({ error: 'Unauthorized - please log in' }, { status: 401 })
    }

    const body = await request.json()
    console.log('📦 Received progress data for user:', session.userId, 'data:', body)
    
    const { courseId, lessonId, completed, progress, timeSpent, lastPosition } = body

    if (!courseId || !lessonId) {
      console.error('❌ Missing required fields:', { courseId, lessonId })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const userId = session.userId
    console.log('👤 Using user ID from session:', userId)

    // Get or create enrollment
    const enrollments = await sql`
      SELECT id FROM enrollments 
      WHERE user_id = ${userId} AND course_id = ${courseId}
    `
    
    let enrollmentId
    if (enrollments.length === 0) {
      console.log('📝 Creating new enrollment for user:', userId)
      const newEnrollments = await sql`
        INSERT INTO enrollments (user_id, course_id, enrolled_at, status)
        VALUES (${userId}, ${courseId}, NOW(), 'active')
        RETURNING id
      `
      enrollmentId = newEnrollments[0].id
      console.log('✅ Created enrollment:', enrollmentId)
    } else {
      enrollmentId = enrollments[0].id
      console.log('📖 Found existing enrollment:', enrollmentId)
    }

    // Check if progress record exists
    const existingProgress = await sql`
      SELECT id, is_completed, video_progress, time_spent 
      FROM user_progress 
      WHERE user_id = ${userId} AND lesson_id = ${lessonId}
    `

    if (existingProgress.length > 0) {
      console.log('🔄 Updating existing progress record')
      
      // Calculate total time spent for this lesson
      const currentTimeSpent = existingProgress[0].time_spent || 0
      const newTimeSpent = currentTimeSpent + (timeSpent || 0)
      
      const result = await sql`
        UPDATE user_progress SET
          is_completed = ${completed || false},
          completed_at = ${completed ? new Date().toISOString() : null},
          last_accessed_at = NOW(),
          time_spent = ${newTimeSpent},
          video_progress = COALESCE(${progress}, video_progress),
          last_position = COALESCE(${lastPosition}, last_position),
          completion_status = ${completed ? 'completed' : 'in_progress'}
        WHERE user_id = ${userId} AND lesson_id = ${lessonId}
        RETURNING *
      `
      console.log('✅ Progress updated successfully:', result[0])
    } else {
      console.log('🆕 Creating new progress record')
      const result = await sql`
        INSERT INTO user_progress (
          user_id, lesson_id, course_id, enrollment_id,
          is_completed, completed_at, last_accessed_at,
          time_spent, video_progress, last_position, completion_status
        ) VALUES (
          ${userId}, ${lessonId}, ${courseId}, ${enrollmentId},
          ${completed || false}, 
          ${completed ? new Date().toISOString() : null},
          NOW(),
          ${timeSpent || 0},
          ${progress || 0},
          ${lastPosition || 0},
          ${completed ? 'completed' : 'in_progress'}
        )
        RETURNING *
      `
      console.log('✅ Progress created successfully:', result[0])
    }

    // Calculate and update total_time_spent in enrollments
    await updateTotalTimeSpent(userId, courseId, enrollmentId)

    // Update enrollment progress
    await updateEnrollmentProgress(userId, courseId, enrollmentId)

    return NextResponse.json({ 
      success: true, 
      message: 'Progress saved successfully',
      data: {
        userId,
        courseId,
        lessonId,
        completed,
        progress,
        enrollmentId
      }
    })
  } catch (error) {
    console.error('❌ Database error saving progress:', error)
    
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// NEW FUNCTION: Update total_time_spent in enrollments
async function updateTotalTimeSpent(userId: string, courseId: string, enrollmentId: string) {
  try {
    console.log('⏱️ Calculating total_time_spent for enrollment:', enrollmentId)
    
    // Calculate total time spent across all lessons in this course
    const totalTimeResult = await sql`
      SELECT COALESCE(SUM(time_spent), 0) as total_course_time
      FROM user_progress 
      WHERE user_id = ${userId} AND course_id = ${courseId}
    `

    const totalTimeSpent = parseInt(totalTimeResult[0]?.total_course_time) || 0

    console.log(`📊 Total time spent for course ${courseId}: ${totalTimeSpent} seconds`)

    // Update enrollments table with total time spent
    await sql`
      UPDATE enrollments 
      SET total_time_spent = ${totalTimeSpent},
          last_activity_at = NOW()
      WHERE id = ${enrollmentId}
    `

    console.log(`✅ Updated total_time_spent for enrollment ${enrollmentId}: ${totalTimeSpent} seconds (${Math.floor(totalTimeSpent / 3600)} hours)`)
  } catch (error) {
    console.error('❌ Error updating total_time_spent:', error)
  }
}

async function updateEnrollmentProgress(userId: string, courseId: string, enrollmentId: string) {
  try {
    console.log('📊 Updating enrollment progress...')
    
    const progressData = await sql`
      SELECT 
        COUNT(*) as total_lessons,
        COUNT(CASE WHEN up.is_completed THEN 1 END) as completed_lessons,
        COALESCE(SUM(up.time_spent), 0) as total_time_spent
      FROM lessons l
      LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ${userId}
      WHERE l.course_id = ${courseId}
    `

    const totalLessons = parseInt(progressData[0].total_lessons) || 0
    const completedLessons = parseInt(progressData[0].completed_lessons) || 0
    const totalTimeSpent = parseInt(progressData[0].total_time_spent) || 0
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    console.log('📈 Progress stats:', {
      totalLessons,
      completedLessons,
      progressPercentage,
      totalTimeSpent
    })

    const result = await sql`
      UPDATE enrollments SET
        progress_percentage = ${progressPercentage},
        completed_lessons = ${completedLessons},
        total_lessons = ${totalLessons},
        total_time_spent = ${totalTimeSpent},
        last_accessed_at = NOW(),
        last_activity_at = NOW(),
        ${completedLessons === totalLessons && totalLessons > 0 ? sql`
          completed_at = NOW(),
          status = 'completed'
        ` : sql`
          status = 'active'
        `}
      WHERE id = ${enrollmentId}
      RETURNING *
    `
    
    console.log('✅ Enrollment progress updated:', result[0])
  } catch (error) {
    console.error('❌ Error updating enrollment progress:', error)
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the actual user session
    const session = await getSession()
    
    if (!session || !session.userId) {
      console.error('❌ No user session found - authentication required')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    const userId = session.userId

    const progress = await sql`
      SELECT 
        up.lesson_id,
        up.is_completed,
        up.completed_at,
        up.time_spent,
        up.video_progress,
        up.last_position,
        up.completion_status,
        up.last_accessed_at
      FROM user_progress up
      JOIN lessons l ON up.lesson_id = l.id
      WHERE up.user_id = ${userId} AND l.course_id = ${courseId}
    `

    // Use proper type for the accumulator
    const progressMap = progress.reduce((acc: Record<string, any>, item: any) => {
      acc[item.lesson_id] = {
        is_completed: item.is_completed,
        completed_at: item.completed_at,
        time_spent: item.time_spent,
        video_progress: item.video_progress,
        last_position: item.last_position,
        completion_status: item.completion_status,
        last_accessed_at: item.last_accessed_at
      }
      return acc
    }, {} as Record<string, any>)

    console.log('📥 Loaded progress for user:', userId, 'course:', courseId, 'lessons:', Object.keys(progressMap).length)

    return NextResponse.json({ 
      progress: progressMap,
      user: { id: userId },
      courseId 
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}