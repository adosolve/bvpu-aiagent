import React, { useState } from 'react';

interface NOCRequest {
  id: string;
  studentName: string;
  prn: string;
  email: string;
  phone: string;
  course: string;
  semester: string;
  requestType: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  outstandingFees: number;
  remarks?: string;
}

const MOCK_REQUESTS: NOCRequest[] = [
  {
    id: 'AC001',
    studentName: 'John Harvard',
    prn: 'BV-7721',
    email: 'john.harvard@student.edu',
    phone: '+91 98765 43210',
    course: 'B.Tech Computer Science',
    semester: 'Semester 6',
    requestType: 'Fee Clearance NOC',
    submittedDate: '2024-02-08 10:30 AM',
    status: 'Pending',
    outstandingFees: 0
  },
  {
    id: 'AC002',
    studentName: 'Alice Smith',
    prn: 'BV-7722',
    email: 'alice.smith@student.edu',
    phone: '+91 98765 43211',
    course: 'MBA Finance',
    semester: 'Semester 4',
    requestType: 'Scholarship Verification',
    submittedDate: '2024-02-08 09:15 AM',
    status: 'Pending',
    outstandingFees: 0
  },
  {
    id: 'AC003',
    studentName: 'Bob Johnson',
    prn: 'BV-7723',
    email: 'bob.johnson@student.edu',
    phone: '+91 98765 43212',
    course: 'BBA Marketing',
    semester: 'Semester 2',
    requestType: 'Fee Clearance NOC',
    submittedDate: '2024-02-08 08:45 AM',
    status: 'Pending',
    outstandingFees: 15000
  },
  {
    id: 'AC004',
    studentName: 'Emma Davis',
    prn: 'BV-7724',
    email: 'emma.davis@student.edu',
    phone: '+91 98765 43213',
    course: 'M.Tech Data Science',
    semester: 'Semester 3',
    requestType: 'Fee Refund Request',
    submittedDate: '2024-02-07 04:30 PM',
    status: 'Approved',
    outstandingFees: 0,
    remarks: 'All fees cleared, NOC issued'
  },
  {
    id: 'AC005',
    studentName: 'Michael Brown',
    prn: 'BV-7725',
    email: 'michael.brown@student.edu',
    phone: '+91 98765 43214',
    course: 'B.Sc Physics',
    semester: 'Semester 5',
    requestType: 'Fee Clearance NOC',
    submittedDate: '2024-02-07 03:20 PM',
    status: 'Rejected',
    outstandingFees: 25000,
    remarks: 'Outstanding fees pending'
  }
];

const AccountsDept: React.FC = () => {
  const [requests, setRequests] = useState<NOCRequest[]>(MOCK_REQUESTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedRequest, setSelectedRequest] = useState<NOCRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [remarks, setRemarks] = useState('');
  const recordsPerPage = 5;

  const filteredRecords = requests.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      record.studentName.toLowerCase().includes(searchLower) ||
      record.prn.toLowerCase().includes(searchLower) ||
      record.requestType.toLowerCase().includes(searchLower)
    );
    const matchesStatus = filterStatus === 'All' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAction = (request: NOCRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setRemarks('');
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedRequest || !actionType) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: actionType === 'approve' ? 'Approved' : 'Rejected',
          remarks: remarks || (actionType === 'approve' ? 'NOC Approved' : 'NOC Rejected')
        } as NOCRequest;
      }
      return req;
    });

    setRequests(updatedRequests);
    setShowModal(false);
    setSelectedRequest(null);
    setActionType(null);
    setRemarks('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-stone-50 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
          <span className="w-6 h-[2px] bg-[#5D4037]"></span>
          Department Portal
        </div>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Accounts Department</h1>
        <p className="text-sm text-stone-500 mt-2">
          Review and approve fee clearance and NOC requests
        </p>
      </header>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Pending</p>
              <p className="text-3xl font-bold text-amber-700">
                {requests.filter(r => r.status === 'Pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-700">
                {requests.filter(r => r.status === 'Approved').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-700">
                {requests.filter(r => r.status === 'Rejected').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Total</p>
              <p className="text-3xl font-bold text-blue-700">{requests.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                filterStatus === status
                  ? 'bg-[#5D4037] text-white shadow-md'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search requests..."
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

      <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-200">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Request ID</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student Details</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Course</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Request Type</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Outstanding Fees</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Submitted</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#5D4037]">{record.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-800">{record.studentName}</div>
                    <div className="text-xs text-stone-500 mt-1">{record.prn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-700">{record.course}</div>
                    <div className="text-xs text-stone-500 mt-1">{record.semester}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-stone-600">{record.requestType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${record.outstandingFees > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{record.outstandingFees.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-500">{record.submittedDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {record.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction(record, 'approve')}
                          className="text-[10px] font-semibold text-green-700 bg-green-50 px-3 py-2 rounded-lg hover:bg-green-700 hover:text-white transition-all uppercase tracking-widest border border-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(record, 'reject')}
                          className="text-[10px] font-semibold text-red-700 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white transition-all uppercase tracking-widest border border-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400">{record.remarks}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentRecords.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">No requests found</p>
            </div>
          )}
        </div>

        {filteredRecords.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <div className="text-xs text-stone-500">
              Showing <span className="font-semibold text-stone-700">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-stone-700">{Math.min(endIndex, filteredRecords.length)}</span> of{' '}
              <span className="font-semibold text-stone-700">{filteredRecords.length}</span> requests
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

      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                actionType === 'approve' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {actionType === 'approve' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">
                {actionType === 'approve' ? 'Approve NOC' : 'Reject NOC'}
              </h3>
              <p className="text-sm text-stone-500">
                {selectedRequest.studentName} - {selectedRequest.prn}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Feedback/Remarks {actionType === 'reject' && <span className="text-red-600">*</span>}
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={actionType === 'approve' ? 'Optional feedback...' : 'Please provide reason for rejection...'}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRequest(null);
                  setActionType(null);
                  setRemarks('');
                }}
                className="flex-1 px-4 py-3 bg-stone-100 text-stone-700 rounded-xl font-semibold text-sm hover:bg-stone-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={actionType === 'reject' && !remarks.trim()}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  actionType === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsDept;
