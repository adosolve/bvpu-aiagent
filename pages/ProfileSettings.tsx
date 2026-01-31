
import React, { useState } from 'react';
import { UserRole } from '../types';

interface ProfileSettingsProps {
  role: UserRole;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  // Mock user data based on role
  const userData = {
    name: role === UserRole.CANDIDATE ? 'John Harvard' : 'Elena Gilbert',
    id: role === UserRole.CANDIDATE ? '20240012' : 'ADM-102',
    email: role === UserRole.CANDIDATE ? 'john.harvard@university.edu' : 'elena.g@university.edu',
    dept: 'Examination Department',
    joined: 'August 2024'
  };

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Full Name</label>
          <input 
            type="text" 
            readOnly 
            value={userData.name}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm text-stone-600 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">
            {role === UserRole.CANDIDATE ? 'PRN Number' : 'Employee ID'}
          </label>
          <input 
            type="text" 
            readOnly 
            value={userData.id}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm text-stone-600 outline-none font-mono"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Email Address</label>
          <input 
            type="email" 
            defaultValue={userData.email}
            className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-800 focus:border-[#5D4037] outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Department</label>
          <input 
            type="text" 
            readOnly 
            value={userData.dept}
            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm text-stone-600 outline-none"
          />
        </div>
      </div>
      <div className="pt-4">
        <button className="px-6 py-3 bg-[#5D4037] text-white text-[11px] font-semibold rounded-xl hover:bg-[#4E342E] transition-all uppercase tracking-widest shadow-lg shadow-[#5D4037]/10">
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="space-y-2">
        <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Current Password</label>
        <input 
          type="password" 
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:border-[#5D4037] outline-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">New Password</label>
        <input 
          type="password" 
          placeholder="Minimum 8 characters"
          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:border-[#5D4037] outline-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Confirm New Password</label>
        <input 
          type="password" 
          placeholder="Repeat new password"
          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:border-[#5D4037] outline-none transition-all"
        />
      </div>
      <div className="pt-4">
        <button className="w-full py-4 bg-[#5D4037] text-white text-[11px] font-semibold rounded-xl hover:bg-[#4E342E] transition-all uppercase tracking-widest shadow-lg shadow-[#5D4037]/10">
          Update Password
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="space-y-6">
        {[
          { title: 'Email Notifications', desc: 'Receive ticket updates and system alerts via email.' },
          { title: 'Push Notifications', desc: 'Get real-time alerts in your browser when a status changes.' },
          { title: 'AI Assistant Insights', desc: 'Allow AI to send proactive suggestions based on your queries.' },
          { title: 'Marketing & Events', desc: 'University announcements and convocation event updates.' },
        ].map((pref, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-stone-50 border border-stone-100 rounded-2xl">
            <div>
              <h4 className="text-sm font-semibold text-stone-800 mb-1">{pref.title}</h4>
              <p className="text-xs text-stone-400 font-medium">{pref.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5D4037]"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#5D4037] text-4xl font-semibold shadow-sm">
            {userData.name.charAt(0)}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-[#5D4037] shadow-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          </button>
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 mb-1">{userData.name}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">{role.replace('_', ' ')}</span>
            <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em]">Member since {userData.joined}</span>
          </div>
        </div>
      </header>

      <div className="bg-white border border-stone-200 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Settings Sidebar */}
        <nav className="w-full md:w-64 bg-stone-50/50 border-b md:border-b-0 md:border-r border-stone-100 p-6 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
              activeTab === 'profile' ? 'bg-[#5D4037] text-white shadow-lg shadow-[#5D4037]/10' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
            }`}
          >
            Personal Info
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
              activeTab === 'security' ? 'bg-[#5D4037] text-white shadow-lg shadow-[#5D4037]/10' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
            }`}
          >
            Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
              activeTab === 'notifications' ? 'bg-[#5D4037] text-white shadow-lg shadow-[#5D4037]/10' : 'text-stone-400 hover:bg-stone-100 hover:text-stone-600'
            }`}
          >
            Notifications
          </button>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-8 md:p-12">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'notifications' && renderNotifications()}
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
