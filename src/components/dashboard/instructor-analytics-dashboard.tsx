
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
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
  Eye,
  Search,
  Mail,
  BookOpen,
  GraduationCap,
  Trophy,
  ChevronRight,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { QuizPerformanceChart } from '@/components/assessments/quiz-performance-chart';
import { CertificateIndicator } from '@/components/assessments/certificate-indicator';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  difficulty_level: string;
  total_video_duration: string;
  total_students: number;
  total_assessments: number;
  completed_students: number;
}

interface Assessment {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  passingScore: number;
  maxAttempts: number;
  totalPoints: number;
  createdAt: string;
  totalAttempts: number;
  uniqueStudents: number;
  averageScore: number;
  passRate: number;
}

interface StudentPerformance {
  studentId: string;
  studentName: string;
  email: string;
  assessmentId: string;
  assessmentTitle: string;
  courseId: string;
  courseTitle: string;
  score: number;
  grade: string;
  attempts: number;
  maxAttempts: number;
  timeSpent: number;
  lastAttemptDate: string;
  certificateEligible: boolean;
  status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
  progress: number;
  passingScore: number;
}

interface InstructorAnalyticsData {
  courses: Course[];
  assessments: Assessment[];
  studentPerformance: StudentPerformance[];
}

interface InstructorAnalyticsDashboardProps {
  initialData: InstructorAnalyticsData;
  instructorId: string;
}

