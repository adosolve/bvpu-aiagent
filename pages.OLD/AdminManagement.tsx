
import React, { useState } from 'react';

interface AdminStaff {
  id: string;
  name: string;
  email: string;
  department: string;
  workload: number;
  status: 'Active' | 'Disabled';
  lastLogin: string;
}

const INITIAL_STAFF: AdminStaff[] = [
  { id: 'ADM-101', name: 'Dr. Arvin Smith', email: 'arvin.smith@university.edu', department: 'Examination', workload: 42, status: 'Active', lastLogin: '10 mins ago' },
  { id: 'ADM-102', name: 'Elena Gilbert', email: 'elena.g@university.edu', department: 'Registrar', workload: 12, status: 'Active', lastLogin: '1 hour ago' },
  { id: 'ADM-105', name: 'Michael Ross', email: 'm.ross@university.edu', department: 'Student Welfare', workload: 28, status: 'Active', lastLogin: '3 hours ago' },
  { id: 'ADM-110', name: 'Sarah Jenkins', email: 's.jenkins@university.edu', department: 'Library', workload: 5, status: 'Active', lastLogin: '2 days ago' },
  { id: 'ADM-112', name: 'James Wilson', email: 'j.wilson@university.edu', department: 'Examination', workload: 35, status: 'Disabled', lastLogin: '1 week ago' },
  { id: 'ADM-115', name: 'Linda Carter', email: 'l.carter@university.edu', department: 'Finance', workload: 0, status: 'Active', lastLogin: 'Just now' },
];

const AdminManagement: React.FC = () => {
  const [staff, setStaff] = useState<AdminStaff[]>(INITIAL_STAFF);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id: string) => {
    setStaff(staff.map(member => 
      member.id === id 
        ? { ...member, status: member.status === 'Active' ? 'Disabled' : 'Active' }
        : member
    ));
  };

  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] uppercase tracking-[0.2em] mb-2">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            Identity & Access
          </div>
          <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Admin Management</h1>
          <p className="text-sm text-stone-500 mt-2 font-medium">Control staff access levels and monitor departmental distribution.</p>
        </div>
        <button className="px-6 py-3 bg-[#5D4037] text-white text-xs font-semibold rounded-xl hover:bg-[#4E342E] shadow-lg shadow-[#5D4037]/20 transition-all uppercase tracking-widest flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>
          Add New Admin
        </button>
      </header>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search by name, ID or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-sm outline-none focus:border-[#5D4037]/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
           <select className="px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl text-xs font-semibold text-stone-500 outline-none cursor-pointer">
             <option>All Departments</option>
             <option>Examination</option>
             <option>Registrar</option>
             <option>Finance</option>
           </select>
           <button className="p-2 bg-stone-50 border border-stone-100 rounded-xl text-stone-400 hover:text-stone-600 transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
           </button>
        </div>
      </div>

      {/* Staff Table */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Administrator</th>
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Department</th>
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Workload</th>
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="group hover:bg-stone-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-stone-100 rounded-lg flex items-center justify-center text-[#5D4037] font-semibold text-xs border border-stone-200 group-hover:bg-white transition-colors">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-stone-800">{member.name}</div>
                        <div className="text-[10px] font-mono text-stone-400 uppercase tracking-tight">{member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-medium text-stone-600 px-3 py-1 bg-stone-50 rounded-full border border-stone-100">
                      {member.department}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-stone-700">{member.workload}</span>
                      <div className="w-12 h-1 bg-stone-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full ${member.workload > 30 ? 'bg-[#5D4037]' : 'bg-stone-300'}`} 
                           style={{ width: `${Math.min((member.workload/50)*100, 100)}%` }}
                         ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                      member.status === 'Active' 
                        ? 'bg-green-50 text-green-700 border-green-100' 
                        : 'bg-stone-50 text-stone-400 border-stone-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-stone-300'}`}></span>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs text-stone-400 font-medium">{member.lastLogin}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toggleStatus(member.id)}
                        title={member.status === 'Active' ? 'Disable Account' : 'Enable Account'}
                        className={`p-2 rounded-lg border transition-all ${
                          member.status === 'Active' 
                            ? 'text-red-400 hover:bg-red-50 border-red-50' 
                            : 'text-green-500 hover:bg-green-50 border-green-50'
                        }`}
                      >
                        {member.status === 'Active' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        )}
                      </button>
                      <button className="p-2 text-stone-400 hover:text-[#5D4037] hover:bg-stone-50 border border-transparent hover:border-stone-100 rounded-lg transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStaff.length === 0 && (
            <div className="p-16 text-center">
               <p className="text-stone-400 text-sm font-medium">No administrative staff found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Workload Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF9F8] border border-[#5D4037]/10 p-6 rounded-2xl flex flex-col justify-center text-center">
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">Average Workload</div>
          <div className="text-3xl font-semibold text-stone-800">24.5</div>
          <p className="text-[10px] text-stone-400 mt-1 uppercase font-semibold tracking-tighter">Tickets per Staff</p>
        </div>
        <div className="bg-[#FAF9F8] border border-[#5D4037]/10 p-6 rounded-2xl flex flex-col justify-center text-center">
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">Peak Utilization</div>
          <div className="text-3xl font-semibold text-[#5D4037]">84%</div>
          <p className="text-[10px] text-stone-400 mt-1 uppercase font-semibold tracking-tighter">Examination Dept</p>
        </div>
        <div className="bg-[#FAF9F8] border border-[#5D4037]/10 p-6 rounded-2xl flex flex-col justify-center text-center">
          <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">System Health</div>
          <div className="text-3xl font-semibold text-green-600">Stable</div>
          <p className="text-[10px] text-stone-400 mt-1 uppercase font-semibold tracking-tighter">All Nodes Online</p>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
