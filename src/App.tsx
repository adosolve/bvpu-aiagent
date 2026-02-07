import React, { useState, useEffect } from 'react';
import LoginPage from './shared/pages/Login';
import ForgotPasswordPage from './shared/pages/ForgotPassword';
import StudentRouter from './features/student/StudentRouter';
import AdminRouter from './features/admin/AdminRouter';
import SuperAdminRouter from './features/superadmin/SuperAdminRouter';
import { UserRole } from './shared/types/types';

type AppView = 'LOGIN' | 'FORGOT_PASSWORD' | 'DASHBOARD';

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [view, setView] = useState<AppView>(() => {
    const savedView = localStorage.getItem('userView');
    return (savedView as AppView) || 'LOGIN';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || UserRole.CANDIDATE;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userView', view);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('userRole', role);
  }, [role]);

  // Update document title based on role and view
  useEffect(() => {
    if (view === 'DASHBOARD') {
      switch (role) {
        case UserRole.CANDIDATE:
          document.title = 'BVPU - AI Campus for Students';
          break;
        case UserRole.ADMIN_CLERK:
          document.title = 'BVPU - AI Campus for Admin';
          break;
        case UserRole.SUPER_ADMIN:
          document.title = 'BVPU - AI Campus for SuperAdmin';
          break;
        default:
          document.title = 'BVPU - AI Campus';
      }
    } else {
      document.title = 'BVPU - AI Campus';
    }
  }, [view, role]);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('userView');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentCurrentPath');
    localStorage.removeItem('adminCurrentPath');
    localStorage.removeItem('superAdminCurrentPath');
    setView('LOGIN');
  };

  const renderDashboard = () => {
    switch (role) {
      case UserRole.CANDIDATE:
        return <StudentRouter onLogout={handleLogout} isMobile={isMobile} />;
      case UserRole.ADMIN_CLERK:
        return <AdminRouter onLogout={handleLogout} isMobile={isMobile} />;
      case UserRole.SUPER_ADMIN:
        return <SuperAdminRouter onLogout={handleLogout} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  switch (view) {
    case 'LOGIN':
      return <LoginPage onLogin={handleLogin} onForgotPassword={() => setView('FORGOT_PASSWORD')} />;
    case 'FORGOT_PASSWORD':
      return <ForgotPasswordPage onBack={() => setView('LOGIN')} />;
    case 'DASHBOARD':
      return renderDashboard();
    default:
      return null;
  }
};

export default App;
