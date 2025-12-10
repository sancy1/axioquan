
// /components/dashboard/my-courses.tsx

'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

// Define the course interface with progress_percentage
interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  difficulty_level: string;
  duration: string;
  category: string;
  status: 'in-progress' | 'completed';
  progress: number;
  progress_percentage: number;
  slug?: string;
  thumbnail_url?: string;
  total_lessons?: number;
  instructor_name?: string;
  completed_lessons?: number;
  total_lessons_count?: number;
  last_accessed_at?: Date;
  total_time_spent?: number;
}

interface MyCoursesPageProps {
  initialCourses: Course[];
}

const categoryColors: Record<string, string> = {
  Programming: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  Business: "bg-green-100 text-green-700",
  General: "bg-gray-100 text-gray-700",
  "Data Science": "bg-orange-100 text-orange-700",
  "Web Development": "bg-indigo-100 text-indigo-700",
  "Mobile Development": "bg-pink-100 text-pink-700",
}

const levelColors: Record<string, { badge: string; text: string }> = {
  Beginner: { badge: "bg-green-100", text: "text-green-700" },
  Intermediate: { badge: "bg-amber-100", text: "text-amber-700" },
  Advanced: { badge: "bg-red-100", text: "text-red-700" },
  beginner: { badge: "bg-green-100", text: "text-green-700" },
  intermediate: { badge: "bg-amber-100", text: "text-amber-700" },
  advanced: { badge: "bg-red-100", text: "text-red-700" },
}

