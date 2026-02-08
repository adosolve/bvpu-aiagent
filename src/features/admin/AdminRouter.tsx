import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopNav from './components/AdminTopNav';
import AdminDashboard from './pages/AdminDashboard';
import AdminExamForms from './pages/AdminExamForms';
import AdminGradeCards from './pages/AdminGradeCards';
import AdminResults from './pages/AdminResults';
import PublishNotification from './pages/PublishNotification';
import Escalations from './pages/Escalations';
import NotificationList from './pages/NotificationList';
import GenerateNotification from './pages/GenerateNotification';
import QueryPipeline from './pages/QueryPipeline';
import ExaminationDept from './pages/ExaminationDept';
import ProfileSettings from '../../shared/pages/ProfileSettings';
import Notifications from '../../shared/pages/Notifications';
import ChatHistory from '../../shared/pages/ChatHistory';
import { UserRole } from '../../shared/types/types';

interface AdminRouterProps {
  onLogout: () => void;
  isMobile: boolean;
}

const AdminRouter: React.FC<AdminRouterProps> = ({ onLogout, isMobile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem('adminCurrentPath') || '/';
  });

  // Save current path to localStorage
  React.useEffect(() => {
    localStorage.setItem('adminCurrentPath', currentPath);
  }, [currentPath]);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/query-pipeline': return 'Query Pipeline';
      case '/excelations': return 'Excelations';
      case '/department/examination': return 'Department - Examination';
      case '/department/accounts': return 'Department - Accounts';
      case '/department/library': return 'Department - Library';
      case '/department/admission': return 'Department - Admission';
      case '/communication/notification': return 'Communication Hub - Notifications';
      case '/communication/generate': return 'Communication Hub - Generate Notification';
      case '/profile': return 'Profile';
      default: return 'Dashboard';
    }
  };

  const sidebarWidth = sidebarHovered ? 256 : 80;

  const renderContent = () => {
    switch (currentPath) {
      case '/':
      case '/tickets':
        return <AdminDashboard />;
      case '/query-pipeline':
        return <QueryPipeline />;
      case '/excelations':
        return <Escalations />;
      case '/department/examination':
        return <ExaminationDept />;
      case '/communication/notification':
        return <NotificationList />;
      case '/communication/generate':
        return <GenerateNotification />;
      case '/exams/forms':
        return <AdminExamForms />;
      case '/exams/grades':
        return <AdminGradeCards />;
      case '/exams/results':
        return <AdminResults />;
      case '/chat-history':
        return <ChatHistory />;
      case '/profile':
        return <ProfileSettings role={UserRole.ADMIN_CLERK} />;
      case '/notifications':
      case '/notifications/activity':
        return <Notifications role={UserRole.ADMIN_CLERK} />;
      case '/notifications/publish':
        return <PublishNotification role={UserRole.ADMIN_CLERK} />;
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
      <AdminSidebar 
        isOpen={sidebarOpen} 
        currentRole={UserRole.ADMIN_CLERK} 
        onNavigate={(path) => {
          setCurrentPath(path);
        }} 
        activePath={currentPath}
        onClose={() => setSidebarOpen(false)}
        onHoverChange={setSidebarHovered}
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <AdminTopNav 
          currentRole={UserRole.ADMIN_CLERK}
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

export default AdminRouter;
