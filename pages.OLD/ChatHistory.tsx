import React, { useState, useEffect } from 'react';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  lastChatted: Date;
  messageCount: number;
  topic: string;
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatHistory: React.FC = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Mock data - In real app, this would come from API
  useEffect(() => {
    const mockChatSessions: ChatSession[] = [
      {
        id: '1',
        title: 'Exam Form Submission Help',
        lastMessage: 'Thank you for the help with my exam form submission!',
        lastChatted: new Date('2024-01-30T14:30:00'),
        messageCount: 12,
        topic: 'Exam Forms',
        messages: [
          { id: '1', content: 'I need help with submitting my exam form', isUser: true, timestamp: new Date('2024-01-30T14:00:00') },
          { id: '2', content: 'I can help you with that! Let me guide you through the exam form submission process.', isUser: false, timestamp: new Date('2024-01-30T14:01:00') },
          { id: '3', content: 'What documents do I need to upload?', isUser: true, timestamp: new Date('2024-01-30T14:02:00') },
          { id: '4', content: 'You will need to upload your ID proof, previous semester marksheet, and passport-size photograph.', isUser: false, timestamp: new Date('2024-01-30T14:03:00') },
        ]
      },
      {
        id: '2',
        title: 'Grade Card Download Issue',
        lastMessage: 'The download link is working now, thanks!',
        lastChatted: new Date('2024-01-29T10:15:00'),
        messageCount: 8,
        topic: 'Grade Cards',
        messages: [
          { id: '1', content: 'I cannot download my grade card', isUser: true, timestamp: new Date('2024-01-29T10:00:00') },
          { id: '2', content: 'Let me help you troubleshoot the grade card download issue.', isUser: false, timestamp: new Date('2024-01-29T10:01:00') },
        ]
      },
      {
        id: '3',
        title: 'Result Declaration Query',
        lastMessage: 'Results will be declared by February 15th',
        lastChatted: new Date('2024-01-28T16:45:00'),
        messageCount: 6,
        topic: 'Results',
        messages: [
          { id: '1', content: 'When will the semester results be declared?', isUser: true, timestamp: new Date('2024-01-28T16:30:00') },
          { id: '2', content: 'Based on the academic calendar, results are typically declared within 4-6 weeks after exams.', isUser: false, timestamp: new Date('2024-01-28T16:31:00') },
        ]
      },
      {
        id: '4',
        title: 'Fee Payment Assistance',
        lastMessage: 'Payment completed successfully',
        lastChatted: new Date('2024-01-27T11:20:00'),
        messageCount: 15,
        topic: 'Fees',
        messages: [
          { id: '1', content: 'I am having trouble with online fee payment', isUser: true, timestamp: new Date('2024-01-27T11:00:00') },
          { id: '2', content: 'I can guide you through the fee payment process step by step.', isUser: false, timestamp: new Date('2024-01-27T11:01:00') },
        ]
      }
    ];
    setChatSessions(mockChatSessions);
  }, []);

  const filteredAndSortedChats = chatSessions
    .filter(chat => 
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.lastChatted.getTime() - a.lastChatted.getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleContinueChat = (chat: ChatSession) => {
    // In real app, this would navigate to the AI chat with the session loaded
    console.log('Continue chat with session:', chat.id);
    // For now, we'll just show the chat details
    setSelectedChat(chat);
  };

  const handleNewChat = () => {
    // Navigate to new AI chat session
    console.log('Starting new chat session');
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedChat(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{selectedChat.title}</h1>
                <p className="text-sm text-gray-500">
                  {selectedChat.messageCount} messages • Last active {formatDate(selectedChat.lastChatted)}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleContinueChat(selectedChat)}
              className="px-4 py-2 bg-[#5D4037] text-white rounded-lg hover:bg-[#4A2C20] transition-colors"
            >
              Continue Chat
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-[#5D4037] text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-gray-200' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chat History</h1>
            <p className="text-gray-600 mt-1">Review your previous conversations with AI Campus</p>
          </div>
          <button
            onClick={handleNewChat}
            className="px-4 py-2 bg-[#5D4037] text-white rounded-lg hover:bg-[#4A2C20] transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
            New Chat
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search chat history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D4037] focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D4037] focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {filteredAndSortedChats.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat history found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Start a conversation with AI Campus to see your chat history here'}
              </p>
              <button
                onClick={handleNewChat}
                className="px-4 py-2 bg-[#5D4037] text-white rounded-lg hover:bg-[#4A2C20] transition-colors"
              >
                Start New Chat
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedChats.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{chat.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          {chat.topic}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{chat.lastMessage}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {formatDate(chat.lastChatted)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          {chat.messageCount} messages
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueChat(chat);
                      }}
                      className="px-3 py-1.5 text-sm bg-[#5D4037] text-white rounded-lg hover:bg-[#4A2C20] transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;