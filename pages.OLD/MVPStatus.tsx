
import React from 'react';
import { Icons } from '../constants';

const MVPStatus: React.FC = () => {
  const achievements = [
    { title: 'Role-Based Access', desc: 'Secure, dedicated portals for Super Admin, Admin/Clerk, and Candidates.', icon: '🔐' },
    { title: 'AI-Assisted Help Desk', desc: 'Intelligent query validation, live feedback, and academic assistant.', icon: '✨' },
    { title: 'Ticket Lifecycle', desc: 'End-to-end tracking from student submission to administrative resolution.', icon: '🎫' },
    { title: 'Professional UI/UX', desc: 'Responsive, clean Harvard-inspired academic theme for all devices.', icon: '📱' },
  ];

  const futureScope = [
    { module: 'Admissions AI', feature: 'Automated merit list generation & document verification AI integration.' },
    { module: 'Digital Accounts', feature: 'Integrated fee collection, scholarship tracking, and digital receipts.' },
    { module: 'Digital Library', feature: 'RFID book tracking, digital repository access, and auto-fine system.' },
    { module: 'Exam Oversight', feature: 'Live AI proctoring, result analytics, and marksheet generation.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 py-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-5 py-2 bg-green-50 border border-green-100 rounded-full mb-4 shadow-sm">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[11px] font-semibold text-green-700 uppercase tracking-[0.3em]">PROTOTYPE PHASE COMPLETE</span>
        </div>
        <div className="flex flex-col items-center mb-8">
          <img src="/Public/IMED LOGO.jpg" alt="University Logo" className="w-20 h-20 rounded-2xl object-contain shadow-lg mb-3" />
          <img src="/Public/College Title.png" alt="College Title" className="h-20 md:h-24 w-auto object-contain opacity-90 mb-2" />
          <span className="text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">AI</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-semibold text-stone-900 tracking-tight leading-none mb-8">
          <span className="text-[#5D4037]/40 font-semibold text-4xl md:text-5xl">System Complete</span>
        </h1>
        <p className="text-stone-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          A clean, professional management system successfully architected for the University Examination Department.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, i) => (
          <div key={i} className="bg-white border border-stone-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">{item.title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <section className="bg-stone-50 border border-stone-100 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-12">
            <Icons.Settings />
        </div>
        <div className="flex items-center gap-5 mb-12 relative z-10">
          <div className="w-16 h-16 bg-[#5D4037] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[#5D4037]/20">
            <Icons.Dashboard />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-stone-900">Future Roadmap</h2>
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.3em] mt-1">Institutional Expansion</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {futureScope.map((item, i) => (
            <div key={i} className="flex gap-5">
              <div className="mt-1 text-[#5D4037] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h11"></path></svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-stone-800 mb-2">Module: {item.module}</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-medium">{item.feature}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center pt-12 border-t border-stone-100">
        <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-[0.5em] mb-6">
          Architected by College AI System Designer
        </p>
        <div className="flex justify-center items-center gap-6">
          <div className="w-12 h-0.5 bg-stone-100 rounded-full"></div>
          <div className="w-12 h-0.5 bg-[#5D4037] rounded-full"></div>
          <div className="w-12 h-0.5 bg-stone-100 rounded-full"></div>
        </div>
        <div className="mt-12">
             <span className="text-[10px] font-semibold text-[#5D4037] border border-[#5D4037] px-4 py-2 rounded-full uppercase tracking-widest">MVP COMPLETE</span>
        </div>
      </footer>
    </div>
  );
};

export default MVPStatus;
