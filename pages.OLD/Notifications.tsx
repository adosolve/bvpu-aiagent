
import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface ActivityLog {
  id: string;
  type: 'system_generated' | 'admin_published' | 'super_admin_published' | 'status_change' | 'ai_update' | 'admin_note' | 'system_alert' | 'submission';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string;
  source: 'System' | 'Admin' | 'Super Admin';
  publishedBy?: string;
}

const MOCK_ADMIN_LOGS: ActivityLog[] = [
  {
    id: '1',
    type: 'system_generated',
    title: 'Automated Grade Card Publication',
    description: 'System automatically published grade cards for Even Semester 2024-25 after verification completion.',
    timestamp: '15 mins ago',
    isRead: false,
    relatedId: 'SYS-2024-001',
    source: 'System'
  },
  {
    id: '2',
    type: 'admin_published',
    title: 'Examination Schedule Notice',
    description: 'Published notification about upcoming Odd Semester End Examinations 2025-26 schedule.',
    timestamp: '2 hours ago',
    isRead: false,
    relatedId: 'NOT-2024-045',
    source: 'Admin',
    publishedBy: 'Dr. Sharma'
  },
  {
    id: '3',
    type: 'super_admin_published',
    title: 'University Holiday Declaration',
    description: 'Official notification regarding Diwali holidays and academic calendar adjustments.',
    timestamp: '5 hours ago',
    isRead: true,
    relatedId: 'NOT-2024-046',
    source: 'Super Admin',
    publishedBy: 'Prof. Patel'
  },
  {
    id: '4',
    type: 'system_alert',
    title: 'Database Backup Completed',
    description: 'Scheduled database backup completed successfully. All examination records secured.',
    timestamp: 'Yesterday',
    isRead: true,
    relatedId: 'SYS-2024-002',
    source: 'System'
  },
  {
    id: '5',
    type: 'admin_published',
    title: 'Result Declaration Notice',
    description: 'Published notification about Even Semester 2024-25 results availability.',
    timestamp: '2 days ago',
    isRead: true,
    relatedId: 'NOT-2024-044',
    source: 'Admin',
    publishedBy: 'Dr. Kumar'
  },
  {
    id: '6',
    type: 'system_generated',
    title: 'Bulk Email Notification Sent',
    description: 'System sent grade card availability notifications to 1,247 students.',
    timestamp: '3 days ago',
    isRead: true,
    relatedId: 'SYS-2024-003',
    source: 'System'
  },
  {
    id: '7',
    type: 'super_admin_published',
    title: 'Academic Policy Update',
    description: 'Published updated examination and grading policies for academic year 2024-25.',
    timestamp: '1 week ago',
    isRead: true,
    relatedId: 'NOT-2024-043',
    source: 'Super Admin',
    publishedBy: 'Prof. Gupta'
  }
];

const MOCK_STUDENT_LOGS: ActivityLog[] = [
  {
    id: '1',
    type: 'status_change',
    title: 'Ticket Status Updated',
    description: 'Query #BV-7721 moved from "Pending" to "In Review" by the Examination Department.',
    timestamp: '15 mins ago',
    isRead: false,
    relatedId: '#BV-7721',
    source: 'System'
  },
  {
    id: '2',
    type: 'ai_update',
    title: 'AI Analysis Complete',
    description: 'The Help Desk AI has finished verifying your documents for "Name Correction". High confidence match found.',
    timestamp: '2 hours ago',
    isRead: false,
    relatedId: '#BV-7725',
    source: 'System'
  },
  {
    id: '3',
    type: 'system_alert',
    title: 'System Maintenance Scheduled',
    description: 'College AI Core will undergo routine indexing on Nov 02, 02:00 AM. Expect brief downtime.',
    timestamp: '5 hours ago',
    isRead: true,
    source: 'System'
  },
  {
    id: '4',
    type: 'admin_note',
    title: 'Official Remark Added',
    description: 'Admin Clerk Elena G. added a note to your "Duplicate Marksheet" request regarding FIR copies.',
    timestamp: 'Yesterday',
    isRead: true,
    relatedId: '#BV-7650',
    source: 'Admin'
  },
  {
    id: '5',
    type: 'submission',
    title: 'New Query Logged',
    description: 'Your request for "Re-evaluation" has been successfully received by the system.',
    timestamp: '2 days ago',
    isRead: true,
    relatedId: '#BV-7689',
    source: 'System'
  }
];

