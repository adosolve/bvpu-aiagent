
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import TopNav from './components/TopNav.tsx';
import AIChatAssistant from './components/AIChatAssistant.tsx';
import LoginPage from './pages/Login.tsx';
import ForgotPasswordPage from './pages/ForgotPassword.tsx';
import StudentDashboard from './pages/StudentDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import SuperAdminDashboard from './pages/SuperAdminDashboard.tsx';
import RaiseQuery from './pages/RaiseQuery.tsx';
import MyQueries from './pages/MyQueries.tsx';
import ConvocationSupport from './pages/ConvocationSupport.tsx';
import AdminManagement from './pages/AdminManagement.tsx';
import NotificationsPage from './pages/Notifications.tsx';
import ProfileSettings from './pages/ProfileSettings.tsx';
import ExamForms from './pages/ExamForms.tsx';
import GradeCards from './pages/GradeCards.tsx';
import Results from './pages/Results.tsx';
import PublishNotification from './pages/PublishNotification.tsx';
import AdminExamForms from './pages/AdminExamForms.tsx';
import AdminGradeCards from './pages/AdminGradeCards.tsx';
import AdminResults from './pages/AdminResults.tsx';
import SuperAdminExamForms from './pages/SuperAdminExamForms.tsx';
import SuperAdminGradeCards from './pages/SuperAdminGradeCards.tsx';
import SuperAdminResults from './pages/SuperAdminResults.tsx';
import MVPStatus from './pages/MVPStatus.tsx';
import ChatHistory from './pages/ChatHistory.tsx';
import { UserRole } from './types.ts';

type AppView = 'LOGIN' | 'FORGOT_PASSWORD' | 'DASHBOARD';

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [view, setView] = useState<AppView>(() => {
    const savedView = localStorage.getItem('userView');
    return (savedView as AppView) || 'LOGIN';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || UserRole.CANDIDATE;
  });
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem('currentPath') || '/';
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

  useEffect(() => {
    localStorage.setItem('currentPath', currentPath);
  }, [currentPath]);

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
    localStorage.removeItem('currentPath');
    setView('LOGIN');
    setCurrentPath('/');
  };

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'IMED AI Campus';
      case '/exams': return role === UserRole.CANDIDATE ? 'Convocation & Degree Services' : 'Examination Management';
      case '/helpdesk': return 'Raise New Query';
      case '/chat-history': return 'Chat History';
      case '/tickets': return role === UserRole.CANDIDATE ? 'My Query Tracking' : 'Query Management';
      case '/settings': return role === UserRole.SUPER_ADMIN ? 'System Settings & Personnel' : 'Profile & Account Settings';
      case '/profile': return 'My Profile & Settings';
      case '/notifications': return 'Activity & System Notifications';
      case '/mvp-status': return 'Project Completion Summary';
      default: return <img src="/Public/College Title.png" alt="College Title" className="h-8 w-auto object-contain opacity-90" />;
    }
  };

  const sidebarWidth = isMobile ? 0 : (sidebarOpen || sidebarHovered ? 256 : 80);

  const renderDashboard = () => (
    <div className="min-h-screen bg-white flex overflow-hidden relative">
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        currentRole={role} 
        onNavigate={(path) => {
          setCurrentPath(path);
          if (isMobile) setSidebarOpen(false);
        }} 
        activePath={currentPath}
        onClose={() => setSidebarOpen(false)}
        onHoverChange={setSidebarHovered}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <TopNav 
          currentRole={role}
          pageTitle={getPageTitle(currentPath)}
          onLogout={handleLogout}
          onOpenNotifications={() => setCurrentPath('/notifications')}
          onOpenProfile={() => setCurrentPath('/profile')}
          sidebarWidth={sidebarWidth}
        />
        
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  const renderContent = () => {
    if (currentPath === '/') {
      if (role === UserRole.CANDIDATE) return <StudentDashboard onNavigate={setCurrentPath} />;
      if (role === UserRole.ADMIN_CLERK) return <AdminDashboard />;
      if (role === UserRole.SUPER_ADMIN) return <SuperAdminDashboard />;
    }

    if (currentPath === '/notifications') return <NotificationsPage role={role} />;
    if (currentPath === '/notifications/activity') return <NotificationsPage role={role} />;
    if (currentPath === '/notifications/publish' && (role === UserRole.ADMIN_CLERK || role === UserRole.SUPER_ADMIN)) return <PublishNotification role={role} />;
    if (currentPath === '/chat-history') return <ChatHistory />;
    if (currentPath === '/profile') return <ProfileSettings role={role} />;
    if (currentPath === '/exams' && role === UserRole.CANDIDATE) return <ConvocationSupport />;
    if (currentPath === '/exams/forms' && role === UserRole.CANDIDATE) return <ExamForms />;
    if (currentPath === '/exams/forms' && role === UserRole.ADMIN_CLERK) return <AdminExamForms />;
    if (currentPath === '/exams/forms' && role === UserRole.SUPER_ADMIN) return <SuperAdminExamForms />;
    if (currentPath === '/exams/grades' && role === UserRole.CANDIDATE) return <GradeCards />;
    if (currentPath === '/exams/grades' && role === UserRole.ADMIN_CLERK) return <AdminGradeCards />;
    if (currentPath === '/exams/grades' && role === UserRole.SUPER_ADMIN) return <SuperAdminGradeCards />;
    if (currentPath === '/exams/results' && role === UserRole.CANDIDATE) return <Results />;
    if (currentPath === '/exams/results' && role === UserRole.ADMIN_CLERK) return <AdminResults />;
    if (currentPath === '/exams/results' && role === UserRole.SUPER_ADMIN) return <SuperAdminResults />;
    if (currentPath === '/helpdesk' && role === UserRole.CANDIDATE) return <RaiseQuery onBack={() => setCurrentPath('/')} />;
    if (currentPath === '/tickets' && role === UserRole.CANDIDATE) return <MyQueries onBack={() => setCurrentPath('/')} />;
    if (currentPath === '/tickets' && (role === UserRole.ADMIN_CLERK || role === UserRole.SUPER_ADMIN)) return <AdminDashboard />;
    if (currentPath === '/settings') {
      if (role === UserRole.SUPER_ADMIN) return <AdminManagement />;
      return <ProfileSettings role={role} />;
    }
    if (currentPath === '/mvp-status') return <MVPStatus />;

    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <h3 className="text-xl font-semibold text-stone-800 mb-2">Module Under Construction</h3>
        <p className="text-stone-500 text-sm max-w-xs mx-auto">This screen is part of a future implementation step.</p>
      </div>
    );
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