export default function InstructorAnalyticsDashboard({ 
  initialData, 
  instructorId 
}: InstructorAnalyticsDashboardProps) {
  const [data, setData] = useState<InstructorAnalyticsData>(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedAssessment, setSelectedAssessment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  // Filter courses for dropdown
  const courses = data.courses || [];
  const assessments = data.assessments || [];
  const studentPerformance = data.studentPerformance || [];

  // Filter assessments based on selected course
  const filteredAssessments = selectedCourse === 'all' 
    ? assessments 
    : assessments.filter(a => a.courseId === selectedCourse);

  // Filter student performance based on selections
  const filteredStudents = studentPerformance.filter(student => {
    // Filter by course
    const matchesCourse = selectedCourse === 'all' || student.courseId === selectedCourse;
    
    // Filter by assessment
    const matchesAssessment = selectedAssessment === 'all' || student.assessmentId === selectedAssessment;
    
    // Filter by search
    const matchesSearch = 
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.assessmentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesCourse && matchesAssessment && matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.total_students, 0),
    totalAssessments: assessments.length,
    totalAttempts: assessments.reduce((sum, assessment) => sum + assessment.totalAttempts, 0),
    averageScore: assessments.length > 0 
      ? assessments.reduce((sum, assessment) => sum + assessment.averageScore, 0) / assessments.length 
      : 0,
    certificatesEligible: studentPerformance.filter(s => s.status === 'eligible').length,
    certificatesIssued: studentPerformance.filter(s => s.status === 'issued').length,
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/instructor/analytics?instructorId=${instructorId}`);
      
      if (response.ok) {
        const newData = await response.json();
        if (newData.success) {
          setData(newData.data);
          toast.success('Data refreshed successfully');
        } else {
          throw new Error(newData.error);
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const exportData = filteredStudents.map(student => ({
      'Student Name': student.studentName,
      'Email': student.email,
      'Course': student.courseTitle,
      'Assessment': student.assessmentTitle,
      'Score': `${student.score}%`,
      'Grade': student.grade,
      'Attempts': `${student.attempts}/${student.maxAttempts}`,
      'Last Attempt': new Date(student.lastAttemptDate).toLocaleDateString(),
      'Certificate Status': student.status,
      'Certificate Eligible': student.certificateEligible ? 'Yes' : 'No',
    }));

    // Convert to CSV
    const csv = convertToCSV(exportData);
    downloadCSV(csv, `instructor-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Data exported successfully');
  };

  const handleSendCertificates = async (studentIds?: string[]) => {
    const studentsToCertify = studentIds 
      ? filteredStudents.filter(s => studentIds.includes(s.studentId))
      : filteredStudents.filter(s => s.status === 'eligible');

    if (studentsToCertify.length === 0) {
      toast.warning('No eligible students found for certificates');
      return;
    }

    try {
      toast.info(`Issuing certificates to ${studentsToCertify.length} students...`);
      
      // Call API to issue certificates
      const response = await fetch('/api/instructor/certificates/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentIds: studentsToCertify.map(s => s.studentId),
          assessmentIds: studentsToCertify.map(s => s.assessmentId),
          courseIds: studentsToCertify.map(s => s.courseId),
        }),
      });

      if (response.ok) {
        toast.success(`Certificates issued to ${studentsToCertify.length} students`);
        // Refresh data
        refreshData();
      } else {
        throw new Error('Failed to issue certificates');
      }
    } catch (error) {
      console.error('Error issuing certificates:', error);
      toast.error('Failed to issue certificates');
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
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.studentId)));
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-amber-600 bg-amber-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreDistribution = () => {
    const distribution = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0,
    };

    filteredStudents.forEach(student => {
      if (student.score >= 90) distribution['90-100']++;
      else if (student.score >= 80) distribution['80-89']++;
      else if (student.score >= 70) distribution['70-79']++;
      else if (student.score >= 60) distribution['60-69']++;
      else distribution['0-59']++;
    });

    return distribution;
  };

  if (loading && !data.courses.length) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Student Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track student performance and manage certificates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportData}
            disabled={filteredStudents.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">{stats.totalCourses}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.totalStudents} enrolled students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">{stats.averageScore.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Across {stats.totalAssessments} assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">{stats.certificatesEligible}</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.certificatesIssued} issued
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Attempts</p>
                <p className="text-2xl md:text-3xl font-bold mt-2">{stats.totalAttempts}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average: {(stats.totalAttempts / Math.max(stats.totalAssessments, 1)).toFixed(1)} per assessment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>How students are performing across all assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <QuizPerformanceChart 
                  data={Object.entries(getScoreDistribution()).map(([range, count]) => ({
                    range,
                    count
                  }))}
                  type="bar"
                  height={250}
                />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Attempts</CardTitle>
                <CardDescription>Latest student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents
                    .sort((a, b) => new Date(b.lastAttemptDate).getTime() - new Date(a.lastAttemptDate).getTime())
                    .slice(0, 5)
                    .map((student) => (
                      <div key={`${student.studentId}-${student.assessmentId}`} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{student.studentName}</h4>
                            <Badge className={getGradeColor(student.grade)}>
                              {student.grade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {student.courseTitle} • {student.assessmentTitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">{student.score.toFixed(1)}%</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(student.lastAttemptDate).toLocaleDateString()}
                            </p>
                          </div>
                          <CertificateIndicator 
                            status={student.status}
                            score={student.score}
                            showLabel={false}
                            size="sm"
                          />
                        </div>
                      </div>
                    ))}
                  {filteredStudents.length > 5 && (
                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setSelectedTab('students')}
                    >
                      View All Students
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>Courses with the highest average scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses
                  .sort((a, b) => {
                    const courseA = filteredStudents.filter(s => s.courseId === a.id);
                    const courseB = filteredStudents.filter(s => s.courseId === b.id);
                    const avgA = courseA.length > 0 ? courseA.reduce((sum, s) => sum + s.score, 0) / courseA.length : 0;
                    const avgB = courseB.length > 0 ? courseB.reduce((sum, s) => sum + s.score, 0) / courseB.length : 0;
                    return avgB - avgA;
                  })
                  .slice(0, 5)
                  .map((course) => {
                    const courseStudents = filteredStudents.filter(s => s.courseId === course.id);
                    const avgScore = courseStudents.length > 0 
                      ? courseStudents.reduce((sum, s) => sum + s.score, 0) / courseStudents.length 
                      : 0;
                    const eligible = courseStudents.filter(s => s.status === 'eligible').length;
                    
                    return (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {course.total_students} students • {course.total_assessments} assessments
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">{avgScore.toFixed(1)}%</p>
                            <p className="text-xs text-muted-foreground">
                              {eligible} eligible for certificates
                            </p>
                          </div>
                          <Link href={`/dashboard/instructor/courses/${course.id}`}>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>
                    View and manage student quiz results across all courses
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {filteredStudents.length} Students
                  </Badge>
                  {selectedStudents.size > 0 && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleSendCertificates(Array.from(selectedStudents))}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Issue Certificates ({selectedStudents.size})
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students, courses, or assessments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
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

              {/* Assessment Filter if course is selected */}
              {selectedCourse !== 'all' && (
                <div className="mb-6">
                  <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assessments</SelectItem>
                      {filteredAssessments.map((assessment) => (
                        <SelectItem key={assessment.id} value={assessment.id}>
                          {assessment.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Student Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 p-3 font-medium text-sm">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="col-span-3">Student</div>
                  <div className="col-span-2">Course</div>
                  <div className="col-span-2">Assessment</div>
                  <div className="col-span-1">Score</div>
                  <div className="col-span-1">Attempts</div>
                  <div className="col-span-2">Certificate</div>
                </div>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div key={`${student.studentId}-${student.assessmentId}`} className="grid grid-cols-12 p-3 border-t hover:bg-gray-50">
                      <div className="col-span-1 flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.has(student.studentId)}
                          onChange={() => handleSelectStudent(student.studentId)}
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="col-span-3">
                        <div className="font-medium">{student.studentName}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">{student.courseTitle}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">{student.assessmentTitle}</div>
                      </div>
                      <div className="col-span-1 font-bold">
                        {student.score.toFixed(1)}%
                      </div>
                      <div className="col-span-1">
                        {student.attempts}/{student.maxAttempts}
                      </div>
                      <div className="col-span-2">
                        <CertificateIndicator 
                          status={student.status}
                          score={student.score}
                          requiredScore={student.passingScore}
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

              {/* Summary */}
              <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <div>
                  Showing {filteredStudents.length} of {studentPerformance.length} students
                  {searchTerm && ` • Search: "${searchTerm}"`}
                </div>
                <Button 
                  variant="default" 
                  onClick={() => handleSendCertificates()}
                  disabled={filteredStudents.filter(s => s.status === 'eligible').length === 0}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Issue All Eligible Certificates
                  <Badge variant="secondary" className="ml-2">
                    {filteredStudents.filter(s => s.status === 'eligible').length}
                  </Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Performance</CardTitle>
              <CardDescription>
                View detailed analytics for each assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.map((assessment) => {
                  const assessmentStudents = filteredStudents.filter(s => s.assessmentId === assessment.id);
                  const passRate = assessment.totalAttempts > 0 
                    ? (assessmentStudents.filter(s => s.certificateEligible).length / assessment.totalAttempts) * 100 
                    : 0;
                  
                  return (
                    <div key={assessment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{assessment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assessment.courseTitle}</p>
                        </div>
                        <Link href={`/dashboard/instructor/quizzes/${assessment.id}/analytics`}>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{assessment.averageScore.toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">Avg. Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{assessment.uniqueStudents}</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{assessment.totalAttempts}</div>
                          <div className="text-xs text-muted-foreground">Attempts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{passRate.toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">Pass Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span>Passing: {assessment.passingScore}%</span>
                          <span>Max Attempts: {assessment.maxAttempts}</span>
                        </div>
                        <CertificateIndicator 
                          status={assessmentStudents.filter(s => s.status === 'eligible').length > 0 ? 'eligible' : 
                                 assessmentStudents.filter(s => s.status === 'in_progress').length > 0 ? 'in_progress' : 'not_eligible'}
                          showLabel={true}
                        />
                      </div>
                    </div>
                  );
                })}
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
                Issue and manage course completion certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Certificate Summary */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {studentPerformance.filter(s => s.status === 'eligible').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Eligible</div>
                    <p className="text-xs text-green-600 mt-1">Ready for issuance</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-600">
                      {studentPerformance.filter(s => s.status === 'in_progress').length}
                    </div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                    <p className="text-xs text-amber-600 mt-1">Can retake</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {studentPerformance.filter(s => s.status === 'not_eligible').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Not Eligible</div>
                    <p className="text-xs text-red-600 mt-1">Failed</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {studentPerformance.filter(s => s.status === 'issued').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Issued</div>
                    <p className="text-xs text-blue-600 mt-1">Completed</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {studentPerformance.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
                    <p className="text-xs text-purple-600 mt-1">All Students</p>
                  </div>
                </div>

                {/* Certificate Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1"
                    onClick={() => handleSendCertificates()}
                    disabled={studentPerformance.filter(s => s.status === 'eligible').length === 0}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Issue All Eligible Certificates
                    <Badge variant="secondary" className="ml-2">
                      {studentPerformance.filter(s => s.status === 'eligible').length}
                    </Badge>
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Certificate List
                  </Button>
                  <Button variant="outline" onClick={() => window.open('/dashboard/instructor/certificates', '_blank')}>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    View All Certificates
                  </Button>
                </div>

                {/* Eligible Students */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Students Eligible for Certificates</h3>
                  {studentPerformance.filter(s => s.status === 'eligible').length > 0 ? (
                    <div className="space-y-3">
                      {studentPerformance
                        .filter(s => s.status === 'eligible')
                        .slice(0, 5)
                        .map((student) => (
                          <div key={`${student.studentId}-${student.assessmentId}`} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-semibold">{student.studentName}</h4>
                              <p className="text-sm text-muted-foreground">
                                {student.courseTitle} • {student.assessmentTitle} • Score: {student.score.toFixed(1)}%
                              </p>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => handleSendCertificates([student.studentId])}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Issue Certificate
                            </Button>
                          </div>
                        ))}
                      {studentPerformance.filter(s => s.status === 'eligible').length > 5 && (
                        <Button 
                          variant="ghost" 
                          className="w-full"
                          onClick={() => setSelectedTab('students')}
                        >
                          View All {studentPerformance.filter(s => s.status === 'eligible').length} Eligible Students
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No students are currently eligible for certificates.</p>
                      <p className="text-sm mt-2">Students need to pass assessments to become eligible.</p>
                    </div>
                  )}
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

// Helper functions for CSV export
function convertToCSV(data: any[]) {
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const cell = row[header];
      return typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell;
    }).join(','))
  ].join('\n');
  return csv;
}

function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}