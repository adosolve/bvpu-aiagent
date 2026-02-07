import React, { useState } from 'react';

interface ExamApplication {
  id: string;
  applicationId: string;
  studentName: string;
  prn: string;
  examSeason: string;
  semester: string;
  submittedOn: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'On Hold';
}

const AdminExamForms: React.FC = () => {
  const [applications, setApplications] = useState<ExamApplication[]>([
    {
      id: '1',
      applicationId: 'APP-2024-001',
      studentName: 'Rahul Sharma',
      prn: 'PRN2024001',
      examSeason: 'Even Semester End Examination',
      semester: 'Semester 6',
      submittedOn: '15 Oct 2024',
      status: 'Submitted'
    },
    {
      id: '2',
      applicationId: 'APP-2024-002',
      studentName: 'Priya Patel',
      prn: 'PRN2024002',
      examSeason: 'Odd Semester End Examination',
      semester: 'Semester 5',
      submittedOn: '20 Oct 2024',
      status: 'Under Review'
    },
    {
      id: '3',
      applicationId: 'APP-2024-003',
      studentName: 'Amit Kumar',
      prn: 'PRN2024003',
      examSeason: 'Supplementary Examination',
      semester: 'Semester 4',
      submittedOn: '18 Oct 2024',
      status: 'Approved'
    },
    {
      id: '4',
      applicationId: 'APP-2024-004',
      studentName: 'Sneha Gupta',
      prn: 'PRN2024004',
      examSeason: 'Even Semester End Examination',
      semester: 'Semester 6',
      submittedOn: '22 Oct 2024',
      status: 'On Hold'
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState<ExamApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusUpdate = (applicationId: string, newStatus: ExamApplication['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  const handleViewApplication = (application: ExamApplication) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Submitted':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'On Hold':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getStatusCount = (status: ExamApplication['status']) => {
    return applications.filter(app => app.status === status).length;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Exam Forms Management</h1>
        <p className="text-stone-500 text-sm">Review and manage student examination applications</p>
      </header>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(['Submitted', 'Under Review', 'Approved', 'Rejected', 'On Hold'] as const).map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="text-2xl font-semibold text-stone-800">{getStatusCount(status)}</div>
            <div className="text-xs text-stone-500 font-medium">{status}</div>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Exam Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Application ID</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student Name / PRN</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Submitted On</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-stone-800">{app.applicationId}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-semibold text-stone-800">{app.studentName}</div>
                      <div className="text-xs text-stone-500 font-mono">{app.prn}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{app.examSeason}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{app.semester}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{app.submittedOn}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleViewApplication(app)}
                        className="text-[10px] font-semibold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors"
                      >
                        View
                      </button>
                      {app.status === 'Submitted' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'Approved')}
                            className="text-[10px] font-semibold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                            className="text-[10px] font-semibold text-red-600 hover:text-red-700 uppercase tracking-widest transition-colors"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'On Hold')}
                            className="text-[10px] font-semibold text-purple-600 hover:text-purple-700 uppercase tracking-widest transition-colors"
                          >
                            Hold
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-semibold text-stone-900">Application Details</h3>
              <p className="text-stone-500 text-sm mt-1">{selectedApplication.applicationId}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student Name</label>
                  <p className="text-sm font-semibold text-stone-800 mt-1">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">PRN</label>
                  <p className="text-sm font-mono text-stone-600 mt-1">{selectedApplication.prn}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam Season</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedApplication.examSeason}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedApplication.semester}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Submitted On</label>
                  <p className="text-sm text-stone-600 mt-1">{selectedApplication.submittedOn}</p>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Current Status</label>
                  <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border mt-1 ${getStatusStyle(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Subjects Applied For</label>
                <div className="mt-2 space-y-2">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="text-sm font-medium text-stone-800">All Enrolled Subjects</div>
                    <div className="text-xs text-stone-500 mt-1">Mathematics, Physics, Chemistry, Computer Science</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-lg font-semibold text-sm hover:bg-stone-50 transition-all"
              >
                Close
              </button>
              {selectedApplication.status === 'Submitted' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      handleStatusUpdate(selectedApplication.id, 'Approved');
                      setShowModal(false);
                    }}
                    className="py-3 px-4 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-all"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => {
                      handleStatusUpdate(selectedApplication.id, 'Rejected');
                      setShowModal(false);
                    }}
                    className="py-3 px-4 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExamForms;