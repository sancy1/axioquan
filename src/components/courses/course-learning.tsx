
// // /components/courses/course-learning.tsx

// 'use client'

// import { useState, useEffect, useRef } from "react"
// import Link from "next/link"
// import {
//   ChevronDown,
//   ChevronUp,
//   Play,
//   Pause,
//   Volume2,
//   Volume1,
//   VolumeX,
//   Settings,
//   Maximize,
//   Bookmark,
//   CheckCircle2,
//   BookOpen,
//   Expand,
//   Bold,
//   Italic,
//   Underline,
//   List,
//   ListOrdered,
//   Link as LinkIcon,
//   LayoutDashboard,
//   Menu,
//   X,
//   Clock,
//   FileText,
//   Video,
// } from "lucide-react"

// // --- INTERFACES ---

// interface Lesson {
//   id: string
//   title: string
//   description?: string
//   duration: number
//   contentType: string
//   lessonType?: string // Added for better detection
//   videoUrl?: string
//   videoThumbnail?: string
//   videoDuration?: number
//   isPreview: boolean
//   created_at?: string
  
//   // Progress tracking
//   watched?: number
//   completed?: boolean
//   bookmarks?: number[]
// }

// interface Module {
//   id: string
//   title: string
//   description?: string
//   order: number
//   created_at?: string
//   lessons: Lesson[]
//   // Progress tracking
//   progress?: number
// }

// interface CourseLearningProps {
//   courseId: string
//   courseData: any
//   curriculumData: Module[]
//   enrollmentData?: any
// }

// export default function CourseLearningPage({ 
//   courseId, 
//   courseData, 
//   curriculumData, 
//   enrollmentData 
// }: CourseLearningProps) {
//   const [currentModule, setCurrentModule] = useState(0)
//   const [currentLesson, setCurrentLesson] = useState(0)
//   const [expandedModules, setExpandedModules] = useState<number[]>([0])
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [volume, setVolume] = useState(1)
//   const [playbackSpeed, setPlaybackSpeed] = useState(1)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
//   const [userProgress, setUserProgress] = useState<{[key: string]: any}>({})
//   const [videoDuration, setVideoDuration] = useState(0)
//   const [showControls, setShowControls] = useState(true)

//   // CRITICAL FIX: Replace currentTime state with ref
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0) // Used for UI updates only

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   // === ONLY ADDITION: Database progress saving ===
//   const [isSaving, setIsSaving] = useState(false)
//   const lastSaveRef = useRef(0)

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   // === ONLY MODIFICATION: Enhanced loadUserProgress with database support ===
//   const loadUserProgress = async () => {
//     try {
//       // Try to load from database first
//       const response = await fetch(`/api/student/progress?courseId=${courseId}`)
//       if (response.ok) {
//         const data = await response.json()
//         setUserProgress(data.progress || {})
//       } else {
//         // Fallback to localStorage
//         const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//         if (savedProgress) {
//           setUserProgress(JSON.parse(savedProgress))
//         }
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//       // Fallback to localStorage
//       const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//       if (savedProgress) {
//         setUserProgress(JSON.parse(savedProgress))
//       }
//     }
//   }

//   // === ONLY ADDITION: Save progress to database ===
//   const saveProgressToDatabase = async (lessonId: string, progressData: {
//     completed?: boolean
//     progress?: number
//     timeSpent?: number
//     lastPosition?: number
//   }) => {
//     try {
//       setIsSaving(true)
      
//       const response = await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId,
//           ...progressData
//         })
//       })

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
//         throw new Error(errorData.error || 'Failed to save progress')
//       }

//       return await response.json()
//     } catch (error) {
//       console.error('Error saving progress to database:', error)
//       // Save to localStorage as fallback
//       localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(userProgress))
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // === ONLY ADDITION: Auto-save progress ===
//   useEffect(() => {
//     const autoSaveProgress = async () => {
//       const currentLessonData = getCurrentLessonData()
//       if (!currentLessonData || !videoRef.current) return

//       const currentTime = currentTimeRef.current
//       const now = Date.now()

//       // Calculate progress percentage for current lesson
//       const currentProgressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
//         ? (currentTime / (currentLessonData.duration || videoDuration)) * 100
//         : 0

//       // Only save if enough time has passed and we have meaningful progress
//       if (now - lastSaveRef.current > 30000 && currentTime > 10) {
//         try {
//           await saveProgressToDatabase(currentLessonData.id, {
//             progress: currentProgressPercentage,
//             timeSpent: Math.floor(currentTime),
//             lastPosition: Math.floor(currentTime)
//           })
//           lastSaveRef.current = now
//         } catch (error) {
//           console.error('Auto-save failed:', error)
//         }
//       }
//     }

//     const interval = setInterval(autoSaveProgress, 10000)
//     return () => clearInterval(interval)
//   }, [courseId, videoDuration])

//   // === YOUR EXACT ORIGINAL CODE STARTS HERE ===

//   // Save progress whenever it changes (keep your original localStorage fallback)
//   useEffect(() => {
//     if (Object.keys(userProgress).length > 0) {
//       localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(userProgress))
//     }
//   }, [userProgress, courseId])

//   // Calculate overall course progress
//   const calculateOverallProgress = () => {
//     if (!curriculumData.length) return 0
    
//     let totalLessons = 0
//     let completedLessons = 0
    
//     curriculumData.forEach(module => {
//       module.lessons.forEach(lesson => {
//         totalLessons++
//         if (userProgress[lesson.id]?.completed) {
//           completedLessons++
//         }
//       })
//     })
    
//     return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
//   }

//   // Calculate module progress
//   const calculateModuleProgress = (module: Module) => {
//     if (!module.lessons.length) return 0
    
//     const completedLessons = module.lessons.filter(lesson => 
//       userProgress[lesson.id]?.completed
//     ).length
    
//     return Math.round((completedLessons / module.lessons.length) * 100)
//   }

//   // Mark lesson as completed - ENHANCED with database saving
//   const completeLesson = async (lessonId?: string) => {
//     const targetLessonId = lessonId || currentLessonData?.id
//     if (!targetLessonId) return
    
//     // Update local state
//     setUserProgress(prev => ({
//       ...prev,
//       [targetLessonId]: { 
//         ...prev[targetLessonId],
//         completed: true,
//         completed_at: new Date().toISOString()
//       }
//     }))

//     // Save to database
//     try {
//       await saveProgressToDatabase(targetLessonId, {
//         completed: true,
//         progress: 100
//       })
//     } catch (error) {
//       console.error('Error saving progress:', error)
//       // Progress is still saved locally even if API call fails
//     }
//   }

//   // Navigate to next lesson and auto-complete current if needed
//   const goToNextLesson = () => {
//     const currentLessonData = getCurrentLessonData()
    
//     // Auto-complete current lesson if not already completed
//     if (currentLessonData && !userProgress[currentLessonData.id]?.completed) {
//       completeLesson()
//     }

//     // Navigate to next lesson using the original navigation logic
//     if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//       selectLesson(currentModule, currentLesson + 1)
//     } else if (currentModule < curriculumData.length - 1) {
//       selectLesson(currentModule + 1, 0)
//     }
//   }

//   // Navigate to previous lesson
//   const goToPreviousLesson = () => {
//     if (currentLesson > 0) {
//       selectLesson(currentModule, currentLesson - 1)
//     } else if (currentModule > 0) {
//       selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//     }
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     currentTimeRef.current = 0 // Reset time ref
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false)
//     setShowControls(true)

//     // Reset video when changing lessons
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = 0
//         videoRef.current.pause()
//       }
//       forceUpdate(x => x + 1) // Force UI update
//     }, 100)

//     // Record lesson access in progress
//     const lesson = curriculumData[moduleIndex]?.lessons[lessonIndex]
//     if (lesson && !userProgress[lesson.id]?.accessed) {
//       setUserProgress(prev => ({
//         ...prev,
//         [lesson.id]: {
//           ...prev[lesson.id],
//           accessed: true,
//           last_accessed_at: new Date().toISOString()
//         }
//       }))

//       // Save lesson access to database
//       saveProgressToDatabase(lesson.id, {
//         progress: 0,
//         timeSpent: 0,
//         lastPosition: 0
//       }).catch(error => {
//         console.error('Error saving lesson access:', error)
//       })
//     }
//   }








































// // /components/courses/course-learning.tsx - Update the interface
// 'use client'

// import { useState, useEffect, useRef } from "react"
// import Link from "next/link"
// import {
//   ChevronDown,
//   ChevronUp,
//   Play,
//   Pause,
//   Volume2,
//   Volume1,
//   VolumeX,
//   Settings,
//   Maximize,
//   Bookmark,
//   CheckCircle2,
//   BookOpen,
//   Expand,
//   Bold,
//   Italic,
//   Underline,
//   List,
//   ListOrdered,
//   Link as LinkIcon,
//   LayoutDashboard,
//   Menu,
//   X,
//   Clock,
//   FileText,
//   Video,
// } from "lucide-react"

// // --- INTERFACES ---
// interface Lesson {
//   id: string
//   title: string
//   description?: string
//   duration: number
//   contentType: string
//   lessonType?: string
//   videoUrl?: string
//   videoThumbnail?: string
//   videoDuration?: number
//   isPreview: boolean
//   created_at?: string
  
//   // Progress tracking
//   watched?: number
//   completed?: boolean
//   bookmarks?: number[]
// }

// interface Module {
//   id: string
//   title: string
//   description?: string
//   order: number
//   created_at?: string
//   lessons: Lesson[]
//   // Progress tracking
//   progress?: number
// }

// // Define the UserProgress type
// interface UserProgress {
//   [lessonId: string]: {
//     completed: boolean;
//     progress: number;
//     timeSpent: number;
//     lastPosition: number;
//     lastAccessedAt: string | null;
//   };
// }

// interface CourseLearningProps {
//   courseId: string
//   courseData: any
//   curriculumData: Module[]
//   enrollmentData?: any
//   userId: string // ADD THIS
//   initialUserProgress?: UserProgress // USE PROPER TYPE
// }

// export default function CourseLearningPage({ 
//   courseId, 
//   courseData, 
//   curriculumData, 
//   enrollmentData,
//   userId,
//   initialUserProgress = {}
// }: CourseLearningProps) {
//   const [currentModule, setCurrentModule] = useState(0)
//   const [currentLesson, setCurrentLesson] = useState(0)
//   const [expandedModules, setExpandedModules] = useState<number[]>([0])
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [volume, setVolume] = useState(1)
//   const [playbackSpeed, setPlaybackSpeed] = useState(1)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  
//   // Use proper type for userProgress
//   const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress)
  
//   const [videoDuration, setVideoDuration] = useState(0)
//   const [showControls, setShowControls] = useState(true)

//   // Use refs instead of state for time tracking
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0)

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   // Database progress saving
//   const [isSaving, setIsSaving] = useState(false)
//   const lastSaveRef = useRef(0)

//   // Load user progress from database on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId, userId])

