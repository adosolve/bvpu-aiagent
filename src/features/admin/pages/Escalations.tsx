import React, { useState } from 'react';

interface EscalatedQuery {
  id: string;
  student: string;
  prn: string;
  contactInfo: string;
  queryName: string;
  assignedTo: string;
  stageName: string;
  aging: number; // in days
  stageColor: string;
  escalationReason: string;
}

// Mock data - queries that have been stuck for more than 10 days
const MOCK_ESCALATED_QUERIES: EscalatedQuery[] = [
  {
    id: '1',
    student: 'Robert Brown',
    prn: 'PRN20230089',
    contactInfo: 'robert.b@university.edu',
    queryName: 'Duplicate Marksheet',
    assignedTo: 'Sarah Johnson',
    stageName: 'On Hold',
    aging: 18,
    stageColor: 'bg-orange-50 text-orange-700 border-orange-200',
    escalationReason: 'Stuck in On Hold for 18 days'
  },
  {
    id: '2',
    student: 'James Miller',
    prn: 'PRN20230456',
    contactInfo: 'james.m@university.edu',
    queryName: 'Exam Form Correction',
    assignedTo: 'Michael Brown',
    stageName: 'In Progress',
    aging: 15,
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200',
    escalationReason: 'Stuck in In Progress for 15 days'
  },
  {
    id: '3',
    student: 'Isabella Martinez',
    prn: 'PRN20230678',
    contactInfo: 'isabella.m@university.edu',
    queryName: 'Document Verification',
    assignedTo: 'Michael Brown',
    stageName: 'Pending',
    aging: 20,
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200',
    escalationReason: 'Stuck in Pending for 20 days'
  },
  {
    id: '4',
    student: 'David Chen',
    prn: 'PRN20230234',
    contactInfo: 'david.c@university.edu',
    queryName: 'Grade Discrepancy',
    assignedTo: 'Sarah Johnson',
    stageName: 'In Progress',
    aging: 12,
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200',
    escalationReason: 'Stuck in In Progress for 12 days'
  },
  {
    id: '5',
    student: 'Emma Wilson',
    prn: 'PRN20230567',
    contactInfo: 'emma.w@university.edu',
    queryName: 'Certificate Issue',
    assignedTo: 'Unassigned',
    stageName: 'Pending',
    aging: 14,
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200',
    escalationReason: 'Unassigned for 14 days'
  },
  {
    id: '6',
    student: 'Michael Anderson',
    prn: 'PRN20230789',
    contactInfo: 'michael.a@university.edu',
    queryName: 'Transcript Request',
    assignedTo: 'Sarah Johnson',
    stageName: 'On Hold',
    aging: 16,
    stageColor: 'bg-orange-50 text-orange-700 border-orange-200',
    escalationReason: 'Stuck in On Hold for 16 days'
  },
  {
    id: '7',
    student: 'Sophia Taylor',
    prn: 'PRN20230321',
    contactInfo: 'sophia.t@university.edu',
    queryName: 'Fee Clarification',
    assignedTo: 'Michael Brown',
    stageName: 'In Progress',
    aging: 11,
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200',
    escalationReason: 'Stuck in In Progress for 11 days'
  },
  {
    id: '8',
    student: 'Oliver Martinez',
    prn: 'PRN20230456',
    contactInfo: 'oliver.m@university.edu',
    queryName: 'Re-evaluation Request',
    assignedTo: 'Unassigned',
    stageName: 'Pending',
    aging: 13,
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200',
    escalationReason: 'Unassigned for 13 days'
  },
  {
    id: '9',
    student: 'Ava Johnson',
    prn: 'PRN20230678',
    contactInfo: 'ava.j@university.edu',
    queryName: 'Name Correction',
    assignedTo: 'Sarah Johnson',
    stageName: 'On Hold',
    aging: 19,
    stageColor: 'bg-orange-50 text-orange-700 border-orange-200',
    escalationReason: 'Stuck in On Hold for 19 days'
  },
  {
    id: '10',
    student: 'Liam Davis',
    prn: 'PRN20230890',
    contactInfo: 'liam.d@university.edu',
    queryName: 'Marksheet Error',
    assignedTo: 'Michael Brown',
    stageName: 'In Progress',
    aging: 17,
    stageColor: 'bg-amber-50 text-amber-700 border-amber-200',
    escalationReason: 'Stuck in In Progress for 17 days'
  },
  {
    id: '11',
    student: 'Mia Thompson',
    prn: 'PRN20230123',
    contactInfo: 'mia.t@university.edu',
    queryName: 'Exam Schedule Query',
    assignedTo: 'Sarah Johnson',
    stageName: 'Pending',
    aging: 21,
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200',
    escalationReason: 'Stuck in Pending for 21 days'
  },
  {
    id: '12',
    student: 'Noah Garcia',
    prn: 'PRN20230345',
    contactInfo: 'noah.g@university.edu',
    queryName: 'Admission Query',
    assignedTo: 'Unassigned',
    stageName: 'Pending',
    aging: 15,
    stageColor: 'bg-slate-50 text-slate-700 border-slate-200',
    escalationReason: 'Unassigned for 15 days'
  }
];

