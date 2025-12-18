
//  /app/dashboard/admin/analytics/page.tsx:

// /app/dashboard/instructor/students/page.tsx

import { getSession } from '@/lib/auth/session'
import Sidebar from '@/components/dashboard/sidebar'
import { sql } from '@/lib/db'
import { requireRole } from '@/lib/auth/utils'
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
  Eye
} from 'lucide-react'

export default async function InstructorStudents() {
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

  // Verify instructor role
  await requireRole(['instructor', 'admin'])

  // Get instructor's students with quiz performance data
  const students = await sql`
    SELECT 
      u.id,
      u.name,
      u.email,
      u.image,
      COUNT(DISTINCT e.course_id) as course_count,
      COUNT(DISTINCT aa.id) as quiz_attempts,
      MAX(aa.submitted_at) as last_quiz_attempt,
      AVG(aa.percentage) as average_score,
      COUNT(CASE WHEN aa.percentage >= 70 THEN 1 END) as passed_quizzes,
      COUNT(DISTINCT CASE WHEN aa.percentage >= 70 THEN a.course_id END) as eligible_certificates
    FROM users u
    JOIN enrollments e ON u.id = e.user_id
    JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
    LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND aa.submitted_at IS NOT NULL
    LEFT JOIN assessments a ON aa.assessment_id = a.id
    WHERE e.status = 'active'
    GROUP BY u.id, u.name, u.email, u.image
    ORDER BY u.name
  `

  // Get overall statistics
  const stats = await sql`
    SELECT 
      COUNT(DISTINCT u.id) as total_students,
      COUNT(DISTINCT e.course_id) as total_courses,
      AVG(aa.percentage) as overall_average_score,
      COUNT(DISTINCT aa.id) as total_quiz_attempts,
      COUNT(CASE WHEN aa.percentage >= 70 THEN 1 END) as total_passed_quizzes,
      COUNT(DISTINCT CASE WHEN aa.percentage >= 70 THEN u.id END) as students_eligible_certificates
    FROM users u
    JOIN enrollments e ON u.id = e.user_id
    JOIN courses c ON e.course_id = c.id AND c.instructor_id = ${session.userId}
    LEFT JOIN assessment_attempts aa ON u.id = aa.user_id AND aa.submitted_at IS NOT NULL
    WHERE e.status = 'active'
  `

  const user = {
    id: session.userId,
    name: session.name || 'Instructor User',
    email: session.email || 'instructor@example.com',
    primaryRole: session.primaryRole || 'instructor',
    image: session.image
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Students</h1>
            <p className="text-gray-600 mb-8">View and manage students enrolled in your courses with quiz analytics</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold">{stats[0]?.total_students || 0}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Quiz Score</p>
                    <p className="text-2xl font-bold">
                      {stats[0]?.overall_average_score 
                        ? Math.round(stats[0].overall_average_score) + '%'
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Passed Quizzes</p>
                    <p className="text-2xl font-bold">{stats[0]?.total_passed_quizzes || 0}</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quiz Attempts</p>
                    <p className="text-2xl font-bold">{stats[0]?.total_quiz_attempts || 0}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Students List</CardTitle>
              <p className="text-sm text-gray-600">
                Click on a student to view detailed quiz performance
              </p>
            </CardHeader>
            <CardContent>
              {students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Student</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Courses</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Avg. Score</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quiz Attempts</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Passed</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Certificates</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student: any) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                {student.image ? (
                                  <img 
                                    src={student.image} 
                                    alt={student.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                ) : (
                                  <span className="text-sm font-medium">
                                    {student.name?.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {student.course_count}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${
                                student.average_score >= 70 ? 'text-green-600' :
                                student.average_score >= 50 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {student.average_score ? Math.round(student.average_score) + '%' : 'N/A'}
                              </span>
                              {student.average_score && (
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      student.average_score >= 70 ? 'bg-green-500' :
                                      student.average_score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${Math.min(100, student.average_score)}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{student.quiz_attempts || 0}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.passed_quizzes > 0 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {student.passed_quizzes || 0}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.eligible_certificates > 0 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {student.eligible_certificates || 0} eligible
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                asChild
                              >
                                <a href={`/dashboard/instructor/students/${student.id}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </a>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
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
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any students enrolled in your courses yet.
                  </p>
                  <Button asChild>
                    <a href="/dashboard/instructor/courses">
                      View Your Courses
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Certificate Management Section */}
          {stats[0]?.students_eligible_certificates > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-900">Certificate Management</CardTitle>
                <p className="text-sm text-amber-700">
                  {stats[0].students_eligible_certificates} students are eligible for certificates
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div>
                    <p className="text-amber-800">
                      Review and issue certificates to students who have passed your course quizzes.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-amber-300 text-amber-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export List
                    </Button>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Award className="h-4 w-4 mr-2" />
                      Manage Certificates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filter (Client-side component would go here) */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students by name or email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Courses</option>
                    <option>With Quiz Attempts</option>
                    <option>Eligible for Certificates</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}