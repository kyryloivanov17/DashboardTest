import React from 'react';
import AppointmentsStats from '../components/appointments/AppointmentsStats';
import UpcomingAppointments from '../components/leads/UpcomingAppointments';

export default function Appointments() {
  return (
    <div className="space-y-6">
      <AppointmentsStats />
      <UpcomingAppointments />
    </div>
  );
}