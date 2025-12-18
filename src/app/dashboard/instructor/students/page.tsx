
// // /app/dashboard/instructor/students/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'

// export default async function InstructorStudents() {
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
//     name: 'Instructor User',
//     email: 'instructor@example.com',
//     primaryRole: session.primaryRole || 'instructor',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-auto p-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Students</h1>
//           <p className="text-gray-600 mb-8">View and manage students enrolled in your courses</p>
          
//           <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
//             <div className="text-6xl mb-4">👥</div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Student Management</h2>
//             <p className="text-gray-600">
//               Student management interface will be displayed here with enrollment data and progress tracking.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }






















// // /app/dashboard/instructor/students/page.tsx

// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import Sidebar from '@/components/dashboard/sidebar'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { 
//   Users, 
//   BarChart3, 
//   Award, 
//   Clock,
//   Mail,
//   Download,
//   Search,
//   Filter,
//   Eye,
//   AlertCircle,
//   TrendingUp,
//   Target,
//   CheckCircle,
//   Clock as ClockIcon
// } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
// import { Progress } from '@/components/ui/progress'
// import { toast } from 'sonner'
// import Link from 'next/link'

// interface StudentQuizResult {
//   studentId: string;
//   studentName: string;
//   studentEmail: string;
//   studentImage?: string;
//   courseId: string;
//   courseTitle: string;
//   assessmentId: string;
//   assessmentTitle: string;
//   passingScore: number;
//   maxAttempts: number;
//   totalAttempts: number;
//   bestScore: number;
//   worstScore: number;
//   averageScore: number;
//   hasPassed: boolean;
//   lastAttemptDate: string;
//   totalTimeSpent: number;
//   isCertificateEligible: boolean;
//   status: 'eligible' | 'in_progress' | 'not_eligible';
// }

// interface QuizSummary {
//   totalStudents: number;
//   totalQuizzesAvailable: number;
//   totalQuizzesAttempted: number;
//   overallAverageScore: number;
//   totalAttempts: number;
//   totalPassedAttempts: number;
//   totalQuizzesPassed: number;
//   studentsEligibleCertificates: number;
//   recentSubmissions: number;
//   eligibleStudents: number;
//   eligibleCourses: number;
// }

// export default function InstructorStudentsPage() {
//   const router = useRouter()
//   const [session, setSession] = useState<any>(null)
//   const [quizResults, setQuizResults] = useState<StudentQuizResult[]>([])
//   const [summary, setSummary] = useState<QuizSummary | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterCourse, setFilterCourse] = useState('all')
//   const [filterStatus, setFilterStatus] = useState('all')
//   const [courses, setCourses] = useState<any[]>([])
//   const hasEligibleCertificates = summary && summary.studentsEligibleCertificates > 0;

//   useEffect(() => {
//     fetchSessionAndData()
//   }, [])

//   const fetchSessionAndData = async () => {
//     try {
//       setLoading(true)
      
//       // Fetch session
//       const sessionRes = await fetch('/api/auth/status')
//       const sessionData = await sessionRes.json()
      
//       if (sessionRes.ok && sessionData.user) {
//         setSession(sessionData)
//         await fetchStudentQuizData()
//         await fetchCourses()
//       } else {
//         router.push('/login')
//       }
//     } catch (error) {
//       console.error('Error fetching session:', error)
//       router.push('/login')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchStudentQuizData = async () => {
//     try {
//       setLoading(true)
      
//       // Fetch quiz results
//       const resultsResponse = await fetch('/api/instructor/students/quiz-results')
//       const resultsData = await resultsResponse.json()
      
//       if (resultsData.success) {
//         setQuizResults(resultsData.data || [])
//       } else {
//         toast.error(resultsData.error || 'Failed to load quiz results')
//       }
      
//       // Fetch summary
//       const summaryResponse = await fetch('/api/instructor/students/quiz-summary')
//       const summaryData = await summaryResponse.json()
      
