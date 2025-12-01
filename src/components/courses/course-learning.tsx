
// // /components/courses/course-learning.tsx

// 'use client'

// import { useState } from "react"
// import Link from "next/link"
// import {
//   ChevronDown,
//   ChevronUp,
//   Play,
//   Pause,
//   Volume2,
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
// } from "lucide-react"

// interface Lesson {
//   id: string
//   title: string
//   duration: number
//   watched: number
//   type: "video" | "pdf" | "document"
//   completed: boolean
//   bookmarks?: number[]
// }

// interface Module {
//   id: string
//   title: string
//   progress: number
//   lessons: Lesson[]
// }

// interface CourseData {
//   id: string
//   title: string
//   description: string
//   instructor: string
//   modules: Module[]
// }

// interface CourseLearningProps {
//   courseId: string
// }

// export default function CourseLearningPage({ courseId }: CourseLearningProps) {
//   const [currentModule, setCurrentModule] = useState(0)
//   const [currentLesson, setCurrentLesson] = useState(0)
//   const [expandedModules, setExpandedModules] = useState<number[]>([0])
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [playbackSpeed, setPlaybackSpeed] = useState(1)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

//   // Mock course data - you'll replace this with API data later
//   const courseData: CourseData = {
//     id: courseId,
//     title: "Advanced React Masterclass",
//     description: "Master React with modern patterns and best practices",
//     instructor: "Sarah Anderson",
//     modules: [
//       {
//         id: "1",
//         title: "Module 1: React Fundamentals",
//         progress: 100,
//         lessons: [
//           { id: "1-1", title: "Understanding JSX", duration: 1200, watched: 1200, type: "video", completed: true },
//           { id: "1-2", title: "Components and Props", duration: 1500, watched: 800, type: "video", completed: false },
//           { id: "1-3", title: "State Management Basics", duration: 1800, watched: 0, type: "video", completed: false },
//         ],
//       },
//       {
//         id: "2",
//         title: "Module 2: Hooks Deep Dive",
//         progress: 45,
//         lessons: [
//           { id: "2-1", title: "useState Hook", duration: 1400, watched: 0, type: "video", completed: false },
//           { id: "2-2", title: "useEffect Hook", duration: 1600, watched: 0, type: "video", completed: false },
//           { id: "2-3", title: "Custom Hooks", duration: 1900, watched: 0, type: "video", completed: false },
//         ],
//       },
//       {
//         id: "3",
//         title: "Module 3: Context API & Redux",
//         progress: 0,
//         lessons: [
//           { id: "3-1", title: "Context API Introduction", duration: 1300, watched: 0, type: "video", completed: false },
//           { id: "3-2", title: "Redux Fundamentals", duration: 2000, watched: 0, type: "video", completed: false },
//         ],
//       },
//     ],
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     setCurrentTime(0)
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false) // Close mobile sidebar when lesson is selected
//   }

//   const handleBookmark = () => {
//     if (!bookmarkedTimes.includes(Math.floor(currentTime))) {
//       setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTime)])
//     }
//   }

//   const completeLesson = () => {
//     courseData.modules[currentModule].lessons[currentLesson].completed = true
//   }

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   const currentLessonData = courseData.modules[currentModule].lessons[currentLesson]
//   const progressPercentage = (currentLessonData.watched / currentLessonData.duration) * 100
//   const overallProgress = Math.round(courseData.modules.reduce((sum, m) => sum + m.progress, 0) / courseData.modules.length)

//   // AxioQuan Logo Component
// // AxioQuan Logo Component - Larger version
// const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//   <div className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//     <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//       <span className="text-white font-bold text-xl">A</span>
//     </div>
//     {size === "default" && (
//       <span className="font-bold text-xl text-foreground">AxioQuan</span>
//     )}
//   </div>
// )
//   // If video is expanded, show full screen video page
//   if (isVideoExpanded) {
//     return (
//       <div className="fixed inset-0 bg-black z-50 flex flex-col">
//         {/* Header */}
//         <div className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
//           <div className="flex items-center gap-4">
//             <AxioQuanLogo size="small" />
//             <h2 className="text-lg font-semibold">{currentLessonData.title}</h2>
//           </div>
//           <button
//             onClick={() => setIsVideoExpanded(false)}
//             className="text-white hover:bg-gray-800 p-2 rounded"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Full Screen Video */}
//         <div className="flex-1 bg-black flex items-center justify-center">
//           <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden relative">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center space-y-4">
//                 <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur">
//                   <Play size={48} className="text-white fill-white" />
//                 </div>
//                 <p className="text-white text-lg font-semibold">{currentLessonData.title}</p>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//               <div className="space-y-3">
//                 <div className="w-full bg-white/20 rounded-full h-1.5 cursor-pointer hover:h-2 transition-all">
//                   <div
//                     className="bg-accent rounded-full h-full transition-all"
//                     style={{ width: `${progressPercentage}%` }}
//                   />
//                 </div>
//                 <div className="flex items-center justify-between text-white text-sm">
//                   <span>{formatTime(currentLessonData.watched)}</span>
//                   <span>{formatTime(currentLessonData.duration)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Video Controls */}
//             <div className="absolute bottom-20 left-0 right-0 flex items-center justify-between px-4 text-white">
//               <button onClick={() => setIsPlaying(!isPlaying)} className="hover:scale-110 transition">
//                 {isPlaying ? <Pause size={32} /> : <Play size={32} className="fill-white" />}
//               </button>
//               <div className="flex items-center gap-4">
//                 <select
//                   value={playbackSpeed}
//                   onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
//                   className="bg-white/20 px-3 py-1 rounded text-sm backdrop-blur hover:bg-white/30 transition text-white"
//                 >
//                   <option value={0.75}>0.75x</option>
//                   <option value={1}>1x</option>
//                   <option value={1.25}>1.25x</option>
//                   <option value={1.5}>1.5x</option>
//                   <option value={2}>2x</option>
//                 </select>
//                 <button onClick={handleBookmark} className="hover:scale-110 transition" title="Bookmark">
//                   <Bookmark size={24} />
//                 </button>
//                 <button className="hover:scale-110 transition">
//                   <Volume2 size={24} />
//                 </button>
//                 <button className="hover:scale-110 transition">
//                   <Settings size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//           {courseData.modules.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">{module.progress}% complete</p>
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
//                       {lesson.completed ? (
//                         <CheckCircle2 size={16} className="flex-shrink-0" />
//                       ) : (
//                         <Play size={16} className="flex-shrink-0" />
//                       )}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       <span className="text-xs opacity-75">{formatTime(lesson.duration)}</span>
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
//           {courseData.modules.map((module, moduleIndex) => (
//             <div key={module.id} className="space-y-1">
//               <button
//                 onClick={() => toggleModule(moduleIndex)}
//                 className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition group"
//               >
//                 <div className="flex items-center gap-3 flex-1">
//                   <BookOpen size={18} className="text-primary flex-shrink-0" />
//                   <div className="text-left">
//                     <p className="font-semibold text-sm text-foreground">{module.title}</p>
//                     <p className="text-xs text-muted-foreground">{module.progress}% complete</p>
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
//                       {lesson.completed ? (
//                         <CheckCircle2 size={16} className="flex-shrink-0" />
//                       ) : (
//                         <Play size={16} className="flex-shrink-0" />
//                       )}
//                       <span className="flex-1 text-left truncate">{lesson.title}</span>
//                       <span className="text-xs opacity-75">{formatTime(lesson.duration)}</span>
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
//                 {courseData.title}
//               </h1>
              
