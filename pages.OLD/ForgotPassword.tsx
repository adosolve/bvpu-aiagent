
import React, { useState } from 'react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-sm p-8 text-center">
        {!submitted ? (
          <>
            <div className="w-12 h-12 bg-stone-100 text-[#5D4037] flex items-center justify-center rounded-full mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 className="text-xl font-semibold text-stone-900 mb-2">Reset Password</h2>
            <p className="text-stone-500 text-sm mb-8">Enter your registered email address or PRN to receive reset instructions.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or PRN"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#5D4037] outline-none text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#5D4037] text-white rounded-xl font-semibold text-sm hover:bg-[#4E342E] transition-all"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="py-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center rounded-full mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 className="text-xl font-semibold text-stone-900 mb-2">Check your inbox</h2>
            <p className="text-stone-500 text-sm mb-8">We've sent recovery instructions to the associated account for {email}.</p>
          </div>
        )}
        
        <button
          onClick={onBack}
          className="mt-6 text-xs font-semibold text-stone-400 hover:text-[#5D4037] flex items-center gap-2 mx-auto transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