//       if (summaryData.success) {
//         setSummary(summaryData.summary)
//       } else {
//         toast.error(summaryData.error || 'Failed to load summary')
//       }
//     } catch (error) {
//       console.error('Error fetching student quiz data:', error)
//       toast.error('Failed to load student quiz data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchCourses = async () => {
//     try {
//       const response = await fetch('/api/courses/instructor/my-courses')
//       if (response.ok) {
//         const data = await response.json()
//         setCourses(data.courses || [])
//       }
//     } catch (error) {
//       console.error('Error fetching courses:', error)
//     }
//   }

//   // Filter quiz results
//   const filteredResults = quizResults.filter(result => {
//     const matchesSearch = 
//       result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       result.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       result.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       result.assessmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
//     const matchesCourse = filterCourse === 'all' || result.courseId === filterCourse
//     const matchesStatus = filterStatus === 'all' || result.status === filterStatus
    
//     return matchesSearch && matchesCourse && matchesStatus
//   })

//   // Group results by student for the table
//   const studentSummaries = quizResults.reduce((acc, result) => {
//     if (!acc[result.studentId]) {
//       acc[result.studentId] = {
//         studentId: result.studentId,
//         studentName: result.studentName,
//         studentEmail: result.studentEmail,
//         studentImage: result.studentImage,
//         totalQuizzes: 0,
//         quizzesAttempted: 0,
//         quizzesPassed: 0,
//         bestScore: 0,
//         averageScore: 0,
//         totalAttempts: 0,
//         totalTimeSpent: 0,
//         eligibleCertificates: 0,
//         lastActivity: result.lastAttemptDate,
//         courses: new Set<string>()
//       }
//     }
    
//     const student = acc[result.studentId]
//     student.totalQuizzes += 1
//     student.quizzesAttempted += result.totalAttempts > 0 ? 1 : 0
//     student.quizzesPassed += result.hasPassed ? 1 : 0
//     student.totalAttempts += result.totalAttempts
//     student.totalTimeSpent += result.totalTimeSpent
//     student.courses.add(result.courseTitle)
    
//     if (result.bestScore > student.bestScore) {
//       student.bestScore = result.bestScore
//     }
    
//     // Update average score
//     if (student.quizzesAttempted > 0) {
//       student.averageScore = (student.averageScore * (student.quizzesAttempted - 1) + result.averageScore) / student.quizzesAttempted
//     }
    
//     if (result.isCertificateEligible) {
//       student.eligibleCertificates += 1
//     }
    
//     return acc
//   }, {} as Record<string, any>)

//   const studentList = Object.values(studentSummaries).map((student: any) => ({
//     ...student,
//     coursesCount: student.courses.size,
//     coursesList: Array.from(student.courses).join(', ')
//   }))


//   const formatTime = (seconds: number) => {
//   // Handle null/undefined/NaN values
//   if (!seconds || isNaN(seconds) || seconds === 0) return '0s';
  
//   // Ensure it's a whole number
//   const secs = Math.floor(Number(seconds));
  
//   const hours = Math.floor(secs / 3600);
//   const minutes = Math.floor((secs % 3600) / 60);
//   const remainingSeconds = secs % 60;
  
//   // Format based on duration
//   if (hours > 0) {
//     return `${hours}h ${minutes}m ${remainingSeconds}s`;
//   } else if (minutes > 0) {
//     return `${minutes}m ${remainingSeconds}s`;
//   } else {
//     return `${remainingSeconds}s`;
//   }
// }

// //   const formatTime = (seconds: number) => {
// //   if (!seconds || seconds === 0) return '0s';
  
// //   const hours = Math.floor(seconds / 3600);
// //   const minutes = Math.floor((seconds % 3600) / 60);
// //   const secs = seconds % 60;
  
// //   if (hours > 0) {
// //     return `${hours}h ${minutes}m ${secs}s`;
// //   } else if (minutes > 0) {
// //     return `${minutes}m ${secs}s`;
// //   } else {
// //     return `${secs}s`;
// //   }
// // }


