
// /components/courses/course-learning.tsx

'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Settings,
  Maximize,
  Bookmark,
  CheckCircle2,
  BookOpen,
  Expand,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  LayoutDashboard,
  Menu,
  X,
  Clock,
  FileText,
  Video,
} from "lucide-react"

// --- INTERFACES ---

interface Lesson {
  id: string
  title: string
  description?: string
  duration: number
  contentType: string
  lessonType?: string // Added for better detection
  videoUrl?: string
  videoThumbnail?: string
  videoDuration?: number
  isPreview: boolean
  created_at?: string
  
  // Progress tracking
  watched?: number
  completed?: boolean
  bookmarks?: number[]
}

interface Module {
  id: string
  title: string
  description?: string
  order: number
  created_at?: string
  lessons: Lesson[]
  // Progress tracking
  progress?: number
}

interface CourseLearningProps {
  courseId: string
  courseData: any
  curriculumData: Module[]
  enrollmentData?: any
}

export default function CourseLearningPage({ 
  courseId, 
  courseData, 
  curriculumData, 
  enrollmentData 
}: CourseLearningProps) {
  const [currentModule, setCurrentModule] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [expandedModules, setExpandedModules] = useState<number[]>([0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
  const [notes, setNotes] = useState("")
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [userProgress, setUserProgress] = useState<{[key: string]: any}>({})
  const [videoDuration, setVideoDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  // CRITICAL FIX: Replace currentTime state with ref
  const currentTimeRef = useRef(0)
  const [, forceUpdate] = useState(0) // Used for UI updates only

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // === ONLY ADDITION: Database progress saving ===
  const [isSaving, setIsSaving] = useState(false)
  const lastSaveRef = useRef(0)

  // Load user progress on component mount
  useEffect(() => {
    loadUserProgress()
  }, [courseId])

  // === ONLY MODIFICATION: Enhanced loadUserProgress with database support ===
  const loadUserProgress = async () => {
    try {
      // Try to load from database first
      const response = await fetch(`/api/student/progress?courseId=${courseId}`)
      if (response.ok) {
        const data = await response.json()
        setUserProgress(data.progress || {})
      } else {
        // Fallback to localStorage
        const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress))
        }
      }
    } catch (error) {
      console.error('Error loading user progress:', error)
      // Fallback to localStorage
      const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress))
      }
    }
  }

  // === ONLY ADDITION: Save progress to database ===
  const saveProgressToDatabase = async (lessonId: string, progressData: {
    completed?: boolean
    progress?: number
    timeSpent?: number
    lastPosition?: number
  }) => {
    try {
      setIsSaving(true)
      
      const response = await fetch('/api/student/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          ...progressData
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || 'Failed to save progress')
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving progress to database:', error)
      // Save to localStorage as fallback
      localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(userProgress))
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  // === ONLY ADDITION: Auto-save progress ===
  useEffect(() => {
    const autoSaveProgress = async () => {
      const currentLessonData = getCurrentLessonData()
      if (!currentLessonData || !videoRef.current) return

      const currentTime = currentTimeRef.current
      const now = Date.now()

      // Calculate progress percentage for current lesson
      const currentProgressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
        ? (currentTime / (currentLessonData.duration || videoDuration)) * 100
        : 0

      // Only save if enough time has passed and we have meaningful progress
      if (now - lastSaveRef.current > 30000 && currentTime > 10) {
        try {
          await saveProgressToDatabase(currentLessonData.id, {
            progress: currentProgressPercentage,
            timeSpent: Math.floor(currentTime),
            lastPosition: Math.floor(currentTime)
          })
          lastSaveRef.current = now
        } catch (error) {
          console.error('Auto-save failed:', error)
        }
      }
    }

    const interval = setInterval(autoSaveProgress, 10000)
    return () => clearInterval(interval)
  }, [courseId, videoDuration])

  // === YOUR EXACT ORIGINAL CODE STARTS HERE ===

  // Save progress whenever it changes (keep your original localStorage fallback)
  useEffect(() => {
    if (Object.keys(userProgress).length > 0) {
      localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(userProgress))
    }
  }, [userProgress, courseId])

  // Calculate overall course progress
  const calculateOverallProgress = () => {
    if (!curriculumData.length) return 0
    
    let totalLessons = 0
    let completedLessons = 0
    
    curriculumData.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++
        if (userProgress[lesson.id]?.completed) {
          completedLessons++
        }
      })
    })
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }

  // Calculate module progress
  const calculateModuleProgress = (module: Module) => {
    if (!module.lessons.length) return 0
    
    const completedLessons = module.lessons.filter(lesson => 
      userProgress[lesson.id]?.completed
    ).length
    
    return Math.round((completedLessons / module.lessons.length) * 100)
  }

  // Mark lesson as completed - ENHANCED with database saving
  const completeLesson = async (lessonId?: string) => {
    const targetLessonId = lessonId || currentLessonData?.id
    if (!targetLessonId) return
    
    // Update local state
    setUserProgress(prev => ({
      ...prev,
      [targetLessonId]: { 
        ...prev[targetLessonId],
        completed: true,
        completed_at: new Date().toISOString()
      }
    }))

    // Save to database
    try {
      await saveProgressToDatabase(targetLessonId, {
        completed: true,
        progress: 100
      })
    } catch (error) {
      console.error('Error saving progress:', error)
      // Progress is still saved locally even if API call fails
    }
  }

  // Navigate to next lesson and auto-complete current if needed
  const goToNextLesson = () => {
    const currentLessonData = getCurrentLessonData()
    
    // Auto-complete current lesson if not already completed
    if (currentLessonData && !userProgress[currentLessonData.id]?.completed) {
      completeLesson()
    }

    // Navigate to next lesson using the original navigation logic
    if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
      selectLesson(currentModule, currentLesson + 1)
    } else if (currentModule < curriculumData.length - 1) {
      selectLesson(currentModule + 1, 0)
    }
  }

  // Navigate to previous lesson
  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      selectLesson(currentModule, currentLesson - 1)
    } else if (currentModule > 0) {
      selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
    }
  }

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
    setCurrentModule(moduleIndex)
    setCurrentLesson(lessonIndex)
    currentTimeRef.current = 0 // Reset time ref
    setIsPlaying(false)
    setIsMobileSidebarOpen(false)
    setShowControls(true)

    // Reset video when changing lessons
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
      }
      forceUpdate(x => x + 1) // Force UI update
    }, 100)

    // Record lesson access in progress
    const lesson = curriculumData[moduleIndex]?.lessons[lessonIndex]
    if (lesson && !userProgress[lesson.id]?.accessed) {
      setUserProgress(prev => ({
        ...prev,
        [lesson.id]: {
          ...prev[lesson.id],
          accessed: true,
          last_accessed_at: new Date().toISOString()
        }
      }))

      // Save lesson access to database
      saveProgressToDatabase(lesson.id, {
        progress: 0,
        timeSpent: 0,
        lastPosition: 0
      }).catch(error => {
        console.error('Error saving lesson access:', error)
      })
    }
  }

  // === YOUR EXACT ORIGINAL VIDEO CONTROL FUNCTIONS ===
  const togglePlayPause = () => {
    if (!videoRef.current) return; // Safely exit if video element is not mounted

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      // Attempt to play, catching the promise rejection error
      // This happens if the browser blocks play (e.g. autoplay policy)
      videoRef.current.play().catch(error => {
        console.error('Video Playback Failed (Autoplay/Promise):', error)
        // We no longer attempt a complex auto-mute fallback here, 
        // as the video element's onError and mediaError state will handle the diagnosis.
        // A simple visual indication to the user is better than an endless loop.
        if (videoRef.current) {
           videoRef.current.pause();
           setIsPlaying(false);
        }
      })
    }
  }

  // CRITICAL FIX: New handleTimeUpdate that doesn't cause re-renders
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    currentTimeRef.current = videoRef.current.currentTime;

    // Update UI only once per second to prevent excessive re-renders
    if (Math.floor(currentTimeRef.current) % 1 === 0) {
      forceUpdate(x => x + 1);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration
      setVideoDuration(duration)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    // Mark as completed if watched most of the video
    if (progressPercentage >= 90) {
      completeLesson()
    }
  }

  // CRITICAL FIX: Updated handleProgressClick to use ref
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      const currentLessonDuration = currentLessonData?.duration || videoDuration || 1
      const newTime = percent * currentLessonDuration
      videoRef.current.currentTime = newTime
      currentTimeRef.current = newTime
      forceUpdate(x => x + 1) // Force UI update after seeking
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleBookmark = () => {
    if (!bookmarkedTimes.includes(Math.floor(currentTimeRef.current))) {
      setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTimeRef.current)].sort((a, b) => a - b))
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  // Get current lesson data with progress
  const getCurrentLessonData = (): Lesson | null => {
    if (!curriculumData[currentModule]?.lessons[currentLesson]) {
      return null
    }
    
    const lesson = curriculumData[currentModule].lessons[currentLesson]
    const progress = userProgress[lesson.id] || {}
    
    return {
      ...lesson,
      watched: progress.watched || 0,
      completed: progress.completed || false
    }
  }

  const currentLessonData = getCurrentLessonData()
  const overallProgress = calculateOverallProgress()

  // CRITICAL FIX: Updated progressPercentage to use currentTimeRef
  const progressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
    ? (currentTimeRef.current / (currentLessonData.duration || videoDuration)) * 100
    : 0

  // Show controls on mouse move and hide after delay
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // CRITICAL FIX: Robust Video URL Finder
  const getVideoUrl = () => {
    if (!currentLessonData) return null
    
    const lesson = curriculumData[currentModule]?.lessons[currentLesson]
    if (!lesson) return null

    // Check primary field
    if (lesson.videoUrl && typeof lesson.videoUrl === 'string' && lesson.videoUrl.length > 0) {
      return lesson.videoUrl
    }

    // Try all possible video field names (as per previous debugging)
    const possibleFields = [
      'video_url', 'video', 'url', 'file', 
      'videoURL', 'videoFile', 'video_file',
      'contentUrl', 'content_url', 'mediaUrl', 'media_url',
      'source', 'src', 'videoSource', 'video_source',
      'cloudinaryUrl', 'cloudinary_url', 'cloudinary'
    ]

    for (const field of possibleFields) {
      const value = (lesson as any)[field]
      if (value && typeof value === 'string' && value.length > 0) {
        return value
      }
    }
    return null
  }

  const videoUrl = getVideoUrl()
  
  // CRITICAL FIX: Check if a video should display (The purple gradient issue)
  const isVideoLesson = Boolean(videoUrl) || currentLessonData?.contentType === 'video' || currentLessonData?.lessonType === 'video';

  if (!currentLessonData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  // AxioQuan Logo Component
  const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
    <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
      <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
        <span className="text-white font-bold text-xl">A</span>
      </div>
      {size === "default" && (
        <span className="font-bold text-xl text-foreground">AxioQuan</span>
      )}
    </a>
  )

  // Get lesson icon based on content type
  const getLessonIcon = (contentType: string, completed?: boolean) => {
    if (completed) {
      return <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
    }
    
    // Check if videoUrl exists for general video icon, even if contentType is 'free'
    if (videoUrl) return <Video size={16} className="flex-shrink-0 text-blue-500" />

    switch (contentType) {
      case 'video':
        return <Video size={16} className="flex-shrink-0 text-blue-500" />
      case 'document':
      case 'text':
        return <FileText size={16} className="flex-shrink-0 text-purple-500" />
      case 'quiz':
        return <FileText size={16} className="flex-shrink-0 text-orange-500" />
      default:
        return <Play size={16} className="flex-shrink-0 text-gray-500" />
    }
  }

  // === YOUR EXACT ORIGINAL VIDEO PLAYER COMPONENT ===
  const VideoPlayer = () => {
    return (
      <div className="relative w-full h-full bg-black">
        {videoUrl ? (
          <video
            key={videoUrl}
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            <p>No video available</p>
          </div>
        )}
      </div>
    );
  };

  // Mobile Sidebar Overlay - IMPROVED VERSION
  const MobileSidebar = () => (
    <>
      {/* Improved Mobile Overlay - Clean dim background with blur */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-all duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Improved Mobile Sidebar - Smooth slide from right without obstruction */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden
        ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        shadow-xl
      `}>
        <div className="p-4 border-b border-border bg-white">
          <div className="flex items-center justify-between mb-4">
            <AxioQuanLogo />
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group w-full"
          >
            <LayoutDashboard size={20} className="text-primary" />
            <span className="font-semibold text-foreground">Back to Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 h-[calc(100vh-140px)]">
          {curriculumData.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-1">
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <BookOpen size={18} className="text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-foreground">{module.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {calculateModuleProgress(module)}% complete
                      {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
                    </p>
                  </div>
                </div>
                {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {expandedModules.includes(moduleIndex) && (
                <div className="space-y-1 ml-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(moduleIndex, lessonIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                        currentModule === moduleIndex && currentLesson === lessonIndex
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-100 text-foreground"
                      }`}
                    >
                      {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
                      <span className="flex-1 text-left truncate">{lesson.title}</span>
                      {lesson.duration && (
                        <span className="text-xs opacity-75 flex items-center gap-1">
                          <Clock size={12} />
                          {formatTime(lesson.duration)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Desktop Sidebar Navigation - Fixed Position with Dashboard Link */}
      <div className="hidden md:flex w-80 bg-white/90 backdrop-blur-md border-r border-border flex-col overflow-hidden fixed left-0 top-0 bottom-0 z-30">
        {/* Logo and Dashboard Header */}
        <div className="p-4 border-b border-border bg-white/95">
          <div className="mb-4">
            <AxioQuanLogo />
          </div>
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
          >
            <LayoutDashboard size={20} className="text-primary" />
            <span className="font-semibold text-foreground">Back to Dashboard</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {curriculumData.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-1">
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <BookOpen size={18} className="text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-sm text-foreground">{module.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {calculateModuleProgress(module)}% complete
                      {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
                    </p>
                  </div>
                </div>
                {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {expandedModules.includes(moduleIndex) && (
                <div className="space-y-1 ml-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(moduleIndex, lessonIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                        currentModule === moduleIndex && currentLesson === lessonIndex
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-gray-100 text-foreground"
                      }`}
                    >
                      {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
                      <span className="flex-1 text-left truncate">{lesson.title}</span>
                      {lesson.duration && (
                        <span className="text-xs opacity-75 flex items-center gap-1">
                          <Clock size={12} />
                          {formatTime(lesson.duration)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area - Normal Page Scroll with Sidebar Offset */}
      <div className="flex-1 overflow-y-auto md:ml-80 w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-border p-4 sticky top-0 z-30 w-full">
          <div className="flex items-center justify-between w-full">
            <AxioQuanLogo size="small" />
            <div className="flex-1 ml-3 min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {courseData?.title || 'Course'}
              </h1>
              
              {/* Current Lesson Info for Mobile */}
              <div className="mt-1">
                <p className="text-xs text-muted-foreground truncate">{curriculumData[currentModule]?.title}</p>
                <p className="font-semibold text-foreground text-sm truncate">{currentLessonData.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Course Menu Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 z-40 animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <Menu size={24} />
          <span className="sr-only">Open Course Menu</span>
        </button>

        <div className="w-full max-w-none">
          {/* Course Title Header - Full Width (Hidden on mobile) */}
          <div className="bg-white p-6 md:p-8 border-b border-border w-full hidden md:block">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData?.title || 'Course'}</h1>
              <p className="text-gray-600 text-lg">{courseData?.short_description || courseData?.description}</p>
              <p className="text-gray-500 mt-1">Instructor: {courseData?.instructor_name || 'Instructor'}</p>
            </div>
          </div>

          {/* Content Player Section - Full Width */}
          <div className="bg-white p-4 md:p-8 border-b border-border w-full">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
              <div className="bg-black rounded-xl overflow-hidden relative w-full aspect-video max-w-4xl mx-auto shadow-lg">
                
                {/* CRITICAL FIX APPLIED HERE: Using the robust `isVideoLesson` check */}
                {isVideoLesson ? (
                  <VideoPlayer />
                ) : (
                  // Non-video content placeholder (PURPLE GRADIENT)
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="text-center space-y-4 text-white">
                      <FileText size={64} className="mx-auto" />
                      <p className="text-xl font-semibold">{currentLessonData.title}</p>
                      <p className="text-white/80">This is a {currentLessonData.contentType} lesson</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress saving indicator */}
              <div className="mt-2 text-center">
                {isSaving && (
                  <div className="inline-flex items-center gap-2 text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                    Saving progress...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Overall Progress Bar - Full Width */}
          <div className="bg-white p-4 md:p-6 border-b border-border w-full">
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Course Progress</span>
                <span className="text-primary font-bold">{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary rounded-full h-3 transition-all duration-500 ease-in-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                You've completed {overallProgress}% of the course. Keep going!
              </p>
            </div>
          </div>

          {/* Lesson Content Section - Full Width */}
          <div className="bg-white px-4 md:px-8 py-6 md:py-8 w-full">
            {/* Lesson Header - Full Width but content constrained */}
            <div className="border-b border-border pb-6 md:pb-8 w-full">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
                <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
                  <div className="hidden md:block">
                    <p className="text-sm text-muted-foreground mb-2">{curriculumData[currentModule]?.title}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentLessonData.title}</h1>
                    <p className="text-muted-foreground">
                      {currentLessonData.duration ? `${Math.round(currentLessonData.duration / 60)} minute ` : ''}
                      {currentLessonData.contentType} lesson
                    </p>
                  </div>
                  <button
                    onClick={() => completeLesson()}
                    disabled={userProgress[currentLessonData.id]?.completed || isSaving}
                    className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
                      userProgress[currentLessonData.id]?.completed
                        ? "bg-green-100 text-green-800 cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
                    }`}
                  >
                    {userProgress[currentLessonData.id]?.completed ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Completed
                      </span>
                    ) : isSaving ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </span>
                    ) : (
                      "Mark Complete"
                    )}
                  </button>
                </div>
              </div>
            </div>


            {/* Lesson Content Tabs - Full Width but content constrained */}
            <div className="border-b border-border w-full">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
                <div className="flex gap-2 md:gap-4 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
                      activeTab === "overview"
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
                      activeTab === "notes"
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("resources")}
                    className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
                      activeTab === "resources"
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Resources
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content - ONLY this section is constrained to max-w-4xl */}
            <div className="w-full">
              <div className="max-w-4xl mx-auto mt-6 md:mt-8 px-4 md:px-6">
                {activeTab === "overview" && (
                  <div className="w-full py-4 md:py-6">
                    <div className="space-y-6 md:space-y-8 w-full">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">About this lesson</h3>
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                          {currentLessonData.description || "This lesson covers important concepts and practical applications. Follow along to enhance your understanding and skills."}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 md:p-6 w-full">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
                        <ul className="space-y-2 md:space-y-3 text-muted-foreground">
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            Understand key concepts presented in this lesson
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            Apply the knowledge to practical scenarios
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            Complete exercises and assessments
                          </li>
                        </ul>
                      </div>

                      <div className="w-full">
                        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
                        <div className="space-y-2 md:space-y-3 w-full">
                          {bookmarkedTimes.length > 0 ? (
                            bookmarkedTimes.map((time, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  currentTimeRef.current = time
                                  if (videoRef.current) {
                                    videoRef.current.currentTime = time
                                  }
                                  forceUpdate(x => x + 1)
                                }}
                                className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
                              >
                                <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
                                <div>
                                  <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
                                  <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
                              <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
                              <p className="text-muted-foreground">No bookmarks yet</p>
                              <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="w-full py-4 md:py-6">
                    <div className="space-y-4 md:space-y-6 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
                      
                      {/* Text Formatting Toolbar */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
                          <Bold size={16} />
                        </button>
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
                          <Italic size={16} />
                        </button>
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
                          <Underline size={16} />
                        </button>
                        <div className="w-px bg-gray-300 h-4 md:h-6"></div>
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bullet List">
                          <List size={16} />
                        </button>
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Numbered List">
                          <ListOrdered size={16} />
                        </button>
                        <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
                          <LinkIcon size={16} />
                        </button>
                      </div>

                      {/* Large Text Area - Full Width */}
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Start typing your notes here... You can format your text using the toolbar above. Write down key concepts, questions, code snippets, or insights from this lesson."
                        className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 rounded-lg border border-gray-300 bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg leading-relaxed resize-y"
                      />
                      
                      <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground w-full flex-col md:flex-row gap-2 md:gap-0">
                        <span>Your notes are automatically saved as you type</span>
                        <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="w-full py-4 md:py-6">
                    <div className="space-y-6 md:space-y-8 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Resources</h3>
                      
                      <div className="grid gap-4 md:gap-6 w-full">
                        {/* Downloadable Materials */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
                          <h4 className="font-bold text-blue-900 text-lg md:text-xl mb-3 md:mb-4">📚 Downloadable Materials</h4>
                          <div className="space-y-3 md:space-y-4 w-full">
                            <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-blue-600 font-bold text-sm md:text-base">PDF</span>
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-blue-900 text-sm md:text-base">Lesson Slides</p>
                                  <p className="text-blue-700 text-xs md:text-sm">Complete presentation slides</p>
                                </div>
                              </div>
                              <button className="w-full mt-2 md:mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm md:text-base">
                                Download (2.4 MB)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Useful Links */}
                        <div className="bg-green-50 border border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
                          <h4 className="font-bold text-green-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links & References</h4>
                          <div className="space-y-3 md:space-y-4 w-full">
                            <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
                              <p className="font-semibold text-green-900 text-sm md:text-base">Course Documentation</p>
                              <p className="text-green-700 text-xs md:text-sm">Complete course reference and guides</p>
                              <span className="text-green-600 text-xs mt-1 md:mt-2 block">axioquan.com/docs</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons - Full Width but content constrained */}
            <div className="border-t border-border w-full mt-6 md:mt-8">
              <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
                <div className="flex gap-3 md:gap-4 py-6 md:py-8 flex-col md:flex-row">
                  <button
                    onClick={goToPreviousLesson}
                    disabled={currentModule === 0 && currentLesson === 0}
                    className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
                  >
                    Previous Lesson
                  </button>
                  <button
                    onClick={goToNextLesson}
                    disabled={
                      currentModule === curriculumData.length - 1 &&
                      currentLesson === curriculumData[currentModule].lessons.length - 1
                    }
                    className="px-6 py-3 md:px-8 md:py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50 font-semibold text-sm md:text-base"
                  >
                    Next Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
