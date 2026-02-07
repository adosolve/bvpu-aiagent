import React, { useState } from 'react';

interface ResultBatch {
  id: string;
  exam: string;
  semester: string;
  academicYear: string;
  status: 'Draft' | 'Published';
  uploadedOn?: string;
  publishedOn?: string;
  totalStudents: number;
  passPercentage: string;
}

const AdminResults: React.FC = () => {
  const [resultBatches, setResultBatches] = useState<ResultBatch[]>([
    {
      id: '1',
      exam: 'Even Semester End Examination',
      semester: 'Semester 6',
      academicYear: '2024-25',
      status: 'Published',
      uploadedOn: '10 Oct 2024',
      publishedOn: '15 Oct 2024',
      totalStudents: 245,
      passPercentage: '87.3%'
    },
    {
      id: '2',
      exam: 'Odd Semester End Examination',
      semester: 'Semester 5',
      academicYear: '2024-25',
      status: 'Draft',
      uploadedOn: '20 Oct 2024',
      totalStudents: 198,
      passPercentage: '82.1%'
    },
    {
      id: '3',
      exam: 'Supplementary Examination',
      semester: 'Semester 4',
      academicYear: '2024-25',
      status: 'Draft',
      uploadedOn: '18 Oct 2024',
      totalStudents: 67,
      passPercentage: '74.6%'
    },
    {
      id: '4',
      exam: 'Even Semester End Examination',
      semester: 'Semester 4',
      academicYear: '2023-24',
      status: 'Published',
      uploadedOn: '15 May 2024',
      publishedOn: '20 May 2024',
      totalStudents: 312,
      passPercentage: '89.4%'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<ResultBatch | null>(null);

  const handleStatusUpdate = (batchId: string, newStatus: ResultBatch['status']) => {
    setResultBatches(prev => 
      prev.map(batch => 
        batch.id === batchId 
          ? { 
              ...batch, 
              status: newStatus,
              publishedOn: newStatus === 'Published' ? new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : undefined
            }
          : batch
      )
    );
  };

  const handleUploadResults = () => {
    // Simulate adding a new result batch
    const newBatch: ResultBatch = {
      id: Date.now().toString(),
      exam: 'Mid Semester Examination',
      semester: 'Semester 7',
      academicYear: '2024-25',
      status: 'Draft',
      uploadedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      totalStudents: 156,
      passPercentage: '91.2%'
    };
    setResultBatches(prev => [newBatch, ...prev]);
    setShowUploadModal(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Draft':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  const getStatusCount = (status: ResultBatch['status']) => {
    return resultBatches.filter(batch => batch.status === status).length;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 leading-tight mb-2">Results Management</h1>
          <p className="text-stone-500 text-sm">Upload and publish examination results</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="py-3 px-6 bg-[#5D4037] text-white rounded-lg font-semibold text-sm hover:bg-[#4E342E] transition-all"
        >
          Upload Results
        </button>
      </header>

      {/* Status Overview */}
      <div className="grid grid-cols-2 gap-4">
        {(['Draft', 'Published'] as const).map((status) => (
          <div key={status} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className="text-2xl font-semibold text-stone-800">{getStatusCount(status)}</div>
            <div className="text-xs text-stone-500 font-medium">{status}</div>
          </div>
        ))}
      </div>

      {/* Result Batches Table */}
      <section className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Result Batches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Exam</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Semester</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Students</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Pass %</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Uploaded On</th>
                <th className="px-4 py-3 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {resultBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-stone-800">{batch.exam}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{batch.semester}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{batch.academicYear}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-stone-800">{batch.totalStudents}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-green-700">{batch.passPercentage}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-stone-600">{batch.uploadedOn}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-[10px] font-semibold text-stone-500 hover:text-[#5D4037] uppercase tracking-widest transition-colors">
                        View
                      </button>
                      {batch.status === 'Draft' && (
                        <button 
                          onClick={() => handleStatusUpdate(batch.id, 'Published')}
                          className="text-[10px] font-semibold text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors"
                        >
                          Publish
                        </button>
                      )}
                      {batch.status === 'Published' && (
                        <button 
                          onClick={() => handleStatusUpdate(batch.id, 'Draft')}
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

      {/* Upload Results Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-stone-100">
              <h3 className="text-xl font-semibold text-stone-900">Upload Results</h3>
              <p className="text-stone-500 text-sm mt-1">Upload examination results for processing</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">Exam Type</label>
                <select className="w-full p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]">
                  <option>Mid Semester Examination</option>
                  <option>End Semester Examination</option>
                  <option>Supplementary Examination</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">Semester</label>
                <select className="w-full p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]">
                  <option>Semester 7</option>
                  <option>Semester 6</option>
                  <option>Semester 5</option>
                  <option>Semester 4</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">Academic Year</label>
                <select className="w-full p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]">
                  <option>2024-25</option>
                  <option>2023-24</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-2">Results File</label>
                <div className="border-2 border-dashed border-stone-200 rounded-lg p-6 text-center">
                  <svg className="w-8 h-8 text-stone-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="text-sm text-stone-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-stone-400 mt-1">Excel or CSV files only</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-stone-100 flex gap-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-3 px-4 border border-stone-200 text-stone-600 rounded-lg font-semibold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleUploadResults}
                className="flex-1 py-3 px-4 bg-[#5D4037] text-white rounded-lg font-semibold text-sm hover:bg-[#4E342E] transition-all"
              >
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;