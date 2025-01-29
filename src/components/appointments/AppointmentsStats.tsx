import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const stats = [
  {
    label: 'Total Appointments',
    value: '156',
    change: '+12%',
    icon: Calendar,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: 'Upcoming',
    value: '42',
    change: '+8%',
    icon: Clock,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    label: 'Completed',
    value: '98',
    change: '+15%',
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: 'Cancelled',
    value: '16',
    change: '-5%',
    icon: XCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  }
];

export default function AppointmentsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
              <span className={`inline-flex items-center text-sm ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              } mt-1`}>
                {stat.change}
              </span>
            </div>
            <div className={`p-3 rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}