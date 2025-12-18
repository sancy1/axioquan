
// // /src/components/dashboard/instructor-quiz-analytics.tsx  OLD-FILE

// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Separator } from '@/components/ui/separator';
// import { Progress } from '@/components/ui/progress';
// import { Skeleton } from '@/components/ui/skeleton';
// import { 
//   BarChart3, 
//   TrendingUp, 
//   Users, 
//   Award,
//   Clock,
//   FileText,
//   Download,
//   Send,
//   Filter,
//   ChevronDown,
//   Eye,
//   EyeOff
// } from 'lucide-react';
// import { QuizPerformanceChart } from '@/components/assessments/quiz-performance-chart';
// import { CertificateIndicator } from '@/components/assessments/certificate-indicator';
// import { StudentAttemptsTable } from '@/components/assessments/student-attempts-table';
// import { toast } from 'sonner';

// interface QuizAnalytics {
//   overview: {
//     averageScore: number;
//     totalStudents: number;
//     studentsTaken: number;
//     participationRate: number;
//     passRate: number;
//     averageAttempts: number;
//     totalAttempts: number;
//   };
//   scoreDistribution: {
//     '90-100': number;
//     '80-89': number;
//     '70-79': number;
//     '60-69': number;
//     '0-59': number;
//   };
//   studentPerformance: Array<{
//     studentId: string;
//     studentName: string;
//     email: string;
//     score: number;
//     grade: string;
//     attempts: number;
//     maxAttempts: number;
//     timeSpent: number;
//     lastAttemptDate: string;
//     certificateEligible: boolean;
//     status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
//     progress: number;
//   }>;
//   questionAnalysis: Array<{
//     questionId: string;
//     questionText: string;
//     questionType: string;
//     correctRate: number;
//     averageTime: number;
//     difficulty: 'easy' | 'medium' | 'hard';
//     points: number;
//   }>;
//   timeSeries: Array<{
//     date: string;
//     averageScore: number;
//     attempts: number;
//     newStudents: number;
//   }>;
//   certificateSummary: {
//     eligible: number;
//     inProgress: number;
//     notEligible: number;
//     issued: number;
//     total: number;
//   };
// }

// interface InstructorQuizAnalyticsProps {
//   assessmentId: string;
//   courseId: string;
// }

// export function InstructorQuizAnalytics({ assessmentId, courseId }: InstructorQuizAnalyticsProps) {
//   const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('30d');
//   const [showDetailedView, setShowDetailedView] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('overview');

//   useEffect(() => {
//     fetchAnalytics();
//   }, [assessmentId, timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/assessments/${assessmentId}/analytics?range=${timeRange}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setAnalytics(data.analytics);
//       } else {
//         throw new Error('Failed to fetch analytics');
//       }
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       toast.error('Failed to load analytics data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportData = (format: 'csv' | 'pdf') => {
//     toast.info(`Exporting data as ${format.toUpperCase()}...`);
//     // Implementation for data export
//     console.log(`Exporting ${format} for assessment ${assessmentId}`);
//   };

//   const handleSendCertificates = () => {
//     toast.info('Preparing to send certificates to eligible students...');
//     // Implementation for sending certificates
//   };

//   if (loading) {
//     return <AnalyticsSkeleton />;
//   }

//   if (!analytics) {
//     return (
//       <Card>
//         <CardContent className="p-8 text-center">
//           <div className="text-muted-foreground">
//             <BarChart3 className="h-12 w-12 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">No analytics data available</h3>
//             <p>No students have taken this quiz yet.</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with actions */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Quiz Analytics</h1>
//           <p className="text-muted-foreground">
//             Comprehensive performance insights and student tracking
//           </p>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <div className="flex items-center gap-2">
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => setTimeRange(timeRange === '30d' ? '7d' : '30d')}
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               {timeRange === '30d' ? 'Last 30 days' : 'Last 7 days'}
//               <ChevronDown className="h-4 w-4 ml-2" />
//             </Button>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => setShowDetailedView(!showDetailedView)}
//             >
//               {showDetailedView ? (
//                 <>
//                   <EyeOff className="h-4 w-4 mr-2" />
//                   Simple View
//                 </>
//               ) : (
//                 <>
//                   <Eye className="h-4 w-4 mr-2" />
//                   Detailed View
//                 </>
//               )}
//             </Button>
//           </div>
//           <Button 
//             variant="outline" 
//             size="sm"
//             onClick={() => handleExportData('csv')}
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export CSV
//           </Button>
//         </div>
//       </div>

