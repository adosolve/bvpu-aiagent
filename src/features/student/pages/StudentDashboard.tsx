import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/constants/constants';

interface StudentDashboardProps {
  onNavigate: (path: string) => void;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachedFiles.length === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage || (attachedFiles.length > 0 ? `Sent ${attachedFiles.length} file(s)` : ''),
      isUser: true,
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setAttachedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: attachedFiles.length > 0 
          ? `I can see you've shared ${attachedFiles.length} file(s) with me. Once our LLM system is integrated, I'll be able to analyze and help you with the content of these files. For now, I can assist you with general university procedures and academic queries.`
          : 'Thank you for your query. I understand you need assistance with university procedures. Let me help you with that. For specific examination-related queries, I can guide you through the proper channels and provide relevant information about deadlines, requirements, and processes.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: FileAttachment[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));

    setAttachedFiles(prev => [...prev, ...newAttachments]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachedFiles(prev => {
      const updated = prev.filter(file => file.id !== attachmentId);
      // Clean up object URL
      const fileToRemove = prev.find(file => file.id === attachmentId);
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return updated;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      );
    } else if (fileType.includes('pdf')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    'Help me learn about exam procedures',
    'Create a query for marksheet correction',
    'Boost my understanding of university policies',
    'Write anything about academic requirements'
  ];

  const quickActions = [
    { label: 'Raise New Query', icon: <Icons.HelpDesk />, desc: 'AI-assisted help desk for marksheet, name correction, and re-evaluation.', path: '/helpdesk' },
    { label: 'View My Queries', icon: <Icons.Tickets />, desc: 'Real-time tracking of your submitted requests and department responses.', path: '/tickets' },
    { label: 'Convocation Info', icon: <Icons.Exams />, desc: 'Check graduation eligibility, ceremony dates, and degree collection policy.', path: '/exams' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* AI Chat Interface */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        {messages.length === 0 ? (
          /* Welcome State */
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Welcome Message */}
            <div className="space-y-2">
              <h1 className="text-4xl font-medium text-stone-800">Hello! Welcome to IMED AI Campus</h1>
              <p className="text-lg text-stone-600 font-medium">An OS Built for Students to solve admin query or paper work issue!</p>
            </div>

            {/* Chat Input */}
            <div className="w-full max-w-2xl">
              {/* Attached Files Preview */}
              {attachedFiles.length > 0 && (
                <div className="mb-4 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-stone-700">Attached Files ({attachedFiles.length})</h4>
                    <button
                      onClick={() => setAttachedFiles([])}
                      className="text-xs text-stone-500 hover:text-stone-700 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {attachedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
                        <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center text-stone-600">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate">{file.name}</p>
                          <p className="text-xs text-stone-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeAttachment(file.id)}
                          className="w-6 h-6 bg-stone-200 hover:bg-red-100 rounded-full flex items-center justify-center text-stone-500 hover:text-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Area */}
              <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all p-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask IMED AI Campus"
                  className="flex-1 px-4 py-3 border-0 rounded-2xl resize-none focus:outline-none text-base leading-relaxed min-h-[3rem] max-h-32 bg-transparent"
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '3rem'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                  }}
                />
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {/* Attachment button - outside input */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                  title="Attach files"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"></path>
                  </svg>
                </button>
                
                {/* Send button - outside input */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() && attachedFiles.length === 0 || isTyping}
                  className="w-10 h-10 bg-[#5D4037] hover:bg-[#4E342E] disabled:bg-stone-300 text-white rounded-full flex items-center justify-center transition-all flex-shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap justify-center gap-2 max-w-6xl">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt)}
                  className="px-3 py-2 text-xs bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-2xl transition-colors border border-stone-200 hover:border-stone-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 min-w-0"
                >
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                  )}
                  {index === 3 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  )}
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat State */
          <div className="w-full max-w-4xl mx-auto">
            {/* Chat Messages */}
            <div className="space-y-6 mb-8 max-h-[50vh] overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                    <div className={`p-4 rounded-2xl ${
                      message.isUser 
                        ? 'bg-[#5D4037] text-white rounded-br-md' 
                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-md shadow-sm'
                    }`}>
                      {message.content && <p className="text-sm leading-relaxed mb-2">{message.content}</p>}
                      
                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="space-y-2 mt-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className={`flex items-center gap-3 p-2 rounded-lg ${
                              message.isUser ? 'bg-white/10' : 'bg-stone-50'
                            }`}>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                message.isUser ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                              }`}>
                                {getFileIcon(attachment.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium truncate ${
                                  message.isUser ? 'text-white' : 'text-stone-800'
                                }`}>
                                  {attachment.name}
                                </p>
                                <p className={`text-xs ${
                                  message.isUser ? 'text-white/70' : 'text-stone-500'
                                }`}>
                                  {formatFileSize(attachment.size)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className={`text-xs text-stone-400 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-[#5D4037] rounded-full flex items-center justify-center mr-3 mt-1 order-0 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                  )}
                  {message.isUser && (
                    <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center ml-3 mt-1 order-3 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-600">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-[#5D4037] rounded-full flex items-center justify-center mr-3 mt-1 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <div className="bg-white border border-stone-200 p-4 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input - Active State */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-stone-200 pt-4">
              {/* Attached Files Preview */}
              {attachedFiles.length > 0 && (
                <div className="mb-4 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-stone-700">Attached Files ({attachedFiles.length})</h4>
                    <button
                      onClick={() => setAttachedFiles([])}
                      className="text-xs text-stone-500 hover:text-stone-700 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {attachedFiles.map((file) => (
                      <div key={file.id} className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
                        <div className="w-8 h-8 bg-stone-200 rounded-lg flex items-center justify-center text-stone-600">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 truncate">{file.name}</p>
                          <p className="text-xs text-stone-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeAttachment(file.id)}
                          className="w-6 h-6 bg-stone-200 hover:bg-red-100 rounded-full flex items-center justify-center text-stone-500 hover:text-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative bg-white border border-stone-200 rounded-3xl shadow-sm">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask IMED AI Campus"
                  className="w-full p-6 pr-24 border-0 rounded-3xl resize-none focus:outline-none text-base leading-relaxed min-h-[4rem] max-h-32 bg-transparent"
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: '4rem'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                  }}
                />
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {/* Attachment button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full flex items-center justify-center transition-all"
                  title="Attach files"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"></path>
                  </svg>
                </button>
                
                {/* Send button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() && attachedFiles.length === 0 || isTyping}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#5D4037] hover:bg-[#4E342E] disabled:bg-stone-300 text-white rounded-full flex items-center justify-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;