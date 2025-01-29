export type TriggerType = 'Facebook' | 'Website' | 'Text Message' | 'Instagram' | 'Out reach';
export type LeadStatus = 'Qualified' | 'Lead' | 'Interested';

export interface Lead {
  id: string;
  name: string;
  status: LeadStatus;
  email: string;
  phone: string;
  triggerType: TriggerType;
  createdAt: string;
  campaign: {
    id: string;
    name: string;
  };
}