import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { ChatMessage } from '../../types/chat';
import { fetchChatHistory } from '../../api/chats';
import type { Lead } from '../../types/lead';

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
}

export default function ChatHistoryModal({ isOpen, onClose, lead }: ChatHistoryModalProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const history = await fetchChatHistory(lead.id);
        setChatHistory(history);
      } catch (err) {
        setError('Failed to load chat history');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen, lead.id]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Chat History</h2>
              <p className="text-sm text-gray-500 mt-1">{lead.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Chat History */}
          <div className="p-6 h-[500px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-red-600">
                {error}
              </div>
            ) : chatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No chat history available
              </div>
            ) : (
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'lead' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`
                      max-w-[80%] rounded-lg px-4 py-2
                      ${message.sender === 'lead' 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-blue-500 text-white'
                      }
                    `}>
                      <div className="text-sm">{message.content}</div>
                      <div className={`
                        text-xs mt-1
                        ${message.sender === 'lead' ? 'text-gray-500' : 'text-blue-100'}
                      `}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}