//               {/* Current Lesson Info for Mobile */}
//               <div className="mt-1">
//                 <p className="text-xs text-muted-foreground truncate">{courseData.modules[currentModule].title}</p>
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
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
//               <p className="text-gray-600 text-lg">{courseData.description}</p>
//               <p className="text-gray-500 mt-1">Instructor: {courseData.instructor}</p>
//             </div>
//           </div>

//           {/* Video Player Section - Full Width */}
//           <div className="bg-white p-4 md:p-8 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="bg-black rounded-xl overflow-hidden relative w-full aspect-video max-w-4xl mx-auto shadow-lg">
//                 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 cursor-pointer"
//                      onClick={() => setIsVideoExpanded(true)}>
//                   <div className="text-center space-y-4">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur">
//                       <Play size={32} className="text-white fill-white" />
//                     </div>
//                     <p className="text-white text-sm font-semibold">Click to expand video</p>
//                   </div>
//                 </div>

//                 {/* Expand Button */}
//                 <button
//                   onClick={() => setIsVideoExpanded(true)}
//                   className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition"
//                   title="Expand to full screen"
//                 >
//                   <Expand size={20} />
//                 </button>

//                 {/* Progress Bar */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                   <div className="space-y-2">
//                     <div className="w-full bg-white/20 rounded-full h-1.5">
//                       <div
//                         className="bg-accent rounded-full h-full transition-all"
//                         style={{ width: `${progressPercentage}%` }}
//                       />
//                     </div>
//                     <div className="flex items-center justify-between text-white text-xs">
//                       <span>{formatTime(currentLessonData.watched)}</span>
//                       <span>{formatTime(currentLessonData.duration)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Watch on Separate Page Link */}
//               <div className="mt-4 text-center">
//                 <Link 
//                   href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                   className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                 >
//                   <Play size={16} />
//                   Watch on separate page
//                 </Link>
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
//                   className="bg-primary rounded-full h-3 transition-all"
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
//                     <p className="text-sm text-muted-foreground mb-2">{courseData.modules[currentModule].title}</p>
//                     <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{currentLessonData.title}</h1>
//                     <p className="text-muted-foreground">{currentLessonData.duration / 60} minute video lesson</p>
//                   </div>
//                   <button
//                     onClick={completeLesson}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       currentLessonData.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {currentLessonData.completed ? "Completed" : "Mark Complete"}
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
//                           In this lesson, we'll explore the fundamentals of React including JSX syntax, component structure, and
//                           how to work with props. You'll learn practical patterns that are used in production applications and
//                           understand the philosophy behind React's design decisions.
//                         </p>
//                       </div>

//                       <div className="bg-gray-50 rounded-lg p-4 md:p-6 w-full">
//                         <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                         <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Understand JSX syntax and its relationship with JavaScript
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Create and use React components effectively
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Pass data between components using props
//                           </li>
//                           <li className="flex items-center gap-3">
//                             <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                             Apply React best practices in real-world scenarios
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
//                                 onClick={() => setCurrentTime(time)}
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

//                       {/* Quick Formatting Tips */}
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 w-full">
//                         <h4 className="font-semibold text-blue-900 mb-2">Formatting Tips</h4>
//                         <ul className="text-blue-800 text-xs md:text-sm space-y-1">
//                           <li>• Use <strong>**bold**</strong> for important concepts</li>
//                           <li>• Use <em>*italic*</em> for emphasis</li>
//                           <li>• Start lines with <code>-</code> for bullet points</li>
//                           <li>• Start lines with <code>1.</code> for numbered lists</li>
//                         </ul>
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

//                             <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                                   <span className="text-green-600 font-bold text-sm md:text-base">ZIP</span>
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-semibold text-blue-900 text-sm md:text-base">Starter Code</p>
//                                   <p className="text-blue-700 text-xs md:text-sm">Project files and examples</p>
//                                 </div>
//                               </div>
//                               <button className="w-full mt-2 md:mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm md:text-base">
//                                 Download (5.1 MB)
//                               </button>
//                             </div>

//                             <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                                   <span className="text-purple-600 font-bold text-sm md:text-base">DOC</span>
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-semibold text-blue-900 text-sm md:text-base">Exercise Files</p>
//                                   <p className="text-blue-700 text-xs md:text-sm">Practice exercises and solutions</p>
//                                 </div>
//                               </div>
//                               <button className="w-full mt-2 md:mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium text-sm md:text-base">
//                                 Download (1.2 MB)
//                               </button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Useful Links */}
//                         <div className="bg-green-50 border border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                           <h4 className="font-bold text-green-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links & References</h4>
//                           <div className="space-y-3 md:space-y-4 w-full">
//                             <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
//                               <p className="font-semibold text-green-900 text-sm md:text-base">React Official Documentation</p>
//                               <p className="text-green-700 text-xs md:text-sm">Complete React API reference and guides</p>
//                               <span className="text-green-600 text-xs mt-1 md:mt-2 block">reactjs.org</span>
//                             </a>

//                             <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
//                               <p className="font-semibold text-green-900 text-sm md:text-base">JSX Syntax Guide</p>
//                               <p className="text-green-700 text-xs md:text-sm">Deep dive into JSX syntax and features</p>
//                               <span className="text-green-600 text-xs mt-1 md:mt-2 block">react.dev</span>
//                             </a>

//                             <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
//                               <p className="font-semibold text-green-900 text-sm md:text-base">Component Best Practices</p>
//                               <p className="text-green-700 text-xs md:text-sm">Industry standards and patterns</p>
//                               <span className="text-green-600 text-xs mt-1 md:mt-2 block">patterns.react.dev</span>
//                             </a>