//   // Enhanced loadUserProgress with user ID
//   const loadUserProgress = async () => {
//     try {
//       // Load from database with user ID
//       const response = await fetch(`/api/student/progress?courseId=${courseId}`)
//       if (response.ok) {
//         const data = await response.json()
        
//         // Transform the data to match our UserProgress type
//         const transformedProgress: UserProgress = {}
//         if (data.progress && typeof data.progress === 'object') {
//           Object.entries(data.progress).forEach(([lessonId, lessonData]: [string, any]) => {
//             transformedProgress[lessonId] = {
//               completed: lessonData.is_completed || lessonData.completed || false,
//               progress: lessonData.video_progress || lessonData.progress || 0,
//               timeSpent: lessonData.time_spent || 0,
//               lastPosition: lessonData.last_position || 0,
//               lastAccessedAt: lessonData.last_accessed_at || lessonData.last_accessed || null
//             }
//           })
//         }
//         setUserProgress(transformedProgress)
//       } else {
//         // Fallback to localStorage with user ID prefix
//         const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
//         if (savedProgress) {
//           try {
//             const parsedProgress = JSON.parse(savedProgress) as UserProgress
//             setUserProgress(parsedProgress)
//           } catch (e) {
//             console.error('Error parsing saved progress:', e)
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//       // Fallback to localStorage with user ID prefix
//       const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
//       if (savedProgress) {
//         try {
//           const parsedProgress = JSON.parse(savedProgress) as UserProgress
//           setUserProgress(parsedProgress)
//         } catch (e) {
//           console.error('Error parsing saved progress:', e)
//         }
//       }
//     }
//   }

//   // Enhanced saveProgressToDatabase with user ID
//   const saveProgressToDatabase = async (lessonId: string, progressData: {
//     completed?: boolean
//     progress?: number
//     timeSpent?: number
//     lastPosition?: number
//   }) => {
//     try {
//       setIsSaving(true)
      
//       const response = await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId,
//           userId, // ADD USER ID TO REQUEST
//           ...progressData
//         })
//       })

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
//         throw new Error(errorData.error || 'Failed to save progress')
//       }

//       return await response.json()
//     } catch (error) {
//       console.error('Error saving progress to database:', error)
//       // Save to localStorage with user ID prefix as fallback
//       localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Save progress to localStorage with user ID prefix
//   useEffect(() => {
//     if (Object.keys(userProgress).length > 0 && userId) {
//       localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
//     }
//   }, [userProgress, courseId, userId])

//   // Auto-save progress
//   useEffect(() => {
//     const autoSaveProgress = async () => {
//       const currentLessonData = getCurrentLessonData()
//       if (!currentLessonData || !videoRef.current) return

//       const currentTime = currentTimeRef.current
//       const now = Date.now()

//       // Calculate progress percentage for current lesson
//       const currentProgressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
//         ? (currentTime / (currentLessonData.duration || videoDuration)) * 100
//         : 0

//       // Only save if enough time has passed and we have meaningful progress
//       if (now - lastSaveRef.current > 30000 && currentTime > 10) {
//         try {
//           await saveProgressToDatabase(currentLessonData.id, {
//             progress: currentProgressPercentage,
//             timeSpent: Math.floor(currentTime),
//             lastPosition: Math.floor(currentTime)
//           })
//           lastSaveRef.current = now
//         } catch (error) {
//           console.error('Auto-save failed:', error)
//         }
//       }
//     }

//     const interval = setInterval(autoSaveProgress, 10000)
//     return () => clearInterval(interval)
//   }, [courseId, videoDuration])

//   // Calculate overall course progress
//   const calculateOverallProgress = () => {
//     if (!curriculumData.length) return 0
    
//     let totalLessons = 0
//     let completedLessons = 0
    
//     curriculumData.forEach(module => {
//       module.lessons.forEach(lesson => {
//         totalLessons++
//         if (userProgress[lesson.id]?.completed) {
//           completedLessons++
//         }
//       })
//     })
    
//     return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
//   }

//   // Calculate module progress
//   const calculateModuleProgress = (module: Module) => {
//     if (!module.lessons.length) return 0
    
//     const completedLessons = module.lessons.filter(lesson => 
//       userProgress[lesson.id]?.completed
//     ).length
    
//     return Math.round((completedLessons / module.lessons.length) * 100)
//   }

//   // Mark lesson as completed - ENHANCED with database saving
//   const completeLesson = async (lessonId?: string) => {
//     const targetLessonId = lessonId || currentLessonData?.id
//     if (!targetLessonId) return
    
//     // Update local state
//     setUserProgress(prev => ({
//       ...prev,
//       [targetLessonId]: { 
//         ...prev[targetLessonId],
//         completed: true,
//         completed_at: new Date().toISOString()
//       }
//     }))

//     // Save to database
//     try {
//       await saveProgressToDatabase(targetLessonId, {
//         completed: true,
//         progress: 100
//       })
//     } catch (error) {
//       console.error('Error saving progress:', error)
//     }
//   }

//   // Navigate to next lesson and auto-complete current if needed
//   const goToNextLesson = () => {
//     const currentLessonData = getCurrentLessonData()
    
//     // Auto-complete current lesson if not already completed
//     if (currentLessonData && !userProgress[currentLessonData.id]?.completed) {
//       completeLesson()
//     }

//     // Navigate to next lesson using the original navigation logic
//     if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//       selectLesson(currentModule, currentLesson + 1)
//     } else if (currentModule < curriculumData.length - 1) {
//       selectLesson(currentModule + 1, 0)
//     }
//   }

//   // Navigate to previous lesson
//   const goToPreviousLesson = () => {
//     if (currentLesson > 0) {
//       selectLesson(currentModule, currentLesson - 1)
//     } else if (currentModule > 0) {
//       selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//     }
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     currentTimeRef.current = 0 // Reset time ref
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false)
//     setShowControls(true)

//     // Reset video when changing lessons
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = 0
//         videoRef.current.pause()
//       }
//       forceUpdate(x => x + 1) // Force UI update
//     }, 100)

//     // Record lesson access in progress
//     const lesson = curriculumData[moduleIndex]?.lessons[lessonIndex]
//     if (lesson && !userProgress[lesson.id]?.completed) {
//       const updatedProgress: UserProgress = {
//         ...userProgress,
//         [lesson.id]: {
//           ...userProgress[lesson.id],
//           completed: userProgress[lesson.id]?.completed || false,
//           progress: userProgress[lesson.id]?.progress || 0,
//           timeSpent: userProgress[lesson.id]?.timeSpent || 0,
//           lastPosition: 0,
//           lastAccessedAt: new Date().toISOString()
//         }
//       }
      
//       setUserProgress(updatedProgress)

//       // Save lesson access to database
//       saveProgressToDatabase(lesson.id, {
//         progress: 0,
//         timeSpent: 0,
//         lastPosition: 0
//       }).catch(error => {
//         console.error('Error saving lesson access:', error)
//       })
//     }
//   }


//   // === YOUR EXACT ORIGINAL VIDEO CONTROL FUNCTIONS ===
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       // This happens if the browser blocks play (e.g. autoplay policy)
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
//         // We no longer attempt a complex auto-mute fallback here, 
//         // as the video element's onError and mediaError state will handle the diagnosis.
//         // A simple visual indication to the user is better than an endless loop.
//         if (videoRef.current) {
//            videoRef.current.pause();
//            setIsPlaying(false);
//         }
//       })
//     }
//   }

//   // CRITICAL FIX: New handleTimeUpdate that doesn't cause re-renders
//   const handleTimeUpdate = () => {
//     if (!videoRef.current) return;
    
//     currentTimeRef.current = videoRef.current.currentTime;

//     // Update UI only once per second to prevent excessive re-renders
//     if (Math.floor(currentTimeRef.current) % 1 === 0) {
//       forceUpdate(x => x + 1);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       const duration = videoRef.current.duration
//       setVideoDuration(duration)
//     }
//   }

//   const handleVideoEnded = () => {
//     setIsPlaying(false)
//     // Mark as completed if watched most of the video
//     if (progressPercentage >= 90) {
//       completeLesson()
//     }
//   }

//   // CRITICAL FIX: Updated handleProgressClick to use ref
//   const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (videoRef.current && progressBarRef.current) {
//       const rect = progressBarRef.current.getBoundingClientRect()
//       const percent = (e.clientX - rect.left) / rect.width
//       const currentLessonDuration = currentLessonData?.duration || videoDuration || 1
//       const newTime = percent * currentLessonDuration
//       videoRef.current.currentTime = newTime
//       currentTimeRef.current = newTime
//       forceUpdate(x => x + 1) // Force UI update after seeking
//     }
//   }

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted
//       setIsMuted(!isMuted)
//     }
//   }

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value)
//     setVolume(newVolume)
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume
//       setIsMuted(newVolume === 0)
//     }
//   }

//   const toggleFullscreen = () => {
//     if (videoRef.current) {
//       if (document.fullscreenElement) {
//         document.exitFullscreen()
//       } else {
//         videoRef.current.requestFullscreen()
//       }
//     }
//   }

//   const handleBookmark = () => {
//     if (!bookmarkedTimes.includes(Math.floor(currentTimeRef.current))) {
//       setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTimeRef.current)].sort((a, b) => a - b))
//     }
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//  const getCurrentLessonData = (): Lesson | null => {
//   if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//     return null
//   }
  
//   const lesson = curriculumData[currentModule].lessons[currentLesson]
//   const progress = userProgress[lesson.id] || {}
  
//   return {
//     ...lesson,
//     watched: progress.timeSpent || 0,  // Map timeSpent to watched
//     completed: progress.completed || false
//   }
// }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // CRITICAL FIX: Updated progressPercentage to use currentTimeRef
//   const progressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
//     ? (currentTimeRef.current / (currentLessonData.duration || videoDuration)) * 100
//     : 0

//   // Show controls on mouse move and hide after delay
//   const handleMouseMove = () => {
//     setShowControls(true)
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current)
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       if (isPlaying) {
//         setShowControls(false)
//       }
//     }, 3000)
//   }

//   useEffect(() => {
//     return () => {
//       if (controlsTimeoutRef.current) {
//         clearTimeout(controlsTimeoutRef.current)
//       }
//     }
//   }, [])

//   // CRITICAL FIX: Robust Video URL Finder
//   const getVideoUrl = () => {
//     if (!currentLessonData) return null
    
//     const lesson = curriculumData[currentModule]?.lessons[currentLesson]
//     if (!lesson) return null

//     // Check primary field
//     if (lesson.videoUrl && typeof lesson.videoUrl === 'string' && lesson.videoUrl.length > 0) {
//       return lesson.videoUrl
//     }

//     // Try all possible video field names (as per previous debugging)
//     const possibleFields = [
//       'video_url', 'video', 'url', 'file', 
//       'videoURL', 'videoFile', 'video_file',
//       'contentUrl', 'content_url', 'mediaUrl', 'media_url',
//       'source', 'src', 'videoSource', 'video_source',
//       'cloudinaryUrl', 'cloudinary_url', 'cloudinary'
//     ]

//     for (const field of possibleFields) {
//       const value = (lesson as any)[field]
//       if (value && typeof value === 'string' && value.length > 0) {
//         return value
//       }
//     }
//     return null
//   }

//   const videoUrl = getVideoUrl()
  
//   // CRITICAL FIX: Check if a video should display (The purple gradient issue)
//   const isVideoLesson = Boolean(videoUrl) || currentLessonData?.contentType === 'video' || currentLessonData?.lessonType === 'video';

//   if (!currentLessonData) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading lesson...</p>
//         </div>
//       </div>
//     )
//   }

//   // AxioQuan Logo Component
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )

