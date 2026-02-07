# Project Architecture - Feature-Based Separation

## 📁 Directory Structure

```
src/
├── features/                    # Feature-based modules (isolated by user role)
│   ├── student/                # Student-specific features
│   │   ├── pages/              # Student pages
│   │   ├── components/         # Student-specific components
│   │   ├── hooks/              # Student-specific hooks
│   │   ├── services/           # Student API services
│   │   ├── context/            # Student state management
│   │   └── StudentRouter.tsx   # Student routing logic
│   │
│   ├── admin/                  # Admin-specific features
│   │   ├── pages/              # Admin pages
│   │   ├── components/         # Admin-specific components
│   │   ├── hooks/              # Admin-specific hooks
│   │   ├── services/           # Admin API services
│   │   ├── context/            # Admin state management
│   │   └── AdminRouter.tsx     # Admin routing logic
│   │
│   └── superadmin/             # SuperAdmin-specific features
│       ├── pages/              # SuperAdmin pages
│       ├── components/         # SuperAdmin-specific components
│       ├── hooks/              # SuperAdmin-specific hooks
│       ├── services/           # SuperAdmin API services
│       ├── context/            # SuperAdmin state management
│       └── SuperAdminRouter.tsx # SuperAdmin routing logic
│
├── shared/                     # Shared resources across all features
│   ├── pages/                  # Shared pages (Login, Profile, etc.)
│   ├── components/             # Shared components
│   ├── hooks/                  # Shared hooks
│   ├── services/               # Shared API services
│   ├── context/                # Shared state management
│   ├── types/                  # TypeScript types and interfaces
│   ├── constants/              # Constants and configurations
│   └── assets/                 # Images, fonts, etc.
│
├── core/                       # Core utilities and configurations
│   ├── config/                 # App configuration
│   └── utils/                  # Utility functions
│
└── App.tsx                     # Main app component (role-based routing)
```

## 🎯 Key Principles

### 1. **Isolation by User Role**
- Each user type (Student, Admin, SuperAdmin) has its own isolated feature module
- Changes to one user type won't affect others
- Clear separation of concerns

### 2. **Feature-Based Organization**
- All related code for a feature is in one place
- Easy to find and maintain
- Scalable architecture

### 3. **Shared Resources**
- Common components, utilities, and types are in the `shared` folder
- Prevents code duplication
- Maintains consistency across features

### 4. **Router Separation**
- Each feature has its own router
- Independent navigation logic
- Easier to test and maintain

## 🔄 Data Flow

```
App.tsx (Main Router)
    ↓
Role-Based Router (Student/Admin/SuperAdmin)
    ↓
Feature Pages
    ↓
Feature Components
    ↓
Shared Components/Services
```

## 📝 File Mapping

### Student Feature
- **Pages**: StudentDashboard, ExamForms, GradeCards, Results, RaiseQuery, MyQueries, ConvocationSupport
- **Components**: StudentSidebar, StudentTopNav
- **Router**: StudentRouter.tsx

### Admin Feature
- **Pages**: AdminDashboard, AdminExamForms, AdminGradeCards, AdminResults, PublishNotification
- **Components**: AdminSidebar, AdminTopNav
- **Router**: AdminRouter.tsx

### SuperAdmin Feature
- **Pages**: SuperAdminDashboard, SuperAdminExamForms, SuperAdminGradeCards, SuperAdminResults, AdminManagement, MVPStatus
- **Components**: SuperAdminSidebar, SuperAdminTopNav
- **Router**: SuperAdminRouter.tsx

### Shared Resources
- **Pages**: Login, ForgotPassword, ProfileSettings, Notifications, ChatHistory
- **Components**: AIChatAssistant
- **Types**: UserRole, User, SidebarItem
- **Constants**: Icons, Colors

## 🚀 Benefits

1. **Maintainability**: Easy to locate and modify code for specific user types
2. **Scalability**: Add new features without affecting existing ones
3. **Team Collaboration**: Multiple developers can work on different features simultaneously
4. **Testing**: Easier to write unit and integration tests for isolated features
5. **Code Reusability**: Shared components prevent duplication
6. **Clear Boundaries**: Well-defined interfaces between features

## 🔧 Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - src root
- `@shared/*` - shared resources
- `@student/*` - student feature
- `@admin/*` - admin feature
- `@superadmin/*` - superadmin feature

Example:
```typescript
import { UserRole } from '@shared/types';
import StudentDashboard from '@student/pages/StudentDashboard';
```

## 📦 Adding New Features

### For a specific user type:
1. Create files in the appropriate feature folder (`student/`, `admin/`, or `superadmin/`)
2. Update the feature's router
3. Add necessary types/constants to shared if needed

### For shared functionality:
1. Create files in the `shared/` folder
2. Export from appropriate index files
3. Import in feature modules as needed

## 🔐 Backend Integration (Future)

When adding backend:
```
src/
├── features/
│   ├── student/
│   │   └── services/
│   │       ├── studentApi.ts       # Student-specific API calls
│   │       └── studentAuth.ts      # Student authentication
│   ├── admin/
│   │   └── services/
│   │       ├── adminApi.ts         # Admin-specific API calls
│   │       └── adminAuth.ts        # Admin authentication
│   └── superadmin/
│       └── services/
│           ├── superAdminApi.ts    # SuperAdmin-specific API calls
│           └── superAdminAuth.ts   # SuperAdmin authentication
└── shared/
    └── services/
        ├── api.ts                  # Base API configuration
        └── auth.ts                 # Shared authentication logic
```

## 📊 State Management (Future)

Each feature can have its own context:
```
src/
├── features/
│   ├── student/
│   │   └── context/
│   │       ├── StudentContext.tsx
│   │       └── StudentProvider.tsx
│   ├── admin/
│   │   └── context/
│   │       ├── AdminContext.tsx
│   │       └── AdminProvider.tsx
│   └── superadmin/
│       └── context/
│           ├── SuperAdminContext.tsx
│           └── SuperAdminProvider.tsx
```

## ✅ Migration Checklist

- [x] Create new directory structure
- [x] Move files to appropriate locations
- [x] Create role-specific routers
- [x] Update main App.tsx
- [x] Configure path aliases
- [x] Update import paths
- [ ] Test all user flows
- [ ] Update documentation
- [ ] Remove old files

## 🎓 Best Practices

1. **Keep features isolated** - Avoid cross-feature dependencies
2. **Use shared resources** - Don't duplicate code
3. **Follow naming conventions** - Clear, descriptive names
4. **Document changes** - Update this file when adding features
5. **Test thoroughly** - Ensure changes don't break other features
