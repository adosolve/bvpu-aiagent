
import React, { useState } from 'react';

const ConvocationSupport: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome, John. I can help with your convocation application, certificate collection, or name correction queries. How can I assist you today?' }
  ]);

  const steps = [
    { title: 'Academic Clearance', status: 'Completed', date: 'Oct 15, 2024' },
    { title: 'Library Dues', status: 'Completed', date: 'Oct 18, 2024' },
    { title: 'Convocation Fee', status: 'Pending', date: '--' },
    { title: 'Gown Registration', status: 'Locked', date: '--' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "To update your name for the degree certificate, please navigate to 'My Queries' and raise a 'Name Correction' ticket with your 10th grade certificate attached. This must be done at least 30 days before the ceremony." 
      }]);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] uppercase tracking-[0.2em] mb-2">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            Graduation Services
          </div>
          <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Convocation & Degree</h1>
        </div>
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 px-4 py-2 rounded-2xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Eligibility: Confirmed</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ceremony Details */}
          <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            </div>
            
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">Ceremony Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#5D4037] border border-stone-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Date & Time</p>
                  <p className="text-lg font-semibold text-stone-800">December 14, 2024</p>
                  <p className="text-xs text-stone-500 font-medium">09:00 AM IST Onwards</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#5D4037] border border-stone-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Venue</p>
                  <p className="text-lg font-semibold text-stone-800">Main University Auditorium</p>
                  <p className="text-xs text-stone-500 font-medium">South Campus, Building A</p>
                </div>
              </div>
            </div>
          </section>

          {/* Application Checklist */}
          <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-6">Application Progress</h3>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-stone-50 bg-stone-50/30">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold border ${
                      step.status === 'Completed' ? 'bg-[#5D4037] text-white border-[#5D4037]' : 'bg-white text-stone-300 border-stone-200'
                    }`}>
                      {step.status === 'Completed' ? '✓' : i + 1}
                    </div>
                    <span className={`text-sm font-semibold ${step.status === 'Locked' ? 'text-stone-300' : 'text-stone-700'}`}>
                      {step.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-stone-400 font-mono font-semibold">{step.date}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-md border ${
                      step.status === 'Completed' ? 'text-green-600 bg-green-50 border-green-100' : 
                      step.status === 'Pending' ? 'text-amber-600 bg-amber-50 border-amber-100' : 
                      'text-stone-300 bg-stone-50 border-stone-100'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certificate Collection Banner */}
          <section className="bg-[#FAF9F8] border border-[#5D4037]/10 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5D4037]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-800">Certificate Collection</h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-sm">Degrees will be available for collection from the Registrar's Office 48 hours after the ceremony.</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white border border-[#5D4037]/20 text-[#5D4037] text-xs font-semibold rounded-xl hover:bg-[#5D4037] hover:text-white transition-all shadow-sm">
              Collection Policy
            </button>
          </section>
        </div>

        {/* AI Chat Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[600px]">
            <div className="p-6 bg-[#FAF9F8] border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5D4037] text-white rounded-xl flex items-center justify-center shadow-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-800">Convocation AI</h3>
                  <p className="text-[10px] text-green-600 font-semibold uppercase tracking-widest">Online Assistant</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#5D4037] text-white rounded-tr-none' 
                      : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-stone-100 bg-white">
              <form onSubmit={handleSendMessage} className="relative">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about gown, fee, or dates..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-stone-200 text-xs focus:border-[#5D4037] outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-stone-50 text-[#5D4037] hover:bg-[#5D4037] hover:text-white rounded-lg transition-all flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                <button onClick={() => setChatInput("What is the gown fee?")} className="whitespace-nowrap px-3 py-1 bg-stone-50 border border-stone-100 rounded-full text-[10px] font-semibold text-stone-400 hover:text-[#5D4037] transition-colors">Gown Fee?</button>
                <button onClick={() => setChatInput("Name correction help")} className="whitespace-nowrap px-3 py-1 bg-stone-50 border border-stone-100 rounded-full text-[10px] font-semibold text-stone-400 hover:text-[#5D4037] transition-colors">Name correction</button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
             <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-4">Required Documents</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-[11px] text-stone-600">
                 <div className="w-1.5 h-1.5 bg-[#5D4037] rounded-full"></div>
                 Final Year Marksheet (Original)
               </li>
               <li className="flex items-center gap-3 text-[11px] text-stone-600">
                 <div className="w-1.5 h-1.5 bg-[#5D4037] rounded-full"></div>
                 Clearance Certificate (No-Dues)
               </li>
               <li className="flex items-center gap-3 text-[11px] text-stone-600">
                 <div className="w-1.5 h-1.5 bg-[#5D4037] rounded-full"></div>
                 Convocation Receipt
               </li>
             </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConvocationSupport;
