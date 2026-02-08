import React, { useState } from 'react';

interface StaffRecord {
  id: string;
  staffName: string;
  staffId: string;
  role: string;
  assignedQueries: number;
  departmentName: string;
  roleColor: string;
}

const MOCK_STAFF: StaffRecord[] = [
  {
    id: '1',
    staffName: 'Sarah Johnson',
    staffId: 'STF-2024-001',
    role: 'Senior Clerk',
    assignedQueries: 12,
    departmentName: 'Examination',
    roleColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: '2',
    staffName: 'Michael Brown',
    staffId: 'STF-2024-002',
    role: 'Clerk',
    assignedQueries: 8,
    departmentName: 'Examination',
    roleColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '3',
    staffName: 'Emily Davis',
    staffId: 'STF-2024-003',
    role: 'Senior Clerk',
    assignedQueries: 15,
    departmentName: 'Accounts',
    roleColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: '4',
    staffName: 'Robert Wilson',
    staffId: 'STF-2024-004',
    role: 'Clerk',
    assignedQueries: 6,
    departmentName: 'Library',
    roleColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '5',
    staffName: 'Jennifer Martinez',
    staffId: 'STF-2024-005',
    role: 'Department Head',
    assignedQueries: 20,
    departmentName: 'Examination',
    roleColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: '6',
    staffName: 'David Anderson',
    staffId: 'STF-2024-006',
    role: 'Clerk',
    assignedQueries: 10,
    departmentName: 'Admission',
    roleColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '7',
    staffName: 'Lisa Thompson',
    staffId: 'STF-2024-007',
    role: 'Senior Clerk',
    assignedQueries: 14,
    departmentName: 'Accounts',
    roleColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: '8',
    staffName: 'James Garcia',
    staffId: 'STF-2024-008',
    role: 'Clerk',
    assignedQueries: 7,
    departmentName: 'Library',
    roleColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: '9',
    staffName: 'Maria Rodriguez',
    staffId: 'STF-2024-009',
    role: 'Department Head',
    assignedQueries: 18,
    departmentName: 'Accounts',
    roleColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: '10',
    staffName: 'Christopher Lee',
    staffId: 'STF-2024-010',
    role: 'Senior Clerk',
    assignedQueries: 11,
    departmentName: 'Admission',
    roleColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
];

const StaffManagementTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    staffName: '',
    staffId: '',
    role: '',
    department: '',
    email: '',
    phone: ''
  });
  const recordsPerPage = 5;

  // Filter records based on search query
  const filteredRecords = MOCK_STAFF.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      record.staffName.toLowerCase().includes(searchLower) ||
      record.staffId.toLowerCase().includes(searchLower) ||
      record.role.toLowerCase().includes(searchLower) ||
      record.departmentName.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      staffName: '',
      staffId: '',
      role: '',
      department: '',
      email: '',
      phone: ''
    });
  };

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
            <span className="w-6 h-[2px] bg-[#5D4037]"></span>
            Team Overview
          </div>
          <h2 className="text-2xl font-semibold text-stone-900">Staff Management</h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staff..."
              className="w-80 pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 pointer-events-none" 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#5D4037] text-white rounded-xl hover:bg-[#4A332C] transition-all shadow-md hover:shadow-lg font-semibold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Staff
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-200">
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Staff Name</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Staff ID</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Assigned Queries</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest">Department Name</th>
                <th className="px-6 py-4 text-[10px] font-semibold text-stone-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-stone-800">{record.staffName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-stone-600">{record.staffId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider border ${record.roleColor}`}>
                      {record.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#5D4037]">{record.assignedQueries}</span>
                      <span className="text-xs text-stone-500">queries</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-stone-700">{record.departmentName}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-[10px] font-semibold text-[#5D4037] bg-[#5D4037]/5 px-3 py-2 rounded-lg hover:bg-[#5D4037] hover:text-white transition-all uppercase tracking-widest border border-[#5D4037]/10">
                        View
                      </button>
                      <button className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-all uppercase tracking-widest border border-blue-200">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentRecords.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-stone-400 text-sm">
                {searchQuery ? `No staff members found matching "${searchQuery}"` : 'No staff members found'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredRecords.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <div className="text-xs text-stone-500">
              Showing <span className="font-semibold text-stone-700">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-stone-700">{Math.min(endIndex, filteredRecords.length)}</span> of{' '}
              <span className="font-semibold text-stone-700">{filteredRecords.length}</span> staff members
              {searchQuery && <span className="ml-1">(filtered from {MOCK_STAFF.length} total)</span>}
            </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                currentPage === 1
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-[#5D4037] text-white shadow-md'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all ${
                currentPage === totalPages
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-stone-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-stone-900">Add New Staff Member</h3>
                  <p className="text-sm text-stone-500 mt-1">Fill in the details to add a new staff member</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Staff Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Staff Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="staffName"
                    value={formData.staffName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Staff ID */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Staff ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="staffId"
                    value={formData.staffId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    placeholder="STF-2024-XXX"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                  >
                    <option value="">Select role</option>
                    <option value="Department Head">Department Head</option>
                    <option value="Senior Clerk">Senior Clerk</option>
                    <option value="Clerk">Clerk</option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                  >
                    <option value="">Select department</option>
                    <option value="Examination">Examination</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Library">Library</option>
                    <option value="Admission">Admission</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    placeholder="staff@university.edu"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5D4037] text-white rounded-xl hover:bg-[#4A332C] transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StaffManagementTable;
