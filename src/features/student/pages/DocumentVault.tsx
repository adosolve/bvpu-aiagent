import React, { useState, useRef } from 'react';

interface Document {
  id: string;
  type: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  status: 'uploaded' | 'pending' | 'verified';
}

const DocumentVault: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentLevel, setStudentLevel] = useState<'UG' | 'PG'>('UG');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documentTypes = [
    { id: 'aadhar', label: 'Aadhar Card', icon: '🪪', required: true, forLevel: 'both' },
    { id: 'fee-receipt', label: 'Fee Receipts', icon: '🧾', required: true, forLevel: 'both' },
    { id: '10th-marksheet', label: '10th Marksheet', icon: '📄', required: true, forLevel: 'both' },
    { id: '12th-marksheet', label: '12th Marksheet', icon: '📄', required: true, forLevel: 'both' },
    { id: 'ug-marksheet', label: 'UG Marksheet', icon: '📋', required: false, forLevel: 'PG' },
    { id: 'ug-degree', label: 'UG Degree', icon: '🎓', required: false, forLevel: 'PG' },
  ];

  const getFilteredDocTypes = () => {
    return documentTypes.filter(doc => 
      doc.forLevel === 'both' || doc.forLevel === studentLevel
    );
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !selectedDocType) return;

    const file = files[0];
    const newDocument: Document = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: selectedDocType,
      fileName: file.name,
      fileSize: file.size,
      uploadDate: new Date(),
      status: 'uploaded'
    };

    setDocuments(prev => [...prev, newDocument]);
    setShowUploadModal(false);
    setSelectedDocType('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = (docType: string) => {
    setSelectedDocType(docType);
    setShowUploadModal(true);
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentByType = (type: string) => {
    return documents.filter(doc => doc.type === type);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700 border-green-200';
      case 'uploaded': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'uploaded':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-semibold text-stone-800">Document Vault</h1>
          <p className="text-sm text-stone-500 mt-1">Securely store and manage your academic documents</p>
        </div>
        
        {/* Student Level Toggle */}
        <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-lg border border-stone-200">
          <button
            onClick={() => setStudentLevel('UG')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              studentLevel === 'UG'
                ? 'bg-white text-[#5D4037] shadow-sm'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            UG Student
          </button>
          <button
            onClick={() => setStudentLevel('PG')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              studentLevel === 'PG'
                ? 'bg-white text-[#5D4037] shadow-sm'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            PG Student
          </button>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilteredDocTypes().map((docType) => {
          const uploadedDocs = getDocumentByType(docType.id);
          const hasDocument = uploadedDocs.length > 0;

          return (
            <div
              key={docType.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-md transition-all"
            >
              {/* Document Type Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-2xl">
                    {docType.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-800">{docType.label}</h3>
                    {docType.required && (
                      <span className="text-xs text-red-600 font-medium">Required</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              {hasDocument ? (
                <div className="space-y-2 mb-4">
                  {uploadedDocs.map((doc) => (
                    <div key={doc.id} className="bg-stone-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-stone-800 truncate">{doc.fileName}</p>
                          <p className="text-xs text-stone-500">{formatFileSize(doc.fileSize)}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="w-6 h-6 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 transition-colors flex-shrink-0"
                          title="Delete document"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        {getStatusIcon(doc.status)}
                        <span className="capitalize">{doc.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-4 p-4 bg-stone-50 rounded-lg text-center">
                  <p className="text-xs text-stone-500">No document uploaded</p>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={() => handleUploadClick(docType.id)}
                className="w-full py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                {hasDocument ? 'Upload Another' : 'Upload Document'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-stone-800">
                Upload {documentTypes.find(d => d.id === selectedDocType)?.label}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedDocType('');
                }}
                className="w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center text-stone-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-[#5D4037] transition-colors">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-sm font-medium text-stone-700 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-stone-500">PDF, JPG, PNG (Max 10MB)</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-6 py-2.5 bg-[#5D4037] hover:bg-[#4E342E] text-white text-sm font-medium rounded-lg transition-all"
                >
                  Select File
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="text-blue-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-900 mb-1">Important Guidelines</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Ensure document is clear and readable</li>
                      <li>• All corners should be visible</li>
                      <li>• File size should not exceed 10MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex gap-4">
          <div className="text-amber-600 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-900 mb-2">Document Security & Privacy</h4>
            <p className="text-sm text-amber-800 leading-relaxed">
              All documents are encrypted and stored securely. Your documents will be verified by the administration within 2-3 business days. 
              You can upload multiple versions of the same document if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;
