
import React, { useState } from 'react';
import { UserRole } from '../types/types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onForgotPassword: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin, onForgotPassword }) => {
  const [role, setRole] = useState<UserRole | ''>('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier && password && role) {
      onLogin(role as UserRole);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden pt-8">
      {/* Subtle Radial Background */}
      <div className="absolute inset-0 bg-radial-gradient from-stone-50/30 via-transparent to-transparent" style={{ background: 'radial-gradient(circle at 35% 50%, rgba(245, 245, 244, 0.3) 0%, transparent 60%)' }}></div>
      
      {/* Background Illustration with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: "url('/Public/Login Page Illustration.png')" }}
        ></div>
        {/* White to Transparent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
        {/* Subtle Curved Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Login Card - Center-Left */}
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="bg-white/98 backdrop-blur-sm border border-stone-200/60 rounded-[2rem] shadow-[0_20px_60px_rgba(93,64,55,0.08)] overflow-visible" style={{ width: '440px', minHeight: '600px' }}>
            <div className="p-6 text-center border-b border-stone-50">
              <div className="flex flex-col items-center">
                <img src="/Public/IMED LOGO.jpg" alt="University Logo" className="w-16 h-16 rounded-2xl object-contain shadow-lg mb-1" />
                <img src="/Public/College Title.png" alt="College Title" className="max-w-[200px] h-auto object-contain opacity-90" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 pb-8">
              <div className="space-y-3">
                {/* Role Selection Tabs */}
                <div>
                  <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-[0.2em] mb-3">Select Role</label>
                  <div className="flex bg-stone-50 rounded-xl p-1 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setRole(UserRole.CANDIDATE)}
                      className={`flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                        role === UserRole.CANDIDATE
                          ? 'bg-white text-[#5D4037] shadow-sm border border-stone-200'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(UserRole.ADMIN_CLERK)}
                      className={`flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                        role === UserRole.ADMIN_CLERK
                          ? 'bg-white text-[#5D4037] shadow-sm border border-stone-200'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(UserRole.SUPER_ADMIN)}
                      className={`flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                        role === UserRole.SUPER_ADMIN
                          ? 'bg-white text-[#5D4037] shadow-sm border border-stone-200'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      Super Admin
                    </button>
                  </div>
                </div>

                {/* PRN/Email Input */}
                <div>
                  <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest mb-2">
                    {role === UserRole.CANDIDATE ? 'PRN Number / Email' : 'Employee ID / Staff Email'}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={role === UserRole.CANDIDATE ? "e.g. 20240012" : "e.g. ADM-102"}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all text-sm text-stone-800 placeholder:text-stone-300 font-medium focus:scale-[1.02] transform"
                  />
                  <p className="text-[8px] text-stone-400 mt-1 font-medium">Use PRN for students, email for staff</p>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-[9px] font-semibold text-stone-400 uppercase tracking-widest">Password</label>
                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-[9px] font-semibold text-[#5D4037] hover:underline uppercase tracking-widest"
                    >
                      Recovery?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all text-sm text-stone-800 placeholder:text-stone-300 font-medium focus:scale-[1.02] transform"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!identifier || !password || !role}
                className="w-full py-4 mt-8 bg-black text-white rounded-2xl font-semibold text-sm uppercase tracking-[0.15em] shadow-2xl shadow-black/30 hover:shadow-black/40 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
              >
                Login
              </button>
            </form>

            <div className="px-6 pb-6 text-center">
              <p className="text-[8px] text-black uppercase tracking-[0.3em] font-semibold">
                University Secure Gateway • BVPU Established 1924
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default LoginPage;
