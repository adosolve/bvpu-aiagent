import React, { useState } from 'react';

interface QueryRecord {
  id: string;
  student: string;
  prn: string;
  contactInfo: string;
  queryName: string;
  assignedTo: string;
  stageName: string;
  aging: string;
  stageColor: string;
}

const MOCK_QUERIES: QueryRecord[] = [
  {
    id: '1',
    student: 'John Harvard',
    prn: 'PRN20240012',
    contactInfo: 'john.h@university.edu',
    queryName: 'Marksheet Correction',
    assignedTo: 'Sarah Johnson',
    stageName: 'In Progress',
    aging: '2 days',
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: '2',
    student: 'Alice Smith',
    prn: 'PRN20240155',
    contactInfo: 'alice.s@university.edu',
    queryName: 'Name Correction Request',
    assignedTo: 'Michael Brown',
    stageName: 'Pending',
    aging: '5 days',
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: '3',
    student: 'Robert Brown',
    prn: 'PRN20230089',
    contactInfo: 'robert.b@university.edu',
    queryName: 'Duplicate Marksheet',
    assignedTo: 'Sarah Johnson',
    stageName: 'On Hold',
    aging: '8 days',
    stageColor: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    id: '4',
    student: 'Elena Gilbert',
    prn: 'PRN20240992',
    contactInfo: 'elena.g@university.edu',
    queryName: 'Re-evaluation Request',
    assignedTo: 'Unassigned',
    stageName: 'New',
    aging: '1 day',
    stageColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '5',
    student: 'David Wilson',
    prn: 'PRN20240234',
    contactInfo: 'david.w@university.edu',
    queryName: 'Grade Discrepancy',
    assignedTo: 'Michael Brown',
    stageName: 'Resolved',
    aging: '12 days',
    stageColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '6',
    student: 'Emma Davis',
    prn: 'PRN20240567',
    contactInfo: 'emma.d@university.edu',
    queryName: 'Certificate Issue',
    assignedTo: 'Sarah Johnson',
    stageName: 'In Progress',
    aging: '3 days',
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: '7',
    student: 'James Miller',
    prn: 'PRN20230456',
    contactInfo: 'james.m@university.edu',
    queryName: 'Exam Form Correction',
    assignedTo: 'Michael Brown',
    stageName: 'Escalated',
    aging: '15 days',
    stageColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: '8',
    student: 'Sophia Taylor',
    prn: 'PRN20240789',
    contactInfo: 'sophia.t@university.edu',
    queryName: 'Transcript Request',
    assignedTo: 'Sarah Johnson',
    stageName: 'Pending',
    aging: '4 days',
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200'
  },
  {
    id: '9',
    student: 'Oliver Anderson',
    prn: 'PRN20240321',
    contactInfo: 'oliver.a@university.edu',
    queryName: 'Fee Clarification',
    assignedTo: 'Unassigned',
    stageName: 'New',
    aging: '1 day',
    stageColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '10',
    student: 'Isabella Martinez',
    prn: 'PRN20230678',
    contactInfo: 'isabella.m@university.edu',
    queryName: 'Document Verification',
    assignedTo: 'Michael Brown',
    stageName: 'Resolved',
    aging: '20 days',
    stageColor: 'bg-green-50 text-green-700 border-green-200'
  }
];

const RecentQueriesTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(MOCK_QUERIES.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = MOCK_QUERIES.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            Student Support
          </div>
          <h2 className="text-2xl font-semibold text-stone-900">Recent Queries by Students</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-200">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">PRN</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Query Name</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Assigned To</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Stage Name</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Aging</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-800">{record.student}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-stone-600">{record.prn}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-600">{record.contactInfo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-stone-700">{record.queryName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-600">{record.assignedTo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${record.stageColor}`}>
                      {record.stageName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-500">{record.aging}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-semibold text-[#5D4037] bg-[#5D4037]/5 px-4 py-2 rounded-lg hover:bg-[#5D4037] hover:text-white transition-all uppercase tracking-widest border border-[#5D4037]/10">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Showing <span className="font-semibold text-stone-700">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-stone-700">{Math.min(endIndex, MOCK_QUERIES.length)}</span> of{' '}
            <span className="font-semibold text-stone-700">{MOCK_QUERIES.length}</span> queries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                currentPage === 1
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-[#5D4037] text-white shadow-md'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                currentPage === totalPages
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentQueriesTable;
