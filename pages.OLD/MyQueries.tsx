
import React, { useState } from 'react';

interface Query {
  id: string;
  category: string;
  status: 'Submitted' | 'In Review' | 'On Hold' | 'Resolved';
  lastUpdated: string;
  description: string;
  aiNotes: string;
  adminRemarks?: string;
}

const MOCK_QUERIES: Query[] = [
  {
    id: '#BV-7721',
    category: 'Marksheet Error',
    status: 'In Review',
    lastUpdated: '2 hours ago',
    description: 'My name is misspelled on the Semester 4 marksheet. It should be "Johnathan" instead of "John".',
    aiNotes: 'The AI identified that the uploaded Aadhaar card matches the requested correction. Scan quality is high.',
    adminRemarks: 'Verification in progress with the registry database.'
  },
  {
    id: '#BV-7689',
    category: 'Re-evaluation',
    status: 'Resolved',
    lastUpdated: '2 days ago',
    description: 'Requesting re-evaluation for Advanced Mathematics (MA401). I believe there is a totaling error.',
    aiNotes: 'Automatic check shows totaling is correct. Passed to subject expert for manual review.',
    adminRemarks: 'Re-evaluation complete. No change in marks. Finalized on 24th Oct.'
  },
  {
    id: '#BV-7650',
    category: 'Duplicate Marksheet',
    status: 'On Hold',
    lastUpdated: '1 week ago',
    description: 'Lost original 1st year marksheet during relocation. Need a duplicate copy.',
    aiNotes: 'Missing FIR copy or affidavit for lost document as per university policy.',
    adminRemarks: 'Please upload the police complaint copy to proceed with the duplicate request.'
  }
];

const StatusBadge: React.FC<{ status: Query['status'] }> = ({ status }) => {
  const styles = {
    'Submitted': 'bg-stone-100 text-stone-600',
    'In Review': 'bg-amber-50 text-amber-700 border-amber-100',
    'On Hold': 'bg-red-50 text-red-700 border-red-100',
    'Resolved': 'bg-green-50 text-green-700 border-green-100'
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

interface MyQueriesProps {
  onBack: () => void;
}

const MyQueries: React.FC<MyQueriesProps> = ({ onBack }) => {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);

  if (selectedQuery) {
    const steps = ['Submitted', 'In Review', 'On Hold', 'Resolved'];
    const currentStepIndex = steps.indexOf(selectedQuery.status);

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setSelectedQuery(null)}
          className="flex items-center gap-2 text-stone-400 hover:text-[#5D4037] text-xs font-semibold uppercase tracking-widest mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.2em] mb-1">Query Details</div>
                  <h2 className="text-3xl font-semibold text-stone-900">{selectedQuery.id}</h2>
                  <p className="text-sm text-[#5D4037] font-medium mt-1">{selectedQuery.category}</p>
                </div>
                <StatusBadge status={selectedQuery.status} />
              </div>

              {/* Progress Timeline */}
              <div className="relative flex justify-between mb-12 px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -translate-y-1/2 z-0"></div>
                {steps.map((step, i) => {
                  const isActive = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-500 ${
                        isActive ? 'bg-[#5D4037] text-white' : 'bg-stone-200 text-stone-400'
                      }`}>
                        {isActive ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          <span className="text-[10px] font-semibold">{i + 1}</span>
                        )}
                      </div>
                      <span className={`absolute -bottom-6 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider ${
                        isCurrent ? 'text-[#5D4037]' : 'text-stone-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6 pt-6 border-t border-stone-100">
                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Issue Description</h4>
                  <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                    {selectedQuery.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-[#FAF9F8] border border-[#5D4037]/10 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#5D4037] text-white rounded flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
                      </div>
                      <h4 className="text-[10px] font-semibold text-stone-800 uppercase tracking-widest">AI Validation Notes</h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      "{selectedQuery.aiNotes}"
                    </p>
                  </div>

                  <div className="p-5 bg-white border border-stone-200 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-stone-100 text-stone-500 rounded flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      </div>
                      <h4 className="text-[10px] font-semibold text-stone-800 uppercase tracking-widest">Admin Remarks</h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {selectedQuery.adminRemarks || "No administrative remarks yet."}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Related Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 text-xs font-semibold text-stone-700 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Receipt
                </button>
                <button className="w-full py-3 px-4 text-xs font-semibold text-stone-700 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  Report Delay
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] uppercase tracking-[0.2em] mb-2">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            History
          </div>
          <h1 className="text-4xl font-semibold text-stone-900 leading-tight">My Query Tracking</h1>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Query ID</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Last Updated</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {MOCK_QUERIES.map((query) => (
                <tr key={query.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-stone-800 font-mono tracking-tight">{query.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-stone-600 font-medium">{query.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={query.status} />
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-stone-400 font-medium">{query.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => setSelectedQuery(query)}
                      className="text-[10px] font-semibold text-[#5D4037] hover:underline uppercase tracking-widest"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {MOCK_QUERIES.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-stone-400 text-sm">No queries found in your history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
