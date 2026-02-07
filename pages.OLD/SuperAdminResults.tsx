import React from 'react';

interface ResultBatch {
  id: string;
  exam: string;
  semester: string;
  academicYear: string;
  status: 'Published' | 'Unpublished' | 'Draft';
  publishedBy?: string;
  publishedDate?: string;
  uploadedBy: string;
  uploadedDate: string;
  totalStudents: number;
  passPercentage: string;
}

const SuperAdminResults: React.FC = () => {
  const resultBatches: ResultBatch[] = [
    {
      id: '1',
      exam: 'Even Semester End Examination',
      semester: 'Semester 6',
      academicYear: '2024-25',
      status: 'Published',
      publishedBy: 'Dr. Sharma',
      publishedDate: '15 Oct 2024',
      uploadedBy: 'Admin Clerk - Priya',
      uploadedDate: '10 Oct 2024',
      totalStudents: 245,
      passPercentage: '87.3%'
    },
    {
      id: '2',
      exam: 'Odd Semester End Examination',
      semester: 'Semester 5',
      academicYear: '2024-25',
      status: 'Unpublished',
      uploadedBy: 'Admin Clerk - Rahul',
      uploadedDate: '20 Oct 2024',
      totalStudents: 198,
      passPercentage: '82.1%'
    },
    {
      id: '3',
      exam: 'Supplementary Examination',
      semester: 'Semester 4',
      academicYear: '2024-25',
      status: 'Draft',
      uploadedBy: 'Admin Clerk - Amit',
      uploadedDate: '18 Oct 2024',
      totalStudents: 67,
      passPercentage: '74.6%'
    },
    {
      id: '4',
      exam: 'Even Semester End Examination',
      semester: 'Semester 4',
      academicYear: '2023-24',
      status: 'Published',
      publishedBy: 'Prof. Patel',
      publishedDate: '20 May 2024',
      uploadedBy: 'Admin Clerk - Sneha',
      uploadedDate: '15 May 2024',
      totalStudents: 312,
      passPercentage: '89.4%'
    },
    {
      id: '5',
      exam: 'Mid Semester Examination',
      semester: 'Semester 7',
      academicYear: '2024-25',
      status: 'Published',
      publishedBy: 'Dr. Kumar',
      publishedDate: '25 Oct 2024',
      uploadedBy: 'Admin Clerk - Priya',
      uploadedDate: '22 Oct 2024',
      totalStudents: 156,
      passPercentage: '91.2%'
    }
  ];

  const totalBatches = resultBatches.length;
  const publishedResults = resultBatches.filter(batch => batch.status === 'Published').length;
  const unpublishedResults = resultBatches.filter(batch => batch.status === 'Unpublished').length;
  const draftResults = resultBatches.filter(batch => batch.status === 'Draft').length;
  const totalStudents = resultBatches.reduce((sum, batch) => sum + batch.totalStudents, 0);

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

  // Calculate average pass percentage
  const averagePassPercentage = (
    resultBatches.reduce((sum, batch) => sum + parseFloat(batch.passPercentage), 0) / resultBatches.length
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Results Overview</h1>
        <p className="text-stone-500 text-sm">System-wide examination results monitoring and analytics</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-100">
          <div className="text-3xl font-semibold text-stone-800 mb-2">{totalBatches}</div>
          <div className="text-sm font-medium text-stone-500">Total Result Batches</div>
          <div className="text-xs text-stone-400 mt-1">All Examinations</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-200">
          <div className="text-3xl font-semibold text-green-700 mb-2">{publishedResults}</div>
          <div className="text-sm font-medium text-stone-500">Published Results</div>
          <div className="text-xs text-stone-400 mt-1">Available to Students</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-300">
          <div className="text-3xl font-semibold text-amber-600 mb-2">{unpublishedResults + draftResults}</div>
          <div className="text-sm font-medium text-stone-500">Unpublished Results</div>
          <div className="text-xs text-stone-400 mt-1">Pending Release</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-400">
          <div className="text-3xl font-semibold text-[#5D4037] mb-2">{totalStudents.toLocaleString()}</div>
          <div className="text-sm font-medium text-stone-500">Total Students</div>
          <div className="text-xs text-stone-400 mt-1">Results Processed</div>
        </div>
      </div>

      {/* Result Batches Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-500">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Result Batches</h3>
          <p className="text-stone-500 text-sm mt-1">Complete results processing and publication status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Students</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Pass %</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Published By</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Published Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {resultBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800">{batch.exam}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{batch.semester}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{batch.academicYear}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-stone-800">{batch.totalStudents}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-green-700">{batch.passPercentage}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{batch.publishedBy || '-'}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{batch.publishedDate || '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Processing Timeline */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-300">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Recent Processing Activity</h3>
          <p className="text-stone-500 text-sm mt-1">Latest result uploads and publications</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {resultBatches
              .filter(batch => batch.status === 'Published')
              .sort((a, b) => new Date(b.publishedDate!).getTime() - new Date(a.publishedDate!).getTime())
              .slice(0, 4)
              .map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-stone-800">{batch.exam}</div>
                    <div className="text-xs text-stone-500 mt-1">
                      {batch.semester} • {batch.academicYear} • {batch.totalStudents} students • {batch.passPercentage} pass rate
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-700">Published</div>
                    <div className="text-xs text-stone-400 mt-1">{batch.publishedDate} by {batch.publishedBy}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Average Pass Rate</h4>
          <div className="text-2xl font-semibold text-green-700 mb-1">{averagePassPercentage}%</div>
          <div className="text-xs text-stone-500">Across all examinations</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Publication Rate</h4>
          <div className="text-2xl font-semibold text-[#5D4037] mb-1">{Math.round((publishedResults / totalBatches) * 100)}%</div>
          <div className="text-xs text-stone-500">Results published</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Processing Time</h4>
          <div className="text-2xl font-semibold text-stone-800 mb-1">3.2 days</div>
          <div className="text-xs text-stone-500">Average upload to publish</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Peak Season</h4>
          <div className="text-2xl font-semibold text-stone-800 mb-1">Even Sem</div>
          <div className="text-xs text-stone-500">Highest result volume</div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminResults;