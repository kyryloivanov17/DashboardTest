import React from 'react';
import LeadsStats from '../components/leads/LeadsStats';
import LeadManagementTable from '../components/leads/LeadManagementTable';
import UpcomingAppointments from '../components/leads/UpcomingAppointments';

export default function Leads() {
  return (
    <div className="space-y-6">
      <LeadsStats />
      <LeadManagementTable />
      <UpcomingAppointments />
    </div>
  );
}