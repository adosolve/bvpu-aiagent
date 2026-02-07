import React, { useState } from 'react';

interface ExamForm {
  id: string;
  season: string;
  academicYear: string;
  subjects: string;
  lastDate: string;
  status: 'Open' | 'Closed';
}

interface ExamApplication {
  id: string;
  season: string;
  applicationId: string;
  appliedOn: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
}

const ExamForms: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<ExamForm | null>(null);
  const [applications, setApplications] = useState<ExamApplication[]>([
    {
      id: '1',
      season: 'Even Semester End Examination',
      applicationId: 'APP-2024-001',
      appliedOn: '15 Oct 2024',
      status: 'Approved'
    },
    {
      id: '2',
      season: 'Odd Semester End Examination',
      applicationId: 'APP-2024-002',
      appliedOn: '20 Oct 2024',
      status: 'Under Review'
    }
  ]);

  const activeExamForms: ExamForm[] = [
    {
      id: '1',
      season: 'Odd Semester End Examination',
      academicYear: '2025-26',
      subjects: 'All Enrolled Subjects',
      lastDate: '15 Nov 2024',
      status: 'Open'
    },
    {
      id: '2',
      season: 'Even Semester End Examination',
      academicYear: '2024-25',
      subjects: 'All Enrolled Subjects',
      lastDate: '10 Oct 2024',
      status: 'Closed'
    },
    {
      id: '3',
      season: 'Supplementary Examination',
      academicYear: '2024-25',
      subjects: 'Failed Subjects Only',
      lastDate: '25 Nov 2024',
      status: 'Open'
    }
  ];

  const handleApply = (form: ExamForm) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleSubmitApplication = () => {
    if (selectedForm) {
      const newApplication: ExamApplication = {
        id: Date.now().toString(),
        season: selectedForm.season,
        applicationId: `APP-2024-${String(applications.length + 1).padStart(3, '0')}`,
        appliedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Submitted'
      };
      setApplications([...applications, newApplication]);
      setShowModal(false);
      setSelectedForm(null);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Open':
      case 'Approved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Closed':
        return 'bg-stone-50 text-stone-500 border-stone-200';
      case 'Submitted':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">Exam Forms</h1>
        <p className="text-stone-500 text-sm font-medium">View and apply for examination forms for current and past semesters</p>
      </header>

      {/* Active Exam Forms */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Active Exam Forms</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Applicable Subjects</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Last Date</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {activeExamForms.map((form) => (
                <tr key={form.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800">{form.season}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{form.academicYear}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{form.subjects}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{form.lastDate}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(form.status)}`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleApply(form)}
                      disabled={form.status === 'Closed'}
                      className={`text-[10px] font-semibold px-4 py-2 rounded-lg uppercase tracking-widest border transition-all ${
                        form.status === 'Open' 
                          ? 'text-[#5D4037] bg-[#5D4037]/5 border-[#5D4037]/10 hover:bg-[#5D4037] hover:text-white' 
                          : 'text-stone-300 bg-stone-50 border-stone-100 cursor-not-allowed'
                      }`}
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* My Applications */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">My Exam Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Application ID</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Applied On</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Current Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800">{app.season}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-mono">{app.applicationId}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600">{app.appliedOn}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[10px] font-semibold text-stone-400 hover:text-[#5D4037] uppercase tracking-widest transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">No applications found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {showModal && selectedForm && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-semibold text-stone-900">Exam Application</h3>
              <p className="text-stone-500 text-sm mt-1">Review details before submitting</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</label>
                <p className="text-sm font-semibold text-stone-800 mt-1">{selectedForm.season}</p>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</label>
                <p className="text-sm text-stone-600 mt-1">{selectedForm.academicYear}</p>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Subjects</label>
                <p className="text-sm text-stone-600 mt-1">{selectedForm.subjects}</p>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Last Date</label>
                <p className="text-sm text-stone-600 mt-1">{selectedForm.lastDate}</p>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-xl font-semibold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitApplication}
                className="flex-1 py-3 px-4 bg-[#5D4037] text-white rounded-xl font-semibold text-sm hover:bg-[#4E342E] transition-all"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForms;