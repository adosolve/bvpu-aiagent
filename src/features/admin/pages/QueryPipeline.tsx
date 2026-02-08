import React, { useState } from 'react';

interface Query {
  id: string;
  queryName: string;
  studentName: string;
  prn: string;
  assignedTo?: string;
  priority: 'High' | 'Medium' | 'Low';
  aging: number;
  category: string;
}

type Stage = 'Raised' | 'Assigned' | 'In-Progress' | 'On-Hold' | 'Resolved' | 'Rejected' | 'Escalated';

interface KanbanColumn {
  id: Stage;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'Raised',
    title: 'Raised',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  },
  {
    id: 'Assigned',
    title: 'Assigned',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  },
  {
    id: 'In-Progress',
    title: 'In-Progress',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  },
  {
    id: 'On-Hold',
    title: 'On-Hold',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line></svg>
  },
  {
    id: 'Resolved',
    title: 'Resolved',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  },
  {
    id: 'Rejected',
    title: 'Rejected',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
  },
  {
    id: 'Escalated',
    title: 'Escalated',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
  }
];

const MOCK_QUERIES: Record<Stage, Query[]> = {
  'Raised': [
    { id: 'Q001', queryName: 'Name Correction', studentName: 'John Harvard', prn: 'BV-7721', priority: 'High', aging: 1, category: 'Examination' },
    { id: 'Q002', queryName: 'Certificate Issue', studentName: 'Alice Smith', prn: 'BV-7722', priority: 'Medium', aging: 2, category: 'Admission' },
    { id: 'Q003', queryName: 'Fee Receipt', studentName: 'Bob Johnson', prn: 'BV-7723', priority: 'Low', aging: 1, category: 'Accounts' }
  ],
  'Assigned': [
    { id: 'Q004', queryName: 'Transcript Request', studentName: 'Emma Davis', prn: 'BV-7724', assignedTo: 'Sarah Johnson', priority: 'High', aging: 3, category: 'Examination' },
    { id: 'Q005', queryName: 'Grade Dispute', studentName: 'Michael Brown', prn: 'BV-7725', assignedTo: 'Elena Gilbert', priority: 'Medium', aging: 2, category: 'Examination' }
  ],
  'In-Progress': [
    { id: 'Q006', queryName: 'Document Verification', studentName: 'Sarah Wilson', prn: 'BV-7726', assignedTo: 'Michael Brown', priority: 'High', aging: 5, category: 'Admission' },
    { id: 'Q007', queryName: 'Library Fine', studentName: 'David Lee', prn: 'BV-7727', assignedTo: 'Sarah Johnson', priority: 'Low', aging: 4, category: 'Library' },
    { id: 'Q008', queryName: 'Hostel Allocation', studentName: 'Lisa Anderson', prn: 'BV-7728', assignedTo: 'Elena Gilbert', priority: 'Medium', aging: 6, category: 'Admission' }
  ],
  'On-Hold': [
    { id: 'Q009', queryName: 'Scholarship Query', studentName: 'James Taylor', prn: 'BV-7729', assignedTo: 'Michael Brown', priority: 'Medium', aging: 8, category: 'Accounts' },
    { id: 'Q010', queryName: 'Course Change', studentName: 'Emily White', prn: 'BV-7730', assignedTo: 'Sarah Johnson', priority: 'High', aging: 7, category: 'Admission' }
  ],
  'Resolved': [
    { id: 'Q011', queryName: 'ID Card Issue', studentName: 'Robert Martin', prn: 'BV-7731', assignedTo: 'Elena Gilbert', priority: 'Low', aging: 12, category: 'Admission' },
    { id: 'Q012', queryName: 'Exam Form', studentName: 'Jennifer Garcia', prn: 'BV-7732', assignedTo: 'Michael Brown', priority: 'Medium', aging: 10, category: 'Examination' },
    { id: 'Q013', queryName: 'Bonafide Certificate', studentName: 'William Martinez', prn: 'BV-7733', assignedTo: 'Sarah Johnson', priority: 'Low', aging: 9, category: 'Admission' }
  ],
  'Rejected': [
    { id: 'Q014', queryName: 'Invalid Request', studentName: 'Patricia Rodriguez', prn: 'BV-7734', assignedTo: 'Elena Gilbert', priority: 'Low', aging: 5, category: 'General' }
  ],
  'Escalated': [
    { id: 'Q015', queryName: 'Urgent Grade Issue', studentName: 'Christopher Lopez', prn: 'BV-7735', assignedTo: 'Michael Brown', priority: 'High', aging: 15, category: 'Examination' },
    { id: 'Q016', queryName: 'Fee Refund', studentName: 'Amanda Hernandez', prn: 'BV-7736', assignedTo: 'Sarah Johnson', priority: 'High', aging: 18, category: 'Accounts' }
  ]
};