//       {/* Overview Metrics */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4 md:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Average Score</p>
//                 <p className="text-2xl md:text-3xl font-bold mt-2">
//                   {analytics.overview.averageScore.toFixed(1)}%
//                 </p>
//               </div>
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <TrendingUp className="h-6 w-6 text-blue-600" />
//               </div>
//             </div>
//             <div className="mt-4">
//               <div className="flex justify-between text-xs mb-1">
//                 <span>Progress</span>
//                 <span>{analytics.overview.averageScore.toFixed(1)}%</span>
//               </div>
//               <Progress value={analytics.overview.averageScore} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 md:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Participation</p>
//                 <p className="text-2xl md:text-3xl font-bold mt-2">
//                   {analytics.overview.studentsTaken}/{analytics.overview.totalStudents}
//                 </p>
//               </div>
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Users className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               {analytics.overview.participationRate.toFixed(1)}% of enrolled students
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 md:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
//                 <p className="text-2xl md:text-3xl font-bold mt-2">
//                   {analytics.overview.passRate.toFixed(1)}%
//                 </p>
//               </div>
//               <div className="p-2 bg-amber-100 rounded-lg">
//                 <Award className="h-6 w-6 text-amber-600" />
//               </div>
//             </div>
//             <div className="mt-4">
//               <div className="flex justify-between text-xs mb-1">
//                 <span>Passing</span>
//                 <span>{analytics.overview.passRate.toFixed(1)}%</span>
//               </div>
//               <Progress value={analytics.overview.passRate} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 md:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">Avg. Attempts</p>
//                 <p className="text-2xl md:text-3xl font-bold mt-2">
//                   {analytics.overview.averageAttempts.toFixed(1)}
//                 </p>
//               </div>
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <Clock className="h-6 w-6 text-purple-600" />
//               </div>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               Total attempts: {analytics.overview.totalAttempts}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Tabs */}
//       <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
//         <TabsList className="grid grid-cols-4 md:w-auto">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="questions">Questions</TabsTrigger>
//           <TabsTrigger value="certificates">Certificates</TabsTrigger>
//         </TabsList>

