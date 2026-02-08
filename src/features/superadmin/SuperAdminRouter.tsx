import React, { useState } from 'react';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import SuperAdminTopNav from './components/SuperAdminTopNav';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import SuperAdminExamForms from './pages/SuperAdminExamForms';
import SuperAdminGradeCards from './pages/SuperAdminGradeCards';
import SuperAdminResults from './pages/SuperAdminResults';
import AdminManagement from './pages/AdminManagement';
import MVPStatus from './pages/MVPStatus';
import PublishNotification from '../admin/pages/PublishNotification';
import ProfileSettings from '../../shared/pages/ProfileSettings';
import Notifications from '../../shared/pages/Notifications';
import ChatHistory from '../../shared/pages/ChatHistory';
import { UserRole } from '../../shared/types/types';

interface SuperAdminRouterProps {
  onLogout: () => void;
  isMobile: boolean;
}

const SuperAdminRouter: React.FC<SuperAdminRouterProps> = ({ onLogout, isMobile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem('superAdminCurrentPath') || '/';
  });

  // Save current path to localStorage
  React.useEffect(() => {
    localStorage.setItem('superAdminCurrentPath', currentPath);
  }, [currentPath]);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'IMED AI Campus';
      case '/exams': return 'Examination Management';
      case '/exams/forms': return 'Exam Forms Management';
      case '/exams/grades': return 'Grade Cards Management';
      case '/exams/results': return 'Results Management';
      case '/tickets': return 'Query Management';
      case '/settings': return 'System Settings & Personnel';
      case '/mvp-status': return 'Project Completion Summary';
      case '/chat-history': return 'Chat History';
      case '/profile': return 'My Profile & Settings';
      case '/notifications': return 'Activity & System Notifications';
      case '/notifications/publish': return 'Publish Notification';
      default: return 'IMED AI Campus';
    }
  };

  const sidebarWidth = sidebarHovered ? 256 : 80;

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <SuperAdminDashboard />;
      case '/exams/forms':
        return <SuperAdminExamForms />;
      case '/exams/grades':
        return <SuperAdminGradeCards />;
      case '/exams/results':
        return <SuperAdminResults />;
      case '/settings':
        return <AdminManagement />;
      case '/mvp-status':
        return <MVPStatus />;
      case '/chat-history':
        return <ChatHistory />;
      case '/profile':
        return <ProfileSettings role={UserRole.SUPER_ADMIN} />;
      case '/notifications':
      case '/notifications/activity':
        return <Notifications role={UserRole.SUPER_ADMIN} />;
      case '/notifications/publish':
        return <PublishNotification role={UserRole.SUPER_ADMIN} />;
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
      <SuperAdminSidebar 
        isOpen={sidebarOpen} 
        currentRole={UserRole.SUPER_ADMIN} 
        onNavigate={(path) => {
          setCurrentPath(path);
        }} 
        activePath={currentPath}
        onClose={() => setSidebarOpen(false)}
        onHoverChange={setSidebarHovered}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <SuperAdminTopNav 
          currentRole={UserRole.SUPER_ADMIN}
          pageTitle={getPageTitle(currentPath)}
          onLogout={onLogout}
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
};

export default SuperAdminRouter;
