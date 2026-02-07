import React, { useState } from 'react';
import StudentSidebar from './components/StudentSidebar';
import StudentTopNav from './components/StudentTopNav';
import StudentDashboard from './pages/StudentDashboard';
import ExamForms from './pages/ExamForms';
import GradeCards from './pages/GradeCards';
import Results from './pages/Results';
import RaiseQuery from './pages/RaiseQuery';
import MyQueries from './pages/MyQueries';
import ConvocationSupport from './pages/ConvocationSupport';
import DocumentVault from './pages/DocumentVault';
import ProfileSettings from '../../shared/pages/ProfileSettings';
import Notifications from '../../shared/pages/Notifications';
import ChatHistory from '../../shared/pages/ChatHistory';
import { UserRole } from '../../shared/types/types';

interface StudentRouterProps {
  onLogout: () => void;
  isMobile: boolean;
}

const StudentRouter: React.FC<StudentRouterProps> = ({ onLogout, isMobile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile menu toggle
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem('studentCurrentPath') || '/';
  });
  const [profileSection, setProfileSection] = useState<string>('profile');

  // Save current path to localStorage
  React.useEffect(() => {
    localStorage.setItem('studentCurrentPath', currentPath);
  }, [currentPath]);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Chat with Agent';
      case '/chat-history': return 'Chat History';
      case '/document-vault': return 'Document Vault';
      case '/exams': return 'Examination';
      case '/exams/forms': return 'Exam Form';
      case '/exams/marksheets': return 'Marksheets';
      case '/query-status': return 'Query Status';
      case '/notifications': return 'Notification';
      case '/profile': return 'My Profile & Settings';
      default: return 'IMED AI Campus';
    }
  };

  const sidebarWidth = isMobile ? (sidebarOpen ? 256 : 0) : (sidebarHovered ? 256 : 80);

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <StudentDashboard onNavigate={setCurrentPath} />;
      case '/chat-history':
        return <ChatHistory />;
      case '/document-vault':
        return <DocumentVault />;
      case '/exams':
        return <ConvocationSupport />;
      case '/exams/forms':
        return <ExamForms />;
      case '/exams/marksheets':
        return <GradeCards />;
      case '/query-status':
        return <MyQueries onBack={() => setCurrentPath('/')} />;
      case '/notifications':
        return <Notifications role={UserRole.CANDIDATE} />;
      case '/profile':
        return <ProfileSettings role={UserRole.CANDIDATE} section={profileSection} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">Module Under Construction</h3>
            <p className="text-stone-500 text-sm max-w-xs mx-auto">This screen is part of a future implementation step.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden relative">
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 transition-opacity animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <StudentSidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile}
        currentRole={UserRole.CANDIDATE} 
        onNavigate={(path) => {
          setCurrentPath(path);
          if (isMobile) setSidebarOpen(false);
        }} 
        activePath={currentPath}
        onClose={() => setSidebarOpen(false)}
        onHoverChange={setSidebarHovered}
        isHovered={sidebarHovered}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <StudentTopNav 
          currentRole={UserRole.CANDIDATE}
          pageTitle={getPageTitle(currentPath)}
          onLogout={onLogout}
          onOpenNotifications={() => setCurrentPath('/notifications')}
          onOpenProfile={() => {
            setProfileSection('profile');
            setCurrentPath('/profile');
          }}
          onOpenProfilePassword={() => {
            setProfileSection('password');
            setCurrentPath('/profile');
          }}
          sidebarWidth={sidebarWidth}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
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
};

export default StudentRouter;
