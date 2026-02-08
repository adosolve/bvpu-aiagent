import React, { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  category: string;
  targetAudience: string;
  sentBy: string;
  sentDate: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  recipientCount: number;
  statusColor: string;
}

interface SystemNotification {
  id: string;
  type: 'escalation' | 'new_query' | 'form_submission';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: React.ReactNode;
  color: string;
}

const MOCK_SYSTEM_NOTIFICATIONS: SystemNotification[] = [
  {
    id: '1',
    type: 'escalation',
    title: 'Query Escalated',
    message: 'Query #BV-7721 from John Harvard has been escalated due to 15 days inactivity',
    time: '5 minutes ago',
    isRead: false,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    color: 'bg-red-50 border-red-200 text-red-700'
  },
  {
    id: '2',
    type: 'new_query',
    title: 'New Query Received',
    message: 'Alice Smith submitted a new query regarding Name Correction',
    time: '15 minutes ago',
    isRead: false,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: '3',
    type: 'form_submission',
    title: 'Exam Form Submitted',
    message: 'Robert Brown submitted examination form for Winter 2024',
    time: '30 minutes ago',
    isRead: false,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>,
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  {
    id: '4',
    type: 'new_query',
    title: 'New Query Received',
    message: 'Emma Davis submitted a new query regarding Certificate Issue',
    time: '1 hour ago',
    isRead: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: '5',
    type: 'escalation',
    title: 'Query Escalated',
    message: 'Query #BV-7650 from Michael Anderson has been escalated due to 18 days inactivity',
    time: '2 hours ago',
    isRead: true,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
    color: 'bg-red-50 border-red-200 text-red-700'
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Exam Schedule Released',
    message: 'The final examination schedule for Winter 2024 has been released. Please check your portal.',
    category: 'Examination',
    targetAudience: 'All Students',
    sentBy: 'Elena Gilbert',
    sentDate: '2024-02-08 10:30 AM',
    status: 'Sent',
    recipientCount: 1250,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '2',
    title: 'Fee Payment Reminder',
    message: 'This is a reminder to complete your semester fee payment by February 15, 2024.',
    category: 'Accounts',
    targetAudience: 'Pending Fee Students',
    sentBy: 'Sarah Johnson',
    sentDate: '2024-02-07 02:15 PM',
    status: 'Sent',
    recipientCount: 342,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '3',
    title: 'Library Book Return Notice',
    message: 'Please return all borrowed books by February 20, 2024 to avoid late fees.',
    category: 'Library',
    targetAudience: 'Students with Borrowed Books',
    sentBy: 'Michael Brown',
    sentDate: '2024-02-06 11:00 AM',
    status: 'Sent',
    recipientCount: 567,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '4',
    title: 'Admission Process Update',
    message: 'New admission applications for 2024-25 will open on March 1, 2024.',
    category: 'Admission',
    targetAudience: 'Prospective Students',
    sentBy: 'Elena Gilbert',
    sentDate: '2024-02-10 09:00 AM',
    status: 'Scheduled',
    recipientCount: 2000,
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '5',
    title: 'Result Declaration',
    message: 'Semester results will be declared on February 25, 2024. Check your portal for updates.',
    category: 'Examination',
    targetAudience: 'All Students',
    sentBy: 'Sarah Johnson',
    sentDate: '2024-02-05 04:30 PM',
    status: 'Sent',
    recipientCount: 1250,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '6',
    title: 'Campus Event Announcement',
    message: 'Annual cultural fest will be held on March 15-17, 2024. Register now!',
    category: 'General',
    targetAudience: 'All Students',
    sentBy: 'Michael Brown',
    sentDate: '2024-02-04 01:00 PM',
    status: 'Sent',
    recipientCount: 1250,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '7',
    title: 'Scholarship Application Open',
    message: 'Merit-based scholarship applications are now open. Apply before February 28, 2024.',
    category: 'Accounts',
    targetAudience: 'Eligible Students',
    sentBy: 'Elena Gilbert',
    sentDate: '2024-02-03 10:00 AM',
    status: 'Sent',
    recipientCount: 450,
    statusColor: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    id: '8',
    title: 'Document Verification Notice',
    message: 'All new students must complete document verification by February 20, 2024.',
    category: 'Admission',
    targetAudience: 'New Admissions',
    sentBy: 'Sarah Johnson',
    sentDate: '2024-02-15 11:00 AM',
    status: 'Scheduled',
    recipientCount: 180,
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
  }
];

const NotificationList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const recordsPerPage = 5;

  // Filter records based on search query and status
  const filteredRecords = MOCK_NOTIFICATIONS.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      record.title.toLowerCase().includes(searchLower) ||
      record.category.toLowerCase().includes(searchLower) ||
      record.targetAudience.toLowerCase().includes(searchLower) ||
      record.sentBy.toLowerCase().includes(searchLower)
    );
    const matchesStatus = filterStatus === 'All' || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  // Reset to page 1 when search query or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
          <span className="w-6 h-[2px] bg-[#5D4037]"></span>
          Communication Hub
        </div>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Notifications</h1>
        <p className="text-sm text-stone-500 mt-2">
          View and manage all notifications sent to students
        </p>
      </header>

      {/* System Notifications Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-900">System Notifications</h2>
          <button className="text-xs font-semibold text-[#5D4037] hover:text-[#4A332C] transition-all">
            Mark all as read
          </button>
        </div>
        
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-stone-100">
            {MOCK_SYSTEM_NOTIFICATIONS.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-stone-50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-stone-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${notification.color}`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-stone-900 mb-1">
                          {notification.title}
                          {!notification.isRead && (
                            <span className="ml-2 inline-block w-2 h-2 bg-[#5D4037] rounded-full"></span>
                          )}
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-stone-400 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-stone-200"></div>

      {/* Sent Notifications Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-stone-900">Sent Notifications</h2>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {['All', 'Sent', 'Scheduled'].map((status) => (
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
            placeholder="Search notifications..."
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

      {/* Notifications Table */}
      <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-200">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Title</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Target Audience</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Sent By</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Recipients</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-800">{record.title}</div>
                    <div className="text-xs text-stone-500 mt-1 line-clamp-1">{record.message}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-stone-600">{record.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-600">{record.targetAudience}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-600">{record.sentBy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-500">{record.sentDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#5D4037]">{record.recipientCount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${record.statusColor}`}>
                      {record.status}
                    </span>
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
          {currentRecords.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">
                {searchQuery || filterStatus !== 'All' ? 'No notifications found matching your filters' : 'No notifications found'}
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
              <span className="font-semibold text-stone-700">{filteredRecords.length}</span> notifications
              {(searchQuery || filterStatus !== 'All') && <span className="ml-1">(filtered from {MOCK_NOTIFICATIONS.length} total)</span>}
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

export default NotificationList;