//   // const formatTime = (seconds: number) => {
//   //   const hours = Math.floor(seconds / 3600)
//   //   const minutes = Math.floor((seconds % 3600) / 60)
    
//   //   if (hours > 0) {
//   //     return `${hours}h ${minutes}m`
//   //   }
//   //   return `${minutes}m`
//   // }


//   const getScoreColor = (score: number) => {
//     if (score >= 90) return 'text-green-600'
//     if (score >= 80) return 'text-blue-600'
//     if (score >= 70) return 'text-amber-600'
//     if (score >= 60) return 'text-orange-600'
//     return 'text-red-600'
//   }

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'eligible':
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eligible</Badge>
//       case 'in_progress':
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
//       case 'not_eligible':
//         return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Eligible</Badge>
//       default:
//         return <Badge variant="outline">{status}</Badge>
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <div className="flex-1 p-8">
//           <div className="max-w-7xl mx-auto space-y-6">
//             {/* Loading skeletons */}
//             <div className="animate-pulse space-y-4">
//               <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map(i => (
//                   <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
//                 ))}
//               </div>
//               <div className="h-64 bg-gray-200 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!session) {
//     return (
//       <div className="flex min-h-screen bg-gray-50 items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
//           <p className="text-gray-600">Please log in to access this page.</p>
//           <Button onClick={() => router.push('/login')} className="mt-4">
//             Go to Login
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   const user = {
//     id: session.user?.id,
//     name: session.user?.name || 'Instructor User',
//     email: session.user?.email || 'instructor@example.com',
//     primaryRole: session.user?.primaryRole || 'instructor',
//     image: session.user?.image
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-auto p-4 md:p-8">
//         <div className="max-w-7xl mx-auto space-y-6">
//           {/* Header */}
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Student Quiz Analytics</h1>
//             <p className="text-gray-600">
//               Track student quiz performance and certificate eligibility
//             </p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Total Students</p>
//                     <p className="text-2xl font-bold">{summary?.totalStudents || 0}</p>
//                   </div>
//                   <div className="p-3 bg-blue-50 rounded-lg">
//                     <Users className="h-6 w-6 text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="flex justify-between text-xs mb-1">
//                     <span>Active</span>
//                     <span>{quizResults.length > 0 ? '100%' : '0%'}</span>
//                   </div>
//                   <Progress value={quizResults.length > 0 ? 100 : 0} className="h-2" />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Avg. Quiz Score</p>
//                     <p className="text-2xl font-bold">
//                       {summary?.overallAverageScore ? Math.round(summary.overallAverageScore) + '%' : 'N/A'}
//                     </p>
//                   </div>
//                   <div className="p-3 bg-green-50 rounded-lg">
//                     <BarChart3 className="h-6 w-6 text-green-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center gap-2 text-sm">
//                   <TrendingUp className="h-4 w-4 text-green-500" />
//                   <span className="text-green-600">Overall Performance</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Pass Rate</p>
//                     <p className="text-2xl font-bold">
//                       {summary?.totalAttempts 
//                         ? Math.round((summary.totalPassedAttempts / summary.totalAttempts) * 100) + '%'
//                         : '0%'
//                       }
//                     </p>
//                   </div>
//                   <div className="p-3 bg-amber-50 rounded-lg">
//                     <Target className="h-6 w-6 text-amber-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <div className="flex justify-between text-xs mb-1">
//                     <span>Passing</span>
//                     <span>
//                       {summary?.totalPassedAttempts || 0}/{summary?.totalAttempts || 0}
//                     </span>
//                   </div>
//                   <Progress 
//                     value={summary?.totalAttempts 
//                       ? (summary.totalPassedAttempts / summary.totalAttempts) * 100 
//                       : 0
//                     } 
//                     className="h-2" 
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Certificates</p>
//                     <p className="text-2xl font-bold">{summary?.studentsEligibleCertificates || 0}</p>
//                   </div>
//                   <div className="p-3 bg-purple-50 rounded-lg">
//                     <Award className="h-6 w-6 text-purple-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center gap-2 text-sm">
//                   <span className="text-purple-600">
//                     {summary?.eligibleStudents || 0} students eligible
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Search and Filter */}
//           <Card>
//             <CardContent className="p-4 md:p-6">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <input
//                       type="text"
//                       placeholder="Search students by name, email, or course..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <select 
//                     value={filterCourse} 
//                     onChange={(e) => setFilterCourse(e.target.value)}
//                     className="border border-gray-300 rounded-lg px-3 py-2"
//                   >
//                     <option value="all">All Courses</option>
//                     {courses.map(course => (
//                       <option key={course.id} value={course.id}>
//                         {course.title}
//                       </option>
//                     ))}
//                   </select>
//                   <select 
//                     value={filterStatus} 
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="border border-gray-300 rounded-lg px-3 py-2"
//                   >
//                     <option value="all">All Status</option>
//                     <option value="eligible">Eligible</option>
//                     <option value="in_progress">In Progress</option>
//                     <option value="not_eligible">Not Eligible</option>
//                   </select>
//                   <Button 
//                     variant="outline" 
//                     onClick={() => {
//                       setSearchTerm('')
//                       setFilterCourse('all')
//                       setFilterStatus('all')
//                     }}
//                   >
//                     <Filter className="h-4 w-4 mr-2" />
//                     Reset
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Students Table */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Student Quiz Performance</CardTitle>
//               <p className="text-sm text-gray-600">
//                 Showing {studentList.length} students with quiz results
//               </p>
//             </CardHeader>
//             <CardContent>
//               {studentList.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b">
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Student</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Courses</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg. Score</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quizzes</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Attempts</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time Spent</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Certificates</th>
//                         <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {studentList.map((student: any) => (
//                         <tr key={student.studentId} className="border-b hover:bg-gray-50">
//                           <td className="py-3 px-4">
//                             <div className="flex items-center gap-3">
//                               <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                                 {student.studentImage ? (
//                                   <img 
//                                     src={student.studentImage} 
//                                     alt={student.studentName}
//                                     className="w-8 h-8 rounded-full"
//                                   />
//                                 ) : (
//                                   <span className="text-sm font-medium">
//                                     {student.studentName?.charAt(0).toUpperCase()}
//                                   </span>
//                                 )}
//                               </div>
//                               <div>
//                                 <div className="font-medium">{student.studentName}</div>
//                                 <div className="text-sm text-gray-500">{student.studentEmail}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="text-sm">
//                               <span className="font-medium">{student.coursesCount}</span> courses
//                               <div className="text-xs text-gray-500 truncate max-w-[200px]" title={student.coursesList}>
//                                 {student.coursesList}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="flex items-center gap-2">
//                               <span className={`font-bold text-lg ${getScoreColor(student.averageScore)}`}>
//                                 {Math.round(student.averageScore)}%
//                               </span>
//                               <div className="w-20 bg-gray-200 rounded-full h-2">
//                                 <div 
//                                   className={`h-2 rounded-full ${
//                                     student.averageScore >= 70 ? 'bg-green-500' :
//                                     student.averageScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
//                                   }`}
//                                   style={{ width: `${Math.min(100, student.averageScore)}%` }}
//                                 />
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="flex flex-col gap-1">
//                               <div className="flex items-center gap-2">
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                                 <span>{student.quizzesPassed}/{student.quizzesAttempted}</span>
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {student.totalQuizzes} total
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="flex items-center gap-2">
//                               <ClockIcon className="h-4 w-4 text-gray-400" />
//                               <span>{student.totalAttempts}</span>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="text-sm">
//                               {formatTime(student.totalTimeSpent)}
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="flex flex-col gap-1">
//                               <Badge className={`w-fit ${
//                                 student.eligibleCertificates > 0 
//                                   ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' 
//                                   : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
//                               }`}>
//                                 {student.eligibleCertificates} eligible
//                               </Badge>
//                               <div className="text-xs text-gray-500">
//                                 Last: {new Date(student.lastActivity).toLocaleDateString()}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             <div className="flex gap-2">
//                               <Button 
//                                 size="sm" 
//                                 variant="outline"
//                                 asChild
//                               >
//                                 {/* <Link href={`/dashboard/instructor/students/${student.studentId}`}>
//                                   <Eye className="h-4 w-4 mr-1" />
//                                   View
//                                 </Link> */}
//                               </Button>
//                               <Button 
//                                 size="sm" 
//                                 variant="outline"
//                                 onClick={() => {
//                                   window.open(`mailto:${student.studentEmail}?subject=Regarding Your Quiz Performance`, '_blank')
//                                 }}
//                               >
//                                 <Mail className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="text-6xl mb-4">📊</div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quiz Results Found</h3>
//                   <p className="text-gray-600 mb-6">
//                     No students have taken quizzes in your courses yet.
//                   </p>
//                   <Button asChild>
//                     <Link href="/dashboard/instructor/courses">
//                       View Your Courses
//                     </Link>
//                   </Button>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Certificate Management */}
//           {summary && summary.studentsEligibleCertificates > 0 && (
//   <Card className="border-amber-200 bg-amber-50">
//     <CardHeader>
//       <CardTitle className="text-amber-900">Certificate Management</CardTitle>
//       <p className="text-sm text-amber-700">
//         {summary.studentsEligibleCertificates} students are eligible for certificates
//       </p>
//     </CardHeader>
//     <CardContent>
//       <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//         <div>
//           <p className="text-amber-800">
//             Review and issue certificates to students who have passed your course quizzes with 70% or higher.
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button 
//             variant="outline" 
//             className="border-amber-300 text-amber-700"
//             onClick={() => {
//               const csvData = studentList
//                 .filter(s => s.eligibleCertificates > 0)
//                 .map(s => ({
//                   Name: s.studentName,
//                   Email: s.studentEmail,
//                   'Avg Score': s.averageScore + '%',
//                   'Eligible Certificates': s.eligibleCertificates,
//                   'Courses': s.coursesList
//                 }))
              