export default function MyCoursesPage({ initialCourses }: MyCoursesPageProps) {
  const [filter, setFilter] = useState("all")
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isLoading, setIsLoading] = useState(initialCourses.length === 0)

  // DEBUG: Log the actual course data
  useEffect(() => {
    console.log("📊 MyCourses Component - Course Data:", {
      totalCourses: initialCourses.length,
      courses: initialCourses.map(c => ({
        id: c.id,
        title: c.title,
        progress_percentage: c.progress_percentage,
        status: c.status,
        progress: c.progress
      }))
    })
  }, [initialCourses])

  // FIXED: Calculate stats from REAL progress_percentage data with precise logic
  const inProgress = courses.filter((c) => {
    // In Progress: greater than 0% but less than 100%
    return c.progress_percentage > 0 && c.progress_percentage < 100;
  }).length;
  
  const completed = courses.filter((c) => {
    // Completed: exactly 100% - using Math.floor to handle floating point numbers
    return Math.floor(c.progress_percentage) === 100;
  }).length;
  
  const total = courses.length;

  console.log("📈 Calculated Stats:", { inProgress, completed, total });

  const filteredCourses = courses.filter((course) => {
    if (filter === "in-progress") {
      return course.progress_percentage > 0 && course.progress_percentage < 100;
    }
    if (filter === "completed") {
      return Math.floor(course.progress_percentage) === 100;
    }
    return true;
  });

  // Format duration for display
  const formatDuration = (duration: string) => {
    return duration;
  }

  // Format time spent for display
  const formatTimeSpent = (seconds: number = 0) => {
    if (!seconds) return "0m"
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  // Get category color with fallback
  const getCategoryColor = (category: string) => {
    return categoryColors[category] || "bg-gray-100 text-gray-700";
  }

  // Get level color with fallback
  const getLevelColor = (level: string) => {
    return levelColors[level] || levelColors[level.toLowerCase()] || { badge: "bg-gray-100", text: "text-gray-700" };
  }

  // Get progress color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return "from-gray-400 to-gray-500"
    if (percentage < 30) return "from-red-500 to-red-600"
    if (percentage < 70) return "from-yellow-500 to-yellow-600"
    if (percentage < 100) return "from-blue-500 to-blue-600"
    return "from-green-500 to-green-600"
  }

  // Get status badge based on progress
  const getStatusBadge = (progressPercentage: number) => {
    if (Math.floor(progressPercentage) === 100) {
      return { text: "Completed", class: "bg-green-100 text-green-800" }
    } else if (progressPercentage > 0) {
      return { text: "In Progress", class: "bg-blue-100 text-blue-800" }
    } else {
      return { text: "Not Started", class: "bg-gray-100 text-gray-800" }
    }
  }

  // Show loading state if no courses initially
  if (isLoading && courses.length === 0) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Track your learning journey and manage your enrolled courses</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">Track your learning journey and manage your enrolled courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">▶</div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">{inProgress}</p>
          <p className="text-sm text-gray-600 mt-1">In Progress</p>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">✓</div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-green-600">{completed}</p>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">🏷</div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">{total}</p>
          <p className="text-sm text-gray-600 mt-1">Total Enrolled</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
        <button
          onClick={() => setFilter("in-progress")}
          className={`px-4 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
            filter === "in-progress" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          In Progress ({inProgress})
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
            filter === "completed" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          Completed ({completed})
        </button>
        
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full font-medium text-sm md:text-base transition-all ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"
          }`}
        >
          All Courses ({total})
        </button>
      </div>

      {/* Course cards grid */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {filteredCourses.map((course) => {
          const levelColor = getLevelColor(course.level)
          const categoryColor = getCategoryColor(course.category)
          const progressColor = getProgressColor(course.progress_percentage)
          const statusBadge = getStatusBadge(course.progress_percentage)
          const isCompleted = Math.floor(course.progress_percentage) === 100

          return (
            <div
              key={course.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {/* Course Icon/Thumbnail */}
                <div className="flex-shrink-0 relative">
                  {course.thumbnail_url ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl md:text-4xl">
                      📚
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`absolute -top-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${statusBadge.class}`}>
                    {statusBadge.text}
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${levelColor.badge} ${levelColor.text}`}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">📅</span>
                      <span className="text-gray-700 font-medium">{formatDuration(course.duration)}</span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                        {course.category}
                      </span>
                    </div>
                    {course.total_lessons_count && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">📚</span>
                        <span className="text-gray-700 font-medium">
                          {course.completed_lessons || 0}/{course.total_lessons_count} lessons
                        </span>
                      </div>
                    )}
                    {course.total_time_spent && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">⏱️</span>
                        <span className="text-gray-700 font-medium">
                          {formatTimeSpent(course.total_time_spent)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs md:text-sm font-medium text-gray-900">Progress</span>
                      <span className="text-xs md:text-sm font-medium text-gray-900">
                        {course.progress_percentage}% complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${progressColor} h-2.5 rounded-full transition-all`}
                        style={{ width: `${course.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link 
                      href={`/courses/learn/${course.id}`} 
                      className="flex-1"
                    >
                      <button className={`w-full px-4 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                        isCompleted 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}>
                        {isCompleted ? "Review Course" : 
                         course.progress_percentage > 0 ? "Continue Learning" : "Start Learning"}
                      </button>
                    </Link>
                    
                    {isCompleted ? (
                      <Link 
                        href={`/dashboard/certificates`} 
                        className="flex-1"
                      >
                        <button className="w-full border border-green-600 text-green-600 px-4 py-2.5 rounded-lg font-medium hover:bg-green-50 transition-colors text-sm">
                          View Certificate
                        </button>
                      </Link>
                    ) : (
                      <Link 
                        href={`/courses/quiz/${course.id}`} 
                        className="flex-1"
                      >
                        <button className="w-full border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                          Take Quiz
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {filter === "all" 
              ? "You haven't enrolled in any courses yet. Start your learning journey by exploring our course catalog."
              : `You don't have any ${filter === "in-progress" ? "courses in progress" : "completed courses"} yet.`
            }
          </p>
          {filter === "all" && (
            <Link href="/courses">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                Browse Courses
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Debug info - Remove this section once everything works */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
      
          </div>
        </div>
     
  )
}