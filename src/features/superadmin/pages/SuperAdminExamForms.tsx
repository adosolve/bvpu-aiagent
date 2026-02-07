import React from 'react';

interface ExamFormSummary {
  id: string;
  examSeason: string;
  academicYear: string;
  totalApplications: number;
  approved: number;
  rejected: number;
  pending: number;
  status: 'Active' | 'Closed' | 'Upcoming';
}

const SuperAdminExamForms: React.FC = () => {
  const examFormSummaries: ExamFormSummary[] = [
    {
      id: '1',
      examSeason: 'Even Semester End Examination',
      academicYear: '2024-25',
      totalApplications: 1247,
      approved: 1089,
      rejected: 43,
      pending: 115,
      status: 'Active'
    },
    {
      id: '2',
      examSeason: 'Odd Semester End Examination',
      academicYear: '2024-25',
      totalApplications: 1156,
      approved: 1098,
      rejected: 58,
      pending: 0,
      status: 'Closed'
    },
    {
      id: '3',
      examSeason: 'Supplementary Examination',
      academicYear: '2024-25',
      totalApplications: 234,
      approved: 198,
      rejected: 12,
      pending: 24,
      status: 'Active'
    },
    {
      id: '4',
      examSeason: 'Even Semester End Examination',
      academicYear: '2023-24',
      totalApplications: 1389,
      approved: 1298,
      rejected: 91,
      pending: 0,
      status: 'Closed'
    }
  ];

  const totalForms = examFormSummaries.length;
  const activeForms = examFormSummaries.filter(form => form.status === 'Active').length;
  const closedForms = examFormSummaries.filter(form => form.status === 'Closed').length;
  const totalApplications = examFormSummaries.reduce((sum, form) => sum + form.totalApplications, 0);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Closed':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      case 'Upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Exam Forms Overview</h1>
        <p className="text-stone-500 text-sm">System-wide examination form analytics and monitoring</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-100">
          <div className="text-3xl font-semibold text-stone-800 mb-2">{totalForms}</div>
          <div className="text-sm font-medium text-stone-500">Total Exam Forms</div>
          <div className="text-xs text-stone-400 mt-1">Created This Year</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-200">
          <div className="text-3xl font-semibold text-green-700 mb-2">{activeForms}</div>
          <div className="text-sm font-medium text-stone-500">Active Forms</div>
          <div className="text-xs text-stone-400 mt-1">Currently Accepting</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-300">
          <div className="text-3xl font-semibold text-stone-600 mb-2">{closedForms}</div>
          <div className="text-sm font-medium text-stone-500">Closed Forms</div>
          <div className="text-xs text-stone-400 mt-1">Completed Cycles</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6 animate-in fade-in duration-300 delay-400">
          <div className="text-3xl font-semibold text-[#5D4037] mb-2">{totalApplications.toLocaleString()}</div>
          <div className="text-sm font-medium text-stone-500">Total Applications</div>
          <div className="text-xs text-stone-400 mt-1">All Time</div>
        </div>
      </div>

      {/* Exam Forms Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500 delay-500">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Examination Forms Summary</h3>
          <p className="text-stone-500 text-sm mt-1">Application statistics by examination cycle</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Total Applications</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Approved</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Rejected</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-center">Pending</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {examFormSummaries.map((form) => (
                <tr key={form.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800">{form.examSeason}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{form.academicYear}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-stone-800">{form.totalApplications.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-green-700">{form.approved.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-red-600">{form.rejected}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-amber-600">{form.pending}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(form.status)}`}>
                      {form.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Approval Rate</h4>
          <div className="text-2xl font-semibold text-green-700 mb-1">94.2%</div>
          <div className="text-xs text-stone-500">Average across all forms</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Processing Time</h4>
          <div className="text-2xl font-semibold text-[#5D4037] mb-1">2.3 days</div>
          <div className="text-xs text-stone-500">Average approval time</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-stone-800 mb-3">Peak Season</h4>
          <div className="text-2xl font-semibold text-stone-800 mb-1">Even Sem</div>
          <div className="text-xs text-stone-500">Highest application volume</div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminExamForms;