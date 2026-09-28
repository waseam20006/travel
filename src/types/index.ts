export type UserRole = 'admin' | 'employee' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export type TripCategory = 'adventure' | 'beach' | 'cultural' | 'europe' | 'asia';

export interface TripPackage {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  city: string;
  country: {
    en: string;
    ar: string;
  };
  price: number;
  durationDays: number;
  category: TripCategory;
  image: string;
  rating: number;
  reviewsCount: number;
  description: {
    en: string;
    ar: string;
  };
  featured?: boolean;
  availableSeats: number;
}

export interface CartItem {
  packageId: string;
  trip: TripPackage;
  travelers: number;
  departureDate: string;
  totalPrice: number;
}

export type BookingStatus = 'pending' | 'approved' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  tripId: string;
  tripTitle: string;
  city: string;
  country: string;
  travelers: number;
  totalPrice: number;
  bookingDate: string;
  departureDate: string;
  status: BookingStatus;
  paymentMethod: string;
  approvedBy?: string;
  notes?: string;
}

export interface SalesAnalytics {
  totalRevenue: number;
  totalBookings: number;
  approvedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalCustomers: number;
  monthlyRevenue: {
    month: string;
    revenue: number;
    bookings: number;
  }[];
  popularDestinations: {
    name: string;
    bookings: number;
    percentage: number;
  }[];
}
