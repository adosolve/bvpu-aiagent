import React, { useState } from 'react';
import { UserRole } from '../types.ts';

interface PublishNotificationProps {
  role?: UserRole;
}

const PublishNotification: React.FC<PublishNotificationProps> = ({ role = UserRole.ADMIN_CLERK }) => {
  const isSuperAdmin = role === UserRole.SUPER_ADMIN;
  
  const [formData, setFormData] = useState({
    category: '',
    priority: 'Normal',
    title: '',
    messageBody: '',
    referenceExam: '',
    referenceId: '',
    targetAudience: 'Students Only',
    department: '',
    schedulingType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    pinToTop: false,
    expiryDate: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const adminCategories = [
    'Exam Forms',
    'Results',
    'Grade Cards',
    'General Notice'
  ];

  const superAdminCategories = [
    ...adminCategories,
    'Policy Update',
    'Maintenance',
    'University Announcement',
    'Emergency Notice'
  ];

  const categories = isSuperAdmin ? superAdminCategories : adminCategories;

  const targetAudiences = isSuperAdmin ? [
    'All Users',
    'Students Only',
    'Admins Only',
    'Specific Department'
  ] : ['Students Only'];

  const priorities = isSuperAdmin ? ['Normal', 'Important', 'Critical'] : ['Normal', 'Important'];

  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Information Technology'
  ];

  const examSemesters = [
    'Odd Semester End Examination 2025–26',
    'Even Semester End Examination 2024–25',
    'Supplementary Examination 2024–25'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.title || !formData.messageBody) return;

    setIsPublishing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPublishing(false);
    setPublishSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        category: '',
        priority: 'Normal',
        title: '',
        messageBody: '',
        referenceExam: '',
        referenceId: '',
        targetAudience: 'Students Only',
        department: '',
        schedulingType: 'now',
        scheduledDate: '',
        scheduledTime: '',
        pinToTop: false,
        expiryDate: ''
      });
      setPublishSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    setFormData({
      category: '',
      priority: 'Normal',
      title: '',
      messageBody: '',
      referenceExam: '',
      referenceId: '',
      targetAudience: 'Students Only',
      department: '',
      schedulingType: 'now',
      scheduledDate: '',
      scheduledTime: '',
      pinToTop: false,
      expiryDate: ''
    });
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Important':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getTargetAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'All Users':
        return (
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        );
      case 'Admins Only':
        return (
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        );
    }
  };

  if (publishSuccess) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header>
          <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">Publish Notification</h1>
          <p className="text-stone-500 text-sm font-medium">
            {isSuperAdmin ? 'Send university-wide and policy notifications' : 'Send department-level updates to students'}
          </p>
        </header>

        <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">
            {formData.schedulingType === 'later' ? 'Notification Scheduled Successfully' : 'Notification Published Successfully'}
          </h3>
          <p className="text-stone-600 mb-6">
            {formData.schedulingType === 'later' 
              ? `Your notification has been scheduled and will be delivered on ${formData.scheduledDate} at ${formData.scheduledTime}.`
              : `Your notification has been delivered to ${formData.targetAudience.toLowerCase()} and added to the Activity Journal.`
            }
          </p>
          <div className="bg-stone-50 rounded-xl p-4 text-left max-w-md mx-auto">
            <div className="text-xs text-stone-500 mb-1">
              {formData.schedulingType === 'later' ? 'Scheduled' : 'Published'} Notification:
            </div>
            <div className="text-sm font-semibold text-stone-800">{formData.title}</div>
            {formData.pinToTop && (
              <div className="text-xs text-purple-600 mt-1">📌 Pinned to top</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <header>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight mb-2">Publish Notification</h1>
        <p className="text-stone-500 text-sm font-medium">
          {isSuperAdmin ? 'Send university-wide and policy notifications' : 'Send department-level updates to students'}
        </p>
      </header>

      {/* Publish Form */}
      <section className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-lg font-semibold text-stone-800">Create New Notification</h3>
          <p className="text-stone-500 text-sm mt-1">
            {isSuperAdmin ? 'Compose and publish university-wide or targeted notifications' : 'Compose and publish examination-related updates'}
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                  Notification Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                  required
                >
                  <option value="">Select category...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                Target Audience
              </label>
              {isSuperAdmin ? (
                <div className="space-y-3">
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                  >
                    {targetAudiences.map((audience) => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                  {formData.targetAudience === 'Specific Department' && (
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                    >
                      <option value="">Select department...</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {getTargetAudienceIcon('Students Only')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-800">Students</div>
                      <div className="text-xs text-stone-500">Department-level notification to all enrolled students</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                Notification Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter notification title..."
                className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                Message Body *
              </label>
              <textarea
                value={formData.messageBody}
                onChange={(e) => handleInputChange('messageBody', e.target.value)}
                placeholder="Enter the notification message..."
                className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037] resize-none"
                rows={6}
                required
              />
              <div className="text-xs text-stone-400 mt-2">
                Keep the message clear and professional. Avoid using rich formatting.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                  Reference Exam / Semester (Optional)
                </label>
                <select
                  value={formData.referenceExam}
                  onChange={(e) => handleInputChange('referenceExam', e.target.value)}
                  className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                >
                  <option value="">Select exam/semester...</option>
                  {examSemesters.map((exam) => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                  Reference ID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.referenceId}
                  onChange={(e) => handleInputChange('referenceId', e.target.value)}
                  placeholder="e.g., NOT-2024-045"
                  className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                />
              </div>
            </div>

            {/* Super Admin Advanced Options */}
            {isSuperAdmin && (
              <>
                {/* Scheduling */}
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                    Scheduling
                  </label>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="scheduling"
                          value="now"
                          checked={formData.schedulingType === 'now'}
                          onChange={(e) => handleInputChange('schedulingType', e.target.value)}
                          className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]/20"
                        />
                        <span className="text-sm font-medium text-stone-700">Publish Now</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="scheduling"
                          value="later"
                          checked={formData.schedulingType === 'later'}
                          onChange={(e) => handleInputChange('schedulingType', e.target.value)}
                          className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]/20"
                        />
                        <span className="text-sm font-medium text-stone-700">Schedule for Later</span>
                      </label>
                    </div>
                    {formData.schedulingType === 'later' && (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="date"
                          value={formData.scheduledDate}
                          onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                          className="p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                        />
                        <input
                          type="time"
                          value={formData.scheduledTime}
                          onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                          className="p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Pinning Options */}
                <div>
                  <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                    Display Options
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.pinToTop}
                        onChange={(e) => handleInputChange('pinToTop', e.target.checked)}
                        className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]/20 rounded"
                      />
                      <span className="text-sm font-medium text-stone-700">Pin to top of inbox</span>
                    </label>
                    {formData.pinToTop && (
                      <div>
                        <label className="text-xs text-stone-500 block mb-2">Expiry Date (Optional)</label>
                        <input
                          type="date"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="p-3 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4037]/20 focus:border-[#5D4037]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Preview Section */}
            {(formData.title || formData.messageBody) && (
              <div className="border-t border-stone-100 pt-6">
                <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-3">
                  Preview
                </label>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                      {isSuperAdmin ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        {formData.pinToTop && (
                          <span className="text-purple-600 text-sm">📌</span>
                        )}
                        <h4 className="text-sm font-semibold text-stone-800">
                          {formData.title || 'Notification Title'}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                          isSuperAdmin ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {isSuperAdmin ? 'Super Admin' : 'Admin'}
                        </span>
                        {formData.priority !== 'Normal' && (
                          <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getPriorityStyle(formData.priority)}`}>
                            {formData.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {formData.messageBody || 'Your notification message will appear here...'}
                      </p>
                      {formData.referenceId && (
                        <div className="mt-3 text-xs text-stone-500">
                          Reference: {formData.referenceId}
                        </div>
                      )}
                      {isSuperAdmin && formData.targetAudience !== 'Students Only' && (
                        <div className="mt-2 text-xs text-stone-500">
                          Target: {formData.targetAudience}
                          {formData.targetAudience === 'Specific Department' && formData.department && ` (${formData.department})`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-6 py-3 border border-stone-200 text-stone-600 rounded-xl font-semibold text-sm hover:bg-stone-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPublishing || !formData.category || !formData.title || !formData.messageBody}
                className="flex-1 px-8 py-3 bg-[#5D4037] text-white rounded-xl font-semibold text-sm hover:bg-[#4E342E] transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                {isPublishing ? 'Publishing...' : (formData.schedulingType === 'later' ? 'Schedule Notification' : 'Publish Now')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Publishing Guidelines</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              {isSuperAdmin ? (
                <>
                  <li>• Use "Critical" priority only for emergency situations requiring immediate attention</li>
                  <li>• Policy updates and university announcements reach all users by default</li>
                  <li>• Pinned notifications appear at the top until manually unpinned or expired</li>
                  <li>• Scheduled notifications can be modified before their publish time</li>
                </>
              ) : (
                <>
                  <li>• Notifications are limited to department-level examination updates</li>
                  <li>• All published notifications appear in the Activity Journal</li>
                  <li>• Use "Important" priority only for urgent examination matters</li>
                  <li>• Include reference IDs for better tracking and student queries</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishNotification;