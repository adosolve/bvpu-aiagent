
import React, { useState } from 'react';
import { UserRole, SidebarItem } from '../../../shared/types/types';
import { Icons, COLORS } from '../../../shared/constants/constants';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  activePath: string;
  onClose?: () => void;
  onHoverChange?: (hovered: boolean) => void;
  isHovered: boolean;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Chat with Agent', icon: <Icons.Dashboard />, path: '/', roles: [UserRole.CANDIDATE] },
  { label: 'Chat History', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 10h.01"></path><path d="M12 10h.01"></path><path d="M16 10h.01"></path></svg>, path: '/chat-history', roles: [UserRole.CANDIDATE] },
  { label: 'Document Vault', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="2"></circle></svg>, path: '/document-vault', roles: [UserRole.CANDIDATE] },
];

const examinationSubItems = [
  { 
    label: 'Exam Form', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>, 
    path: '/exams/forms' 
  },
  { 
    label: 'Marksheets', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>, 
    path: '/exams/marksheets' 
  },
];



const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, currentRole, onNavigate, activePath, onClose, onHoverChange, isHovered }) => {
  const filteredItems = sidebarItems.filter(item => item.roles.includes(currentRole));
  const [examinationExpanded, setExaminationExpanded] = useState(false);
  const shouldExpand = isMobile ? isOpen : isHovered;

  const handleMouseEnter = () => {
    if (!isMobile) {
      onHoverChange?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      onHoverChange?.(false);
      setExaminationExpanded(false); // Collapse examination menu when mouse leaves
    }
  };

  return (
    <aside 
      className={`sidebar-transition h-screen fixed left-0 top-0 bg-white border-r border-stone-200 z-40 overflow-hidden flex flex-col ${
        isMobile 
          ? (isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full')
          : (shouldExpand ? 'w-64' : 'w-20')
      }`}
      style={{ borderColor: COLORS.border }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-16 flex items-center justify-center px-4 border-b border-stone-100 shrink-0 relative">
        <div className="flex items-center justify-center w-full overflow-hidden">
          {!shouldExpand ? (
            <img src="/IMED LOGO.jpg" alt="University Logo" className="w-8 h-8 rounded object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-1">
                <img src="/IMED LOGO.jpg" alt="University Logo" className="w-8 h-8 rounded object-contain" />
                <img src="/College Title.png" alt="College Title" className="h-12 w-auto object-contain opacity-90 animate-in fade-in duration-200" />
              </div>
              <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest animate-in fade-in duration-200 text-center">
                University Agentic Help Desk
              </span>
            </div>
          )}
        </div>
        {isMobile && shouldExpand && (
          <button 
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-lg absolute top-2 right-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${
              activePath === item.path 
                ? 'bg-stone-50 text-[#5D4037]' 
                : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
            }`}
          >
            <div className={`flex items-center justify-center w-5 h-5 ${activePath === item.path ? 'text-[#5D4037]' : 'text-stone-400 group-hover:text-stone-600'}`}>
              {item.icon}
            </div>
            {shouldExpand && (
              <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
                {item.label}
              </span>
            )}
            {!shouldExpand && !isMobile && (
              <div className="absolute left-16 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            )}
          </button>
        ))}
        
        {/* Examination Expandable Section */}
        <div className="space-y-1">
          <button
            onClick={() => setExaminationExpanded(!examinationExpanded)}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative text-stone-500 hover:bg-stone-50 hover:text-stone-800"
          >
            <div className="flex items-center justify-center w-5 h-5 text-stone-400 group-hover:text-stone-600">
              <Icons.Exams />
            </div>
            {shouldExpand && (
              <>
                <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200 flex-1 text-left">
                  Examination
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${examinationExpanded ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            )}
            {!shouldExpand && !isMobile && (
              <div className="absolute left-16 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Examination
              </div>
            )}
          </button>
          
          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-200 ${examinationExpanded && shouldExpand ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {examinationSubItems.map((subItem) => (
                <button
                  key={subItem.path}
                  onClick={() => onNavigate(subItem.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group text-xs ${
                    activePath === subItem.path 
                      ? 'bg-stone-50 text-[#5D4037]' 
                      : 'text-stone-400 hover:bg-stone-50 hover:text-stone-600'
                  }`}
                >
                  <div className={`flex items-center justify-center w-4 h-4 ${activePath === subItem.path ? 'text-[#5D4037]' : 'text-stone-300 group-hover:text-stone-500'}`}>
                    {subItem.icon}
                  </div>
                  <span className="font-medium whitespace-nowrap">
                    {subItem.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Query Status Button */}
        <button
          onClick={() => onNavigate('/query-status')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${
            activePath === '/query-status' 
              ? 'bg-stone-50 text-[#5D4037]' 
              : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
          }`}
        >
          <div className={`flex items-center justify-center w-5 h-5 ${activePath === '/query-status' ? 'text-[#5D4037]' : 'text-stone-400 group-hover:text-stone-600'}`}>
            <Icons.Tickets />
          </div>
          {shouldExpand && (
            <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
              Query Status
            </span>
          )}
          {!shouldExpand && !isMobile && (
            <div className="absolute left-16 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
              Query Status
            </div>
          )}
        </button>
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        {/* Notification Button */}
        <button 
          onClick={() => onNavigate('/notifications')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${
            activePath === '/notifications' 
              ? 'bg-stone-50 text-[#5D4037]' 
              : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
          }`}
        >
          <div className={`flex items-center justify-center w-5 h-5 ${activePath === '/notifications' ? 'text-[#5D4037]' : 'text-stone-400 group-hover:text-stone-600'}`}>
            <Icons.Bell />
          </div>
          {shouldExpand && (
            <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
              Notification
            </span>
          )}
          {!shouldExpand && !isMobile && (
            <div className="absolute left-16 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
              Notification
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