//               const csv = [
//                 Object.keys(csvData[0]).join(','),
//                 ...csvData.map(row => Object.values(row).join(','))
//               ].join('\n')
              
//               const blob = new Blob([csv], { type: 'text/csv' })
//               const url = window.URL.createObjectURL(blob)
//               const a = document.createElement('a')
//               a.href = url
//               a.download = 'eligible-students.csv'
//               document.body.appendChild(a)
//               a.click()
//               document.body.removeChild(a)
//             }}
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export List
//           </Button>
//           <Button 
//             className="bg-amber-600 hover:bg-amber-700"
//             asChild
//           >
//             <Link href="/dashboard/instructor/certificates">
//               <Award className="h-4 w-4 mr-2" />
//               Manage Certificates
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// )}


// {/* Detailed Quiz Results */}
// {/* Detailed Quiz Results */}
// {filteredResults.length > 0 && (
//   <Card>
//     <CardHeader>
//       <CardTitle>Detailed Quiz Results</CardTitle>
//       <p className="text-sm text-gray-600">
//         Individual quiz performance for each student
//       </p>
//     </CardHeader>
//     <CardContent>
//       <div className="space-y-4">
//         {filteredResults.map((result, index) => (
//           <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="font-medium">{result.studentName}</span>
//                   <span className="text-gray-500">•</span>
//                   <span className="text-sm text-gray-600">{result.courseTitle}</span>
//                   <span className="text-gray-500">•</span>
//                   <span className="text-sm text-gray-600">{result.assessmentTitle}</span>
//                 </div>
                
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                   <div>
//                     <div className="text-gray-500">Best Score</div>
//                     <div className={`font-bold ${getScoreColor(result.bestScore)}`}>
//                       {Math.round(result.bestScore)}%
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-gray-500">Average Score</div>
//                     <div className="font-medium">{Math.round(result.averageScore)}%</div>
//                   </div>
//                   <div> {/* ← THIS IS THE ATTEMPTS SECTION TO UPDATE */}
//                     <div className="text-gray-500">Attempts</div>
//                     <div className="font-medium">{result.totalAttempts}/{result.maxAttempts}</div>
//                   </div>
//                   <div>
//                     <div className="text-gray-500">Status</div>
//                     <div>{getStatusBadge(result.status)}</div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <Button 
//                   size="sm" 
//                   variant="outline"
//                   asChild
//                 >
//                   <Link href={`/dashboard/instructor/quizzes/${result.assessmentId}/analytics`}>
//                     <BarChart3 className="h-4 w-4 mr-1" />
//                     Analytics
//                   </Link>
//                 </Button>
//                 <Button 
//                   size="sm" 
//                   variant={result.isCertificateEligible ? "default" : "outline"}
//                   disabled={!result.isCertificateEligible}
//                 >
//                   <Award className="h-4 w-4 mr-1" />
//                   {result.isCertificateEligible ? 'Issue Certificate' : 'Not Eligible'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// )}
//         </div>
//       </main>
//     </div>
//   )
// }




























