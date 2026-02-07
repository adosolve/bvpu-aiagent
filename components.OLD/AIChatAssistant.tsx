
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Good day. I am the College AI Campus. How may I assist you with your academic inquiries or examination queries today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Show typing indicator
    setMessages(prev => [...prev, { role: 'ai', text: '...' }]);

    // Academic Tone Mock Responses
    setTimeout(() => {
      let response = "I have received your inquiry. Please allow me to analyze the relevant institutional policies to provide an accurate response.";
      
      if (userMsg.toLowerCase().includes('convocation')) {
        response = "Regarding Convocation 2024, the formal proceedings are scheduled for December 14th. You may verify your eligibility status within the 'Graduation Services' module.";
      } else if (userMsg.toLowerCase().includes('status') || userMsg.toLowerCase().includes('ticket')) {
        response = "To provide a precise update on your query status, please refer to the 'Query Tracking' section where real-time administrative logs are maintained.";
      } else if (userMsg.toLowerCase().includes('help') || userMsg.toLowerCase().includes('how')) {
        response = "I am equipped to guide you through raising formal requests for marksheet corrections, duplicate certificate applications, and academic re-evaluations.";
      } else if (userMsg.toLowerCase().includes('exam') || userMsg.toLowerCase().includes('result')) {
        response = "For examination-related inquiries, I can assist with result verification, grade card downloads, and examination form submissions. Please specify your particular requirement.";
      } else if (userMsg.toLowerCase().includes('fee') || userMsg.toLowerCase().includes('payment')) {
        response = "Regarding fee payments, you may access the online payment portal through the 'Financial Services' section. All transactions are processed securely through our institutional gateway.";
      }

      // Remove typing indicator and add actual response
      setMessages(prev => prev.slice(0, -1).concat([{ role: 'ai', text: response }]));
    }, 1200);
  };

  const suggestions = [
    "Check Convocation Dates",
    "Track my pending tickets",
    "How to correct my name?",
    "Download grade card",
    "Exam form submission help"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#5D4037] text-white rounded-full shadow-2xl z-50 flex items-center justify-center hover:scale-110 transition-all active:scale-95 group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <Icons.Message />
        )}
        <span className="absolute right-16 bg-white text-[#5D4037] px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-widest shadow-sm border border-stone-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          AI Campus
        </span>
      </button>

      {/* Side Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/10 backdrop-blur-[2px] z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Assistant Side Panel */}
      <aside 
        className={`fixed top-0 right-0 h-screen w-full md:w-[400px] bg-white border-l border-stone-200 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="p-6 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5D4037] text-white rounded-xl flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
            </div>
            <div>
              <img src="/Public/College Title.png" alt="College Title" className="h-5 w-auto object-contain opacity-90 mb-1" />
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Autonomous Assistant</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        {/* Message Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/20 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#5D4037] text-white rounded-tr-none' 
                  : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none font-medium'
              }`}>
                {msg.text === '...' ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          
          {/* Quick Suggestions */}
          {messages.length < 5 && (
            <div className="pt-4 space-y-2">
              <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-3">Suggested Inquiries</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => { setInput(s); handleSend(); }}
                    className="px-3 py-1.5 bg-white border border-stone-200 text-stone-600 text-[11px] font-semibold rounded-lg hover:border-[#5D4037] hover:text-[#5D4037] transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-stone-100 bg-white">
          <div className="flex items-center gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about policies, status, or help..."
              className="flex-1 px-4 py-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all placeholder:text-stone-400"
              maxLength={500}
            />
            
            {/* Attachment button - outside input */}
            <button 
              type="button"
              className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-all flex items-center justify-center flex-shrink-0"
              title="Attach files"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"></path>
              </svg>
            </button>
            
            {/* Send button - outside input */}
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 bg-[#5D4037] text-white rounded-lg transition-all flex items-center justify-center hover:bg-[#4E342E] shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#5D4037] flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-stone-500">Secure Academic Portal</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AIChatAssistant;
