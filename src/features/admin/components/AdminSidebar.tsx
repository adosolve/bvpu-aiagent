
import React, { useState } from 'react';
import { UserRole, SidebarItem } from '../../../shared/types/types';
import { Icons, COLORS } from '../../../shared/constants/constants';

interface SidebarProps {
  isOpen: boolean;
  currentRole: UserRole;
  onNavigate: (path: string) => void;
  activePath: string;
  onClose?: () => void;
  onHoverChange?: (hovered: boolean) => void;
}

const sidebarItems: SidebarItem[] = [
  { 
    label: 'Dashboard', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>, 
    path: '/', 
    roles: [UserRole.ADMIN_CLERK] 
  },
  { 
    label: 'Query Pipeline', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>, 
    path: '/query-pipeline', 
    roles: [UserRole.ADMIN_CLERK] 
  },
  { 
    label: 'Excelations', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>, 
    path: '/excelations', 
    roles: [UserRole.ADMIN_CLERK] 
  },
];

const departmentSubItems = [
  { 
    label: 'Examination', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>, 
    path: '/department/examination' 
  },
  { 
    label: 'Accounts', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>, 
    path: '/department/accounts' 
  },
  { 
    label: 'Library', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>, 
    path: '/department/library' 
  },
  { 
    label: 'Admission', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>, 
    path: '/department/admission' 
  },
];

const communicationSubItems = [
  { 
    label: 'Notification', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>, 
    path: '/communication/notification' 
  },
  { 
    label: 'Generate Notification', 
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>, 
    path: '/communication/generate' 
  },
];



const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentRole, onNavigate, activePath, onClose, onHoverChange }) => {
  const filteredItems = sidebarItems.filter(item => item.roles.includes(currentRole));
  const [isHovered, setIsHovered] = useState(false);
  const [departmentExpanded, setDepartmentExpanded] = useState(false);
  const [communicationExpanded, setCommunicationExpanded] = useState(false);
  const shouldExpand = isHovered;

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
    setDepartmentExpanded(false);
    setCommunicationExpanded(false);
  };

  return (
    <aside 
      className={`sidebar-transition h-screen fixed left-0 top-0 bg-white border-r border-stone-200 z-40 overflow-hidden flex flex-col ${
        shouldExpand ? 'w-64' : 'w-20'
      }`}
      style={{ borderColor: COLORS.border }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-16 flex items-center justify-center px-4 border-b border-stone-100 shrink-0 relative">
        <div className="flex items-center justify-center w-full">
          {!shouldExpand ? (
            <img src="/IMED LOGO.jpg" alt="University Logo" className="w-8 h-8 rounded object-contain" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-1">
                <img src="/IMED LOGO.jpg" alt="University Logo" className="w-8 h-8 rounded object-contain" />
                <img src="/College Title.png" alt="College Title" className="h-12 w-auto object-contain opacity-90 animate-in fade-in duration-300" />
              </div>
              <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest animate-in fade-in duration-300 text-center">
                University Agentic Help Desk
              </span>
            </div>
          )}
        </div>
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
              <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                {item.label}
              </span>
            )}
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
        
        {/* Department Expandable Section */}
        <div className="space-y-1">
          <button
            onClick={() => setDepartmentExpanded(!departmentExpanded)}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative text-stone-500 hover:bg-stone-50 hover:text-stone-800"
          >
            <div className="flex items-center justify-center w-5 h-5 text-stone-400 group-hover:text-stone-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            {shouldExpand && (
              <>
                <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">
                  Department
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${departmentExpanded ? 'rotate-180' : ''}`}
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
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Department
              </div>
            )}
          </button>
          
          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-200 ${departmentExpanded && shouldExpand ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {departmentSubItems.map((subItem) => (
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

        {/* Communication Hub Expandable Section */}
        <div className="space-y-1">
          <button
            onClick={() => setCommunicationExpanded(!communicationExpanded)}
            className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative text-stone-500 hover:bg-stone-50 hover:text-stone-800"
          >
            <div className="flex items-center justify-center w-5 h-5 text-stone-400 group-hover:text-stone-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            {shouldExpand && (
              <>
                <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 flex-1 text-left">
                  Communication Hub
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${communicationExpanded ? 'rotate-180' : ''}`}
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
            {!shouldExpand && (
              <div className="absolute left-14 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Communication Hub
              </div>
            )}
          </button>
          
          {/* Sub-items */}
          <div className={`overflow-hidden transition-all duration-200 ${communicationExpanded && shouldExpand ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-6 space-y-1 pt-1">
              {communicationSubItems.map((subItem) => (
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

        {/* Profile Button */}
        <button
          onClick={() => onNavigate('/profile')}
          className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all group relative ${
            activePath === '/profile' 
              ? 'bg-stone-50 text-[#5D4037]' 
              : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
          }`}
        >
          <div className={`flex items-center justify-center w-5 h-5 ${activePath === '/profile' ? 'text-[#5D4037]' : 'text-stone-400 group-hover:text-stone-600'}`}>
            <Icons.User />
          </div>
          {shouldExpand && (
            <span className="text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
              Profile
            </span>
          )}
          {!shouldExpand && (
            <div className="absolute left-14 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Profile
            </div>
          )}
        </button>
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
      </div>
    </aside>
  );
};

export default Sidebar;