//   // Get lesson icon based on content type
//   const getLessonIcon = (contentType: string, completed?: boolean) => {
//     if (completed) {
//       return <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
//     }
    
//     // Check if videoUrl exists for general video icon, even if contentType is 'free'
//     if (videoUrl) return <Video size={16} className="flex-shrink-0 text-blue-500" />

//     switch (contentType) {
//       case 'video':
//         return <Video size={16} className="flex-shrink-0 text-blue-500" />
//       case 'document':
//       case 'text':
//         return <FileText size={16} className="flex-shrink-0 text-purple-500" />
//       case 'quiz':
//         return <FileText size={16} className="flex-shrink-0 text-orange-500" />
//       default:
//         return <Play size={16} className="flex-shrink-0 text-gray-500" />
//     }
//   }

//   // === YOUR EXACT ORIGINAL VIDEO PLAYER COMPONENT ===
//   const VideoPlayer = () => {
//     return (
//       <div className="relative w-full h-full bg-black">
//         {videoUrl ? (
//           <video
//             key={videoUrl}
//             ref={videoRef}
//             className="w-full h-full object-contain"
//             controls
//             playsInline
//           >
//             <source src={videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//             <p>No video available</p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Mobile Sidebar Overlay - IMPROVED VERSION
//   const MobileSidebar = () => (
//     <>
//       {/* Improved Mobile Overlay - Clean dim background with blur */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-all duration-300"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Improved Mobile Sidebar - Smooth slide from right without obstruction */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
//         shadow-xl
//       `}>
//         <div className="p-4 border-b border-border bg-white">
//           <div className="flex items-center justify-between mb-4">
//             <AxioQuanLogo />
//             <button
//               onClick={() => setIsMobileSidebarOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <X size={20} />
//             </button>
//           </div>
//           <Link 
//             href="/dashboard"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group w-full"
//           >
//             <LayoutDashboard size={20} className="text-primary" />
//             <span className="font-semibold text-foreground">Back to Dashboard</span>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2 h-[calc(100vh-140px)]">
//           {curriculumData.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {calculateModuleProgress(module)}% complete
//                       {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
//                     </p>
//                   </div>
//                 </div>
//                 {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>

//               {expandedModules.includes(moduleIndex) && (
//                 <div className="space-y-1 ml-4">
//                   {module.lessons.map((lesson, lessonIndex) => (
//                     <button
//                       key={lesson.id}
//                       onClick={() => selectLesson(moduleIndex, lessonIndex)}
//                       className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
//                         currentModule === moduleIndex && currentLesson === lessonIndex
//                           ? "bg-primary text-primary-foreground"
//                           : "hover:bg-gray-100 text-foreground"
//                       }`}
//                     >
//                       {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       {lesson.duration && (
//                         <span className="text-xs opacity-75 flex items-center gap-1">
//                           <Clock size={12} />
//                           {formatTime(lesson.duration)}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Mobile Sidebar */}
//       <MobileSidebar />

//       {/* Desktop Sidebar Navigation - Fixed Position with Dashboard Link */}
//       <div className="hidden md:flex w-80 bg-white/90 backdrop-blur-md border-r border-border flex-col overflow-hidden fixed left-0 top-0 bottom-0 z-30">
//         {/* Logo and Dashboard Header */}
//         <div className="p-4 border-b border-border bg-white/95">
//           <div className="mb-4">
//             <AxioQuanLogo />
//           </div>
//           <Link 
//             href="/dashboard"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
//           >
//             <LayoutDashboard size={20} className="text-primary" />
//             <span className="font-semibold text-foreground">Back to Dashboard</span>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {curriculumData.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {calculateModuleProgress(module)}% complete
//                       {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
//                     </p>
//                   </div>
//                 </div>
//                 {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>

//               {expandedModules.includes(moduleIndex) && (
//                 <div className="space-y-1 ml-4">
//                   {module.lessons.map((lesson, lessonIndex) => (
//                     <button
//                       key={lesson.id}
//                       onClick={() => selectLesson(moduleIndex, lessonIndex)}
//                       className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
//                         currentModule === moduleIndex && currentLesson === lessonIndex
//                           ? "bg-primary text-primary-foreground"
//                           : "hover:bg-gray-100 text-foreground"
//                       }`}
//                     >
//                       {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       {lesson.duration && (
//                         <span className="text-xs opacity-75 flex items-center gap-1">
//                           <Clock size={12} />
//                           {formatTime(lesson.duration)}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content Area - Normal Page Scroll with Sidebar Offset */}
//       <div className="flex-1 overflow-y-auto md:ml-80 w-full">
//         {/* Mobile Header */}
//         <div className="md:hidden bg-white border-b border-border p-4 sticky top-0 z-30 w-full">
//           <div className="flex items-center justify-between w-full">
//             <AxioQuanLogo size="small" />
//             <div className="flex-1 ml-3 min-w-0">
//               <h1 className="text-lg font-semibold text-gray-900 truncate">
//                 {courseData?.title || 'Course'}
//               </h1>
              
//               {/* Current Lesson Info for Mobile */}
//               <div className="mt-1">
//                 <p className="text-xs text-muted-foreground truncate">{curriculumData[currentModule]?.title}</p>
//                 <p className="font-semibold text-foreground text-sm truncate">{currentLessonData.title}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Course Menu Button */}
//         <button
//           onClick={() => setIsMobileSidebarOpen(true)}
//           className="md:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 z-40 animate-bounce"
//           style={{ animationDuration: '2s' }}
//         >
//           <Menu size={24} />
//           <span className="sr-only">Open Course Menu</span>
//         </button>

//         <div className="w-full max-w-none">
//           {/* Course Title Header - Full Width (Hidden on mobile) */}
//           <div className="bg-white p-6 md:p-8 border-b border-border w-full hidden md:block">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData?.title || 'Course'}</h1>
//               <p className="text-gray-600 text-lg">{courseData?.short_description || courseData?.description}</p>
//               <p className="text-gray-500 mt-1">Instructor: {courseData?.instructor_name || 'Instructor'}</p>
//             </div>
//           </div>

//           {/* Content Player Section - Full Width */}
//           <div className="bg-white p-4 md:p-8 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="bg-black rounded-xl overflow-hidden relative w-full aspect-video max-w-4xl mx-auto shadow-lg">
                
//                 {/* CRITICAL FIX APPLIED HERE: Using the robust `isVideoLesson` check */}
//                 {isVideoLesson ? (
//                   <VideoPlayer />
//                 ) : (
//                   // Non-video content placeholder (PURPLE GRADIENT)
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
//                     <div className="text-center space-y-4 text-white">
//                       <FileText size={64} className="mx-auto" />
//                       <p className="text-xl font-semibold">{currentLessonData.title}</p>
//                       <p className="text-white/80">This is a {currentLessonData.contentType} lesson</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Progress saving indicator */}
//               <div className="mt-2 text-center">
//                 {isSaving && (
//                   <div className="inline-flex items-center gap-2 text-sm text-blue-600">
//                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                     Saving progress...
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-primary rounded-full h-3 transition-all duration-500 ease-in-out"
//                   style={{ width: `${overallProgress}%` }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600 mt-2">
//                 You've completed {overallProgress}% of the course. Keep going!
//               </p>
//             </div>
//           </div>

//           {/* Lesson Content Section - Full Width */}
//           <div className="bg-white px-4 md:px-8 py-6 md:py-8 w-full">
//             {/* Lesson Header - Full Width but content constrained */}
//             <div className="border-b border-border pb-6 md:pb-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
//                   <div className="hidden md:block">
//                     <p className="text-sm text-muted-foreground mb-2">{curriculumData[currentModule]?.title}</p>
//                     <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentLessonData.title}</h1>
//                     <p className="text-muted-foreground">
//                       {currentLessonData.duration ? `${Math.round(currentLessonData.duration / 60)} minute ` : ''}
//                       {currentLessonData.contentType} lesson
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => completeLesson()}
//                     disabled={userProgress[currentLessonData.id]?.completed || isSaving}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800 cursor-not-allowed"
//                         : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? (
//                       <span className="flex items-center gap-2">
//                         <CheckCircle2 size={18} />
//                         Completed
//                       </span>
//                     ) : isSaving ? (
//                       <span className="flex items-center gap-2">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         Saving...
//                       </span>
//                     ) : (
//                       "Mark Complete"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>


//             {/* Lesson Content Tabs - Full Width but content constrained */}
//             <div className="border-b border-border w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex gap-2 md:gap-4 overflow-x-auto">
//                   <button
//                     onClick={() => setActiveTab("overview")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "overview"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Overview
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("notes")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "notes"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Notes
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("resources")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "resources"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Resources
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Tab Content - ONLY this section is constrained to max-w-4xl */}
//             <div className="w-full">
//               <div className="max-w-4xl mx-auto mt-6 md:mt-8 px-4 md:px-6">
//                 {activeTab === "overview" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-6 md:space-y-8 w-full">
//                       <div>
//                         <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">About this lesson</h3>
//                         <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
//                           {currentLessonData.description || "This lesson covers important concepts and practical applications. Follow along to enhance your understanding and skills."}
//                         </p>
//                       </div>

//                       <div className="bg-gray-50 rounded-lg p-4 md:p-6 w-full">
//                         <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                         <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Understand key concepts presented in this lesson
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Apply the knowledge to practical scenarios
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Complete exercises and assessments
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="w-full">
//                         <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
//                         <div className="space-y-2 md:space-y-3 w-full">
//                           {bookmarkedTimes.length > 0 ? (
//                             bookmarkedTimes.map((time, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => {
//                                   currentTimeRef.current = time
//                                   if (videoRef.current) {
//                                     videoRef.current.currentTime = time
//                                   }
//                                   forceUpdate(x => x + 1)
//                                 }}
//                                 className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
//                               >
//                                 <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
//                                 <div>
//                                   <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
//                                   <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
//                                 </div>
//                               </button>
//                             ))
//                           ) : (
//                             <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
//                               <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
//                               <p className="text-muted-foreground">No bookmarks yet</p>
//                               <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "notes" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-4 md:space-y-6 w-full">
//                       <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
                      
//                       {/* Text Formatting Toolbar */}
//                       <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
//                           <Bold size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
//                           <Italic size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
//                           <Underline size={16} />
//                         </button>
//                         <div className="w-px bg-gray-300 h-4 md:h-6"></div>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bullet List">
//                           <List size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Numbered List">
//                           <ListOrdered size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
//                           <LinkIcon size={16} />
//                         </button>
//                       </div>