interface NotificationsPageProps {
  role?: UserRole;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ role = UserRole.CANDIDATE }) => {
  const isAdminOrSuperAdmin = role === UserRole.ADMIN_CLERK || role === UserRole.SUPER_ADMIN;
  const logs = isAdminOrSuperAdmin ? MOCK_ADMIN_LOGS : MOCK_STUDENT_LOGS;
  
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>(logs);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilterChange = (filterType: string) => {
    setActiveFilter(filterType);
    
    switch (filterType) {
      case 'all':
        setFilteredLogs(logs);
        break;
      case 'system_generated':
        setFilteredLogs(logs.filter(log => log.type === 'system_generated' || log.source === 'System'));
        break;
      case 'admin_published':
        setFilteredLogs(logs.filter(log => log.type === 'admin_published' || log.source === 'Admin'));
        break;
      case 'super_admin_published':
        setFilteredLogs(logs.filter(log => log.type === 'super_admin_published' || log.source === 'Super Admin'));
        break;
      case 'unread':
        setFilteredLogs(logs.filter(log => !log.isRead));
        break;
      default:
        setFilteredLogs(logs);
    }
  };

  const getIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'system_generated':
      case 'system_alert':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
        );
      case 'admin_published':
      case 'admin_note':
        return (
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
        );
      case 'super_admin_published':
        return (
          <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><shield className="w-4 h-4" /><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
        );
      case 'status_change':
        return (
          <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center border border-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"></path><path d="M8 21H3v-5"></path><path d="M21 3l-7.5 7.5"></path><path d="M3 21l7.5-7.5"></path></svg>
          </div>
        );
      case 'ai_update':
        return (
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-stone-50 text-stone-500 flex items-center justify-center border border-stone-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        );
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'System':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Admin':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Super Admin':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-stone-50 text-stone-500 border-stone-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">
          {isAdminOrSuperAdmin ? 'Activity Journal' : 'Notifications'}
        </h1>
        <p className="text-stone-500 text-sm font-medium">
          {isAdminOrSuperAdmin 
            ? 'System alerts, published notices, and workflow updates' 
            : 'Keep track of system alerts, query progress, and administrative updates'
          }
        </p>
      </header>

      {/* Filters - Only for Admin/Super Admin */}
      {isAdminOrSuperAdmin && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Activity' },
              { key: 'system_generated', label: 'System Generated' },
              { key: 'admin_published', label: 'Admin Published' },
              ...(role === UserRole.SUPER_ADMIN ? [{ key: 'super_admin_published', label: 'Super Admin Published' }] : []),
              { key: 'unread', label: 'Unread' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest rounded-lg transition-all border ${
                  activeFilter === filter.key
                    ? 'bg-[#5D4037] text-white border-[#5D4037]'
                    : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-stone-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Student Filter Toggle */}
      {!isAdminOrSuperAdmin && (
        <div className="flex justify-end">
          <div className="flex bg-stone-50 p-1 rounded-xl border border-stone-100">
            <button 
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeFilter === 'all' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              All Activity
            </button>
            <button 
              onClick={() => handleFilterChange('unread')}
              className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-widest rounded-lg transition-all ${
                activeFilter === 'unread' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              Unread
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
        {/* Timeline Stem */}
        <div className="absolute left-[3.25rem] top-12 bottom-12 w-px bg-stone-100"></div>

        <div className="space-y-8 relative z-10">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex gap-6 group">
              <div className="relative shrink-0">
                {getIcon(log.type)}
                {!log.isRead && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#5D4037] border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold mb-1 ${log.isRead ? 'text-stone-800' : 'text-[#5D4037]'}`}>
                      {log.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getSourceBadge(log.source)}`}>
                        {log.source}
                      </span>
                      {log.publishedBy && (
                        <span className="text-[10px] text-stone-500 font-medium">by {log.publishedBy}</span>
                      )}
                      <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-tighter">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed max-w-3xl mb-3">
                  {log.description}
                </p>
                {log.relatedId && (
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      Reference: {log.relatedId}
                    </span>
                    <button className="text-[10px] font-semibold text-stone-400 hover:text-[#5D4037] uppercase tracking-[0.15em] flex items-center gap-1.5 transition-colors">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-stone-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">No Activity Found</h3>
            <p className="text-stone-500 text-sm">No notifications match the selected filter.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center">
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">
          {isAdminOrSuperAdmin ? 'System audit log - Auto-archived after 90 days' : 'Auto-archived after 30 days of inactivity'}
        </p>
      </footer>
    </div>
  );
};

export default NotificationsPage;