const Escalations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 10;

  // Filter records based on search query
  const filteredRecords = MOCK_ESCALATED_QUERIES.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      record.student.toLowerCase().includes(searchLower) ||
      record.prn.toLowerCase().includes(searchLower) ||
      record.contactInfo.toLowerCase().includes(searchLower) ||
      record.queryName.toLowerCase().includes(searchLower) ||
      record.assignedTo.toLowerCase().includes(searchLower) ||
      record.stageName.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  const getAgingColor = (days: number) => {
    if (days >= 15) return 'text-red-600 font-bold';
    if (days >= 10) return 'text-orange-600 font-semibold';
    return 'text-stone-600';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
          <span className="w-6 h-[2px] bg-[#5D4037]"></span>
          Priority Management
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Escalations</h1>
            <p className="text-sm text-stone-500 mt-2">
              Queries stuck for more than 10 days are automatically escalated for priority attention
            </p>
          </div>
          <div className="flex items-center gap-4 bg-red-50 border border-red-200 px-6 py-4 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{filteredRecords.length}</div>
              <div className="text-xs font-semibold text-red-700 uppercase tracking-wider">Escalated</div>
            </div>
          </div>
        </div>
      </header>

      {/* Escalation Info Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-amber-900 mb-1">Auto-Escalation Policy</h3>
          <p className="text-xs text-amber-700">
            Queries are automatically escalated when they remain in "Pending", "In Progress", or "On Hold" status for more than 10 days, 
            or when they remain unassigned for more than 10 days. These require immediate attention to ensure timely resolution.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <section className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-stone-600">
            Showing escalated queries requiring immediate action
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search escalated queries..."
              className="w-96 pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
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
                  <tr key={record.id} className="hover:bg-red-50/30 transition-colors">
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
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${getAgingColor(record.aging)}`}>
                          {record.aging} days
                        </span>
                        {record.aging >= 15 && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-semibold text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all uppercase tracking-widest shadow-md">
                        Resolve Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentRecords.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-stone-400 text-sm">
                  {searchQuery ? `No escalated queries found matching "${searchQuery}"` : 'No escalated queries at the moment'}
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredRecords.length > 0 && (
            <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                Showing <span className="font-semibold text-stone-700">{startIndex + 1}</span> to{' '}
                <span className="font-semibold text-stone-700">{Math.min(endIndex, filteredRecords.length)}</span> of{' '}
                <span className="font-semibold text-stone-700">{filteredRecords.length}</span> escalated queries
                {searchQuery && <span className="ml-1">(filtered from {MOCK_ESCALATED_QUERIES.length} total)</span>}
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Escalations;