//                       {/* Large Text Area - Full Width */}
//                       <textarea
//                         value={notes}
//                         onChange={(e) => setNotes(e.target.value)}
//                         placeholder="Start typing your notes here... You can format your text using the toolbar above. Write down key concepts, questions, code snippets, or insights from this lesson."
//                         className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 rounded-lg border border-gray-300 bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg leading-relaxed resize-y"
//                       />
                      
//                       <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground w-full flex-col md:flex-row gap-2 md:gap-0">
//                         <span>Your notes are automatically saved as you type</span>
//                         <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "resources" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-6 md:space-y-8 w-full">
//                       <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Resources</h3>
                      
//                       <div className="grid gap-4 md:gap-6 w-full">
//                         {/* Downloadable Materials */}
//                         <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                           <h4 className="font-bold text-blue-900 text-lg md:text-xl mb-3 md:mb-4">📚 Downloadable Materials</h4>
//                           <div className="space-y-3 md:space-y-4 w-full">
//                             <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                   <span className="text-blue-600 font-bold text-sm md:text-base">PDF</span>
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-semibold text-blue-900 text-sm md:text-base">Lesson Slides</p>
//                                   <p className="text-blue-700 text-xs md:text-sm">Complete presentation slides</p>
//                                 </div>
//                               </div>
//                               <button className="w-full mt-2 md:mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm md:text-base">
//                                 Download (2.4 MB)
//                               </button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Useful Links */}
//                         <div className="bg-green-50 border border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                           <h4 className="font-bold text-green-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links & References</h4>
//                           <div className="space-y-3 md:space-y-4 w-full">
//                             <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
//                               <p className="font-semibold text-green-900 text-sm md:text-base">Course Documentation</p>
//                               <p className="text-green-700 text-xs md:text-sm">Complete course reference and guides</p>
//                               <span className="text-green-600 text-xs mt-1 md:mt-2 block">axioquan.com/docs</span>
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Navigation Buttons - Full Width but content constrained */}
//             <div className="border-t border-border w-full mt-6 md:mt-8">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex gap-3 md:gap-4 py-6 md:py-8 flex-col md:flex-row">
//                   <button
//                     onClick={goToPreviousLesson}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={goToNextLesson}
//                     disabled={
//                       currentModule === curriculumData.length - 1 &&
//                       currentLesson === curriculumData[currentModule].lessons.length - 1
//                     }
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Next Lesson
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }






































// // /components/courses/course-learning.tsx
// 'use client'

// import { useState, useEffect, useRef } from "react"
// import Link from "next/link"
// import {
//   ChevronDown,
//   ChevronUp,
//   Play,
//   Pause,
//   Volume2,
//   Volume1,
//   VolumeX,
//   Settings,
//   Maximize,
//   Bookmark,
//   CheckCircle2,
//   BookOpen,
//   Expand,
//   Bold,
//   Italic,
//   Underline,
//   List,
//   ListOrdered,
//   Link as LinkIcon,
//   LayoutDashboard,
//   Menu,
//   X,
//   Clock,
//   FileText,
//   Video,
//   Download,
//   ZoomIn,
//   ZoomOut,
//   RotateCw,
//   Maximize2,
//   Minimize2,
// } from "lucide-react"

// // PDF Viewer Component - Inline implementation
// interface PDFViewerProps {
//   pdfUrl: string;
//   pdfName: string;
//   onClose?: () => void;
// }

// function PDFViewer({ pdfUrl, pdfName, onClose }: PDFViewerProps) {
//   const [scale, setScale] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === '+' || e.key === '=') {
//         e.preventDefault();
//         setScale(s => Math.min(s + 0.1, 3));
//       } else if (e.key === '-') {
//         e.preventDefault();
//         setScale(s => Math.max(s - 0.1, 0.5));
//       } else if (e.key === 'r' || e.key === 'R') {
//         e.preventDefault();
//         setRotation(r => (r + 90) % 360);
//       } else if (e.key === 'Escape' && isFullscreen) {
//         e.preventDefault();
//         setIsFullscreen(false);
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isFullscreen]);
  
//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     if (!containerRef.current) return;
    
//     if (!isFullscreen) {
//       if (containerRef.current.requestFullscreen) {
//         containerRef.current.requestFullscreen();
//       }
//       setIsFullscreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       }
//       setIsFullscreen(false);
//     }
//   };
  
//   // Handle fullscreen change
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };
    
//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);
  
//   return (
//     <div 
//       ref={containerRef}
//       className={`relative bg-white rounded-xl overflow-hidden border border-gray-300 shadow-xl ${
//         isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-full'
//       }`}
//     >
//       {/* PDF Viewer Header */}
//       <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 py-3">
//         <div className="flex items-center gap-3">
//           <div className="bg-red-100 p-2 rounded-lg">
//             <span className="text-red-600 font-bold text-sm">PDF</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900 truncate max-w-md">{pdfName}</h3>
//             <p className="text-xs text-gray-600">Viewing PDF document</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2">
//           {/* Toolbar */}
//           <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
//             <button
//               onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
//               className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
//               title="Zoom Out"
//             >
//               <ZoomOut size={16} />
//             </button>
            
//             <span className="text-sm font-medium text-gray-700 min-w-[45px] text-center">
//               {Math.round(scale * 100)}%
//             </span>
            
//             <button
//               onClick={() => setScale(s => Math.min(s + 0.1, 3))}
//               className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
//               title="Zoom In"
//             >
//               <ZoomIn size={16} />
//             </button>
            
//             <div className="h-4 w-px bg-gray-300 mx-1" />
            
//             <button
//               onClick={() => setRotation(r => (r + 90) % 360)}
//               className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
//               title="Rotate"
//             >
//               <RotateCw size={16} />
//             </button>
            
//             <button
//               onClick={toggleFullscreen}
//               className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
//               title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//             >
//               {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
//             </button>
//           </div>
          
//           {/* Download Button */}
//           <a
//             href={pdfUrl}
//             download={pdfName}
//             className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//           >
//             <Download size={16} />
//             Download
//           </a>
          
//           {/* Close Button (only shown when onClose provided) */}
//           {onClose && (
//             <button
//               onClick={onClose}
//               className="h-8 w-8 p-0 hover:bg-gray-100 rounded flex items-center justify-center"
//               title="Close PDF Viewer"
//             >
//               <X size={16} />
//             </button>
//           )}
//         </div>
//       </div>
      
//       {/* PDF Content Area */}
//       <div className="relative w-full h-[calc(100%-64px)] overflow-auto bg-gray-900">
//         {/* PDF Embed */}
//         <div className="flex items-center justify-center min-h-full p-4">
//           <div 
//             className="bg-white shadow-lg rounded-lg overflow-hidden"
//             style={{
//               transform: `scale(${scale}) rotate(${rotation}deg)`,
//               transition: 'transform 0.2s ease',
//               transformOrigin: 'center center'
//             }}
//           >
//             <iframe
//               src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
//               title={pdfName}
//               className="w-full min-w-[800px] min-h-[600px] border-0"
//               loading="lazy"
//             />
//           </div>
//         </div>
        
//         {/* PDF Loading/Error States */}
//         {!pdfUrl && (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
//             <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//               <div className="text-red-500 text-4xl mb-4">📄</div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Not Available</h3>
//               <p className="text-gray-600">This PDF document cannot be loaded.</p>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* PDF Navigation Help */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
//         <span className="opacity-90">Use <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">+</kbd>/<kbd className="px-1.5 py-0.5 bg-gray-700 rounded">-</kbd> to zoom • <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">R</kbd> to rotate • <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">Esc</kbd> to exit fullscreen</span>
//       </div>
//     </div>
//   );
// }

// // Helper function to format file size
// const formatFileSize = (bytes: number | null): string => {
//   if (!bytes) return 'Unknown size';
  
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   if (bytes === 0) return '0 Bytes';
  
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
// };

// // Helper function to get file icon
// const getFileIcon = (type: string) => {
//   const icons: Record<string, string> = {
//     'PDF Document': '📕',
//     'Word Document': '📝',
//     'Excel Spreadsheet': '📊',
//     'CSV File': '📋',
//     'Text File': '📄',
//     'PowerPoint': '📽️',
//     'ZIP Archive': '📦',
//     'RAR Archive': '📦',
//     'Image': '🖼️',
//     'Audio': '🎵',
//     'Video': '🎥',
//     'JSON File': '📑',
//     'XML File': '📑',
//     'HTML File': '🌐',
//     'CSS File': '🎨',
//     'JavaScript File': '⚡',
//     'TypeScript File': '📘',
//     'Python File': '🐍',
//     'Java File': '☕',
//     'C++ File': '⚙️',
//     'C File': '⚙️',
//     'Markdown File': '📝',
//     'File': '📎'
//   };
  
//   return icons[type] || '📎';
// };

// // --- INTERFACES ---
// interface Lesson {
//   id: string
//   title: string
//   description?: string
//   duration: number
//   contentType: string
//   lessonType?: string
//   videoUrl?: string
//   videoThumbnail?: string
//   videoDuration?: number
//   isPreview: boolean
//   created_at?: string
  
//   // Progress tracking
//   watched?: number
//   completed?: boolean
//   bookmarks?: number[]
// }

// interface Module {
//   id: string
//   title: string
//   description?: string
//   order: number
//   created_at?: string
//   lessons: Lesson[]
//   // Progress tracking
//   progress?: number
// }

// // Define the UserProgress type
// interface UserProgress {
//   [lessonId: string]: {
//     completed: boolean;
//     progress: number;
//     timeSpent: number;
//     lastPosition: number;
//     lastAccessedAt: string | null;
//   };
// }

// interface CourseResource {
//   id: string;
//   name: string;
//   url: string;
//   type: string;
//   size: number | null;
//   lessonTitle: string;
//   moduleTitle: string;
// }

// interface CourseLearningProps {
//   courseId: string
//   courseData: any
//   curriculumData: Module[]
//   enrollmentData?: any
//   userId: string
//   initialUserProgress?: UserProgress
//   courseResources?: CourseResource[]
// }

// export default function CourseLearningPage({ 
//   courseId, 
//   courseData, 
//   curriculumData, 
//   enrollmentData,
//   userId,
//   initialUserProgress = {},
//   courseResources = []
// }: CourseLearningProps) {
//   const [currentModule, setCurrentModule] = useState(0)
//   const [currentLesson, setCurrentLesson] = useState(0)
//   const [expandedModules, setExpandedModules] = useState<number[]>([0])
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [volume, setVolume] = useState(1)
//   const [playbackSpeed, setPlaybackSpeed] = useState(1)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  
//   // Use proper type for userProgress
//   const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress)
  
//   // State for PDF viewer
//   const [selectedPdf, setSelectedPdf] = useState<CourseResource | null>(
//     courseResources.filter(resource => resource.type === 'PDF Document').length > 0 
//       ? courseResources.filter(resource => resource.type === 'PDF Document')[0] 
//       : null
//   );
  
