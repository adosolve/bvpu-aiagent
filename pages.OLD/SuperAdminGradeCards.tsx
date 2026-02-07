import React from 'react';

interface GradeCardSession {
  id: string;
  examSeason: string;
  semester: string;
  academicYear: string;
  publicationStatus: 'Published' | 'Pending' | 'Draft';
  publishedOn?: string;
  totalStudents: number;
  publishedBy?: string;
}

const SuperAdminGradeCards: React.FC = () => {
  const gradeCardSessions: GradeCardSession[] = [
    {
      id: '1',
      examSeason: 'Even Semester End Examination',
      semester: 'Semester 6',
      academicYear: '2024-25',
      publicationStatus: 'Published',
      publishedOn: '15 Oct 2024',
      totalStudents: 245,
      publishedBy: 'Dr. Sharma'
    },
    {
      id: '2',
      examSeason: 'Odd Semester End Examination',
      semester: 'Semester 5',
      academicYear: '2024-25',
      publicationStatus: 'Pending',
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
      totalStudents: 312,
      publishedBy: 'Prof. Patel'
    },
    {
      id: '5',
      examSeason: 'Odd Semester End Examination',
      semester: 'Semester 3',
      academicYear: '2023-24',
      publicationStatus: 'Published',
      publishedOn: '15 Dec 2023',
      totalStudents: 289,
      publishedBy: 'Dr. Kumar'
    }
  ];

  const publishedCount = gradeCardSessions.filter(session => session.publicationStatus === 'Published').length;
  const pendingCount = gradeCardSessions.filter(session => session.publicationStatus === 'Pending').length;
  const draftCount = gradeCardSessions.filter(session => session.publicationStatus === 'Draft').length;
  const totalStudents = gradeCardSessions.reduce((sum, session) => sum + session.totalStudents, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Draft':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  // Recent publication timeline
  const recentPublications = gradeCardSessions
    .filter(session => session.publicationStatus === 'Published' && session.publishedOn)
    .sort((a, b) => new Date(b.publishedOn!).getTime() - new Date(a.publishedOn!).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Grade Cards Analytics</h1>
        <p className="text-stone-500 text-sm">Publication status and timeline monitoring</p>
      </header>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-100">
          <div className="text-3xl font-semibold text-green-700 mb-2">{publishedCount}</div>
          <div className="text-sm font-medium text-stone-500">Published</div>
          <div className="text-xs text-stone-400 mt-1">Grade Cards Released</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-200">
          <div className="text-3xl font-semibold text-amber-600 mb-2">{pendingCount}</div>
          <div className="text-sm font-medium text-stone-500">Pending</div>
          <div className="text-xs text-stone-400 mt-1">Awaiting Publication</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-300">
          <div className="text-3xl font-semibold text-stone-600 mb-2">{draftCount}</div>
          <div className="text-sm font-medium text-stone-500">Draft</div>
          <div className="text-xs text-stone-400 mt-1">In Preparation</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-400">
          <div className="text-3xl font-semibold text-[#5D4037] mb-2">{totalStudents.toLocaleString()}</div>
          <div className="text-sm font-medium text-stone-500">Total Students</div>
          <div className="text-xs text-stone-400 mt-1">Across All Sessions</div>
        </div>
      </div>

      {/* Publication Timeline */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-300">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Recent Publications</h3>
          <p className="text-stone-500 text-sm mt-1">Latest grade card releases</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentPublications.map((session, index) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-stone-800">{session.examSeason}</div>
                  <div className="text-xs text-stone-500 mt-1">
                    {session.semester} • {session.academicYear} • {session.totalStudents} students
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-stone-600">{session.publishedOn}</div>
                  <div className="text-xs text-stone-400 mt-1">by {session.publishedBy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Card Sessions Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-500">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">All Grade Card Sessions</h3>
          <p className="text-stone-500 text-sm mt-1">Complete publication status overview</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Students</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Published On</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Published By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {gradeCardSessions.map((session) => (
                <tr key={session.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800">{session.examSeason}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{session.semester}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{session.academicYear}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-stone-800">{session.totalStudents}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(session.publicationStatus)}`}>
                      {session.publicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{session.publishedOn || '-'}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{session.publishedBy || '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Publication Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Publication Rate</h4>
          <div className="text-2xl font-semibold text-green-700 mb-1">83.3%</div>
          <div className="text-xs text-stone-500">Sessions published on time</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Average Timeline</h4>
          <div className="text-2xl font-semibold text-[#5D4037] mb-1">5.2 days</div>
          <div className="text-xs text-stone-500">From results to publication</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Peak Month</h4>
          <div className="text-2xl font-semibold text-stone-800 mb-1">October</div>
          <div className="text-xs text-stone-500">Highest publication activity</div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminGradeCards;