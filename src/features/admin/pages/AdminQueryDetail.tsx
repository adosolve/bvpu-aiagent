
import React, { useState } from 'react';

interface AdminQueryDetailProps {
  query: {
    id: string;
    studentName: string;
    prn: string;
    category: string;
    receivedAt: string;
    status: 'Pending' | 'In Review' | 'On Hold' | 'Resolved';
  };
  onBack: () => void;
}

const AdminQueryDetail: React.FC<AdminQueryDetailProps> = ({ query, onBack }) => {
  const [remarks, setRemarks] = useState('');
  const [currentStatus, setCurrentStatus] = useState(query.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      onBack(); // In prototype, just return to list after "updating"
    }, 1000);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-stone-100 text-stone-600 border-stone-200';
      case 'In Review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'On Hold': return 'bg-red-50 text-red-700 border-red-200';
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-stone-50 text-stone-500';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-stone-400 hover:text-[#5D4037] text-xs font-semibold uppercase tracking-widest mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Queue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em] mb-1">Administrative Review</div>
                <h2 className="text-3xl font-semibold text-stone-900">{query.id}</h2>
                <p className="text-sm text-[#5D4037] font-medium mt-1">{query.category}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusStyle(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>

            {/* Student Info Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 mb-8 flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-stone-300 border border-stone-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-800">{query.studentName}</h4>
                <div className="flex gap-4 mt-1">
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">PRN: <span className="text-stone-600 font-mono">{query.prn}</span></span>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Dept: <span className="text-stone-600">Examination</span></span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.15em] mb-3">Student's Description</h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-white border border-stone-100 p-5 rounded-xl shadow-sm italic">
                  "I have noticed that my surname is spelled incorrectly on my 4th semester marksheet. It appears as 'Harvard' but should be 'Harvards'. I have attached my 10th grade certificate as proof of the correct spelling."
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.15em] mb-3">Attached Documents</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="group border border-stone-200 rounded-xl p-3 flex items-center gap-3 hover:border-[#5D4037]/30 transition-all cursor-pointer bg-stone-50/50">
                    <div className="w-8 h-8 bg-white border border-stone-100 rounded flex items-center justify-center text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line></svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-stone-700 truncate max-w-[80px]">marksheet_sem4.pdf</div>
                      <div className="text-[9px] text-stone-400 font-semibold uppercase tracking-tighter">1.2 MB</div>
                    </div>
                  </div>
                  <div className="group border border-stone-200 rounded-xl p-3 flex items-center gap-3 hover:border-[#5D4037]/30 transition-all cursor-pointer bg-stone-50/50">
                    <div className="w-8 h-8 bg-white border border-stone-100 rounded flex items-center justify-center text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-stone-700 truncate max-w-[80px]">10th_cert.jpg</div>
                      <div className="text-[9px] text-stone-400 font-semibold uppercase tracking-tighter">450 KB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Actions Column */}
        <div className="space-y-6">
          {/* AI Panel */}
          <aside className="bg-[#FAF9F8] border border-[#5D4037]/10 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#5D4037] text-white rounded-lg flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-800">AI Analysis</h3>
                <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-widest">Automated Insight</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/60 p-3 rounded-xl border border-stone-100">
                <div className="text-[9px] font-semibold text-stone-400 uppercase mb-1">OCR Validation</div>
                <div className="text-xs text-stone-700 leading-relaxed font-medium">
                  Verified name "Johnathan Harvard" found in 10th cert. Marksheet sem4 shows "John Harvard".
                  <span className="text-red-500 ml-1 font-semibold italic">Mismatched Detected.</span>
                </div>
              </div>
              <div className="bg-white/60 p-3 rounded-xl border border-stone-100">
                <div className="text-[9px] font-semibold text-stone-400 uppercase mb-1">Confidence Score</div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#5D4037] h-full w-[94%]"></div>
                </div>
                <div className="text-[9px] text-stone-400 mt-1 font-semibold">94% Automated Resolution Match</div>
              </div>
            </div>
          </aside>

          {/* Admin Action Panel */}
          <section className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Official Action</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">Status Update</label>
                <select 
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold outline-none bg-stone-50 cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">Admin Remarks</label>
                <textarea 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Internal notes or response to student..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs outline-none bg-stone-50 min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button 
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="w-full py-3 bg-[#5D4037] text-white rounded-xl font-semibold text-xs shadow-lg hover:bg-[#4E342E] transition-all flex items-center justify-center gap-2"
                >
                  {isUpdating ? 'Updating...' : 'Update Ticket'}
                </button>
                <button 
                  className="w-full py-3 bg-white text-red-600 border border-red-100 rounded-xl font-semibold text-xs hover:bg-red-50 transition-all"
                >
                  Reject Request
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminQueryDetail;