const QueryPipeline: React.FC = () => {
  const [queries, setQueries] = useState<Record<Stage, Query[]>>(MOCK_QUERIES);
  const [draggedQuery, setDraggedQuery] = useState<{ query: Query; fromStage: Stage } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Stage | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getAgingColor = (aging: number) => {
    if (aging >= 15) return 'text-red-600 font-bold';
    if (aging >= 10) return 'text-orange-600 font-semibold';
    if (aging >= 7) return 'text-amber-600';
    return 'text-stone-600';
  };

  const handleDragStart = (query: Query, fromStage: Stage) => {
    setDraggedQuery({ query, fromStage });
  };

  const handleDragOver = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    setDragOverColumn(stage);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (toStage: Stage) => {
    if (!draggedQuery) return;

    const { query, fromStage } = draggedQuery;

    // Don't do anything if dropping in the same column
    if (fromStage === toStage) {
      setDraggedQuery(null);
      setDragOverColumn(null);
      return;
    }

    // Remove query from the source stage
    const updatedQueries = { ...queries };
    updatedQueries[fromStage] = updatedQueries[fromStage].filter(q => q.id !== query.id);
    
    // Add query to the destination stage
    updatedQueries[toStage] = [...updatedQueries[toStage], query];

    setQueries(updatedQueries);
    setDraggedQuery(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedQuery(null);
    setDragOverColumn(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
          <span className="w-6 h-[2px] bg-[#5D4037]"></span>
          Query Management
        </div>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Query Pipeline</h1>
        <p className="text-sm text-stone-500 mt-2">
          Track and manage student queries across different stages
        </p>
      </header>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {KANBAN_COLUMNS.map((column) => {
            const columnQueries = queries[column.id] || [];
            
            return (
              <div 
                key={column.id} 
                className={`flex-shrink-0 w-80 transition-all ${
                  dragOverColumn === column.id ? 'scale-105' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(column.id)}
              >
                {/* Column Header */}
                <div className={`${column.bgColor} ${column.borderColor} border-2 rounded-2xl p-4 mb-3 transition-all ${
                  dragOverColumn === column.id ? 'ring-4 ring-[#5D4037] ring-opacity-30' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`${column.color}`}>
                        {column.icon}
                      </div>
                      <h3 className={`text-sm font-bold ${column.color} uppercase tracking-wider`}>
                        {column.title}
                      </h3>
                    </div>
                    <span className={`${column.color} text-xs font-bold px-2 py-1 rounded-full ${column.bgColor} border ${column.borderColor}`}>
                      {columnQueries.length}
                    </span>
                  </div>
                </div>

                {/* Column Cards */}
                <div className={`space-y-3 min-h-[200px] rounded-xl p-2 transition-all ${
                  dragOverColumn === column.id ? 'bg-stone-50 border-2 border-dashed border-[#5D4037]' : ''
                }`}>
                  {columnQueries.map((query) => (
                    <div
                      key={query.id}
                      draggable
                      onDragStart={() => handleDragStart(query, column.id)}
                      onDragEnd={handleDragEnd}
                      className={`bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-move active:cursor-grabbing ${
                        draggedQuery?.query.id === query.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      {/* Query Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-stone-900 mb-1">
                            {query.queryName}
                          </h4>
                          <p className="text-xs text-stone-500">
                            {query.id}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getPriorityColor(query.priority)}`}>
                          {query.priority}
                        </span>
                      </div>

                      {/* Student Info */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span className="text-xs text-stone-700 font-medium">{query.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <line x1="17" y1="11" x2="23" y2="11"></line>
                          </svg>
                          <span className="text-xs text-stone-600">{query.prn}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded-md text-[10px] font-semibold uppercase tracking-wider">
                          {query.category}
                        </span>
                      </div>

                      {/* Assigned To (if applicable) */}
                      {query.assignedTo && (
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5D4037]">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <span className="text-xs text-stone-700 font-medium">{query.assignedTo}</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span className={`text-xs ${getAgingColor(query.aging)}`}>
                            {query.aging} days
                          </span>
                        </div>
                        <button className="text-[9px] font-semibold text-[#5D4037] hover:text-[#4A332C] uppercase tracking-widest">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QueryPipeline;