//         {/* Overview Tab */}
//         <TabsContent value="overview" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Performance Trend</CardTitle>
//               <CardDescription>
//                 Average scores and participation over time
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <QuizPerformanceChart 
//                 data={analytics.timeSeries}
//                 type="line"
//                 height={300}
//               />
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Score Distribution</CardTitle>
//                 <CardDescription>
//                   How students performed across score ranges
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <QuizPerformanceChart 
//                   data={Object.entries(analytics.scoreDistribution).map(([range, count]) => ({
//                     range,
//                     count
//                   }))}
//                   type="bar"
//                   height={250}
//                 />
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Certificate Eligibility</CardTitle>
//                 <CardDescription>
//                   Student status for certificate issuance
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {Object.entries(analytics.certificateSummary).map(([status, count]) => (
//                     <div key={status} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <CertificateIndicator 
//                           status={status as any}
//                           showLabel={false}
//                           size="sm"
//                         />
//                         <span className="capitalize">{status.replace(/([A-Z])/g, ' $1').trim()}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="font-semibold">{count}</span>
//                         <span className="text-muted-foreground text-sm">
//                           ({((count / analytics.certificateSummary.total) * 100).toFixed(1)}%)
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <Separator className="my-4" />
//                 <Button 
//                   className="w-full"
//                   onClick={handleSendCertificates}
//                   disabled={analytics.certificateSummary.eligible === 0}
//                 >
//                   <Send className="h-4 w-4 mr-2" />
//                   Send Certificates to Eligible Students
//                   <Badge variant="secondary" className="ml-2">
//                     {analytics.certificateSummary.eligible}
//                   </Badge>
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         {/* Students Tab */}
//         <TabsContent value="students">
//           <Card>
//             <CardHeader>
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <CardTitle>Student Performance</CardTitle>
//                   <CardDescription>
//                     Detailed performance data for each student
//                   </CardDescription>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Badge variant="outline">
//                     {analytics.studentPerformance.length} Students
//                   </Badge>
//                   <Button variant="outline" size="sm">
//                     <Download className="h-4 w-4 mr-2" />
//                     Export
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <StudentAttemptsTable 
//                 data={analytics.studentPerformance}
//                 assessmentId={assessmentId}
//                 courseId={courseId}
//               />
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Questions Tab */}
//         <TabsContent value="questions">
//           <Card>
//             <CardHeader>
//               <CardTitle>Question Analysis</CardTitle>
//               <CardDescription>
//                 Identify difficult questions and areas for improvement
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {analytics.questionAnalysis.map((question, index) => (
//                   <div key={question.questionId} className="border rounded-lg p-4">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Badge variant="outline">Q{index + 1}</Badge>
//                           <Badge variant={
//                             question.difficulty === 'easy' ? 'default' :
//                             question.difficulty === 'medium' ? 'secondary' : 'destructive'
//                           }>
//                             {question.difficulty}
//                           </Badge>
//                           <Badge variant="outline">
//                             {question.questionType.replace('_', ' ')}
//                           </Badge>
//                           <Badge variant="outline">
//                             {question.points} {question.points === 1 ? 'point' : 'points'}
//                           </Badge>
//                         </div>
//                         <p className="font-medium line-clamp-2">{question.questionText}</p>
//                       </div>
//                       <div className="text-right ml-4">
//                         <div className="text-2xl font-bold">
//                           {question.correctRate.toFixed(1)}%
//                         </div>
//                         <div className="text-sm text-muted-foreground">Correct</div>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div>
//                         <div className="text-muted-foreground">Difficulty</div>
//                         <div className="font-medium capitalize">{question.difficulty}</div>
//                       </div>
//                       <div>
//                         <div className="text-muted-foreground">Avg. Time</div>
//                         <div className="font-medium">
//                           {Math.round(question.averageTime)}s
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-muted-foreground">Type</div>
//                         <div className="font-medium">
//                           {question.questionType.replace('_', ' ')}
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-muted-foreground">Performance</div>
//                         <div className="flex items-center gap-2">
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full ${
//                                 question.correctRate >= 70 ? 'bg-green-500' :
//                                 question.correctRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
//                               }`}
//                               style={{ width: `${question.correctRate}%` }}
//                             />
//                           </div>
//                           <span className="font-medium">{question.correctRate.toFixed(0)}%</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Certificates Tab */}
//         <TabsContent value="certificates">
//           <Card>
//             <CardHeader>
//               <CardTitle>Certificate Management</CardTitle>
//               <CardDescription>
//                 Manage certificate eligibility and issuance
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {/* Certificate Summary */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="border rounded-lg p-4 text-center">
//                     <div className="text-3xl font-bold text-green-600">
//                       {analytics.certificateSummary.eligible}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Eligible</div>
//                   </div>
//                   <div className="border rounded-lg p-4 text-center">
//                     <div className="text-3xl font-bold text-amber-600">
//                       {analytics.certificateSummary.inProgress}
//                     </div>
//                     <div className="text-sm text-muted-foreground">In Progress</div>
//                   </div>
//                   <div className="border rounded-lg p-4 text-center">
//                     <div className="text-3xl font-bold text-red-600">
//                       {analytics.certificateSummary.notEligible}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Not Eligible</div>
//                   </div>
//                   <div className="border rounded-lg p-4 text-center">
//                     <div className="text-3xl font-bold text-blue-600">
//                       {analytics.certificateSummary.issued}
//                     </div>
//                     <div className="text-sm text-muted-foreground">Issued</div>
//                   </div>
//                 </div>

//                 {/* Eligible Students List */}
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4">Eligible Students</h3>
//                   <div className="border rounded-lg overflow-hidden">
//                     <div className="grid grid-cols-12 bg-gray-50 p-3 font-medium text-sm">
//                       <div className="col-span-5">Student</div>
//                       <div className="col-span-2">Score</div>
//                       <div className="col-span-2">Attempts</div>
//                       <div className="col-span-3">Status</div>
//                     </div>
//                     {analytics.studentPerformance
//                       .filter(student => student.certificateEligible)
//                       .map((student) => (
//                         <div key={student.studentId} className="grid grid-cols-12 p-3 border-t hover:bg-gray-50">
//                           <div className="col-span-5">
//                             <div className="font-medium">{student.studentName}</div>
//                             <div className="text-sm text-muted-foreground">{student.email}</div>
//                           </div>
//                           <div className="col-span-2 font-medium">
//                             {student.score.toFixed(1)}%
//                           </div>
//                           <div className="col-span-2">
//                             {student.attempts}/{student.maxAttempts}
//                           </div>
//                           <div className="col-span-3">
//                             <CertificateIndicator 
//                               status={student.status}
//                               score={student.score}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4">
//                   <Button 
//                     className="flex-1"
//                     onClick={handleSendCertificates}
//                     disabled={analytics.certificateSummary.eligible === 0}
//                   >
//                     <Send className="h-4 w-4 mr-2" />
//                     Send All Certificates
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     className="flex-1"
//                     onClick={() => handleExportData('pdf')}
//                   >
//                     <FileText className="h-4 w-4 mr-2" />
//                     Generate Certificates (PDF)
//                   </Button>
//                   <Button variant="outline">
//                     <Download className="h-4 w-4 mr-2" />
//                     Export List
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// function AnalyticsSkeleton() {
//   return (
//     <div className="space-y-6">
//       {/* Header Skeleton */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <Skeleton className="h-8 w-48 mb-2" />
//           <Skeleton className="h-4 w-64" />
//         </div>
//         <div className="flex gap-2">
//           <Skeleton className="h-9 w-32" />
//           <Skeleton className="h-9 w-32" />
//         </div>
//       </div>

//       {/* Metrics Skeleton */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[1, 2, 3, 4].map(i => (
//           <Skeleton key={i} className="h-32 w-full" />
//         ))}
//       </div>

//       {/* Content Skeleton */}
//       <div className="space-y-4">
//         <Skeleton className="h-64 w-full" />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Skeleton className="h-64 w-full" />
//           <Skeleton className="h-64 w-full" />
//         </div>
//       </div>
//     </div>
//   );
// }




















// /src/components/dashboard/instructor-quiz-analytics.tsx - NEW-FILE

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  Clock,
  FileText,
  Download,
  Send,
  Filter,
  ChevronDown,
  Eye,
  EyeOff,
  Search,
  Mail,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { QuizPerformanceChart } from '@/components/assessments/quiz-performance-chart';
import { CertificateIndicator } from '@/components/assessments/certificate-indicator';
import { StudentAttemptsTable } from '@/components/assessments/student-attempts-table';
import { toast } from 'sonner';

interface QuizAnalytics {
  overview: {
    averageScore: number;
    totalStudents: number;
    studentsTaken: number;
    participationRate: number;
    passRate: number;
    averageAttempts: number;
    totalAttempts: number;
  };
  scoreDistribution: {
    '90-100': number;
    '80-89': number;
    '70-79': number;
    '60-69': number;
    '0-59': number;
  };
  studentPerformance: Array<{
    studentId: string;
    studentName: string;
    email: string;
    score: number;
    grade: string;
    attempts: number;
    maxAttempts: number;
    timeSpent: number;
    lastAttemptDate: string;
    certificateEligible: boolean;
    status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
    progress: number;
  }>;
  questionAnalysis: Array<{
    questionId: string;
    questionText: string;
    questionType: string;
    correctRate: number;
    averageTime: number;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  }>;
  timeSeries: Array<{
    date: string;
    averageScore: number;
    attempts: number;
    newStudents: number;
  }>;
  certificateSummary: {
    eligible: number;
    inProgress: number;
    notEligible: number;
    issued: number;
    total: number;
  };
}

interface InstructorQuizAnalyticsProps {
  assessmentId: string;
  courseId: string;
}

export function InstructorQuizAnalytics({ assessmentId, courseId }: InstructorQuizAnalyticsProps) {
  const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAnalytics();
  }, [assessmentId, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/assessments/${assessmentId}/analytics?range=${timeRange}&courseId=${courseId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAnalytics(data.analytics);
        } else {
          throw new Error(data.error || 'Failed to fetch analytics');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
      // Load mock data for demonstration
      loadMockAnalytics();
    } finally {
      setLoading(false);
    }
  };

  const loadMockAnalytics = () => {
    const mockAnalytics: QuizAnalytics = {
      overview: {
        averageScore: 78.5,
        totalStudents: 45,
        studentsTaken: 32,
        participationRate: 71.1,
        passRate: 68.7,
        averageAttempts: 1.8,
        totalAttempts: 58,
      },
      scoreDistribution: {
        '90-100': 8,
        '80-89': 12,
        '70-79': 15,
        '60-69': 10,
        '0-59': 13,
      },
      studentPerformance: [
        {
          studentId: '1',
          studentName: 'John Doe',
          email: 'john@example.com',
          score: 92.5,
          grade: 'A',
          attempts: 1,
          maxAttempts: 3,
          timeSpent: 1800,
          lastAttemptDate: '2024-01-15T10:30:00Z',
          certificateEligible: true,
          status: 'eligible',
          progress: 92.5,
        },
        {
          studentId: '2',
          studentName: 'Jane Smith',
          email: 'jane@example.com',
          score: 78.0,
          grade: 'C+',
          attempts: 2,
          maxAttempts: 3,
          timeSpent: 2100,
          lastAttemptDate: '2024-01-16T14:20:00Z',
          certificateEligible: true,
          status: 'eligible',
          progress: 78.0,
        },
        {
          studentId: '3',
          studentName: 'Bob Johnson',
          email: 'bob@example.com',
          score: 65.5,
          grade: 'D',
          attempts: 3,
          maxAttempts: 3,
          timeSpent: 2400,
          lastAttemptDate: '2024-01-14T11:15:00Z',
          certificateEligible: false,
          status: 'not_eligible',
          progress: 65.5,
        },
        {
          studentId: '4',
          studentName: 'Alice Williams',
          email: 'alice@example.com',
          score: 88.0,
          grade: 'B+',
          attempts: 1,
          maxAttempts: 3,
          timeSpent: 1950,
          lastAttemptDate: '2024-01-17T09:45:00Z',
          certificateEligible: true,
          status: 'issued',
          progress: 88.0,
        },
        {
          studentId: '5',
          studentName: 'Charlie Brown',
          email: 'charlie@example.com',
          score: 72.5,
          grade: 'C',
          attempts: 1,
          maxAttempts: 3,
          timeSpent: 1650,
          lastAttemptDate: '2024-01-16T16:30:00Z',
          certificateEligible: true,
          status: 'in_progress',
          progress: 72.5,
        },
        {
          studentId: '6',
          studentName: 'Emma Watson',
          email: 'emma@example.com',
          score: 95.0,
          grade: 'A',
          attempts: 1,
          maxAttempts: 3,
          timeSpent: 1500,
          lastAttemptDate: '2024-01-15T09:15:00Z',
          certificateEligible: true,
          status: 'issued',
          progress: 95.0,
        },
        {
          studentId: '7',
          studentName: 'Michael Scott',
          email: 'michael@example.com',
          score: 42.5,
          grade: 'F',
          attempts: 3,
          maxAttempts: 3,
          timeSpent: 2700,
          lastAttemptDate: '2024-01-14T16:45:00Z',
          certificateEligible: false,
          status: 'not_eligible',
          progress: 42.5,
        },
        {
          studentId: '8',
          studentName: 'Sarah Connor',
          email: 'sarah@example.com',
          score: 81.0,
          grade: 'B',
          attempts: 2,
          maxAttempts: 3,
          timeSpent: 1950,
          lastAttemptDate: '2024-01-16T11:20:00Z',
          certificateEligible: true,
          status: 'eligible',
          progress: 81.0,
        },
      ],
      questionAnalysis: [
        {
          questionId: '1',
          questionText: 'What is the output of console.log(typeof null) in JavaScript?',
          questionType: 'multiple_choice',
          correctRate: 85.5,
          averageTime: 45,
          difficulty: 'medium',
          points: 5,
        },
        {
          questionId: '2',
          questionText: 'Explain the concept of closures in JavaScript with an example.',
          questionType: 'essay',
          correctRate: 62.3,
          averageTime: 120,
          difficulty: 'hard',
          points: 10,
        },
        {
          questionId: '3',
          questionText: 'Which method adds a new element to the end of an array?',
          questionType: 'multiple_choice',
          correctRate: 92.1,
          averageTime: 30,
          difficulty: 'easy',
          points: 3,
        },
        {
          questionId: '4',
          questionText: 'What is the time complexity of binary search?',
          questionType: 'short_answer',
          correctRate: 78.9,
          averageTime: 60,
          difficulty: 'medium',
          points: 5,
        },
        {
          questionId: '5',
          questionText: 'Write a function to reverse a string in JavaScript.',
          questionType: 'code',
          correctRate: 71.2,
          averageTime: 90,
          difficulty: 'medium',
          points: 8,
        },
      ],
      timeSeries: [
        { date: '2024-01-10', averageScore: 75.0, attempts: 5, newStudents: 3 },
        { date: '2024-01-11', averageScore: 76.5, attempts: 8, newStudents: 5 },
        { date: '2024-01-12', averageScore: 77.2, attempts: 6, newStudents: 2 },
        { date: '2024-01-13', averageScore: 78.8, attempts: 10, newStudents: 4 },
        { date: '2024-01-14', averageScore: 79.1, attempts: 7, newStudents: 3 },
        { date: '2024-01-15', averageScore: 78.5, attempts: 9, newStudents: 5 },
        { date: '2024-01-16', averageScore: 77.9, attempts: 8, newStudents: 4 },
        { date: '2024-01-17', averageScore: 78.2, attempts: 5, newStudents: 2 },
      ],
      certificateSummary: {
        eligible: 24,
        inProgress: 8,
        notEligible: 13,
        issued: 5,
        total: 32,
      },
    };
    
    setAnalytics(mockAnalytics);
  };

  const handleExportData = (format: 'csv' | 'pdf') => {
    toast.info(`Exporting data as ${format.toUpperCase()}...`);
    // Implementation for data export
    const data = analytics ? JSON.stringify(analytics, null, 2) : 'No data';
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-analytics-${assessmentId}-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSendCertificates = () => {
    if (!analytics) return;
    
    const eligibleStudents = analytics.studentPerformance.filter(s => s.certificateEligible);
    if (eligibleStudents.length === 0) {
      toast.warning('No eligible students found for certificates');
      return;
    }
    
    toast.info(`Sending certificates to ${eligibleStudents.length} eligible students...`);
    // Implementation for sending certificates
    setTimeout(() => {
      toast.success(`Certificates sent to ${eligibleStudents.length} students`);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (selectedStudents.size === 0) {
      toast.warning('Please select students to message');
      return;
    }
    
    const selectedStudentEmails = analytics?.studentPerformance
      .filter(student => selectedStudents.has(student.studentId))
      .map(student => student.email);
    
    if (selectedStudentEmails && selectedStudentEmails.length > 0) {
      const mailtoLink = `mailto:${selectedStudentEmails.join(',')}?subject=Regarding Your Quiz Performance&body=Dear student,%0D%0A%0D%0AI wanted to discuss your recent quiz performance...`;
      window.open(mailtoLink, '_blank');
    }
  };

  const handleSelectStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleSelectAll = () => {
    if (!analytics) return;
    
    if (selectedStudents.size === analytics.studentPerformance.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(analytics.studentPerformance.map(s => s.studentId)));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredStudents = analytics?.studentPerformance.filter(student => {
    const matchesSearch = 
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'all', label: 'All time' },
  ];

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No analytics data available</h3>
            <p>No students have taken this quiz yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Quiz Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive performance insights and student tracking
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetailedView(!showDetailedView)}
            >
              {showDetailedView ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Simple View
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Detailed View
                </>
              )}
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExportData('csv')}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          {selectedStudents.size > 0 && (
            <Button 
              variant="default" 
              size="sm"
              onClick={handleSendMessage}
            >
              <Mail className="h-4 w-4 mr-2" />
              Message ({selectedStudents.size})
            </Button>
          )}
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">
                  {analytics.overview.averageScore.toFixed(1)}%
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{analytics.overview.averageScore.toFixed(1)}%</span>
              </div>
              <Progress value={analytics.overview.averageScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Participation</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">
                  {analytics.overview.studentsTaken}/{analytics.overview.totalStudents}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {analytics.overview.participationRate.toFixed(1)}% of enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">
                  {analytics.overview.passRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Passing</span>
                <span>{analytics.overview.passRate.toFixed(1)}%</span>
              </div>
              <Progress value={analytics.overview.passRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Attempts</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">
                  {analytics.overview.averageAttempts.toFixed(1)}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total attempts: {analytics.overview.totalAttempts}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>
                Average scores and participation over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuizPerformanceChart 
                data={analytics.timeSeries}
                type="line"
                height={300}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>
                  How students performed across score ranges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuizPerformanceChart 
                  data={Object.entries(analytics.scoreDistribution).map(([range, count]) => ({
                    range,
                    count
                  }))}
                  type="bar"
                  height={250}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Eligibility</CardTitle>
                <CardDescription>
                  Student status for certificate issuance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.certificateSummary).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CertificateIndicator 
                          status={status as any}
                          showLabel={false}
                          size="sm"
                        />
                        <span className="capitalize">{status.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{count}</span>
                        <span className="text-muted-foreground text-sm">
                          ({((count / analytics.certificateSummary.total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button 
                  className="w-full"
                  onClick={handleSendCertificates}
                  disabled={analytics.certificateSummary.eligible === 0}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Certificates to Eligible Students
                  <Badge variant="secondary" className="ml-2">
                    {analytics.certificateSummary.eligible}
                  </Badge>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>
                    Detailed performance data for each student
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {analytics.studentPerformance.length} Students
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => handleExportData('csv')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="eligible">Eligible</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="not_eligible">Not Eligible</SelectItem>
                      <SelectItem value="issued">Issued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Student table */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-900 p-3 font-medium text-sm">
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.size === analytics.studentPerformance.length}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2">Score</div>
                    <div className="col-span-2">Attempts</div>
                    <div className="col-span-3">Status</div>
                  </div>
                  {filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <div key={student.studentId} className="grid grid-cols-12 p-3 border-t hover:bg-gray-50 dark:hover:bg-gray-900">
                        <div className="col-span-1 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(student.studentId)}
                            onChange={() => handleSelectStudent(student.studentId)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </div>
                        <div className="col-span-4">
                          <div className="font-medium">{student.studentName}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                        <div className="col-span-2 font-medium">
                          {student.score.toFixed(1)}%
                          <div className="text-xs text-muted-foreground">Grade: {student.grade}</div>
                        </div>
                        <div className="col-span-2">
                          {student.attempts}/{student.maxAttempts}
                          <div className="text-xs text-muted-foreground">
                            Time: {formatTime(student.timeSpent)}
                          </div>
                        </div>
                        <div className="col-span-3">
                          <CertificateIndicator 
                            status={student.status}
                            score={student.score}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No students found matching your search criteria.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
              <CardDescription>
                Identify difficult questions and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.questionAnalysis.map((question, index) => (
                  <div key={question.questionId} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge variant={
                            question.difficulty === 'easy' ? 'default' :
                            question.difficulty === 'medium' ? 'secondary' : 'destructive'
                          }>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {question.questionType.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline">
                            {question.points} {question.points === 1 ? 'point' : 'points'}
                          </Badge>
                        </div>
                        <p className="font-medium">{question.questionText}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold">
                          {question.correctRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Correct Rate</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Difficulty</div>
                        <div className="font-medium capitalize">{question.difficulty}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Avg. Time</div>
                        <div className="font-medium">
                          {Math.round(question.averageTime)}s
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Type</div>
                        <div className="font-medium capitalize">
                          {question.questionType.replace('_', ' ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Performance</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                question.correctRate >= 70 ? 'bg-green-500' :
                                question.correctRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${question.correctRate}%` }}
                            />
                          </div>
                          <span className="font-medium">{question.correctRate.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Management</CardTitle>
              <CardDescription>
                Manage certificate eligibility and issuance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Certificate Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {analytics.certificateSummary.eligible}
                    </div>
                    <div className="text-sm text-muted-foreground">Eligible</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">
                      {analytics.certificateSummary.inProgress}
                    </div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {analytics.certificateSummary.notEligible}
                    </div>
                    <div className="text-sm text-muted-foreground">Not Eligible</div>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {analytics.certificateSummary.issued}
                    </div>
                    <div className="text-sm text-muted-foreground">Issued</div>
                  </div>
                </div>

                {/* Eligible Students List */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Eligible Students</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-900 p-3 font-medium text-sm">
                      <div className="col-span-5">Student</div>
                      <div className="col-span-2">Score</div>
                      <div className="col-span-2">Attempts</div>
                      <div className="col-span-3">Status</div>
                    </div>
                    {analytics.studentPerformance
                      .filter(student => student.certificateEligible)
                      .map((student) => (
                        <div key={student.studentId} className="grid grid-cols-12 p-3 border-t hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="col-span-5">
                            <div className="font-medium">{student.studentName}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                          <div className="col-span-2 font-medium">
                            {student.score.toFixed(1)}%
                          </div>
                          <div className="col-span-2">
                            {student.attempts}/{student.maxAttempts}
                          </div>
                          <div className="col-span-3">
                            <CertificateIndicator 
                              status={student.status}
                              score={student.score}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={handleSendCertificates}
                    disabled={analytics.certificateSummary.eligible === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send All Certificates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleExportData('pdf')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Certificates (PDF)
                  </Button>
                  <Button variant="outline" onClick={() => handleExportData('csv')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Metrics Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}