//   const [videoDuration, setVideoDuration] = useState(0)
//   const [showControls, setShowControls] = useState(true)

//   // Use refs instead of state for time tracking
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0)

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   // Database progress saving
//   const [isSaving, setIsSaving] = useState(false)
//   const lastSaveRef = useRef(0)

//   // Group resources by type for better organization
//   const pdfResources = courseResources.filter(resource => resource.type === 'PDF Document');
//   const otherResources = courseResources.filter(resource => resource.type !== 'PDF Document');

//   // Load user progress from database on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId, userId])

//   // Enhanced loadUserProgress with user ID
//   const loadUserProgress = async () => {
//     try {
//       // Load from database with user ID
//       const response = await fetch(`/api/student/progress?courseId=${courseId}`)
//       if (response.ok) {
//         const data = await response.json()
        
//         // Transform the data to match our UserProgress type
//         const transformedProgress: UserProgress = {}
//         if (data.progress && typeof data.progress === 'object') {
//           Object.entries(data.progress).forEach(([lessonId, lessonData]: [string, any]) => {
//             transformedProgress[lessonId] = {
//               completed: lessonData.is_completed || lessonData.completed || false,
//               progress: lessonData.video_progress || lessonData.progress || 0,
//               timeSpent: lessonData.time_spent || 0,
//               lastPosition: lessonData.last_position || 0,
//               lastAccessedAt: lessonData.last_accessed_at || lessonData.last_accessed || null
//             }
//           })
//         }
//         setUserProgress(transformedProgress)
//       } else {
//         // Fallback to localStorage with user ID prefix
//         const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
//         if (savedProgress) {
//           try {
//             const parsedProgress = JSON.parse(savedProgress) as UserProgress
//             setUserProgress(parsedProgress)
//           } catch (e) {
//             console.error('Error parsing saved progress:', e)
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//       // Fallback to localStorage with user ID prefix
//       const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
//       if (savedProgress) {
//         try {
//           const parsedProgress = JSON.parse(savedProgress) as UserProgress
//           setUserProgress(parsedProgress)
//         } catch (e) {
//           console.error('Error parsing saved progress:', e)
//         }
//       }
//     }
//   }

//   // Enhanced saveProgressToDatabase with user ID
//   const saveProgressToDatabase = async (lessonId: string, progressData: {
//     completed?: boolean
//     progress?: number
//     timeSpent?: number
//     lastPosition?: number
//   }) => {
//     try {
//       setIsSaving(true)
      
//       const response = await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId,
//           userId, // ADD USER ID TO REQUEST
//           ...progressData
//         })
//       })

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
//         throw new Error(errorData.error || 'Failed to save progress')
//       }

//       return await response.json()
//     } catch (error) {
//       console.error('Error saving progress to database:', error)
//       // Save to localStorage with user ID prefix as fallback
//       localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Save progress to localStorage with user ID prefix
//   useEffect(() => {
//     if (Object.keys(userProgress).length > 0 && userId) {
//       localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
//     }
//   }, [userProgress, courseId, userId])

//   // Auto-save progress
//   useEffect(() => {
//     const autoSaveProgress = async () => {
//       const currentLessonData = getCurrentLessonData()
//       if (!currentLessonData || !videoRef.current) return

//       const currentTime = currentTimeRef.current
//       const now = Date.now()

//       // Calculate progress percentage for current lesson
//       const currentProgressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
//         ? (currentTime / (currentLessonData.duration || videoDuration)) * 100
//         : 0

//       // Only save if enough time has passed and we have meaningful progress
//       if (now - lastSaveRef.current > 30000 && currentTime > 10) {
//         try {
//           await saveProgressToDatabase(currentLessonData.id, {
//             progress: currentProgressPercentage,
//             timeSpent: Math.floor(currentTime),
//             lastPosition: Math.floor(currentTime)
//           })
//           lastSaveRef.current = now
//         } catch (error) {
//           console.error('Auto-save failed:', error)
//         }
//       }
//     }

//     const interval = setInterval(autoSaveProgress, 10000)
//     return () => clearInterval(interval)
//   }, [courseId, videoDuration])

//   // Calculate overall course progress
//   const calculateOverallProgress = () => {
//     if (!curriculumData.length) return 0
    
//     let totalLessons = 0
//     let completedLessons = 0
    
//     curriculumData.forEach(module => {
//       module.lessons.forEach(lesson => {
//         totalLessons++
//         if (userProgress[lesson.id]?.completed) {
//           completedLessons++
//         }
//       })
//     })
    
//     return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
//   }

//   // Calculate module progress
//   const calculateModuleProgress = (module: Module) => {
//     if (!module.lessons.length) return 0
    
//     const completedLessons = module.lessons.filter(lesson => 
//       userProgress[lesson.id]?.completed
//     ).length
    
//     return Math.round((completedLessons / module.lessons.length) * 100)
//   }

//   // Mark lesson as completed - ENHANCED with database saving
//   const completeLesson = async (lessonId?: string) => {
//     const targetLessonId = lessonId || currentLessonData?.id
//     if (!targetLessonId) return
    
//     // Update local state
//     setUserProgress(prev => ({
//       ...prev,
//       [targetLessonId]: { 
//         ...prev[targetLessonId],
//         completed: true,
//         completed_at: new Date().toISOString()
//       }
//     }))

//     // Save to database
//     try {
//       await saveProgressToDatabase(targetLessonId, {
//         completed: true,
//         progress: 100
//       })
//     } catch (error) {
//       console.error('Error saving progress:', error)
//     }
//   }

//   // Navigate to next lesson and auto-complete current if needed
//   const goToNextLesson = () => {
//     const currentLessonData = getCurrentLessonData()
    
//     // Auto-complete current lesson if not already completed
//     if (currentLessonData && !userProgress[currentLessonData.id]?.completed) {
//       completeLesson()
//     }

//     // Navigate to next lesson using the original navigation logic
//     if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//       selectLesson(currentModule, currentLesson + 1)
//     } else if (currentModule < curriculumData.length - 1) {
//       selectLesson(currentModule + 1, 0)
//     }
//   }

//   // Navigate to previous lesson
//   const goToPreviousLesson = () => {
//     if (currentLesson > 0) {
//       selectLesson(currentModule, currentLesson - 1)
//     } else if (currentModule > 0) {
//       selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//     }
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     currentTimeRef.current = 0 // Reset time ref
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false)
//     setShowControls(true)

//     // Reset video when changing lessons
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = 0
//         videoRef.current.pause()
//       }
//       forceUpdate(x => x + 1) // Force UI update
//     }, 100)

//     // Record lesson access in progress
//     const lesson = curriculumData[moduleIndex]?.lessons[lessonIndex]
//     if (lesson && !userProgress[lesson.id]?.completed) {
//       const updatedProgress: UserProgress = {
//         ...userProgress,
//         [lesson.id]: {
//           ...userProgress[lesson.id],
//           completed: userProgress[lesson.id]?.completed || false,
//           progress: userProgress[lesson.id]?.progress || 0,
//           timeSpent: userProgress[lesson.id]?.timeSpent || 0,
//           lastPosition: 0,
//           lastAccessedAt: new Date().toISOString()
//         }
//       }
      
//       setUserProgress(updatedProgress)

//       // Save lesson access to database
//       saveProgressToDatabase(lesson.id, {
//         progress: 0,
//         timeSpent: 0,
//         lastPosition: 0
//       }).catch(error => {
//         console.error('Error saving lesson access:', error)
//       })
//     }
//   }


//   // === YOUR EXACT ORIGINAL VIDEO CONTROL FUNCTIONS ===
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       // This happens if the browser blocks play (e.g. autoplay policy)
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
//         // We no longer attempt a complex auto-mute fallback here, 
//         // as the video element's onError and mediaError state will handle the diagnosis.
//         // A simple visual indication to the user is better than an endless loop.
//         if (videoRef.current) {
//            videoRef.current.pause();
//            setIsPlaying(false);
//         }
//       })
//     }
//   }

//   // CRITICAL FIX: New handleTimeUpdate that doesn't cause re-renders
//   const handleTimeUpdate = () => {
//     if (!videoRef.current) return;
    
//     currentTimeRef.current = videoRef.current.currentTime;

//     // Update UI only once per second to prevent excessive re-renders
//     if (Math.floor(currentTimeRef.current) % 1 === 0) {
//       forceUpdate(x => x + 1);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     if (videoRef.current) {
//       const duration = videoRef.current.duration
//       setVideoDuration(duration)
//     }
//   }

//   const handleVideoEnded = () => {
//     setIsPlaying(false)
//     // Mark as completed if watched most of the video
//     if (progressPercentage >= 90) {
//       completeLesson()
//     }
//   }

//   // CRITICAL FIX: Updated handleProgressClick to use ref
//   const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (videoRef.current && progressBarRef.current) {
//       const rect = progressBarRef.current.getBoundingClientRect()
//       const percent = (e.clientX - rect.left) / rect.width
//       const currentLessonDuration = currentLessonData?.duration || videoDuration || 1
//       const newTime = percent * currentLessonDuration
//       videoRef.current.currentTime = newTime
//       currentTimeRef.current = newTime
//       forceUpdate(x => x + 1) // Force UI update after seeking
//     }
//   }

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted
//       setIsMuted(!isMuted)
//     }
//   }

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newVolume = parseFloat(e.target.value)
//     setVolume(newVolume)
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume
//       setIsMuted(newVolume === 0)
//     }
//   }

//   const toggleFullscreen = () => {
//     if (videoRef.current) {
//       if (document.fullscreenElement) {
//         document.exitFullscreen()
//       } else {
//         videoRef.current.requestFullscreen()
//       }
//     }
//   }

//   const handleBookmark = () => {
//     if (!bookmarkedTimes.includes(Math.floor(currentTimeRef.current))) {
//       setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTimeRef.current)].sort((a, b) => a - b))
//     }
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//  const getCurrentLessonData = (): Lesson | null => {
//   if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//     return null
//   }
  
//   const lesson = curriculumData[currentModule].lessons[currentLesson]
//   const progress = userProgress[lesson.id] || {}
  
//   return {
//     ...lesson,
//     watched: progress.timeSpent || 0,  // Map timeSpent to watched
//     completed: progress.completed || false
//   }
// }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // CRITICAL FIX: Updated progressPercentage to use currentTimeRef
//   const progressPercentage = currentLessonData && (currentLessonData.duration || videoDuration)
//     ? (currentTimeRef.current / (currentLessonData.duration || videoDuration)) * 100
//     : 0

//   // Show controls on mouse move and hide after delay
//   const handleMouseMove = () => {
//     setShowControls(true)
//     if (controlsTimeoutRef.current) {
//       clearTimeout(controlsTimeoutRef.current)
//     }
//     controlsTimeoutRef.current = setTimeout(() => {
//       if (isPlaying) {
//         setShowControls(false)
//       }
//     }, 3000)
//   }

