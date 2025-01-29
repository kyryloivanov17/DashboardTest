import type { Client } from '../types/client';

const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Anderson',
    address: '123 Pine Street, Seattle, WA 98101',
    phone: '(206) 555-0101'
  },
  {
    id: '2',
    firstName: 'Benjamin',
    lastName: 'Brooks',
    address: '456 Oak Avenue, Portland, OR 97201',
    phone: '(503) 555-0102'
  },
  {
    id: '3',
    firstName: 'Catherine',
    lastName: 'Chen',
    address: '789 Maple Drive, San Francisco, CA 94102',
    phone: '(415) 555-0103'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Davis',
    address: '321 Cedar Lane, Los Angeles, CA 90012',
    phone: '(213) 555-0104'
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Edwards',
    address: '654 Birch Road, San Diego, CA 92101',
    phone: '(619) 555-0105'
  },
  {
    id: '6',
    firstName: 'Frank',
    lastName: 'Foster',
    address: '987 Willow Way, Denver, CO 80202',
    phone: '(303) 555-0106'
  },
  {
    id: '7',
    firstName: 'Grace',
    lastName: 'Garcia',
    address: '147 Elm Street, Phoenix, AZ 85004',
    phone: '(602) 555-0107'
  },
  {
    id: '8',
    firstName: 'Henry',
    lastName: 'Hughes',
    address: '258 Spruce Court, Las Vegas, NV 89101',
    phone: '(702) 555-0108'
  },
  {
    id: '9',
    firstName: 'Isabella',
    lastName: 'Ingram',
    address: '369 Redwood Road, Austin, TX 78701',
    phone: '(512) 555-0109'
  },
  {
    id: '10',
    firstName: 'James',
    lastName: 'Johnson',
    address: '741 Sequoia Street, Houston, TX 77002',
    phone: '(713) 555-0110'
  }
];

// Simulate API call with delay
export const fetchClientsData = async (): Promise<Client[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CLIENTS);
    }, 1000);
  });
};