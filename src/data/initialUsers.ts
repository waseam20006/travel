import { User } from '@/types';

export const initialUsers: User[] = [
  {
    id: 'user-admin',
    name: 'Sarah Jenkins (Admin)',
    email: 'admin@jadoo.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-01-15',
    status: 'active'
  },
  {
    id: 'user-employee-1',
    name: 'Karim Mansour (Operations)',
    email: 'employee@jadoo.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-03-20',
    status: 'active'
  },
  {
    id: 'user-employee-2',
    name: 'Nour El-Din (Tour Manager)',
    email: 'nour@jadoo.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-06-10',
    status: 'active'
  },
  {
    id: 'user-customer-1',
    name: 'Alex Rivera (Explorer)',
    email: 'customer@jadoo.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-08-01',
    status: 'active'
  },
  {
    id: 'user-customer-2',
    name: 'Layla Al-Amiri',
    email: 'layla@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2025-09-12',
    status: 'active'
  }
];
