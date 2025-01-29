export interface ChatMessage {
  id: string;
  leadId: string;
  content: string;
  sender: 'lead' | 'agent';
  timestamp: string;
}