export interface Appointment {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  email: string;
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';
}