//   useEffect(() => {
//     return () => {
//       if (controlsTimeoutRef.current) {
//         clearTimeout(controlsTimeoutRef.current)
//       }
//     }
//   }, [])

//   // CRITICAL FIX: Robust Video URL Finder
//   const getVideoUrl = () => {
//     if (!currentLessonData) return null
    
//     const lesson = curriculumData[currentModule]?.lessons[currentLesson]
//     if (!lesson) return null

//     // Check primary field
//     if (lesson.videoUrl && typeof lesson.videoUrl === 'string' && lesson.videoUrl.length > 0) {
//       return lesson.videoUrl
//     }

//     // Try all possible video field names (as per previous debugging)
//     const possibleFields = [
//       'video_url', 'video', 'url', 'file', 
//       'videoURL', 'videoFile', 'video_file',
//       'contentUrl', 'content_url', 'mediaUrl', 'media_url',
//       'source', 'src', 'videoSource', 'video_source',
//       'cloudinaryUrl', 'cloudinary_url', 'cloudinary'
//     ]

//     for (const field of possibleFields) {
//       const value = (lesson as any)[field]
//       if (value && typeof value === 'string' && value.length > 0) {
//         return value
//       }
//     }
//     return null
//   }

//   const videoUrl = getVideoUrl()
  
//   // CRITICAL FIX: Check if a video should display (The purple gradient issue)
//   const isVideoLesson = Boolean(videoUrl) || currentLessonData?.contentType === 'video' || currentLessonData?.lessonType === 'video';

//   if (!currentLessonData) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading lesson...</p>
//         </div>
//       </div>
//     )
//   }

//   // AxioQuan Logo Component
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )

//   // Get lesson icon based on content type
//   const getLessonIcon = (contentType: string, completed?: boolean) => {
//     if (completed) {
//       return <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
//     }
    
//     // Check if videoUrl exists for general video icon, even if contentType is 'free'
//     if (videoUrl) return <Video size={16} className="flex-shrink-0 text-blue-500" />

//     switch (contentType) {
//       case 'video':
//         return <Video size={16} className="flex-shrink-0 text-blue-500" />
//       case 'document':
//       case 'text':
//         return <FileText size={16} className="flex-shrink-0 text-purple-500" />
//       case 'quiz':
//         return <FileText size={16} className="flex-shrink-0 text-orange-500" />
//       default:
//         return <Play size={16} className="flex-shrink-0 text-gray-500" />
//     }
//   }

//   // === YOUR EXACT ORIGINAL VIDEO PLAYER COMPONENT ===
//   const VideoPlayer = () => {
//     return (
//       <div className="relative w-full h-full bg-black">
//         {videoUrl ? (
//           <video
//             key={videoUrl}
//             ref={videoRef}
//             className="w-full h-full object-contain"
//             controls
//             playsInline
//           >
//             <source src={videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//             <p>No video available</p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Mobile Sidebar Overlay - IMPROVED VERSION
//   const MobileSidebar = () => (
//     <>
//       {/* Improved Mobile Overlay - Clean dim background with blur */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden transition-all duration-300"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Improved Mobile Sidebar - Smooth slide from right without obstruction */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
//         shadow-xl
//       `}>
//         <div className="p-4 border-b border-border bg-white">
//           <div className="flex items-center justify-between mb-4">
//             <AxioQuanLogo />
//             <button
//               onClick={() => setIsMobileSidebarOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <X size={20} />
//             </button>
//           </div>
//           <Link 
//             href="/dashboard"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group w-full"
//           >
//             <LayoutDashboard size={20} className="text-primary" />
//             <span className="font-semibold text-foreground">Back to Dashboard</span>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2 h-[calc(100vh-140px)]">
//           {curriculumData.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {calculateModuleProgress(module)}% complete
//                       {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
//                     </p>
//                   </div>
//                 </div>
//                 {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>

//               {expandedModules.includes(moduleIndex) && (
//                 <div className="space-y-1 ml-4">
//                   {module.lessons.map((lesson, lessonIndex) => (
//                     <button
//                       key={lesson.id}
//                       onClick={() => selectLesson(moduleIndex, lessonIndex)}
//                       className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
//                         currentModule === moduleIndex && currentLesson === lessonIndex
//                           ? "bg-primary text-primary-foreground"
//                           : "hover:bg-gray-100 text-foreground"
//                       }`}
//                     >
//                       {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       {lesson.duration && (
//                         <span className="text-xs opacity-75 flex items-center gap-1">
//                           <Clock size={12} />
//                           {formatTime(lesson.duration)}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )

//   return (
//     <div className="flex min-h-screen bg-background">
//       {/* Mobile Sidebar */}
//       <MobileSidebar />

//       {/* Desktop Sidebar Navigation - Fixed Position with Dashboard Link */}
//       <div className="hidden md:flex w-80 bg-white/90 backdrop-blur-md border-r border-border flex-col overflow-hidden fixed left-0 top-0 bottom-0 z-30">
//         {/* Logo and Dashboard Header */}
//         <div className="p-4 border-b border-border bg-white/95">
//           <div className="mb-4">
//             <AxioQuanLogo />
//           </div>
//           <Link 
//             href="/dashboard"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition group"
//           >
//             <LayoutDashboard size={20} className="text-primary" />
//             <span className="font-semibold text-foreground">Back to Dashboard</span>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {curriculumData.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {calculateModuleProgress(module)}% complete
//                       {isSaving && <span className="ml-2 text-blue-500">Saving...</span>}
//                     </p>
//                   </div>
//                 </div>
//                 {expandedModules.includes(moduleIndex) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>

//               {expandedModules.includes(moduleIndex) && (
//                 <div className="space-y-1 ml-4">
//                   {module.lessons.map((lesson, lessonIndex) => (
//                     <button
//                       key={lesson.id}
//                       onClick={() => selectLesson(moduleIndex, lessonIndex)}
//                       className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
//                         currentModule === moduleIndex && currentLesson === lessonIndex
//                           ? "bg-primary text-primary-foreground"
//                           : "hover:bg-gray-100 text-foreground"
//                       }`}
//                     >
//                       {getLessonIcon(lesson.contentType, userProgress[lesson.id]?.completed)}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       {lesson.duration && (
//                         <span className="text-xs opacity-75 flex items-center gap-1">
//                           <Clock size={12} />
//                           {formatTime(lesson.duration)}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content Area - Normal Page Scroll with Sidebar Offset */}
//       <div className="flex-1 overflow-y-auto md:ml-80 w-full">
//         {/* Mobile Header */}
//         <div className="md:hidden bg-white border-b border-border p-4 sticky top-0 z-30 w-full">
//           <div className="flex items-center justify-between w-full">
//             <AxioQuanLogo size="small" />
//             <div className="flex-1 ml-3 min-w-0">
//               <h1 className="text-lg font-semibold text-gray-900 truncate">
//                 {courseData?.title || 'Course'}
//               </h1>
              
//               {/* Current Lesson Info for Mobile */}
//               <div className="mt-1">
//                 <p className="text-xs text-muted-foreground truncate">{curriculumData[currentModule]?.title}</p>
//                 <p className="font-semibold text-foreground text-sm truncate">{currentLessonData.title}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Course Menu Button */}
//         <button
//           onClick={() => setIsMobileSidebarOpen(true)}
//           className="md:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 z-40 animate-bounce"
//           style={{ animationDuration: '2s' }}
//         >
//           <Menu size={24} />
//           <span className="sr-only">Open Course Menu</span>
//         </button>

//         <div className="w-full max-w-none">
//           {/* Course Title Header - Full Width (Hidden on mobile) */}
//           <div className="bg-white p-6 md:p-8 border-b border-border w-full hidden md:block">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData?.title || 'Course'}</h1>
//               <p className="text-gray-600 text-lg">{courseData?.short_description || courseData?.description}</p>
//               <p className="text-gray-500 mt-1">Instructor: {courseData?.instructor_name || 'Instructor'}</p>
//             </div>
//           </div>

//           {/* Content Player Section - Full Width */}
//           <div className="bg-white p-4 md:p-8 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="bg-black rounded-xl overflow-hidden relative w-full aspect-video max-w-4xl mx-auto shadow-lg">
                
//                 {/* CRITICAL FIX APPLIED HERE: Using the robust `isVideoLesson` check */}
//                 {isVideoLesson ? (
//                   <VideoPlayer />
//                 ) : (
//                   // Non-video content placeholder (PURPLE GRADIENT)
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
//                     <div className="text-center space-y-4 text-white">
//                       <FileText size={64} className="mx-auto" />
//                       <p className="text-xl font-semibold">{currentLessonData.title}</p>
//                       <p className="text-white/80">This is a {currentLessonData.contentType} lesson</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Progress saving indicator */}
//               <div className="mt-2 text-center">
//                 {isSaving && (
//                   <div className="inline-flex items-center gap-2 text-sm text-blue-600">
//                     <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
//                     Saving progress...
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div
//                   className="bg-primary rounded-full h-3 transition-all duration-500 ease-in-out"
//                   style={{ width: `${overallProgress}%` }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600 mt-2">
//                 You've completed {overallProgress}% of the course. Keep going!
//               </p>
//             </div>
//           </div>

//           {/* Lesson Content Section - Full Width */}
//           <div className="bg-white px-4 md:px-8 py-6 md:py-8 w-full">
//             {/* Lesson Header - Full Width but content constrained */}
//             <div className="border-b border-border pb-6 md:pb-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
//                   <div className="hidden md:block">
//                     <p className="text-sm text-muted-foreground mb-2">{curriculumData[currentModule]?.title}</p>
//                     <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentLessonData.title}</h1>
//                     <p className="text-muted-foreground">
//                       {currentLessonData.duration ? `${Math.round(currentLessonData.duration / 60)} minute ` : ''}
//                       {currentLessonData.contentType} lesson
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => completeLesson()}
//                     disabled={userProgress[currentLessonData.id]?.completed || isSaving}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800 cursor-not-allowed"
//                         : "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-md"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? (
//                       <span className="flex items-center gap-2">
//                         <CheckCircle2 size={18} />
//                         Completed
//                       </span>
//                     ) : isSaving ? (
//                       <span className="flex items-center gap-2">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                         Saving...
//                       </span>
//                     ) : (
//                       "Mark Complete"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>


//             {/* Lesson Content Tabs - Full Width but content constrained */}
//             <div className="border-b border-border w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex gap-2 md:gap-4 overflow-x-auto">
//                   <button
//                     onClick={() => setActiveTab("overview")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "overview"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Overview
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("notes")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "notes"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Notes
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("resources")}
//                     className={`px-3 py-2 md:px-4 md:py-3 font-semibold transition whitespace-nowrap ${
//                       activeTab === "resources"
//                         ? "text-primary border-b-2 border-primary"
//                         : "text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     Resources
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Tab Content - ONLY this section is constrained to max-w-4xl */}
//             <div className="w-full">
//               <div className="max-w-4xl mx-auto mt-6 md:mt-8 px-4 md:px-6">
//                 {activeTab === "overview" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-6 md:space-y-8 w-full">
//                       <div>
//                         <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-foreground">About this lesson</h3>
//                         <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
//                           {currentLessonData.description || "This lesson covers important concepts and practical applications. Follow along to enhance your understanding and skills."}
//                         </p>
//                       </div>

