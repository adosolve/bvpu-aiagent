import React, { useState } from 'react';

interface ExamSession {
  id: string;
  examSeason: string;
  semester: string;
  academicYear: string;
  publicationStatus: 'Published' | 'Unpublished' | 'Draft';
  publishedOn?: string;
  totalStudents: number;
}

const AdminGradeCards: React.FC = () => {
  const [examSessions, setExamSessions] = useState<ExamSession[]>([
    {
      id: '1',
      examSeason: 'Even Semester End Examination',
      semester: 'Semester 6',
      academicYear: '2024-25',
      publicationStatus: 'Published',
      publishedOn: '15 Oct 2024',
      totalStudents: 245
    },
    {
      id: '2',
      examSeason: 'Odd Semester End Examination',
      semester: 'Semester 5',
      academicYear: '2024-25',
      publicationStatus: 'Unpublished',
      totalStudents: 198
    },
    {
      id: '3',
      examSeason: 'Supplementary Examination',
      semester: 'Semester 4',
      academicYear: '2024-25',
      publicationStatus: 'Draft',
      totalStudents: 67
    },
    {
      id: '4',
      examSeason: 'Even Semester End Examination',
      semester: 'Semester 4',
      academicYear: '2023-24',
      publicationStatus: 'Published',
      publishedOn: '20 May 2024',
      totalStudents: 312
    }
  ]);

  const [selectedSession, setSelectedSession] = useState<ExamSession | null>(null);
  const [showStudentList, setShowStudentList] = useState(false);

  const handleStatusUpdate = (sessionId: string, newStatus: ExamSession['publicationStatus']) => {
    setExamSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { 
              ...session, 
              publicationStatus: newStatus,
              publishedOn: newStatus === 'Published' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined
            }
          : session
      )
    );
  };

  const handleViewStudentList = (session: ExamSession) => {
    setSelectedSession(session);
    setShowStudentList(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Unpublished':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Draft':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getStatusCount = (status: ExamSession['publicationStatus']) => {
    return examSessions.filter(session => session.publicationStatus === status).length;
  };

  // Mock student data for the selected session
  const mockStudents = [
    { prn: 'PRN2024001', name: 'Rahul Sharma', grade: 'A+', percentage: '92.5%' },
    { prn: 'PRN2024002', name: 'Priya Patel', grade: 'A', percentage: '88.2%' },
    { prn: 'PRN2024003', name: 'Amit Kumar', grade: 'B+', percentage: '76.8%' },
    { prn: 'PRN2024004', name: 'Sneha Gupta', grade: 'A-', percentage: '82.1%' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Grade Cards Management</h1>
        <p className="text-stone-500 text-sm">Manage grade card publication for examination sessions</p>
      </header>

      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-4">
        {(['Published', 'Unpublished', 'Draft'] as const).map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="text-2xl font-semibold text-stone-800">{getStatusCount(status)}</div>
            <div className="text-xs text-stone-500 font-medium">{status}</div>
          </div>
        ))}
      </div>

      {/* Exam Sessions Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Examination Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Students</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Publication Status</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Published On</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {examSessions.map((session) => (
                <tr key={session.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-stone-800">{session.examSeason}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{session.semester}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{session.academicYear}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-stone-800">{session.totalStudents}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(session.publicationStatus)}`}>
                      {session.publicationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{session.publishedOn || '-'}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleViewStudentList(session)}
                        className="text-[10px] font-semibold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors"
                      >
                        View List
                      </button>
                      {session.publicationStatus === 'Unpublished' && (
                        <button 
                          onClick={() => handleStatusUpdate(session.id, 'Published')}
                          className="text-[10px] font-semibold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                        >
                          Publish
                        </button>
                      )}
                      {session.publicationStatus === 'Published' && (
                        <button 
                          onClick={() => handleStatusUpdate(session.id, 'Unpublished')}
                          className="text-[10px] font-semibold text-amber-600 hover:text-amber-700 uppercase tracking-widest transition-colors"
                        >
                          Unpublish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Student List Modal */}
      {showStudentList && selectedSession && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-semibold text-stone-900">Student List</h3>
              <p className="text-stone-500 text-sm mt-1">
                {selectedSession.examSeason} - {selectedSession.semester} ({selectedSession.academicYear})
              </p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50/50">
                      <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">PRN</th>
                      <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student Name</th>
                      <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Grade</th>
                      <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Percentage</th>
                      <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {mockStudents.map((student, index) => (
                      <tr key={index} className="hover:bg-stone-50/30 transition-colors">
                        <td className="px-4 py-4">
                          <span className="text-sm font-mono text-stone-800">{student.prn}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-stone-800">{student.name}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-stone-800">{student.grade}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-stone-600">{student.percentage}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="text-[10px] font-semibold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex justify-end">
              <button 
                onClick={() => setShowStudentList(false)}
                className="py-3 px-6 border border-stone-200 text-stone-600 rounded-lg font-semibold text-sm hover:bg-stone-50 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGradeCards;