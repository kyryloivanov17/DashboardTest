import type { Appointment } from '../types/appointment';

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '(123) 456-7890',
    date: '2024-11-05',
    time: '10:30 AM',
    address: '1234 Pine Street, San Francisco, CA 94111',
    email: 'john.doe@example.com',
    status: 'Scheduled'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    phone: '(415) 555-0123',
    date: '2024-11-05',
    time: '2:00 PM',
    address: '789 Market Street, Suite 400, San Francisco, CA 94103',
    email: 'sarah.w@example.com',
    status: 'Confirmed'
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '(628) 234-5678',
    date: '2024-11-06',
    time: '11:00 AM',
    address: '567 Howard Street, San Francisco, CA 94105',
    email: 'mbrown@example.com',
    status: 'Scheduled'
  },
  {
    id: '4',
    name: 'Emily Davis',
    phone: '(510) 777-9999',
    date: '2024-11-06',
    time: '3:30 PM',
    address: '321 Broadway Street, Oakland, CA 94607',
    email: 'emily.d@example.com',
    status: 'Confirmed'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    phone: '(650) 888-1234',
    date: '2024-11-07',
    time: '9:00 AM',
    address: '890 El Camino Real, Palo Alto, CA 94301',
    email: 'rwilson@example.com',
    status: 'Scheduled'
  },
  {
    id: '6',
    name: 'Jennifer Lee',
    phone: '(415) 222-3333',
    date: '2024-11-07',
    time: '1:30 PM',
    address: '456 Valencia Street, San Francisco, CA 94110',
    email: 'jlee@example.com',
    status: 'Cancelled'
  },
  {
    id: '7',
    name: 'Thomas Anderson',
    phone: '(510) 444-5555',
    date: '2024-11-08',
    time: '10:00 AM',
    address: '789 College Avenue, Berkeley, CA 94709',
    email: 'tanderson@example.com',
    status: 'Scheduled'
  },
  {
    id: '8',
    name: 'Maria Garcia',
    phone: '(650) 666-7777',
    date: '2024-11-08',
    time: '2:30 PM',
    address: '123 Main Street, San Mateo, CA 94401',
    email: 'mgarcia@example.com',
    status: 'Confirmed'
  },
  {
    id: '9',
    name: 'David Kim',
    phone: '(415) 888-9999',
    date: '2024-11-09',
    time: '11:30 AM',
    address: '567 Geary Street, San Francisco, CA 94102',
    email: 'dkim@example.com',
    status: 'Scheduled'
  },
  {
    id: '10',
    name: 'Lisa Chen',
    phone: '(510) 111-2222',
    date: '2024-11-09',
    time: '4:00 PM',
    address: '890 Park Street, Alameda, CA 94501',
    email: 'lchen@example.com',
    status: 'Completed'
  },
  {
    id: '11',
    name: 'James Wilson',
    phone: '(628) 333-4444',
    date: '2024-11-10',
    time: '9:30 AM',
    address: '234 Hayes Street, San Francisco, CA 94102',
    email: 'jwilson@example.com',
    status: 'Scheduled'
  },
  {
    id: '12',
    name: 'Amanda Taylor',
    phone: '(650) 555-6666',
    date: '2024-11-10',
    time: '1:00 PM',
    address: '456 Broadway, Redwood City, CA 94063',
    email: 'ataylor@example.com',
    status: 'Confirmed'
  },
  {
    id: '13',
    name: 'Kevin Martinez',
    phone: '(415) 777-8888',
    date: '2024-11-11',
    time: '10:30 AM',
    address: '789 Irving Street, San Francisco, CA 94122',
    email: 'kmartinez@example.com',
    status: 'Scheduled'
  },
  {
    id: '14',
    name: 'Rachel Wong',
    phone: '(510) 999-0000',
    date: '2024-11-11',
    time: '3:00 PM',
    address: '123 Shattuck Avenue, Berkeley, CA 94704',
    email: 'rwong@example.com',
    status: 'Cancelled'
  },
  {
    id: '15',
    name: 'Daniel Park',
    phone: '(650) 222-3333',
    date: '2024-11-12',
    time: '11:00 AM',
    address: '567 Laurel Street, San Carlos, CA 94070',
    email: 'dpark@example.com',
    status: 'Scheduled'
  }
];

export const fetchAppointmentsData = async (): Promise<Appointment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_APPOINTMENTS);
    }, 1000);
  });
};