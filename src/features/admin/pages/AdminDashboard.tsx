
import React, { useState } from 'react';
import AdminQueryDetail from './AdminQueryDetail.tsx';
import AnalyticsCards from '../components/AnalyticsCards';

interface AdminQuery {
  id: string;
  studentName: string;
  prn: string;
  category: string;
  receivedAt: string;
  status: 'Pending' | 'In Review' | 'On Hold' | 'Resolved';
}

const MOCK_ADMIN_QUERIES: AdminQuery[] = [
  { id: '#BV-7721', studentName: 'John Harvard', prn: '20240012', category: 'Marksheet Error', receivedAt: 'Oct 26, 10:30 AM', status: 'In Review' },
  { id: '#BV-7725', studentName: 'Alice Smith', prn: '20240155', category: 'Name Correction', receivedAt: 'Oct 26, 11:15 AM', status: 'Pending' },
  { id: '#BV-7650', studentName: 'Robert Brown', prn: '20230089', category: 'Duplicate Marksheet', receivedAt: 'Oct 25, 09:00 AM', status: 'On Hold' },
  { id: '#BV-7730', studentName: 'Elena Gilbert', prn: '20240992', category: 'Re-evaluation', receivedAt: 'Oct 26, 02:45 PM', status: 'Pending' },
  { id: '#BV-7689', studentName: 'John Harvard', prn: '20240012', category: 'Re-evaluation', receivedAt: 'Oct 24, 04:20 PM', status: 'Resolved' },
];

const AdminDashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedQuery, setSelectedQuery] = useState<AdminQuery | null>(null);

  const filteredQueries = filter === 'All' 
    ? MOCK_ADMIN_QUERIES 
    : MOCK_ADMIN_QUERIES.filter(q => q.status === filter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-stone-100 text-stone-600 border-stone-200';
      case 'In Review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'On Hold': return 'bg-red-50 text-red-700 border-red-200';
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-stone-50 text-stone-500';
    }
  };

  if (selectedQuery) {
    return (
      <AdminQueryDetail 
        query={selectedQuery} 
        onBack={() => setSelectedQuery(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Analytics Overview */}
      <AnalyticsCards />

      {/* Query List Section */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider">Query Queue</h3>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Pending', 'In Review', 'On Hold', 'Resolved'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  filter === f 
                    ? 'bg-[#5D4037] border-[#5D4037] text-white shadow-md shadow-[#5D4037]/20' 
                    : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Student / PRN</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Received</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredQueries.map((query) => (
                <tr key={query.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-800">{query.studentName}</div>
                    <div className="text-[10px] font-mono text-stone-400">{query.prn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-600 font-medium">{query.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-400">{query.receivedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${getStatusStyle(query.status)}`}>
                      {query.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedQuery(query)}
                      className="text-[10px] font-semibold text-[#5D4037] bg-[#5D4037]/5 px-4 py-2 rounded-lg hover:bg-[#5D4037] hover:text-white transition-all uppercase tracking-widest border border-[#5D4037]/10"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQueries.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">No queries found matching the selected filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