//                       <div className="bg-gray-50 rounded-lg p-4 md:p-6 w-full">
//                         <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                         <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Understand key concepts presented in this lesson
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Apply the knowledge to practical scenarios
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Complete exercises and assessments
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="w-full">
//                         <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
//                         <div className="space-y-2 md:space-y-3 w-full">
//                           {bookmarkedTimes.length > 0 ? (
//                             bookmarkedTimes.map((time, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => {
//                                   currentTimeRef.current = time
//                                   if (videoRef.current) {
//                                     videoRef.current.currentTime = time
//                                   }
//                                   forceUpdate(x => x + 1)
//                                 }}
//                                 className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
//                               >
//                                 <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
//                                 <div>
//                                   <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
//                                   <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
//                                 </div>
//                               </button>
//                             ))
//                           ) : (
//                             <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
//                               <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
//                               <p className="text-muted-foreground">No bookmarks yet</p>
//                               <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "notes" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-4 md:space-y-6 w-full">
//                       <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
                      
//                       {/* Text Formatting Toolbar */}
//                       <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
//                           <Bold size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
//                           <Italic size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
//                           <Underline size={16} />
//                         </button>
//                         <div className="w-px bg-gray-300 h-4 md:h-6"></div>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bullet List">
//                           <List size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Numbered List">
//                           <ListOrdered size={16} />
//                         </button>
//                         <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
//                           <LinkIcon size={16} />
//                         </button>
//                       </div>

//                       {/* Large Text Area - Full Width */}
//                       <textarea
//                         value={notes}
//                         onChange={(e) => setNotes(e.target.value)}
//                         placeholder="Start typing your notes here... You can format your text using the toolbar above. Write down key concepts, questions, code snippets, or insights from this lesson."
//                         className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 rounded-lg border border-gray-300 bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg leading-relaxed resize-y"
//                       />
                      
//                       <div className="flex justify-between items-center text-xs md:text-sm text-muted-foreground w-full flex-col md:flex-row gap-2 md:gap-0">
//                         <span>Your notes are automatically saved as you type</span>
//                         <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "resources" && (
//                   <div className="w-full py-4 md:py-6">
//                     <div className="space-y-6 md:space-y-8 w-full">
//                       <h3 className="text-xl md:text-2xl font-bold text-foreground">Course Resources</h3>
                      
//                       {/* PDF Documents Section */}
//                       {pdfResources.length > 0 ? (
//                         <div className="space-y-6">
//                           <div className="flex items-center justify-between">
//                             <h4 className="text-lg md:text-xl font-bold text-gray-900">📚 PDF Documents</h4>
//                             <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                               {pdfResources.length} {pdfResources.length === 1 ? 'document' : 'documents'}
//                             </span>
//                           </div>
                          
//                           {/* PDF Viewer */}
//                           {selectedPdf && (
//                             <div className="mb-6">
//                               <PDFViewer 
//                                 pdfUrl={selectedPdf.url}
//                                 pdfName={selectedPdf.name}
//                                 onClose={() => setSelectedPdf(null)}
//                               />
//                             </div>
//                           )}
                          
