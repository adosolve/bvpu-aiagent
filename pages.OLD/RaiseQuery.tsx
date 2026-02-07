
import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';

const CATEGORIES = [
  'Marksheet Error',
  'Name Correction',
  'Absent Issue',
  'Duplicate Marksheet',
  'Re-evaluation',
  'Convocation',
  'Others'
];

interface AIAdvice {
  warning?: string;
  mistakes: string[];
  suggestions: string[];
}

const AI_GUIDANCE: Record<string, AIAdvice> = {
  'Marksheet Error': {
    warning: 'Ensure you have a scanned copy of the original marksheet.',
    mistakes: ['Uploading a photo instead of a clear PDF scan', 'Not highlighting the specific error'],
    suggestions: ['Check if the seat number is correct', 'Attach the hall ticket for reference']
  },
  'Name Correction': {
    warning: 'Legal proof is mandatory for name changes.',
    mistakes: ['Providing nickname instead of formal name', 'Missing 10th/12th certificate copy'],
    suggestions: ['Upload your Aadhaar Card or Passport', 'Verify spelling against official records']
  },
  'Absent Issue': {
    warning: 'Requires attendance proof from the exam center.',
    mistakes: ['Not mentioning the exam date', 'Missing subject code'],
    suggestions: ['Attach a copy of the signature sheet if available', 'Mention the block number']
  },
  'Default': {
    mistakes: ['Incomplete description', 'Blurry document uploads'],
    suggestions: ['Be specific with dates and codes', 'Ensure all attachments are under 5MB']
  }
};

interface RaiseQueryProps {
  onBack: () => void;
}

const RaiseQuery: React.FC<RaiseQueryProps> = ({ onBack }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const guidance = AI_GUIDANCE[category] || AI_GUIDANCE['Default'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500 p-6">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-2">Query Submitted</h2>
        <p className="text-stone-500 mb-8 max-w-sm text-sm">Your query has been logged successfully. Ticket ID: #BV-7721. You can track status in 'My Queries'.</p>
        <button 
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3 bg-[#5D4037] text-white rounded-full font-semibold text-sm shadow-lg hover:bg-[#4E342E] transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-stone-400 hover:text-[#5D4037] text-xs font-semibold uppercase tracking-widest mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-stone-200 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-stone-900 mb-6">Raise New Query</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Query Category</label>
                <select 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none bg-stone-50/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Detailed Description</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your issue in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none bg-stone-50/50 text-sm min-h-[150px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Supporting Documents</label>
                <div className="border-2 border-dashed border-stone-200 rounded-2xl p-6 md:p-8 text-center hover:border-[#5D4037]/30 transition-colors cursor-pointer group bg-stone-50/30">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-stone-400 group-hover:text-[#5D4037] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  <p className="text-sm font-semibold text-stone-700">Click to upload or drag</p>
                  <p className="text-[9px] text-stone-400 mt-1 uppercase tracking-widest">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#5D4037] text-white rounded-xl font-semibold text-sm shadow-xl shadow-[#5D4037]/10 hover:bg-[#4E342E] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </>
                ) : 'Submit Query'}
              </button>
            </form>
          </section>
        </div>

        {/* AI Sidebar Section */}
        <div className="space-y-6">
          <aside className="bg-[#FAF9F8] border border-[#5D4037]/10 rounded-2xl md:rounded-3xl p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#5D4037] text-white rounded-lg flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 1 1-10 10h10V2z"></path></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-800">AI Assistance</h3>
                <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-widest">Live Feedback</p>
              </div>
            </div>

            <div className="space-y-6">
              {guidance.warning && (
                <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-700 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <span className="text-[10px] font-semibold uppercase">Important</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-medium">{guidance.warning}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <div>
                  <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.15em] mb-3 border-b border-stone-200 pb-1">Common Mistakes</h4>
                  <ul className="space-y-2">
                    {guidance.mistakes.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-stone-600">
                        <span className="text-red-400 mt-0.5">•</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold text-stone-400 uppercase tracking-[0.15em] mb-3 border-b border-stone-200 pb-1">AI Suggestions</h4>
                  <ul className="space-y-2">
                    {guidance.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-stone-600 font-medium">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200/50">
              <p className="text-[10px] text-stone-400 italic leading-relaxed text-center">
                Our AI helps you submit accurate requests to ensure faster resolution by the Examination Dept.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RaiseQuery;
