import React from 'react';
import { 
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Users,
  GraduationCap,
  Webhook,
  Zap,
  Calendar
} from 'lucide-react';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', active: true },
  { icon: Megaphone, label: 'Campaigns' },
  { icon: MessageSquare, label: 'Leads' },
  { icon: Users, label: 'Clients' },
  { icon: GraduationCap, label: 'Agent Training' },
  { icon: Webhook, label: 'APIs' },
  { icon: Zap, label: 'Triggers' },
  { icon: Calendar, label: 'Appointments' }
];

export default function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-16 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex -mb-px overflow-x-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`
                flex items-center px-4 py-4 border-b-2 whitespace-nowrap
                ${item.active 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <item.icon className={`
                w-5 h-5 mr-2
                ${item.active ? 'text-blue-500' : ''}
              `} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}