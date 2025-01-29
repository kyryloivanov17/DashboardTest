export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Schedule' | 'Ongoing';
  totalLeads: number;
  scheduledLeads: number;
  ongoingLeads: number;
  conversion: number;
  lastUpdated: string;
  type: 'Inbound' | 'Outbound' | 'Mixed';
}