import type { Campaign } from '../types/campaign';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sales Outreach',
    status: 'Active',
    totalLeads: 1250,
    scheduledLeads: 380,
    ongoingLeads: 45,
    conversion: 30,
    lastUpdated: '2024-10-25',
    type: 'Mixed'
  },
  {
    id: '2',
    name: 'Holiday Promotion',
    status: 'Ongoing',
    totalLeads: 850,
    scheduledLeads: 220,
    ongoingLeads: 65,
    conversion: 42,
    lastUpdated: '2024-10-24',
    type: 'Inbound'
  },
  {
    id: '3',
    name: 'Product Launch Campaign',
    status: 'Schedule',
    totalLeads: 2100,
    scheduledLeads: 580,
    ongoingLeads: 120,
    conversion: 35,
    lastUpdated: '2024-10-23',
    type: 'Outbound'
  },
  {
    id: '4',
    name: 'Black Friday Special',
    status: 'Active',
    totalLeads: 1800,
    scheduledLeads: 450,
    ongoingLeads: 85,
    conversion: 38,
    lastUpdated: '2024-10-22',
    type: 'Mixed'
  },
  {
    id: '5',
    name: 'End of Year Sale',
    status: 'Schedule',
    totalLeads: 950,
    scheduledLeads: 280,
    ongoingLeads: 40,
    conversion: 28,
    lastUpdated: '2024-10-21',
    type: 'Inbound'
  },
  {
    id: '6',
    name: 'Spring Collection Launch',
    status: 'Active',
    totalLeads: 1560,
    scheduledLeads: 420,
    ongoingLeads: 95,
    conversion: 45,
    lastUpdated: '2024-10-20',
    type: 'Mixed'
  },
  {
    id: '7',
    name: 'Customer Reactivation',
    status: 'Ongoing',
    totalLeads: 3200,
    scheduledLeads: 890,
    ongoingLeads: 150,
    conversion: 32,
    lastUpdated: '2024-10-19',
    type: 'Outbound'
  },
  {
    id: '8',
    name: 'Referral Program',
    status: 'Active',
    totalLeads: 2800,
    scheduledLeads: 750,
    ongoingLeads: 180,
    conversion: 52,
    lastUpdated: '2024-10-18',
    type: 'Mixed'
  },
  {
    id: '9',
    name: 'Website Inquiry Follow-up',
    status: 'Active',
    totalLeads: 1750,
    scheduledLeads: 480,
    ongoingLeads: 90,
    conversion: 41,
    lastUpdated: '2024-10-17',
    type: 'Inbound'
  },
  {
    id: '10',
    name: 'Social Media Campaign',
    status: 'Schedule',
    totalLeads: 2100,
    scheduledLeads: 560,
    ongoingLeads: 110,
    conversion: 36,
    lastUpdated: '2024-10-16',
    type: 'Mixed'
  },
  {
    id: '11',
    name: 'Email Newsletter Campaign',
    status: 'Active',
    totalLeads: 4200,
    scheduledLeads: 1200,
    ongoingLeads: 280,
    conversion: 48,
    lastUpdated: '2024-10-15',
    type: 'Outbound'
  },
  {
    id: '12',
    name: 'Trade Show Follow-up',
    status: 'Ongoing',
    totalLeads: 890,
    scheduledLeads: 240,
    ongoingLeads: 55,
    conversion: 39,
    lastUpdated: '2024-10-14',
    type: 'Mixed'
  },
  {
    id: '13',
    name: 'Customer Satisfaction Survey',
    status: 'Active',
    totalLeads: 1650,
    scheduledLeads: 420,
    ongoingLeads: 95,
    conversion: 44,
    lastUpdated: '2024-10-13',
    type: 'Outbound'
  },
  {
    id: '14',
    name: 'Product Demo Requests',
    status: 'Active',
    totalLeads: 980,
    scheduledLeads: 310,
    ongoingLeads: 75,
    conversion: 56,
    lastUpdated: '2024-10-12',
    type: 'Inbound'
  },
  {
    id: '15',
    name: 'Partner Collaboration',
    status: 'Schedule',
    totalLeads: 1200,
    scheduledLeads: 340,
    ongoingLeads: 80,
    conversion: 42,
    lastUpdated: '2024-10-11',
    type: 'Mixed'
  }
];

export const fetchCampaignsData = async (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CAMPAIGNS);
    }, 1000);
  });
};

// interface NewCampI {
//     token: string,
//     formData: {
//       name: string;
//       type: string;
//       status: string;
//       timezone: string;
//       campaignPhone: string;
//       adminPhone: string;
//       afterHoursMessage: string;
//       workingHours: {
//         monday: { closed: boolean; opens: string; closes: string };
//         tuesday: { closed: boolean; opens: string; closes: string };
//         wednesday: { closed: boolean; opens: string; closes: string };
//         thursday: { closed: boolean; opens: string; closes: string };
//         friday: { closed: boolean; opens: string; closes: string };
//         saturday: { closed: boolean; opens: string; closes: string };
//         sunday: { closed: boolean; opens: string; closes: string };
//     };
//   }
// }

// export const fetchCreateNewCamp = (data: NewCampI) => {
//   const url =
//     "http://ec2-52-23-205-94.compute-1.amazonaws.com:3000/api/campaigns"; // API endpoint

//   fetch(url, {
//     method: "POST", 
//     headers: {
//       "Content-Type": "application/json", 
//       Authorization: `Bearer ${data?.token}`, 
//     },
//     body: JSON.stringify(data?.formData), 
//   })
//     .then((response) => response.json()) 
//     .then((data) => {
//       console.log("Success:", data); 
//     })
//     .catch((error) => {
//       console.error("Error:", error); 
//     });
// };



