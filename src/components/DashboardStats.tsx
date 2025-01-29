import React from 'react';
import { Users, Target, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Leads',
    value: '2,050',
    change: '+12%',
    icon: Users,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: 'Qualified Leads',
    value: '590',
    change: '+8%',
    icon: Target,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: 'Active Chats',
    value: '73',
    change: '+15%',
    icon: MessageSquare,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: 'Conversion Rate',
    value: '28.8%',
    change: '+10%',
    icon: TrendingUp,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 md:p-6 rounded-xl border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl md:text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
              <span className="inline-flex items-center text-sm text-green-600 mt-1">
                {stat.change}
              </span>
            </div>
            <div className={`p-3 rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}