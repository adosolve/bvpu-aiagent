
import React from 'react';

const SuperAdminDashboard: React.FC = () => {
  const systemStats = [
    { label: 'System Wide Queries', value: '1,284', trend: '+12%', icon: '🌐' },
    { label: 'AI Resolution Rate', value: '68%', trend: '+5%', icon: '✨' },
    { label: 'Active Clerks', value: '24', trend: 'Stable', icon: '👥' },
    { label: 'Avg. Response Time', value: '4.2h', trend: '-15%', icon: '⏱️' },
  ];

  const departments = [
    { name: 'Examination', head: 'Dr. Arvin Smith', queries: 452, status: 'High Load' },
    { name: 'Registrar Office', head: 'Prof. Elena G.', queries: 120, status: 'Optimal' },
    { name: 'Library Dept', head: 'Sarah Jenkins', queries: 85, status: 'Optimal' },
    { name: 'Student Welfare', head: 'Michael Ross', queries: 210, status: 'Moderate' },
  ];

  const adminUsers = [
    { name: 'Clerk A. Johnson', role: 'Senior Admin', dept: 'Examination', lastActive: '10 mins ago' },
    { name: 'Clerk M. Davis', role: 'Junior Admin', dept: 'Examination', lastActive: '1 hour ago' },
    { name: 'Clerk L. Wilson', role: 'Support Staff', dept: 'Registrar', lastActive: 'Just now' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Page Title & Context */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            System Oversight
          </div>
          <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Administrative Control Center</h1>
          <p className="text-sm text-stone-500 mt-2 max-w-xl font-medium">
            Complete system-wide visibility of query lifecycle, AI intervention metrics, and staff performance across all university departments.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-stone-200 text-stone-600 text-[11px] font-semibold rounded-xl hover:bg-stone-50 transition-all uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            System Logs
          </button>
          <button className="px-5 py-2.5 bg-[#5D4037] text-white text-[11px] font-semibold rounded-xl hover:bg-[#4E342E] shadow-lg shadow-[#5D4037]/20 transition-all uppercase tracking-widest flex items-center gap-2">
            Generate Report
          </button>
        </div>
      </header>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, i) => (
          <div key={i} className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm hover:border-[#5D4037]/20 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 
                stat.trend.startsWith('-') ? 'bg-[#5D4037]/5 text-[#5D4037]' : 
                'bg-stone-50 text-stone-400'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-4xl font-semibold text-stone-800 mb-2">{stat.value}</div>
            <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Department Performance */}
        <section className="xl:col-span-2 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-widest">Departmental Activity</h3>
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest bg-stone-50 px-3 py-1 rounded-full border border-stone-100">Live Load Tracking</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Department</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Lead Officer</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Active Tickets</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {departments.map((dept, i) => (
                  <tr key={i} className="hover:bg-stone-50/30 transition-colors">
                    <td className="px-8 py-5 font-semibold text-stone-800 text-sm">{dept.name}</td>
                    <td className="px-8 py-5 text-stone-500 text-xs font-medium">{dept.head}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-stone-700">{dept.queries}</span>
                        <div className="w-16 bg-stone-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${dept.status === 'High Load' ? 'bg-[#5D4037]' : 'bg-stone-300'}`} 
                            style={{ width: `${Math.min((dept.queries/500)*100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md border ${
                        dept.status === 'High Load' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-green-50 text-green-700 border-green-100'
                      }`}>
                        {dept.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Admin Management Sidebar */}
        <section className="bg-[#FAF9F8] border border-[#5D4037]/10 rounded-3xl p-8 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-widest">Staff Access</h3>
            <button className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-[#5D4037] hover:border-[#5D4037]/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div className="space-y-6">
            {adminUsers.map((user, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#5D4037] font-semibold text-xs border border-stone-200">
                  {user.name.charAt(6)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-stone-800 truncate">{user.name}</h4>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-tight">{user.dept} • {user.role}</p>
                </div>
                <div className="text-[9px] text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                  Live
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-stone-200/50">
            <div className="bg-white/60 p-5 rounded-2xl border border-stone-100 flex flex-col items-center text-center">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-1">AI Health Check</div>
              <div className="text-lg font-semibold text-stone-800 mb-1">Optimal</div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2">
                <div className="bg-green-500 h-full w-[98%]"></div>
              </div>
              <p className="text-[9px] text-stone-400 mt-2 font-medium italic">Systems functioning at 98.4% efficiency</p>
            </div>
          </div>
        </section>
      </div>

      {/* System Announcements */}
      <section className="bg-[#5D4037] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl shadow-[#5D4037]/20">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 opacity-60">Critical Update</div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">Upcoming System Maintenance</h2>
          <p className="text-stone-300 text-sm leading-relaxed font-medium">
            System core update scheduled for <span className="text-white font-semibold underline">Nov 02, 02:00 AM</span>. 
            The help desk AI will be offline for approximately 45 minutes for database re-indexing.
          </p>
        </div>
        <button className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-[#5D4037] rounded-2xl font-semibold text-xs uppercase tracking-widest hover:bg-stone-100 transition-all shadow-xl">
          Broadcast to Staff
        </button>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