// /app/dashboard/instructor/students/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// REMOVED: Sidebar import
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  BarChart3, 
  Award, 
  Clock,
  Mail,
  Download,
  Search,
  Filter,
  Eye,
  AlertCircle,
  TrendingUp,
  Target,
  CheckCircle,
  Clock as ClockIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import Link from 'next/link'

interface StudentQuizResult {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentImage?: string;
  courseId: string;
  courseTitle: string;
  assessmentId: string;
  assessmentTitle: string;
  passingScore: number;
  maxAttempts: number;
  totalAttempts: number;
  bestScore: number;
  worstScore: number;
  averageScore: number;
  hasPassed: boolean;
  lastAttemptDate: string;
  totalTimeSpent: number;
  isCertificateEligible: boolean;
  status: 'eligible' | 'in_progress' | 'not_eligible';
}

interface QuizSummary {
  totalStudents: number;
  totalQuizzesAvailable: number;
  totalQuizzesAttempted: number;
  overallAverageScore: number;
  totalAttempts: number;
  totalPassedAttempts: number;
  totalQuizzesPassed: number;
  studentsEligibleCertificates: number;
  recentSubmissions: number;
  eligibleStudents: number;
  eligibleCourses: number;
}

export default function InstructorStudentsPage() {
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [quizResults, setQuizResults] = useState<StudentQuizResult[]>([])
  const [summary, setSummary] = useState<QuizSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [courses, setCourses] = useState<any[]>([])
  const hasEligibleCertificates = summary && summary.studentsEligibleCertificates > 0;

  useEffect(() => {
    fetchSessionAndData()
  }, [])

  const fetchSessionAndData = async () => {
    try {
      setLoading(true)
      
      // Fetch session
      const sessionRes = await fetch('/api/auth/status')
      const sessionData = await sessionRes.json()
      
      if (sessionRes.ok && sessionData.user) {
        setSession(sessionData)
        await fetchStudentQuizData()
        await fetchCourses()
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchStudentQuizData = async () => {
    try {
      setLoading(true)
      
      // Fetch quiz results
      const resultsResponse = await fetch('/api/instructor/students/quiz-results')
      const resultsData = await resultsResponse.json()
      
      if (resultsData.success) {
        setQuizResults(resultsData.data || [])
      } else {
        toast.error(resultsData.error || 'Failed to load quiz results')
      }
      
      // Fetch summary
      const summaryResponse = await fetch('/api/instructor/students/quiz-summary')
      const summaryData = await summaryResponse.json()
      
      if (summaryData.success) {
        setSummary(summaryData.summary)
      } else {
        toast.error(summaryData.error || 'Failed to load summary')
      }
    } catch (error) {
      console.error('Error fetching student quiz data:', error)
      toast.error('Failed to load student quiz data')
    } finally {
      setLoading(false)
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses/instructor/my-courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  // Filter quiz results
  const filteredResults = quizResults.filter(result => {
    const matchesSearch = 
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.assessmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCourse = filterCourse === 'all' || result.courseId === filterCourse
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus
    
    return matchesSearch && matchesCourse && matchesStatus
  })

  // Group results by student for the table
  const studentSummaries = quizResults.reduce((acc, result) => {
    if (!acc[result.studentId]) {
      acc[result.studentId] = {
        studentId: result.studentId,
        studentName: result.studentName,
        studentEmail: result.studentEmail,
        studentImage: result.studentImage,
        totalQuizzes: 0,
        quizzesAttempted: 0,
        quizzesPassed: 0,
        bestScore: 0,
        averageScore: 0,
        totalAttempts: 0,
        totalTimeSpent: 0,
        eligibleCertificates: 0,
        lastActivity: result.lastAttemptDate,
        courses: new Set<string>()
      }
    }
    
    const student = acc[result.studentId]
    student.totalQuizzes += 1
    student.quizzesAttempted += result.totalAttempts > 0 ? 1 : 0
    student.quizzesPassed += result.hasPassed ? 1 : 0
    student.totalAttempts += result.totalAttempts
    student.totalTimeSpent += result.totalTimeSpent
    student.courses.add(result.courseTitle)
    
    if (result.bestScore > student.bestScore) {
      student.bestScore = result.bestScore
    }
    
    // Update average score
    if (student.quizzesAttempted > 0) {
      student.averageScore = (student.averageScore * (student.quizzesAttempted - 1) + result.averageScore) / student.quizzesAttempted
    }
    
    if (result.isCertificateEligible) {
      student.eligibleCertificates += 1
    }
    
    return acc
  }, {} as Record<string, any>)

  const studentList = Object.values(studentSummaries).map((student: any) => ({
    ...student,
    coursesCount: student.courses.size,
    coursesList: Array.from(student.courses).join(', ')
  }))


  const formatTime = (seconds: number) => {
  // Handle null/undefined/NaN values
  if (!seconds || isNaN(seconds) || seconds === 0) return '0s';
  
  // Ensure it's a whole number
  const secs = Math.floor(Number(seconds));
  
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const remainingSeconds = secs % 60;
  
  // Format based on duration
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-amber-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'eligible':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Eligible</Badge>
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case 'not_eligible':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Eligible</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      // REMOVED: Outer div with Sidebar - just return loading state
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Loading skeletons */}
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
          <Button onClick={() => router.push('/login')} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  // REMOVED: User object creation (not needed since Sidebar is in layout)

  return (
    // REMOVED: Outer div with Sidebar - just return the content
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Student Quiz Analytics</h1>
          <p className="text-gray-600">
            Track student quiz performance and certificate eligibility
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{summary?.totalStudents || 0}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Active</span>
                  <span>{quizResults.length > 0 ? '100%' : '0%'}</span>
                </div>
                <Progress value={quizResults.length > 0 ? 100 : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Quiz Score</p>
                  <p className="text-2xl font-bold">
                    {summary?.overallAverageScore ? Math.round(summary.overallAverageScore) + '%' : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Overall Performance</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                  <p className="text-2xl font-bold">
                    {summary?.totalAttempts 
                      ? Math.round((summary.totalPassedAttempts / summary.totalAttempts) * 100) + '%'
                      : '0%'
                    }
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Passing</span>
                  <span>
                    {summary?.totalPassedAttempts || 0}/{summary?.totalAttempts || 0}
                  </span>
                </div>
                <Progress 
                  value={summary?.totalAttempts 
                    ? (summary.totalPassedAttempts / summary.totalAttempts) * 100 
                    : 0
                  } 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold">{summary?.studentsEligibleCertificates || 0}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-purple-600">
                  {summary?.eligibleStudents || 0} students eligible
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students by name, email, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  value={filterCourse} 
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="eligible">Eligible</option>
                  <option value="in_progress">In Progress</option>
                  <option value="not_eligible">Not Eligible</option>
                </select>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setFilterCourse('all')
                    setFilterStatus('all')
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Quiz Performance</CardTitle>
            <p className="text-sm text-gray-600">
              Showing {studentList.length} students with quiz results
            </p>
          </CardHeader>
          <CardContent>
            {studentList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Courses</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg. Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quizzes</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Attempts</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time Spent</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Certificates</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.map((student: any) => (
                      <tr key={student.studentId} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              {student.studentImage ? (
                                <img 
                                  src={student.studentImage} 
                                  alt={student.studentName}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <span className="text-sm font-medium">
                                  {student.studentName?.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{student.studentName}</div>
                              <div className="text-sm text-gray-500">{student.studentEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <span className="font-medium">{student.coursesCount}</span> courses
                            <div className="text-xs text-gray-500 truncate max-w-[200px]" title={student.coursesList}>
                              {student.coursesList}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-lg ${getScoreColor(student.averageScore)}`}>
                              {Math.round(student.averageScore)}%
                            </span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  student.averageScore >= 70 ? 'bg-green-500' :
                                  student.averageScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(100, student.averageScore)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{student.quizzesPassed}/{student.quizzesAttempted}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {student.totalQuizzes} total
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-gray-400" />
                            <span>{student.totalAttempts}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {formatTime(student.totalTimeSpent)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <Badge className={`w-fit ${
                              student.eligibleCertificates > 0 
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' 
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }`}>
                              {student.eligibleCertificates} eligible
                            </Badge>
                            <div className="text-xs text-gray-500">
                              Last: {new Date(student.lastActivity).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              asChild
                            >
                              {/* <Link href={`/dashboard/instructor/students/${student.studentId}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link> */}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                window.open(`mailto:${student.studentEmail}?subject=Regarding Your Quiz Performance`, '_blank')
                              }}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quiz Results Found</h3>
                <p className="text-gray-600 mb-6">
                  No students have taken quizzes in your courses yet.
                </p>
                <Button asChild>
                  <Link href="/dashboard/instructor/courses">
                    View Your Courses
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certificate Management */}
        {summary && summary.studentsEligibleCertificates > 0 && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-900">Certificate Management</CardTitle>
              <p className="text-sm text-amber-700">
                {summary.studentsEligibleCertificates} students are eligible for certificates
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <p className="text-amber-800">
                    Review and issue certificates to students who have passed your course quizzes with 70% or higher.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-amber-300 text-amber-700"
                    onClick={() => {
                      const csvData = studentList
                        .filter(s => s.eligibleCertificates > 0)
                        .map(s => ({
                          Name: s.studentName,
                          Email: s.studentEmail,
                          'Avg Score': s.averageScore + '%',
                          'Eligible Certificates': s.eligibleCertificates,
                          'Courses': s.coursesList
                        }))
                      
                      const csv = [
                        Object.keys(csvData[0]).join(','),
                        ...csvData.map(row => Object.values(row).join(','))
                      ].join('\n')
                      
                      const blob = new Blob([csv], { type: 'text/csv' })
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'eligible-students.csv'
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700"
                    asChild
                  >
                    <Link href="/dashboard/instructor/certificates">
                      <Award className="h-4 w-4 mr-2" />
                      Manage Certificates
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Quiz Results */}
        {filteredResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Quiz Results</CardTitle>
              <p className="text-sm text-gray-600">
                Individual quiz performance for each student
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{result.studentName}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{result.courseTitle}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{result.assessmentTitle}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Best Score</div>
                            <div className={`font-bold ${getScoreColor(result.bestScore)}`}>
                              {Math.round(result.bestScore)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">Average Score</div>
                            <div className="font-medium">{Math.round(result.averageScore)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Attempts</div>
                            <div className="font-medium">{result.totalAttempts}/{result.maxAttempts}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Status</div>
                            <div>{getStatusBadge(result.status)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          asChild
                        >
                          <Link href={`/dashboard/instructor/quizzes/${result.assessmentId}/analytics`}>
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant={result.isCertificateEligible ? "default" : "outline"}
                          disabled={!result.isCertificateEligible}
                        >
                          <Award className="h-4 w-4 mr-1" />
                          {result.isCertificateEligible ? 'Issue Certificate' : 'Not Eligible'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}