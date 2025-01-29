import type { Lead } from '../types/lead';

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    status: 'Qualified',
    email: 'john@example.com',
    phone: '123-456-7890',
    triggerType: 'Facebook',
    createdAt: '2024-03-01',
    campaign: {
      id: '1',
      name: 'Summer Sales Outreach'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'Lead',
    email: 'jane@example.com',
    phone: '987-654-3210',
    triggerType: 'Website',
    createdAt: '2024-03-02',
    campaign: {
      id: '2',
      name: 'Holiday Promotion'
    }
  },
  {
    id: '3',
    name: 'Alice Johnson',
    status: 'Interested',
    email: 'alice@example.com',
    phone: '555-666-7777',
    triggerType: 'Instagram',
    createdAt: '2024-03-03',
    campaign: {
      id: '3',
      name: 'Product Launch Campaign'
    }
  }
  // ... rest of the mock data with campaign information
];

interface LeadInquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  text: string;
  additionalInfo: {
    source: string;
  };
  campaignId: string;
}

export const fetchLeadsData = async (): Promise<Lead[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADS);
    }, 1000);
  });
};

export const createLeadInquiry = async (data: LeadInquiry): Promise<Response> => {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create lead inquiry');
  }

  return response;
};