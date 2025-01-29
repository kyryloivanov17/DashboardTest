import { ChatMessage } from '../types/chat';

const MOCK_CHAT_HISTORY: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      leadId: '1',
      content: 'Hi, I\'m interested in learning more about your services.',
      sender: 'lead',
      timestamp: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      leadId: '1',
      content: 'Hello! Thank you for reaching out. I\'d be happy to help. What specific services are you interested in?',
      sender: 'agent',
      timestamp: '2024-03-15T10:32:00Z'
    },
    {
      id: '3',
      leadId: '1',
      content: 'I\'m looking for consultation services for my business.',
      sender: 'lead',
      timestamp: '2024-03-15T10:35:00Z'
    },
    {
      id: '4',
      leadId: '1',
      content: 'Great! We offer comprehensive business consultation services. Would you like to schedule a call to discuss your needs in detail?',
      sender: 'agent',
      timestamp: '2024-03-15T10:37:00Z'
    }
  ]
};

export const fetchChatHistory = async (leadId: string): Promise<ChatMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CHAT_HISTORY[leadId] || []);
    }, 1000);
  });
};