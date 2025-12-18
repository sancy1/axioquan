
// /src/components/assessments/student-attempts-table.tsx

'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  Download,
  Mail,
  User
} from 'lucide-react';
import { CertificateIndicator } from './certificate-indicator';
import { toast } from 'sonner';

interface StudentAttempt {
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
}

interface StudentAttemptsTableProps {
  data: StudentAttempt[];
  assessmentId: string;
  courseId: string;
}

type SortField = 'studentName' | 'score' | 'attempts' | 'lastAttemptDate' | 'status';
type SortDirection = 'asc' | 'desc';

export function StudentAttemptsTable({ data, assessmentId, courseId }: StudentAttemptsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());

  // Filter and sort data
  const filteredData = data
    .filter(student => {
      const matchesSearch = 
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        student.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'lastAttemptDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
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
    if (selectedStudents.size === filteredData.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredData.map(s => s.studentId)));
    }
  };

  const handleViewStudent = (studentId: string) => {
    toast.info(`Viewing details for student ${studentId}`);
    // Navigate to student details page
  };

  const handleSendMessage = () => {
    const selectedEmails = data
      .filter(s => selectedStudents.has(s.studentId))
      .map(s => s.email);
    
    toast.info(`Preparing to message ${selectedEmails.length} students`);
    // Open email composer
  };

  const handleExportData = () => {
    const exportData = filteredData.map(student => ({
      Name: student.studentName,
      Email: student.email,
      Score: `${student.score}%`,
      Grade: student.grade,
      Attempts: `${student.attempts}/${student.maxAttempts}`,
      'Time Spent': formatTime(student.timeSpent),
      'Last Attempt': new Date(student.lastAttemptDate).toLocaleDateString(),
      'Certificate Status': student.status,
      'Certificate Eligible': student.certificateEligible ? 'Yes' : 'No',
    }));

    // Convert to CSV
    const csv = convertToCSV(exportData);
    downloadCSV(csv, `student-performance-${assessmentId}.csv`);
    toast.success('Data exported successfully');
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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
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
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {selectedStudents.size > 0 && (
            <Button variant="default" onClick={handleSendMessage}>
              <Mail className="h-4 w-4 mr-2" />
              Message ({selectedStudents.size})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedStudents.size === filteredData.length && filteredData.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4"
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('studentName')}>
                <div className="flex items-center gap-1">
                  Student
                  <SortIcon field="studentName" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('score')}>
                <div className="flex items-center gap-1">
                  Score
                  <SortIcon field="score" />
                </div>
              </TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('attempts')}>
                <div className="flex items-center gap-1">
                  Attempts
                  <SortIcon field="attempts" />
                </div>
              </TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('lastAttemptDate')}>
                <div className="flex items-center gap-1">
                  Last Attempt
                  <SortIcon field="lastAttemptDate" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">
                  Certificate
                  <SortIcon field="status" />
                </div>
              </TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((student) => (
              <TableRow key={student.studentId} className="hover:bg-gray-50">
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedStudents.has(student.studentId)}
                    onChange={() => handleSelectStudent(student.studentId)}
                    className="h-4 w-4"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{student.studentName}</div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-lg">{student.score.toFixed(1)}%</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        student.score >= 90 ? 'bg-green-500' :
                        student.score >= 80 ? 'bg-blue-500' :
                        student.score >= 70 ? 'bg-amber-500' :
                        student.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${student.score}%` }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getGradeColor(student.grade)}>
                    {student.grade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{student.attempts}</span>
                    <span className="text-muted-foreground">/</span>
                    <span>{student.maxAttempts}</span>
                    {student.attempts === student.maxAttempts && (
                      <Badge variant="outline" className="text-xs">Max</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {formatTime(student.timeSpent)}
                </TableCell>
                <TableCell>
                  {new Date(student.lastAttemptDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <CertificateIndicator
                    status={student.status}
                    score={student.score}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewStudent(student.studentId)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div>
          Showing {filteredData.length} of {data.length} students
          {searchTerm && ` • Search: "${searchTerm}"`}
          {statusFilter !== 'all' && ` • Status: ${statusFilter.replace('_', ' ')}`}
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 bg-green-500 rounded" />
              <span>90-100%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 bg-blue-500 rounded" />
              <span>80-89%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 bg-amber-500 rounded" />
              <span>70-79%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 bg-orange-500 rounded" />
              <span>60-69%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-4 bg-red-500 rounded" />
              <span>0-59%</span>
            </div>
          </div>
        </div>
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