//                             <a href="#" className="block bg-white rounded-lg p-3 md:p-4 border border-green-100 hover:border-green-300 transition cursor-pointer hover:shadow-md w-full">
//                               <p className="font-semibold text-green-900 text-sm md:text-base">Interactive Examples</p>
//                               <p className="text-green-700 text-xs md:text-sm">Live code examples and playground</p>
//                               <span className="text-green-600 text-xs mt-1 md:mt-2 block">codesandbox.io</span>
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
//                     onClick={() => {
//                       if (currentLesson > 0) selectLesson(currentModule, currentLesson - 1)
//                       else if (currentModule > 0)
//                         selectLesson(currentModule - 1, courseData.modules[currentModule - 1].lessons.length - 1)
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < courseData.modules[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < courseData.modules.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
//                     disabled={
//                       currentModule === courseData.modules.length - 1 &&
//                       currentLesson === courseData.modules[currentModule].lessons.length - 1
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































//  // /components/courses/course-learning.tsx

// 'use client'

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import {
//   ChevronDown,
//   ChevronUp,
//   Play,
//   Pause,
//   Volume2,
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

// interface Lesson {
//   id: string
//   title: string
//   description?: string
//   duration: number
//   contentType: string
//   videoUrl?: string
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
//   const [playbackSpeed, setPlaybackSpeed] = useState(1)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
//   const [userProgress, setUserProgress] = useState<{[key: string]: any}>({})

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

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   const loadUserProgress = async () => {
//     try {
//       const response = await fetch(`/api/courses/${courseId}/progress`)
//       if (response.ok) {
//         const data = await response.json()
//         setUserProgress(data.progress || {})
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//     }
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     setCurrentTime(0)
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false)

//     // Record lesson access
//     const lesson = curriculumData[moduleIndex].lessons[lessonIndex]
//     try {
//       await fetch(`/api/courses/${courseId}/progress`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           lessonId: lesson.id,
//           action: 'access'
//         })
//       })
//     } catch (error) {
//       console.error('Error recording lesson access:', error)
//     }
//   }

//   const handleBookmark = () => {
//     if (!bookmarkedTimes.includes(Math.floor(currentTime))) {
//       setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTime)])
//     }
//   }

//   const completeLesson = async () => {
//     const currentLessonData = curriculumData[currentModule].lessons[currentLesson]
    
//     try {
//       const response = await fetch(`/api/courses/${courseId}/progress`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           lessonId: currentLessonData.id,
//           action: 'complete'
//         })
//       })

//       if (response.ok) {
//         setUserProgress(prev => ({
//           ...prev,
//           [currentLessonData.id]: { completed: true }
//         }))
//       }
//     } catch (error) {
//       console.error('Error completing lesson:', error)
//     }
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = seconds % 60
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = () => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

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

//   const progressPercentage = currentLessonData.duration > 0 
//     ? (currentLessonData.watched / currentLessonData.duration) * 100 
//     : 0

//   // AxioQuan Logo Component
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     <div className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </div>
//   )

//   // Get lesson icon based on content type
//   const getLessonIcon = (contentType: string, completed?: boolean) => {
//     if (completed) {
//       return <CheckCircle2 size={16} className="flex-shrink-0 text-green-500" />
//     }
    
//     switch (contentType) {
//       case 'video':
//         return <Video size={16} className="flex-shrink-0 text-blue-500" />
//       case 'document':
//         return <FileText size={16} className="flex-shrink-0 text-purple-500" />
//       case 'quiz':
//         return <FileText size={16} className="flex-shrink-0 text-orange-500" />
//       default:
//         return <Play size={16} className="flex-shrink-0 text-gray-500" />
//     }
//   }

//   // If video is expanded, show full screen video page
//   if (isVideoExpanded && currentLessonData.contentType === 'video') {
//     return (
//       <div className="fixed inset-0 bg-black z-50 flex flex-col">
//         {/* Header */}
//         <div className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
//           <div className="flex items-center gap-4">
//             <AxioQuanLogo size="small" />
//             <h2 className="text-lg font-semibold">{currentLessonData.title}</h2>
//           </div>
//           <button
//             onClick={() => setIsVideoExpanded(false)}
//             className="text-white hover:bg-gray-800 p-2 rounded"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Full Screen Video */}
//         <div className="flex-1 bg-black flex items-center justify-center">
//           <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden relative">
//             {/* Video placeholder - you'll replace this with actual video player */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center space-y-4">
//                 <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur">
//                   <Play size={48} className="text-white fill-white" />
//                 </div>
//                 <p className="text-white text-lg font-semibold">{currentLessonData.title}</p>
//                 <p className="text-white/70">Video player will be implemented here</p>
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//               <div className="space-y-3">
//                 <div className="w-full bg-white/20 rounded-full h-1.5 cursor-pointer hover:h-2 transition-all">
//                   <div
//                     className="bg-accent rounded-full h-full transition-all"
//                     style={{ width: `${progressPercentage}%` }}
//                   />
//                 </div>
//                 <div className="flex items-center justify-between text-white text-sm">
//                   <span>{formatTime(currentLessonData.watched)}</span>
//                   <span>{formatTime(currentLessonData.duration)}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Video Controls */}
//             <div className="absolute bottom-20 left-0 right-0 flex items-center justify-between px-4 text-white">
//               <button onClick={() => setIsPlaying(!isPlaying)} className="hover:scale-110 transition">
//                 {isPlaying ? <Pause size={32} /> : <Play size={32} className="fill-white" />}
//               </button>
//               <div className="flex items-center gap-4">
//                 <select
//                   value={playbackSpeed}
//                   onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
//                   className="bg-white/20 px-3 py-1 rounded text-sm backdrop-blur hover:bg-white/30 transition text-white"
//                 >
//                   <option value={0.75}>0.75x</option>
//                   <option value={1}>1x</option>
//                   <option value={1.25}>1.25x</option>
//                   <option value={1.5}>1.5x</option>
//                   <option value={2}>2x</option>
//                 </select>
//                 <button onClick={handleBookmark} className="hover:scale-110 transition" title="Bookmark">
//                   <Bookmark size={24} />
//                 </button>
//                 <button className="hover:scale-110 transition">
//                   <Volume2 size={24} />
//                 </button>
//                 <button className="hover:scale-110 transition">
//                   <Settings size={24} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                 {/* Content placeholder based on type */}
//                 {currentLessonData.contentType === 'video' ? (
//                   <>
//                     <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 cursor-pointer"
//                          onClick={() => setIsVideoExpanded(true)}>
//                       <div className="text-center space-y-4">
//                         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur">
//                           <Play size={32} className="text-white fill-white" />
//                         </div>
//                         <p className="text-white text-sm font-semibold">Click to expand video</p>
//                       </div>
//                     </div>

//                     {/* Expand Button */}
//                     <button
//                       onClick={() => setIsVideoExpanded(true)}
//                       className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition"
//                       title="Expand to full screen"
//                     >
//                       <Expand size={20} />
//                     </button>
//                   </>
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
//                     <div className="text-center space-y-4 text-white">
//                       <FileText size={64} className="mx-auto" />
//                       <p className="text-xl font-semibold">{currentLessonData.title}</p>
//                       <p className="text-white/80">This is a {currentLessonData.contentType} lesson</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Progress Bar */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                   <div className="space-y-2">
//                     <div className="w-full bg-white/20 rounded-full h-1.5">
//                       <div
//                         className="bg-accent rounded-full h-full transition-all"
//                         style={{ width: `${progressPercentage}%` }}
//                       />
//                     </div>
//                     <div className="flex items-center justify-between text-white text-xs">
//                       <span>{formatTime(currentLessonData.watched)}</span>
//                       <span>{formatTime(currentLessonData.duration)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Watch on Separate Page Link */}
//               {currentLessonData.contentType === 'video' && (
//                 <div className="mt-4 text-center">
//                   <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link>
//                 </div>
//               )}
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
//                   className="bg-primary rounded-full h-3 transition-all"
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
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                                 onClick={() => setCurrentTime(time)}
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
//                     onClick={() => {
//                       if (currentLesson > 0) selectLesson(currentModule, currentLesson - 1)
//                       else if (currentModule > 0)
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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
//   const [currentTime, setCurrentTime] = useState(0)
//   const [bookmarkedTimes, setBookmarkedTimes] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview")
//   const [notes, setNotes] = useState("")
//   const [isVideoExpanded, setIsVideoExpanded] = useState(false)
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
//   const [userProgress, setUserProgress] = useState<{[key: string]: any}>({})
//   const [videoDuration, setVideoDuration] = useState(0)
//   const [showControls, setShowControls] = useState(true)

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

//   // Load user progress on component mount
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
//   }

//   const toggleModule = (index: number) => {
//     setExpandedModules((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const selectLesson = async (moduleIndex: number, lessonIndex: number) => {
//     setCurrentModule(moduleIndex)
//     setCurrentLesson(lessonIndex)
//     setCurrentTime(0)
//     setIsPlaying(false)
//     setIsMobileSidebarOpen(false)
//     setShowControls(true)

//     // Reset video when changing lessons
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = 0
//         videoRef.current.pause()
//       }
//     }, 100)

//     // Mock record lesson access
//   }

//   // Video control functions
//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play().catch(error => {
//           console.error('Error playing video:', error)
//         })
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       setCurrentTime(videoRef.current.currentTime)
//     }
//   }

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

//   const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (videoRef.current && progressBarRef.current) {
//       const rect = progressBarRef.current.getBoundingClientRect()
//       const percent = (e.clientX - rect.left) / rect.width
//       const currentLessonDuration = currentLessonData?.duration || videoDuration || 1
//       const newTime = percent * currentLessonDuration
//       videoRef.current.currentTime = newTime
//       setCurrentTime(newTime)
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
//     if (!bookmarkedTimes.includes(Math.floor(currentTime))) {
//       setBookmarkedTimes([...bookmarkedTimes, Math.floor(currentTime)].sort((a, b) => a - b))
//     }
//   }

//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // Calculate progress percentage safely
//   const progressPercentage = currentLessonData && (currentLessonData.duration > 0 || videoDuration > 0) 
//     ? (currentTime / (currentLessonData.duration || videoDuration)) * 100 
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
//   // This replaces the simple `currentLessonData.contentType === 'video'` check.
//   const isVideoLesson = Boolean(videoUrl) || currentLessonData?.contentType === 'video' || currentLessonData?.lessonType === 'video';
//   // Now, we use `isVideoLesson` in the render logic instead of the limited check.

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
//     <div className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </div>
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


// // Video Player Component
// const VideoPlayer = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       {/* SIMPLE VIDEO ELEMENT */}
//       {videoUrl ? (
//         <video
//           key={videoUrl} // Key forces re-render/reload when lesson changes
//           ref={videoRef}
//           className="w-full h-full object-contain"
//           controls // Use browser native controls for simplicity and robustness
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={handleLoadedMetadata}
//           onPlay={() => setIsPlaying(true)}
//           onPause={() => setIsPlaying(false)}
//           onEnded={handleVideoEnded}
//           playsInline
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-800">
//           <div className="text-center text-white">
//             <Video size={64} className="mx-auto mb-4 opacity-50" />
//             <p className="text-lg">No video URL found for this lesson.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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

//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
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
//                   className="bg-primary rounded-full h-3 transition-all"
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
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                                   setCurrentTime(time)
//                                   if (videoRef.current) {
//                                     videoRef.current.currentTime = time
//                                   }
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
//                     onClick={() => {
//                       if (currentLesson > 0) selectLesson(currentModule, currentLesson - 1)
//                       else if (currentModule > 0)
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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

//   // Load user progress on component mount
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
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

//     // Mock record lesson access
//   }

//   // Video control functions
//   const togglePlayPause = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play().catch(error => {
//           console.error('Error playing video:', error)
//         })
//       }
//       setIsPlaying(!isPlaying)
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

//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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
//     <div className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </div>
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

//   // Video Player Component
//   const VideoPlayer = () => {
//     return (
//       <div className="relative w-full h-full bg-black">
//         {/* SIMPLE VIDEO ELEMENT */}
//         {videoUrl ? (
//           <video
//             key={videoUrl} // Key forces re-render/reload when lesson changes
//             ref={videoRef}
//             className="w-full h-full object-contain"
//             controls // Use browser native controls for simplicity and robustness
//             onTimeUpdate={handleTimeUpdate}
//             onLoadedMetadata={handleLoadedMetadata}
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//             onEnded={handleVideoEnded}
//             playsInline
//           >
//             <source src={videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-800">
//             <div className="text-center text-white">
//               <Video size={64} className="mx-auto mb-4 opacity-50" />
//               <p className="text-lg">No video URL found for this lesson.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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

//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
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
//                   className="bg-primary rounded-full h-3 transition-all"
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
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                     onClick={() => {
//                       if (currentLesson > 0) selectLesson(currentModule, currentLesson - 1)
//                       else if (currentModule > 0)
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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

//   // Load user progress on component mount
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
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

//     // Mock record lesson access
//   }

//   // Video control functions
// // Video control functions
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

//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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
// // === UPDATED AxioQuan Logo Component with Homepage Link ===
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     // FIX: Wrap the entire logo content in a standard <a> tag with href="/"
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )
//   // ==========================================================

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

//   // Video Player Component
//   const VideoPlayer = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       {videoUrl ? (
//         <video
//           key={videoUrl}
//           ref={videoRef}
//           className="w-full h-full object-contain"
//           controls
//           playsInline
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//           <p>No video available</p>
//         </div>
//       )}
//     </div>
//   );
// };


//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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

//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
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
//                   className="bg-primary rounded-full h-3 transition-all"
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
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                     onClick={() => {
//                       if (currentLesson > 0) selectLesson(currentModule, currentLesson - 1)
//                       else if (currentModule > 0)
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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
// }: 
// CourseLearningProps) {
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

//   // CRITICAL FIX: Replace currentTime state with ref (Preserved from SAVED.txt)
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0) // Used for UI updates only

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

//   // Load user progress on component mount (Mock function preserved)
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress (Mock function preserved)
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
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

//     // Mock record lesson access
    
//     // PROGRESS: Mark lesson as in-progress or accessed (Implicit progress)
//     // You could add logic here to mark the lesson as 'started'
//   }

//   // Video control functions (Preserved from SAVED.txt)
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
//         if (videoRef.current) {
//            videoRef.current.pause();
//            setIsPlaying(false);
//         }
//       })
//     }
//   }

//   // CRITICAL FIX: New handleTimeUpdate that doesn't cause excessive re-renders (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Updated handleProgressClick to use ref (Preserved from SAVED.txt)
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

//   // PROGRESS: Mark Complete Logic
//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update to mark lesson as completed
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // CRITICAL FIX: Updated progressPercentage to use currentTimeRef (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Robust Video URL Finder (Preserved from SAVED.txt)
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
  
//   // CRITICAL FIX: Check if a video should display (The purple gradient issue) (Preserved from SAVED.txt)
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
// // === UPDATED AxioQuan Logo Component with Homepage Link ===
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     // FIX: Wrap the entire logo content in a standard <a> tag with href="/"
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )
//   // ==========================================================

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

//   // Video Player Component (Preserved from SAVED.txt)
//   const VideoPlayer = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       {videoUrl ? (
//         <video
//           key={videoUrl}
//           ref={videoRef}
//           className="w-full h-full object-contain"
//           controls
//           playsInline
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//           <p>No video available</p>
//         </div>
//       )}
//     </div>
//   );
// };


//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//           <div className="bg-white p-4 md:p-8 w-full">
//             <div className={`max-w-7xl mx-auto w-full transition-all duration-300 ${isVideoExpanded ? 'h-screen' : 'h-[300px] md:h-[500px] lg:h-[700px]'}`}>
//               {/* VIDEO PLAYER COMPONENT - UNMODIFIED */}
//               <VideoPlayer />
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 {/* PROGRESS: Overall progress percentage display */}
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               {/* PROGRESS: Overall progress bar UI */}
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${overallProgress}%` }} />
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
//                   {/* PROGRESS: Mark Complete Button */}
//                   <button
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                     Your Notes
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

//             {/* Tab Content */}
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               {activeTab === "overview" && (
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 py-6 md:py-8 w-full">
//                   <div className="lg:col-span-2 space-y-6 md:space-y-8">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Description</h3>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {currentLessonData.description || "No description provided for this lesson."}
//                     </p>

//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                     <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Understand key concepts presented in this lesson
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Apply the knowledge to practical scenarios
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Complete exercises and assessments
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="w-full">
//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
//                     <div className="space-y-2 md:space-y-3 w-full">
//                       {bookmarkedTimes.length > 0 ? (
//                         bookmarkedTimes.map((time, index) => (
//                           <button
//                             key={index}
//                             onClick={() => {
//                               currentTimeRef.current = time
//                               if (videoRef.current) {
//                                 videoRef.current.currentTime = time
//                               }
//                               forceUpdate(x => x + 1)
//                             }}
//                             className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
//                           >
//                             <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
//                             <div>
//                               <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
//                               <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
//                             </div>
//                           </button>
//                         ))
//                       ) : (
//                         <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
//                           <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
//                           <p className="text-muted-foreground">No bookmarks yet</p>
//                           <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "notes" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-4 md:space-y-6 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
//                     {/* Text Formatting Toolbar */}
//                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
//                         <Bold size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
//                         <Italic size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
//                         <Underline size={16} />
//                       </button>
//                       <div className="w-[1px] h-6 bg-gray-300 mx-1 md:mx-2" />
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Unordered List">
//                         <List size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Ordered List">
//                         <ListOrdered size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
//                         <LinkIcon size={16} />
//                       </button>
//                     </div>

//                     <textarea
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       placeholder="Start typing your notes here..."
//                       className="w-full min-h-[300px] border border-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-y"
//                     />

//                     <div className="text-sm text-muted-foreground flex justify-between">
//                       <button className="text-primary hover:underline">Save Notes</button>
//                       <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "resources" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-6 md:space-y-8 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Resources</h3>
//                     <div className="grid gap-4 md:gap-6 w-full">
//                       {/* Downloadable Materials */}
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-blue-900 text-lg md:text-xl mb-3 md:mb-4">📚 Downloadable Materials</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">PDF</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Lesson Slides.pdf</p>
//                                 <p className="text-xs text-muted-foreground">1.2 MB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">DOC</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Code Snippets.zip</p>
//                                 <p className="text-xs text-muted-foreground">350 KB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* External Links */}
//                       <div className="bg-purple-50 border border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-purple-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <a 
//                             href="https://example.com/external-guide" 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="bg-white rounded-lg p-3 md:p-4 border border-purple-100 hover:border-purple-300 transition flex items-center gap-3 group w-full"
//                           >
//                             <LinkIcon size={20} className="text-purple-600 flex-shrink-0" />
//                             <div>
//                               <p className="font-semibold text-foreground group-hover:text-purple-800 transition">Official Documentation</p>
//                               <p className="text-xs text-muted-foreground truncate">https://example.com/external-guide</p>
//                             </div>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Lesson Navigation Buttons */}
//             <div className="border-t border-border mt-8 pt-6 md:pt-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => {
//                       if (currentLesson > 0) {
//                         selectLesson(currentModule, currentLesson - 1)
//                       } else if (currentModule > 0) {
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                       }
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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
// }: 
// CourseLearningProps) {
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

//   // CRITICAL FIX: Replace currentTime state with ref (Preserved from SAVED.txt)
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0) // Used for UI updates only

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

//   // Load user progress on component mount (Mock function preserved)
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress (Mock function preserved)
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
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

//     // Mock record lesson access
    
//     // PROGRESS: Mark lesson as in-progress or accessed (Implicit progress)
//     // You could add logic here to mark the lesson as 'started'
//   }

//   // Video control functions (Preserved from SAVED.txt)
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
//         if (videoRef.current) {
//            videoRef.current.pause();
//            setIsPlaying(false);
//         }
//       })
//     }
//   }

//   // CRITICAL FIX: New handleTimeUpdate that doesn't cause excessive re-renders (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Updated handleProgressClick to use ref (Preserved from SAVED.txt)
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

//   // PROGRESS: Mark Complete Logic
//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update to mark lesson as completed
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // CRITICAL FIX: Updated progressPercentage to use currentTimeRef (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Robust Video URL Finder (Preserved from SAVED.txt)
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
  
//   // CRITICAL FIX: Check if a video should display (The purple gradient issue) (Preserved from SAVED.txt)
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
// // === UPDATED AxioQuan Logo Component with Homepage Link ===
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     // FIX: Wrap the entire logo content in a standard <a> tag with href="/"
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )
//   // ==========================================================

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

//   // Video Player Component (Surgically fixed: object-contain -> object-cover)
//   const VideoPlayer = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       {videoUrl ? (
//         <video
//           key={videoUrl}
//           ref={videoRef}
//           // FIX: Changed object-contain to object-cover to eliminate black bars
//           className="w-full h-full object-cover" 
//           controls
//           playsInline
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//           <p>No video available</p>
//         </div>
//       )}
//     </div>
//   );
// };


//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//           <div className="bg-white p-4 md:p-8 w-full">
//             <div className={`max-w-7xl mx-auto w-full transition-all duration-300 ${isVideoExpanded ? 'h-screen' : 'h-[300px] md:h-[500px] lg:h-[700px]'}`}>
//               {/* VIDEO PLAYER COMPONENT - FIXED object-cover */}
//               <VideoPlayer />
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 {/* PROGRESS: Overall progress percentage display */}
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               {/* PROGRESS: Overall progress bar UI */}
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${overallProgress}%` }} />
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
//                   {/* PROGRESS: Mark Complete Button */}
//                   <button
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                     Your Notes
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

//             {/* Tab Content */}
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               {activeTab === "overview" && (
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 py-6 md:py-8 w-full">
//                   <div className="lg:col-span-2 space-y-6 md:space-y-8">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Description</h3>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {currentLessonData.description || "No description provided for this lesson."}
//                     </p>

//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                     <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Understand key concepts presented in this lesson
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Apply the knowledge to practical scenarios
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Complete exercises and assessments
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="w-full">
//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
//                     <div className="space-y-2 md:space-y-3 w-full">
//                       {bookmarkedTimes.length > 0 ? (
//                         bookmarkedTimes.map((time, index) => (
//                           <button
//                             key={index}
//                             onClick={() => {
//                               currentTimeRef.current = time
//                               if (videoRef.current) {
//                                 videoRef.current.currentTime = time
//                               }
//                               forceUpdate(x => x + 1)
//                             }}
//                             className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
//                           >
//                             <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
//                             <div>
//                               <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
//                               <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
//                             </div>
//                           </button>
//                         ))
//                       ) : (
//                         <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
//                           <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
//                           <p className="text-muted-foreground">No bookmarks yet</p>
//                           <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "notes" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-4 md:space-y-6 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
//                     {/* Text Formatting Toolbar */}
//                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
//                         <Bold size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
//                         <Italic size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
//                         <Underline size={16} />
//                       </button>
//                       <div className="w-[1px] h-6 bg-gray-300 mx-1 md:mx-2" />
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Unordered List">
//                         <List size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Ordered List">
//                         <ListOrdered size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
//                         <LinkIcon size={16} />
//                       </button>
//                     </div>

//                     <textarea
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       placeholder="Start typing your notes here..."
//                       className="w-full min-h-[300px] border border-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-y"
//                     />

//                     <div className="text-sm text-muted-foreground flex justify-between">
//                       <button className="text-primary hover:underline">Save Notes</button>
//                       <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "resources" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-6 md:space-y-8 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Resources</h3>
//                     <div className="grid gap-4 md:gap-6 w-full">
//                       {/* Downloadable Materials */}
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-blue-900 text-lg md:text-xl mb-3 md:mb-4">📚 Downloadable Materials</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">PDF</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Lesson Slides.pdf</p>
//                                 <p className="text-xs text-muted-foreground">1.2 MB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">DOC</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Code Snippets.zip</p>
//                                 <p className="text-xs text-muted-foreground">350 KB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* External Links */}
//                       <div className="bg-purple-50 border border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-purple-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <a 
//                             href="https://example.com/external-guide" 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="bg-white rounded-lg p-3 md:p-4 border border-purple-100 hover:border-purple-300 transition flex items-center gap-3 group w-full"
//                           >
//                             <LinkIcon size={20} className="text-purple-600 flex-shrink-0" />
//                             <div>
//                               <p className="font-semibold text-foreground group-hover:text-purple-800 transition">Official Documentation</p>
//                               <p className="text-xs text-muted-foreground truncate">https://example.com/external-guide</p>
//                             </div>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Lesson Navigation Buttons */}
//             <div className="border-t border-border mt-8 pt-6 md:pt-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => {
//                       if (currentLesson > 0) {
//                         selectLesson(currentModule, currentLesson - 1)
//                       } else if (currentModule > 0) {
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                       }
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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
// }: 
// CourseLearningProps) {
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

//   // CRITICAL FIX: Replace currentTime state with ref (Preserved from SAVED.txt)
//   const currentTimeRef = useRef(0)
//   const [, forceUpdate] = useState(0) // Used for UI updates only

//   const videoRef = useRef<HTMLVideoElement>(null)
//   const progressBarRef = useRef<HTMLDivElement>(null)
//   const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

//   // Load user progress on component mount (Mock function preserved)
//   useEffect(() => {
//     // Mock load progress
//   }, [courseId])

//   // Mock load user progress (Mock function preserved)
//   const loadUserProgress = () => {
//     // In a real app, this would fetch user data
//     // Keeping it as a mock function for now
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

//     // Mock record lesson access
    
//     // PROGRESS: Mark lesson as in-progress or accessed (Implicit progress)
//     // You could add logic here to mark the lesson as 'started'
//   }

//   // Video control functions (Preserved from SAVED.txt)
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
//         if (videoRef.current) {
//            videoRef.current.pause();
//            setIsPlaying(false);
//         }
//       })
//     }
//   }

//   // CRITICAL FIX: New handleTimeUpdate that doesn't cause excessive re-renders (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Updated handleProgressClick to use ref (Preserved from SAVED.txt)
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

//   // PROGRESS: Mark Complete Logic
//   const completeLesson = async () => {
//     const currentLessonData = getCurrentLessonData()
//     if (!currentLessonData) return
    
//     // Mock state update to mark lesson as completed
//     setUserProgress(prev => ({
//       ...prev,
//       [currentLessonData.id]: { completed: true }
//     }))
//   }

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00"
//     const minutes = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${minutes}:${secs.toString().padStart(2, "0")}`
//   }

//   // Get current lesson data with progress
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

//   const currentLessonData = getCurrentLessonData()
//   const overallProgress = calculateOverallProgress()

//   // CRITICAL FIX: Updated progressPercentage to use currentTimeRef (Preserved from SAVED.txt)
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

//   // CRITICAL FIX: Robust Video URL Finder (Preserved from SAVED.txt)
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
  
//   // CRITICAL FIX: Check if a video should display (The purple gradient issue) (Preserved from SAVED.txt)
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
// // === UPDATED AxioQuan Logo Component with Homepage Link ===
//   const AxioQuanLogo = ({ size = "default" }: { size?: "default" | "small" }) => (
//     // FIX: Wrap the entire logo content in a standard <a> tag with href="/"
//     <a href="/" className={`flex items-center gap-3 ${size === "small" ? 'px-2' : 'px-4'}`}>
//       <div className="flex items-center justify-center bg-black rounded-lg p-3 w-8 h-8">
//         <span className="text-white font-bold text-xl">A</span>
//       </div>
//       {size === "default" && (
//         <span className="font-bold text-xl text-foreground">AxioQuan</span>
//       )}
//     </a>
//   )
//   // ==========================================================

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

//   // Video Player Component (Surgically fixed: object-contain -> object-cover)
//   const VideoPlayer = () => {
//   return (
//     <div className="relative w-full h-full bg-black">
//       {videoUrl ? (
//         <video
//           key={videoUrl}
//           ref={videoRef}
//           // FIX: Changed object-contain to object-cover to eliminate black bars
//           className="w-full h-full object-cover" 
//           controls
//           playsInline
//         >
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
//           <p>No video available</p>
//         </div>
//       )}
//     </div>
//   );
// };


//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
// {/*           <div className="bg-white p-4 md:p-8 w-full">
//             <div className={`max-w-7xl mx-auto w-full transition-all duration-300 ${isVideoExpanded ? 'h-screen' : 'h-[200px] md:h-[350px] lg:h-[480px]'}`}>
//               <VideoPlayer />
//             </div>
//           </div> */}

//           <div className="bg-white p-4 md:p-8 w-full">
//             <div className={`max-w-7xl mx-auto w-full transition-all duration-300 ${isVideoExpanded ? 'h-screen' : 'h-[250px] md:h-[400px] lg:h-[550px]'}`}>
//               <VideoPlayer />
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 {/* PROGRESS: Overall progress percentage display */}
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               {/* PROGRESS: Overall progress bar UI */}
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${overallProgress}%` }} />
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
//                   {/* PROGRESS: Mark Complete Button */}
//                   <button
//                     onClick={completeLesson}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                     Your Notes
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

//             {/* Tab Content */}
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               {activeTab === "overview" && (
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 py-6 md:py-8 w-full">
//                   <div className="lg:col-span-2 space-y-6 md:space-y-8">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Description</h3>
//                     <p className="text-muted-foreground leading-relaxed">
//                       {currentLessonData.description || "No description provided for this lesson."}
//                     </p>

//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Learning Objectives</h3>
//                     <ul className="space-y-2 md:space-y-3 text-muted-foreground">
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Understand key concepts presented in this lesson
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Apply the knowledge to practical scenarios
//                       </li>
//                       <li className="flex items-center gap-3">
//                         <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//                         Complete exercises and assessments
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="w-full">
//                     <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Bookmarks</h3>
//                     <div className="space-y-2 md:space-y-3 w-full">
//                       {bookmarkedTimes.length > 0 ? (
//                         bookmarkedTimes.map((time, index) => (
//                           <button
//                             key={index}
//                             onClick={() => {
//                               currentTimeRef.current = time
//                               if (videoRef.current) {
//                                 videoRef.current.currentTime = time
//                               }
//                               forceUpdate(x => x + 1)
//                             }}
//                             className="w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg bg-muted hover:bg-muted/80 transition flex items-center gap-3"
//                           >
//                             <Bookmark size={14} className="text-blue-500 flex-shrink-0" />
//                             <div>
//                               <span className="font-semibold text-foreground text-sm md:text-base">{formatTime(time)}</span>
//                               <span className="text-xs text-muted-foreground ml-2">Bookmark {index + 1}</span>
//                             </div>
//                           </button>
//                         ))
//                       ) : (
//                         <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg w-full">
//                           <Bookmark size={36} className="text-gray-400 mx-auto mb-2 md:mb-3" />
//                           <p className="text-muted-foreground">No bookmarks yet</p>
//                           <p className="text-sm text-muted-foreground mt-1">Add bookmarks while watching the video!</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "notes" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-4 md:space-y-6 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Your Notes</h3>
//                     {/* Text Formatting Toolbar */}
//                     <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 md:p-3 flex flex-wrap gap-1 md:gap-2 w-full">
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Bold">
//                         <Bold size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Italic">
//                         <Italic size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Underline">
//                         <Underline size={16} />
//                       </button>
//                       <div className="w-[1px] h-6 bg-gray-300 mx-1 md:mx-2" />
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Unordered List">
//                         <List size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Ordered List">
//                         <ListOrdered size={16} />
//                       </button>
//                       <button className="p-1 md:p-2 hover:bg-gray-200 rounded transition" title="Insert Link">
//                         <LinkIcon size={16} />
//                       </button>
//                     </div>

//                     <textarea
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       placeholder="Start typing your notes here..."
//                       className="w-full min-h-[300px] border border-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-y"
//                     />

//                     <div className="text-sm text-muted-foreground flex justify-between">
//                       <button className="text-primary hover:underline">Save Notes</button>
//                       <span>{notes.length} characters • {notes.split(/\s+/).filter(word => word.length > 0).length} words</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               {activeTab === "resources" && (
//                 <div className="w-full py-4 md:py-6">
//                   <div className="space-y-6 md:space-y-8 w-full">
//                     <h3 className="text-xl md:text-2xl font-bold text-foreground">Lesson Resources</h3>
//                     <div className="grid gap-4 md:gap-6 w-full">
//                       {/* Downloadable Materials */}
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-blue-900 text-lg md:text-xl mb-3 md:mb-4">📚 Downloadable Materials</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">PDF</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Lesson Slides.pdf</p>
//                                 <p className="text-xs text-muted-foreground">1.2 MB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <span className="text-blue-600 font-bold text-sm md:text-base">DOC</span>
//                               </div>
//                               <div>
//                                 <p className="font-semibold text-foreground">Code Snippets.zip</p>
//                                 <p className="text-xs text-muted-foreground">350 KB - Click to Download</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* External Links */}
//                       <div className="bg-purple-50 border border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                         <h4 className="font-bold text-purple-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links</h4>
//                         <div className="space-y-3 md:space-y-4 w-full">
//                           <a 
//                             href="https://example.com/external-guide" 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="bg-white rounded-lg p-3 md:p-4 border border-purple-100 hover:border-purple-300 transition flex items-center gap-3 group w-full"
//                           >
//                             <LinkIcon size={20} className="text-purple-600 flex-shrink-0" />
//                             <div>
//                               <p className="font-semibold text-foreground group-hover:text-purple-800 transition">Official Documentation</p>
//                               <p className="text-xs text-muted-foreground truncate">https://example.com/external-guide</p>
//                             </div>
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Lesson Navigation Buttons */}
//             <div className="border-t border-border mt-8 pt-6 md:pt-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => {
//                       if (currentLesson > 0) {
//                         selectLesson(currentModule, currentLesson - 1)
//                       } else if (currentModule > 0) {
//                         selectLesson(currentModule - 1, curriculumData[currentModule - 1].lessons.length - 1)
//                       }
//                     }}
//                     disabled={currentModule === 0 && currentLesson === 0}
//                     className="px-6 py-3 md:px-8 md:py-3 rounded-lg border border-border hover:bg-muted transition disabled:opacity-50 font-semibold text-sm md:text-base"
//                   >
//                     Previous Lesson
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (currentLesson < curriculumData[currentModule].lessons.length - 1) {
//                         selectLesson(currentModule, currentLesson + 1)
//                       } else if (currentModule < curriculumData.length - 1) {
//                         selectLesson(currentModule + 1, 0)
//                       }
//                     }}
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

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   // Mock load user progress - In real app, this would fetch from API
//   const loadUserProgress = async () => {
//     try {
//       // Mock: Load progress from localStorage or API
//       const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//       if (savedProgress) {
//         setUserProgress(JSON.parse(savedProgress))
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//     }
//   }

//   // Save progress whenever it changes
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

//   // Mark lesson as completed
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

//     // In a real app, you would also save to the database
//     try {
//       // Mock API call to save progress
//       await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId: targetLessonId,
//           completed: true,
//           progress: 100
//         })
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
//     }
//   }

//   // Video control functions - KEEPING ORIGINAL WORKING CODE
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
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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

//   // Video Player Component - KEEPING ORIGINAL WORKING CODE
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

//   // Mobile Sidebar Overlay
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar */}
//       <div className={`
//         fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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

//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
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
//                     disabled={userProgress[currentLessonData.id]?.completed}
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

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   // Mock load user progress - In real app, this would fetch from API
//   const loadUserProgress = async () => {
//     try {
//       // Mock: Load progress from localStorage or API
//       const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//       if (savedProgress) {
//         setUserProgress(JSON.parse(savedProgress))
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//     }
//   }

//   // Save progress whenever it changes
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

//   // Mark lesson as completed
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

//     // In a real app, you would also save to the database
//     try {
//       // Mock API call to save progress
//       await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId: targetLessonId,
//           completed: true,
//           progress: 100
//         })
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
//     }
//   }

//   // Video control functions - KEEPING ORIGINAL WORKING CODE
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
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
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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
  
//   // CRITICAL FIX: Check if a video should display
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

//   // Video Player Component - RESTORED TO PREVIOUS WORKING STATE
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

//   // Mobile Sidebar Overlay - PRESERVING THE FIX (LEFT-SLIDE AND DIM/BLUR)
//   const MobileSidebar = () => (
//     <>
//       {/* Mobile Sidebar Overlay: Dimming and blurring effect */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* Mobile Sidebar: Positioned left-0 and slides from left */}
//       <div className={`
//         fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
        
//         {/* Floating Course Menu Button - PRESERVING THE FIX */}
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

//           {/* Content Player Section - Full Width - RESTORING THE WORKING STRUCTURE */}
//           <div className="bg-white p-4 md:p-8 w-full">
//             <div className={`max-w-7xl mx-auto w-full transition-all duration-300 ${isVideoExpanded ? 'h-screen' : 'h-[200px] md:h-[350px] lg:h-[480px]'}`}>
//               {/* This container has the correct height for the video player */}
//               <VideoPlayer />
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 {/* PROGRESS: Overall progress percentage display */}
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               {/* PROGRESS: Overall progress bar UI */}
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${overallProgress}%` }} />
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
//                   {/* PROGRESS: Mark Complete Button */}
//                   <button
//                     onClick={() => completeLesson()}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                             Understand key concepts presented in...
//                           </li>
//                           {/* ... (Other list items omitted for brevity) ... */}
//                         </ul>
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
//                         placeholder="Start typing your notes here..."
//                         className="w-full min-h-[300px] border border-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-y"
//                       />

//                       <div className="text-sm text-muted-foreground flex justify-between">
//                         <button className="text-primary hover:underline">Save Notes</button>
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
//                                 <div>
//                                   <p className="font-semibold text-foreground">Lesson Slides.pdf</p>
//                                   <p className="text-xs text-muted-foreground">1.2 MB - Click to Download</p>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                   <span className="text-blue-600 font-bold text-sm md:text-base">DOC</span>
//                                 </div>
//                                 <div>
//                                   <p className="font-semibold text-foreground">Code Snippets.zip</p>
//                                   <p className="text-xs text-muted-foreground">350 KB - Click to Download</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* External Links */}
//                         <div className="bg-purple-50 border border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                           <h4 className="font-bold text-purple-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links</h4>
//                           <div className="space-y-3 md:space-y-4 w-full">
//                             <a 
//                               href="https://example.com/external-guide" 
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="bg-white rounded-lg p-3 md:p-4 border border-purple-100 hover:border-purple-300 transition flex items-center gap-3 group w-full"
//                             >
//                               <LinkIcon size={20} className="text-purple-600 flex-shrink-0" />
//                               <div>
//                                 <p className="font-semibold text-foreground group-hover:text-purple-800 transition">Official Documentation</p>
//                                 <p className="text-xs text-muted-foreground truncate">https://example.com/external-guide</p>
//                               </div>
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
//             <div className="border-t border-border mt-8 pt-6 md:pt-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex justify-between">
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

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   // Mock load user progress - In real app, this would fetch from API
//   const loadUserProgress = async () => {
//     try {
//       // Mock: Load progress from localStorage or API
//       const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//       if (savedProgress) {
//         setUserProgress(JSON.parse(savedProgress))
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//     }
//   }

//   // Save progress whenever it changes
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

//   // Mark lesson as completed
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

//     // In a real app, you would also save to the database
//     try {
//       // Mock API call to save progress
//       await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId: targetLessonId,
//           completed: true,
//           progress: 100
//         })
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
//     }
//   }

//   // Video control functions - KEEPING ORIGINAL WORKING CODE
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
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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

//   // Video Player Component - KEEPING ORIGINAL WORKING CODE
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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

//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link 
//                     href={`/courses/watch/${courseId}/${currentLessonData.id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
//                   >
//                     <Play size={16} />
//                     Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
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
//                     disabled={userProgress[currentLessonData.id]?.completed}
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

//   // Load user progress on component mount
//   useEffect(() => {
//     loadUserProgress()
//   }, [courseId])

//   // Mock load user progress - In real app, this would fetch from API
//   const loadUserProgress = async () => {
//     try {
//       // Mock: Load progress from localStorage or API
//       const savedProgress = localStorage.getItem(`course-progress-${courseId}`)
//       if (savedProgress) {
//         setUserProgress(JSON.parse(savedProgress))
//       }
//     } catch (error) {
//       console.error('Error loading user progress:', error)
//     }
//   }

//   // Save progress whenever it changes
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

//   // Mark lesson as completed
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

//     // In a real app, you would also save to the database
//     try {
//       // Mock API call to save progress
//       await fetch('/api/student/progress', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           courseId,
//           lessonId: targetLessonId,
//           completed: true,
//           progress: 100
//         })
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
//     }
//   }

//   // Video control functions - KEEPING ORIGINAL WORKING CODE
//   const togglePlayPause = () => {
//     if (!videoRef.current) return; // Safely exit if video element is not mounted

//     if (isPlaying) {
//       videoRef.current.pause()
//     } else {
//       // Attempt to play, catching the promise rejection error
//       videoRef.current.play().catch(error => {
//         console.error('Video Playback Failed (Autoplay/Promise):', error)
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
//   const getCurrentLessonData = (): Lesson | null => {
//     if (!curriculumData[currentModule]?.lessons[currentLesson]) {
//       return null
//     }
    
//     const lesson = curriculumData[currentModule].lessons[currentLesson]
//     const progress = userProgress[lesson.id] || {}
    
//     return {
//       ...lesson,
//       watched: progress.watched || 0,
//       completed: progress.completed || false
//     }
//   }

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
  
//   // CRITICAL FIX: Check if a video should display
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

//   // Video Player Component - UNTOUCHED WORKING CODE
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

//   // Mobile Sidebar Overlay - CORRECTED
//   const MobileSidebar = () => (
//     <>
//       {/* 1. Mobile Sidebar Overlay: Dimming and blurring effect */}
//       {isMobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsMobileSidebarOpen(false)}
//         />
//       )}
      
//       {/* 2. Mobile Sidebar: Positioned left-0 and slides from left */}
//       <div className={`
//         fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//         ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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
//                     {/* PROGRESS: Module progress display */}
//                     <p className="text-xs text-muted-foreground">{calculateModuleProgress(module)}% complete</p>
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
//                       {/* PROGRESS: Lesson completion icon */}
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

//           {/* Content Player Section - Full Width - VIDEO FIX APPLIED HERE */}
//           <div className="bg-white p-4 md:p-8 w-full border-b border-border">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               {/* This container ensures correct aspect ratio and max width, removing black side bars */}
//               <div className="bg-black rounded-xl overflow-hidden relative w-full aspect-video max-w-4xl mx-auto shadow-lg">
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
//               {/* Watch on Separate Page Link */}
//               {isVideoLesson && (
//                 <div className="mt-4 text-center">
//                   {/* <Link href={`/courses/watch/${courseId}/${currentLessonData.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1" >
//                     <Play size={16} /> Watch on separate page
//                   </Link> */}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Overall Progress Bar - Full Width */}
//           <div className="bg-white p-4 md:p-6 border-b border-border w-full">
//             <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold text-gray-900">Course Progress</span>
//                 {/* PROGRESS: Overall progress percentage display */}
//                 <span className="text-primary font-bold">{overallProgress}%</span>
//               </div>
//               {/* PROGRESS: Overall progress bar UI */}
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div className="bg-primary rounded-full h-3 transition-all" style={{ width: `${overallProgress}%` }} />
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
//                   {/* PROGRESS: Mark Complete Button */}
//                   <button
//                     onClick={() => completeLesson()}
//                     disabled={userProgress[currentLessonData.id]?.completed}
//                     className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap w-full md:w-auto ${
//                       userProgress[currentLessonData.id]?.completed
//                         ? "bg-green-100 text-green-800"
//                         : "bg-primary text-primary-foreground hover:opacity-90"
//                     }`}
//                   >
//                     {userProgress[currentLessonData.id]?.completed ? "Completed" : "Mark Complete"}
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
//                             Understand key concepts presented in...
//                           </li>
//                           {/* ... (Other list items omitted for brevity) ... */}
//                         </ul>
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
//                         placeholder="Start typing your notes here..."
//                         className="w-full min-h-[300px] border border-border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-y"
//                       />

//                       <div className="text-sm text-muted-foreground flex justify-between">
//                         <button className="text-primary hover:underline">Save Notes</button>
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
//                                 <div>
//                                   <p className="font-semibold text-foreground">Lesson Slides.pdf</p>
//                                   <p className="text-xs text-muted-foreground">1.2 MB - Click to Download</p>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="bg-white rounded-lg p-3 md:p-4 border border-blue-100 hover:border-blue-300 transition cursor-pointer w-full">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                   <span className="text-blue-600 font-bold text-sm md:text-base">DOC</span>
//                                 </div>
//                                 <div>
//                                   <p className="font-semibold text-foreground">Code Snippets.zip</p>
//                                   <p className="text-xs text-muted-foreground">350 KB - Click to Download</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         {/* External Links */}
//                         <div className="bg-purple-50 border border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 w-full">
//                           <h4 className="font-bold text-purple-900 text-lg md:text-xl mb-3 md:mb-4">🔗 Useful Links</h4>
//                           <div className="space-y-3 md:space-y-4 w-full">
//                             <a 
//                               href="https://example.com/external-guide" 
//                               target="_blank" 
//                               rel="noopener noreferrer"
//                               className="bg-white rounded-lg p-3 md:p-4 border border-purple-100 hover:border-purple-300 transition flex items-center gap-3 group w-full"
//                             >
//                               <LinkIcon size={20} className="text-purple-600 flex-shrink-0" />
//                               <div>
//                                 <p className="font-semibold text-foreground group-hover:text-purple-800 transition">Official Documentation</p>
//                                 <p className="text-xs text-muted-foreground truncate">https://example.com/external-guide</p>
//                               </div>
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
//             <div className="border-t border-border mt-8 pt-6 md:pt-8 w-full">
//               <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
//                 <div className="flex justify-between">
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