//                           {/* PDF Thumbnails Grid */}
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {pdfResources.map((pdf) => (
//                               <div
//                                 key={pdf.id}
//                                 className={`bg-white border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group ${
//                                   selectedPdf?.id === pdf.id 
//                                     ? 'border-blue-500 ring-2 ring-blue-200' 
//                                     : 'border-gray-200 hover:border-blue-300'
//                                 }`}
//                                 onClick={() => setSelectedPdf(pdf)}
//                               >
//                                 <div className="flex items-start gap-3">
//                                   <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                                     <span className="text-red-600 font-bold text-sm">PDF</span>
//                                   </div>
                                  
//                                   <div className="flex-1 min-w-0">
//                                     <h5 className="font-semibold text-gray-900 truncate">{pdf.name}</h5>
//                                     <p className="text-xs text-gray-600 mt-1 truncate">
//                                       From: {pdf.lessonTitle}
//                                     </p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                       Module: {pdf.moduleTitle}
//                                     </p>
                                    
//                                     <div className="flex items-center justify-between mt-3">
//                                       <span className="text-xs text-gray-500">
//                                         {pdf.size ? formatFileSize(pdf.size) : 'Size unknown'}
//                                       </span>
                                      
//                                       <div className="flex items-center gap-2">
//                                         <button
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             window.open(pdf.url, '_blank');
//                                           }}
//                                           className="text-xs text-blue-600 hover:text-blue-800 font-medium"
//                                           title="Open in new tab"
//                                         >
//                                           Open
//                                         </button>
                                        
//                                         <a
//                                           href={pdf.url}
//                                           download={pdf.name}
//                                           onClick={(e) => e.stopPropagation()}
//                                           className="text-xs text-green-600 hover:text-green-800 font-medium"
//                                           title="Download PDF"
//                                         >
//                                           Download
//                                         </a>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
                                
//                                 {/* Selected Indicator */}
//                                 {selectedPdf?.id === pdf.id && (
//                                   <div className="mt-3 pt-3 border-t border-blue-100">
//                                     <div className="flex items-center gap-2 text-blue-600 text-sm">
//                                       <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
//                                       Currently viewing
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-center py-8 bg-gray-50 rounded-xl">
//                           <div className="text-gray-400 text-4xl mb-4">📄</div>
//                           <p className="text-gray-600">No PDF documents available for this course.</p>
//                         </div>
//                       )}
                      
//                       {/* Other Downloadable Resources */}
//                       {otherResources.length > 0 && (
//                         <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
//                           <div className="flex items-center justify-between">
//                             <h4 className="text-lg md:text-xl font-bold text-gray-900">📎 Other Resources</h4>
//                             <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//                               {otherResources.length} {otherResources.length === 1 ? 'file' : 'files'}
//                             </span>
//                           </div>
                          
//                           <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
//                             <div className="overflow-x-auto">
//                               <table className="w-full">
//                                 <thead className="bg-gray-50">
//                                   <tr>
//                                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                                       File
//                                     </th>
//                                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                                       Type
//                                     </th>
//                                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                                       Source
//                                     </th>
//                                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                                       Size
//                                     </th>
//                                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                                       Action
//                                     </th>
//                                   </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                   {otherResources.map((resource) => (
//                                     <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
//                                       <td className="py-3 px-4">
//                                         <div className="flex items-center gap-3">
//                                           <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                                             <span className="text-blue-600">{getFileIcon(resource.type)}</span>
//                                           </div>
//                                           <div className="min-w-0">
//                                             <p className="font-medium text-gray-900 truncate max-w-xs">
//                                               {resource.name}
//                                             </p>
//                                           </div>
//                                         </div>
//                                       </td>
//                                       <td className="py-3 px-4">
//                                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//                                           {resource.type}
//                                         </span>
//                                       </td>
//                                       <td className="py-3 px-4">
//                                         <div className="text-sm text-gray-600">
//                                           <p className="truncate max-w-xs">{resource.lessonTitle}</p>
//                                           <p className="text-xs text-gray-500">{resource.moduleTitle}</p>
//                                         </div>
//                                       </td>
//                                       <td className="py-3 px-4">
//                                         <span className="text-sm text-gray-600">
//                                           {resource.size ? formatFileSize(resource.size) : '—'}
//                                         </span>
//                                       </td>
//                                       <td className="py-3 px-4">
//                                         <a
//                                           href={resource.url}
//                                           download={resource.name}
//                                           className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
//                                         >
//                                           <Download size={14} />
//                                           Download
//                                         </a>
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* No Resources Message */}
//                       {courseResources.length === 0 && (
//                         <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
//                           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <span className="text-3xl">📁</span>
//                           </div>
//                           <h4 className="text-xl font-semibold text-gray-900 mb-2">No Resources Available</h4>
//                           <p className="text-gray-600 max-w-md mx-auto">
//                             This course doesn't have any downloadable resources or documents yet.
//                           </p>
//                           <p className="text-sm text-gray-500 mt-2">
//                             Check back later or contact the instructor for additional materials.
//                           </p>
//                         </div>
//                       )}
                      
//                       {/* Quick Stats */}
//                       {courseResources.length > 0 && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                             <div className="bg-blue-50 p-4 rounded-xl">
//                               <div className="text-2xl font-bold text-blue-700">{courseResources.length}</div>
//                               <div className="text-sm text-blue-600">Total Files</div>
//                             </div>
//                             <div className="bg-green-50 p-4 rounded-xl">
//                               <div className="text-2xl font-bold text-green-700">{pdfResources.length}</div>
//                               <div className="text-sm text-green-600">PDF Documents</div>
//                             </div>
//                             <div className="bg-purple-50 p-4 rounded-xl">
//                               <div className="text-2xl font-bold text-purple-700">{otherResources.length}</div>
//                               <div className="text-sm text-purple-600">Other Files</div>
//                             </div>
//                             <div className="bg-amber-50 p-4 rounded-xl">
//                               <div className="text-2xl font-bold text-amber-700">
//                                 {new Set(courseResources.map(r => r.moduleTitle)).size}
//                               </div>
//                               <div className="text-sm text-amber-600">Modules</div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Navigation Buttons - Full Width but content constrained */}
//             <div className="border-t border-border w-full mt-6 md:mt-8">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex gap-3 md:gap-4 py-6 md:py-8 flex-col md:flex-row">
//                   <button
//                     onClick={goToPreviousLesson}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={goToNextLesson}
//                     disabled={
//                       currentModule === curriculumData.length - 1 &&
//                       currentLesson === curriculumData[currentModule].lessons.length - 1
//                     }
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Next Lesson
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

























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
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Eye,
  Archive,
  Printer,
  Music,
  Image as ImageIcon,
  Code,
  Presentation,
  Sheet,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { toast } from '@/hooks/use-toast'
import FileViewer from '@/components/courses/file-viewer'

// Helper function to format file size
const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return 'Unknown size';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

// Helper function to get file icon
const getFileIcon = (type: string) => {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('pdf')) return '📄';
  if (lowerType.includes('word') || lowerType.includes('doc')) return '📝';
  if (lowerType.includes('excel') || lowerType.includes('sheet') || lowerType.includes('csv')) return '📊';
  if (lowerType.includes('powerpoint') || lowerType.includes('presentation')) return '📈';
  if (lowerType.includes('image')) return '🖼️';
  if (lowerType.includes('video')) return '🎬';
  if (lowerType.includes('audio')) return '🎵';
  if (lowerType.includes('zip') || lowerType.includes('archive') || lowerType.includes('rar')) return '🗜️';
  if (lowerType.includes('code') || lowerType.includes('programming') || 
      lowerType.includes('json') || lowerType.includes('xml')) return '💻';
  return '📁';
};

// --- INTERFACES ---
interface Lesson {
  id: string
  title: string
  description?: string
  duration: number
  contentType: string
  lessonType?: string
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

// Define the UserProgress type
interface UserProgress {
  [lessonId: string]: {
    completed: boolean;
    progress: number;
    timeSpent: number;
    lastPosition: number;
    lastAccessedAt: string | null;
  };
}

interface CourseResource {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number | null;
  lessonTitle: string;
  moduleTitle: string;
  isPdf?: boolean;
}

interface CourseLearningProps {
  courseId: string
  courseData: any
  curriculumData: Module[]
  enrollmentData?: any
  userId: string
  initialUserProgress?: UserProgress
  courseResources?: CourseResource[]
}

export default function CourseLearningPage({ 
  courseId, 
  courseData, 
  curriculumData, 
  enrollmentData,
  userId,
  initialUserProgress = {},
  courseResources = []
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
  
  // Use proper type for userProgress
  const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress)
  
  // State for PDF viewer
  const [selectedPdf, setSelectedPdf] = useState<CourseResource | null>(
    courseResources.filter(resource => resource.type === 'PDF Document').length > 0 
      ? courseResources.filter(resource => resource.type === 'PDF Document')[0] 
      : null
  );
  
  // State for File Viewer
  const [selectedFile, setSelectedFile] = useState<CourseResource | null>(null);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  
  const [videoDuration, setVideoDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  // Use refs instead of state for time tracking
  const currentTimeRef = useRef(0)
  const [, forceUpdate] = useState(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Database progress saving
  const [isSaving, setIsSaving] = useState(false)
  const lastSaveRef = useRef(0)

  // Group resources by type for better organization
  const pdfResources = courseResources.filter(resource => resource.type === 'PDF Document');
  const otherResources = courseResources.filter(resource => resource.type !== 'PDF Document');

  // Helper functions for file viewer
  const getFileIndex = (file: CourseResource) => {
    return courseResources.findIndex(resource => resource.id === file.id);
  };

  const handleNextFile = () => {
    if (selectedFile && currentFileIndex < courseResources.length - 1) {
      const nextIndex = currentFileIndex + 1;
      setSelectedFile(courseResources[nextIndex]);
      setCurrentFileIndex(nextIndex);
    }
  };

  const handlePrevFile = () => {
    if (selectedFile && currentFileIndex > 0) {
      const prevIndex = currentFileIndex - 1;
      setSelectedFile(courseResources[prevIndex]);
      setCurrentFileIndex(prevIndex);
    }
  };

  // Load user progress from database on component mount
  useEffect(() => {
    loadUserProgress()
  }, [courseId, userId])

  // Enhanced loadUserProgress with user ID
  const loadUserProgress = async () => {
    try {
      // Load from database with user ID
      const response = await fetch(`/api/student/progress?courseId=${courseId}`)
      if (response.ok) {
        const data = await response.json()
        
        // Transform the data to match our UserProgress type
        const transformedProgress: UserProgress = {}
        if (data.progress && typeof data.progress === 'object') {
          Object.entries(data.progress).forEach(([lessonId, lessonData]: [string, any]) => {
            transformedProgress[lessonId] = {
              completed: lessonData.is_completed || lessonData.completed || false,
              progress: lessonData.video_progress || lessonData.progress || 0,
              timeSpent: lessonData.time_spent || 0,
              lastPosition: lessonData.last_position || 0,
              lastAccessedAt: lessonData.last_accessed_at || lessonData.last_accessed || null
            }
          })
        }
        setUserProgress(transformedProgress)
      } else {
        // Fallback to localStorage with user ID prefix
        const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
        if (savedProgress) {
          try {
            const parsedProgress = JSON.parse(savedProgress) as UserProgress
            setUserProgress(parsedProgress)
          } catch (e) {
            console.error('Error parsing saved progress:', e)
          }
        }
      }
    } catch (error) {
      console.error('Error loading user progress:', error)
      // Fallback to localStorage with user ID prefix
      const savedProgress = localStorage.getItem(`course-progress-${userId}-${courseId}`)
      if (savedProgress) {
        try {
          const parsedProgress = JSON.parse(savedProgress) as UserProgress
          setUserProgress(parsedProgress)
        } catch (e) {
          console.error('Error parsing saved progress:', e)
        }
      }
    }
  }

  // Enhanced saveProgressToDatabase with user ID
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
          userId, // ADD USER ID TO REQUEST
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
      // Save to localStorage with user ID prefix as fallback
      localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  // Save progress to localStorage with user ID prefix
  useEffect(() => {
    if (Object.keys(userProgress).length > 0 && userId) {
      localStorage.setItem(`course-progress-${userId}-${courseId}`, JSON.stringify(userProgress))
    }
  }, [userProgress, courseId, userId])

  // Auto-save progress
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
    if (lesson && !userProgress[lesson.id]?.completed) {
      const updatedProgress: UserProgress = {
        ...userProgress,
        [lesson.id]: {
          ...userProgress[lesson.id],
          completed: userProgress[lesson.id]?.completed || false,
          progress: userProgress[lesson.id]?.progress || 0,
          timeSpent: userProgress[lesson.id]?.timeSpent || 0,
          lastPosition: 0,
          lastAccessedAt: new Date().toISOString()
        }
      }
      
      setUserProgress(updatedProgress)

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
    watched: progress.timeSpent || 0,  // Map timeSpent to watched
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

            {/* File Viewer Modal */}
            {showFileViewer && selectedFile && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-6xl h-[90vh]">
                  <FileViewer
                    file={selectedFile}
                    onClose={() => setShowFileViewer(false)}
                    onNext={handleNextFile}
                    onPrev={handlePrevFile}
                    showNavigation={courseResources.length > 1}
                  />
                </div>
              </div>
            )}

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
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">Course Resources</h3>
                      
                      {/* Quick Stats */}
                      {courseResources.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                          <div className="bg-blue-50 p-3 md:p-4 rounded-xl">
                            <div className="text-lg md:text-2xl font-bold text-blue-700">{courseResources.length}</div>
                            <div className="text-xs md:text-sm text-blue-600">Total Files</div>
                          </div>
                          <div className="bg-green-50 p-3 md:p-4 rounded-xl">
                            <div className="text-lg md:text-2xl font-bold text-green-700">
                              {pdfResources.length}
                            </div>
                            <div className="text-xs md:text-sm text-green-600">PDF Documents</div>
                          </div>
                          <div className="bg-purple-50 p-3 md:p-4 rounded-xl">
                            <div className="text-lg md:text-2xl font-bold text-purple-700">{otherResources.length}</div>
                            <div className="text-xs md:text-sm text-purple-600">Other Files</div>
                          </div>
                          <div className="bg-amber-50 p-3 md:p-4 rounded-xl">
                            <div className="text-lg md:text-2xl font-bold text-amber-700">
                              {new Set(courseResources.map(r => r.moduleTitle)).size}
                            </div>
                            <div className="text-xs md:text-sm text-amber-600">Modules</div>
                          </div>
                        </div>
                      )}
                      
                      {/* All Resources Section */}
                      {courseResources.length > 0 ? (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg md:text-xl font-bold text-gray-900">All Resources</h4>
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                              {courseResources.length} {courseResources.length === 1 ? 'file' : 'files'}
                            </span>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                      File
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                      Type
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden md:table-cell">
                                      Source
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                      Size
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {courseResources.map((resource, index) => (
                                    <tr key={resource.id} className="hover:bg-gray-50 transition-colors group">
                                      <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-blue-600">{getFileIcon(resource.type)}</span>
                                          </div>
                                          <div className="min-w-0">
                                            <p className="font-medium text-gray-900 truncate max-w-xs">
                                              {resource.name}
                                            </p>
                                            <p className="text-xs text-gray-500 md:hidden">
                                              {resource.lessonTitle}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-3 px-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                          {resource.type}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 hidden md:table-cell">
                                        <div className="text-sm text-gray-600">
                                          <p className="truncate max-w-xs">{resource.lessonTitle}</p>
                                          <p className="text-xs text-gray-500">{resource.moduleTitle}</p>
                                        </div>
                                      </td>
                                      <td className="py-3 px-4">
                                        <span className="text-sm text-gray-600">
                                          {resource.size ? formatFileSize(resource.size) : '—'}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() => {
                                              setSelectedFile(resource);
                                              setCurrentFileIndex(index);
                                              setShowFileViewer(true);
                                            }}
                                            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="Preview file"
                                          >
                                            <Eye size={14} />
                                            View
                                          </button>
                                          <a
                                            href={resource.url}
                                            download={resource.name}
                                            className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-800 font-medium text-sm px-3 py-1.5 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                            title="Download file"
                                          >
                                            <Download size={14} />
                                            Download
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          {/* Card View for Mobile */}
                          <div className="md:hidden space-y-3">
                            <h4 className="text-lg font-bold text-gray-900">Resources</h4>
                            {courseResources.map((resource, index) => (
                              <div
                                key={resource.id}
                                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-600 text-lg">{getFileIcon(resource.type)}</span>
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-semibold text-gray-900 truncate">{resource.name}</h5>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {resource.type} • {resource.size ? formatFileSize(resource.size) : 'Size unknown'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 truncate">
                                      From: {resource.lessonTitle}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-3">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => {
                                            setSelectedFile(resource);
                                            setCurrentFileIndex(index);
                                            setShowFileViewer(true);
                                          }}
                                          className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 bg-blue-50 rounded"
                                        >
                                          View
                                        </button>
                                        
                                        <a
                                          href={resource.url}
                                          download={resource.name}
                                          className="text-xs text-green-600 hover:text-green-800 font-medium px-2 py-1 bg-green-50 rounded"
                                        >
                                          Download
                                        </a>
                                      </div>
                                      
                                      <span className="text-xs text-gray-500">
                                        {resource.moduleTitle}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📁</span>
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">No Resources Available</h4>
                          <p className="text-gray-600 max-w-md mx-auto">
                            This course doesn't have any downloadable resources or documents yet.
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Check back later or contact the instructor for additional materials.
                          </p>
                        </div>
                      )}
                      
                      {/* Quick Actions Bar */}
                      {courseResources.length > 0 && (
                        <div className="flex flex-wrap gap-3 justify-center pt-6 border-t border-gray-200">
                          <button
                            onClick={() => {
                              // Download all as zip (would need backend implementation)
                              toast({
                                title: "Feature Coming Soon",
                                description: "Bulk download will be available in the next update.",
                              });
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors"
                          >
                            <Archive className="h-4 w-4" />
                            Download All as ZIP
                          </button>
                          
                          <button
                            onClick={() => {
                              // Print all resources (would need backend implementation)
                              toast({
                                title: "Feature Coming Soon",
                                description: "Print all resources feature will be available soon.",
                              });
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                          >
                            <Printer className="h-4 w-4" />
                            Print All
                          </button>
                        </div>
                      )}
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