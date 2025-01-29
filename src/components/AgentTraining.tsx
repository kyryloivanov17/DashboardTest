import React, { useState } from 'react';
import { Sparkles, Link2, FileText } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AgentTraining() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'user', content: 'Hi, I\'m testing this campaign.' },
    { role: 'ai', content: 'Hello! How can I assist you with this campaign?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { role: 'user', content: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Chat Interface */}
      <div className="flex-1">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-900">Playground</h2>
          </div>
          
          <div className="h-[calc(100vh-16rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] rounded-lg px-4 py-2
                    ${message.role === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                    }
                  `}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="w-full lg:w-96">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Select Campaign</h3>
            <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select a campaign</option>
              <option value="1">Summer Sales Outreach</option>
              <option value="2">Product Launch Campaign</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Select Chat History</h3>
            <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select chat history</option>
              <option value="1">Previous Chat 1</option>
              <option value="2">Previous Chat 2</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Primary Goal</h3>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Generate
                </button>
                <button className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  <FileText className="w-4 h-4 mr-1" />
                  Add Text
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-24 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the primary goal"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Knowledge Base</h3>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Generate
                </button>
                <button className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  <Link2 className="w-4 h-4 mr-1" />
                  Paste URL
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-24 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide product details"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Communication Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Use Emoji on Responses</label>
                <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Communication Tone</label>
                <select className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}