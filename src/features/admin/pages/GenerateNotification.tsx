import React, { useState } from 'react';

const GenerateNotification: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: '',
    targetAudience: '',
    priority: 'Normal',
    scheduleType: 'immediate',
    scheduleDate: '',
    scheduleTime: ''
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification submitted:', formData);
    // Handle notification sending logic here
    alert('Notification sent successfully!');
    // Reset form
    setFormData({
      title: '',
      message: '',
      category: '',
      targetAudience: '',
      priority: 'Normal',
      scheduleType: 'immediate',
      scheduleDate: '',
      scheduleTime: ''
    });
  };

  const estimatedRecipients = () => {
    switch (formData.targetAudience) {
      case 'All Students': return 1250;
      case 'Final Year Students': return 320;
      case 'First Year Students': return 380;
      case 'Pending Fee Students': return 150;
      case 'Library Defaulters': return 85;
      default: return 0;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5D4037] mb-2 uppercase tracking-[0.2em]">
          <span className="w-6 h-[2px] bg-[#5D4037]"></span>
          Communication Hub
        </div>
        <h1 className="text-4xl font-semibold text-stone-900 leading-tight">Generate Notification</h1>
        <p className="text-sm text-stone-500 mt-2">
          Create and send notifications to students
        </p>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-3xl shadow-sm p-8 space-y-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Notification Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                  placeholder="Enter notification title"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all resize-none"
                  placeholder="Enter your message here..."
                />
                <div className="text-xs text-stone-400 mt-1">
                  {formData.message.length} / 500 characters
                </div>
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                  >
                    <option value="">Select category</option>
                    <option value="Examination">Examination</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Library">Library</option>
                    <option value="Admission">Admission</option>
                    <option value="General">General</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <select
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                >
                  <option value="">Select target audience</option>
                  <option value="All Students">All Students</option>
                  <option value="Final Year Students">Final Year Students</option>
                  <option value="First Year Students">First Year Students</option>
                  <option value="Pending Fee Students">Pending Fee Students</option>
                  <option value="Library Defaulters">Library Defaulters</option>
                </select>
                {formData.targetAudience && (
                  <div className="text-xs text-stone-500 mt-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Estimated recipients: <span className="font-semibold text-[#5D4037]">{estimatedRecipients()}</span>
                  </div>
                )}
              </div>

              {/* Schedule Type */}
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-3">
                  Delivery Schedule <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="immediate"
                      checked={formData.scheduleType === 'immediate'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]"
                    />
                    <span className="text-sm text-stone-700">Send Immediately</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="scheduled"
                      checked={formData.scheduleType === 'scheduled'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#5D4037] focus:ring-[#5D4037]"
                    />
                    <span className="text-sm text-stone-700">Schedule for Later</span>
                  </label>
                </div>
              </div>

              {/* Schedule Date & Time */}
              {formData.scheduleType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Schedule Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="scheduleDate"
                      value={formData.scheduleDate}
                      onChange={handleInputChange}
                      required={formData.scheduleType === 'scheduled'}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-2">
                      Schedule Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="scheduleTime"
                      value={formData.scheduleTime}
                      onChange={handleInputChange}
                      required={formData.scheduleType === 'scheduled'}
                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D4037] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all font-semibold"
              >
                {previewMode ? 'Hide Preview' : 'Preview'}
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-6 py-3 border border-stone-200 text-stone-600 rounded-xl hover:bg-stone-50 transition-all font-semibold"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5D4037] text-white rounded-xl hover:bg-[#4A332C] transition-all shadow-md hover:shadow-lg font-semibold"
                >
                  {formData.scheduleType === 'immediate' ? 'Send Notification' : 'Schedule Notification'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="col-span-1">
          <div className="bg-white border border-stone-200 rounded-3xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Preview</h3>
            
            {formData.title || formData.message ? (
              <div className="space-y-4">
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#5D4037] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      UN
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                        University Notification
                      </div>
                      <div className="text-xs text-stone-400">Just now</div>
                    </div>
                  </div>
                  
                  {formData.title && (
                    <h4 className="text-sm font-semibold text-stone-900 mb-2">
                      {formData.title}
                    </h4>
                  )}
                  
                  {formData.message && (
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {formData.message}
                    </p>
                  )}
                  
                  {formData.category && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <span className="text-[9px] font-semibold text-stone-500 uppercase tracking-wider">
                        {formData.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notification Details */}
                <div className="space-y-2 text-xs">
                  {formData.priority && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Priority:</span>
                      <span className={`font-semibold ${
                        formData.priority === 'Urgent' ? 'text-red-600' :
                        formData.priority === 'High' ? 'text-orange-600' :
                        formData.priority === 'Normal' ? 'text-blue-600' :
                        'text-stone-600'
                      }`}>{formData.priority}</span>
                    </div>
                  )}
                  {formData.targetAudience && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Recipients:</span>
                      <span className="font-semibold text-stone-700">{estimatedRecipients()}</span>
                    </div>
                  )}
                  {formData.scheduleType === 'scheduled' && formData.scheduleDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Scheduled:</span>
                      <span className="font-semibold text-stone-700">
                        {formData.scheduleDate} {formData.scheduleTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-stone-300 mb-3">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <p className="text-sm text-stone-400">
                  Fill in the form to see preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateNotification;
