import React, { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;   // < 768px  → mobile
const TABLET_BREAKPOINT = 1024;  // < 1024px → tablet

function getDeviceType(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (width < MOBILE_BREAKPOINT) return 'mobile';
  if (width < TABLET_BREAKPOINT) return 'tablet';
  return 'desktop';
}

const DeviceGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    () => getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (deviceType === 'desktop') {
    return <>{children}</>;
  }

  const isTablet = deviceType === 'tablet';

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50 opacity-80" />

      <div className="relative z-10 max-w-sm w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/IMED LOGO.jpg"
            alt="BVPU Logo"
            className="w-16 h-16 rounded-2xl object-contain shadow-md"
          />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center shadow-inner">
            {isTablet ? (
              /* Tablet icon */
              <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth={1.5} fill="none" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            ) : (
              /* Mobile icon */
              <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth={1.5} fill="none" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
              </svg>
            )}
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-stone-800 mb-2">
          Desktop Only
        </h1>

        {/* Message */}
        <p className="text-stone-500 text-sm leading-relaxed mb-6">
          The <span className="font-medium text-stone-700">BVPU AI Campus</span> portal is optimised
          for desktop and laptop screens. {isTablet ? 'Tablet' : 'Mobile'} devices are not supported.
        </p>

        {/* Disclaimer card */}
        <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm text-left">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-700 mb-1">Disclaimer</p>
              <p className="text-xs text-stone-500 leading-relaxed">
                This system is intended for use on desktop or laptop computers only. Access from mobile
                or tablet devices is restricted to ensure the best experience and data integrity.
                Please switch to a desktop browser to continue.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-stone-400">
          Bharati Vidyapeeth (Deemed to be University) · IMED
        </p>
      </div>
    </div>
  );
};

export default DeviceGuard;
