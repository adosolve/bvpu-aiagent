
// Add React import to fix "Cannot find namespace 'React'" error
import React from 'react';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_CLERK = 'ADMIN_CLERK',
  CANDIDATE = 'CANDIDATE'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}
