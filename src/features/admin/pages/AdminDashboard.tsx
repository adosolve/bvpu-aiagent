
import React, { useState } from 'react';
import AdminQueryDetail from './AdminQueryDetail.tsx';
import AnalyticsCards from '../components/AnalyticsCards';
import RecentQueriesTable from '../components/RecentQueriesTable';
import StaffManagementTable from '../components/StaffManagementTable';

const AdminDashboard: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  if (selectedQuery) {
    return (
      <AdminQueryDetail 
        query={selectedQuery} 
        onBack={() => setSelectedQuery(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Analytics Overview */}
      <AnalyticsCards />

      {/* Recent Queries Table */}
      <RecentQueriesTable />

      {/* Staff Management Table */}
      <StaffManagementTable />
    </div>
  );
};

export default AdminDashboard;
