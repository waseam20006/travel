'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripPackage, CartItem, Booking, User, UserRole, BookingStatus } from '@/types';
import { initialTrips } from '@/data/initialTrips';
import { initialUsers } from '@/data/initialUsers';

interface TravelStoreType {
  // Trips
  trips: TripPackage[];
  addTrip: (trip: Omit<TripPackage, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<TripPackage>) => void;
  deleteTrip: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (trip: TripPackage, travelers?: number, departureDate?: string) => void;
  removeFromCart: (packageId: string) => void;
  updateCartTravelers: (packageId: string, travelers: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDiscount: number;

  // Bookings
  bookings: Booking[];
  createBookingFromCart: (customerInfo: { name: string; email: string; paymentMethod: string; notes?: string }) => Booking[];
  createSingleBooking: (trip: TripPackage, travelers: number, departureDate: string, customerInfo: { name: string; email: string; paymentMethod: string }) => Booking;
  approveBooking: (bookingId: string, approvedBy?: string) => void;
  cancelBooking: (bookingId: string) => void;
  updateBookingDate: (bookingId: string, newDate: string) => void;

  // User Management
  users: User[];
  addUser: (name: string, email: string, role: UserRole) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  toggleUserStatus: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

const TravelStoreContext = createContext<TravelStoreType | undefined>(undefined);

const initialBookings: Booking[] = [
  {
    id: 'BK-1001',
    customerId: 'user-customer-1',
    customerName: 'Alex Rivera',
    customerEmail: 'customer@jadoo.com',
    tripId: 'trip-1',
    tripTitle: 'Historic Wonders of Rome & Vatican',
    city: 'Rome',
    country: 'Italy',
    travelers: 2,
    totalPrice: 10840,
    bookingDate: '2025-09-18',
    departureDate: '2025-10-15',
    status: 'approved',
    paymentMethod: 'Credit Card (Visa)',
    approvedBy: 'Karim Mansour (Operations)'
  },
  {
    id: 'BK-1002',
    customerId: 'user-customer-2',
    customerName: 'Layla Al-Amiri',
    customerEmail: 'layla@example.com',
    tripId: 'trip-4',
    tripTitle: 'Santorini Sunset & Aegean Odyssey',
    city: 'Santorini',
    country: 'Greece',
    travelers: 3,
    totalPrice: 11400,
    bookingDate: '2025-09-22',
    departureDate: '2025-11-01',
    status: 'pending',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'BK-1003',
    customerId: 'user-customer-1',
    customerName: 'Alex Rivera',
    customerEmail: 'customer@jadoo.com',
    tripId: 'trip-2',
    tripTitle: 'Iconic London Landmarks & Thames Cruise',
    city: 'London',
    country: 'UK',
    travelers: 1,
    totalPrice: 4200,
    bookingDate: '2025-09-24',
    departureDate: '2025-10-28',
    status: 'pending',
    paymentMethod: 'PayPal'
  }
];

export const TravelStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<TripPackage[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem('jadoo_trips');
      setTrips(savedTrips ? JSON.parse(savedTrips) : initialTrips);

      const savedCart = localStorage.getItem('jadoo_cart');
      setCart(savedCart ? JSON.parse(savedCart) : []);

      const savedBookings = localStorage.getItem('jadoo_bookings');
      setBookings(savedBookings ? JSON.parse(savedBookings) : initialBookings);

      const savedUsers = localStorage.getItem('jadoo_users');
      setUsers(savedUsers ? JSON.parse(savedUsers) : initialUsers);
    } catch {
      setTrips(initialTrips);
      setBookings(initialBookings);
      setUsers(initialUsers);
    }
  }, []);

  // Save changes to localStorage
  const saveTrips = (newTrips: TripPackage[]) => {
    setTrips(newTrips);
    localStorage.setItem('jadoo_trips', JSON.stringify(newTrips));
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('jadoo_cart', JSON.stringify(newCart));
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('jadoo_bookings', JSON.stringify(newBookings));
  };

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('jadoo_users', JSON.stringify(newUsers));
  };

  // TRIP ACTIONS
  const addTrip = (tripData: Omit<TripPackage, 'id'>) => {
    const newTrip: TripPackage = {
      ...tripData,
      id: `trip-${Date.now()}`
    };
    saveTrips([newTrip, ...trips]);
  };

  const updateTrip = (id: string, updatedFields: Partial<TripPackage>) => {
    const updated = trips.map(t => (t.id === id ? { ...t, ...updatedFields } : t));
    saveTrips(updated);
  };

  const deleteTrip = (id: string) => {
    const filtered = trips.filter(t => t.id !== id);
    saveTrips(filtered);
  };

  // CART ACTIONS
  const addToCart = (trip: TripPackage, travelers = 1, departureDate = '2025-11-10') => {
    const existingIndex = cart.findIndex(item => item.packageId === trip.id);
    let newCart: CartItem[];
    if (existingIndex > -1) {
      newCart = [...cart];
      const newQty = newCart[existingIndex].travelers + travelers;
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        travelers: newQty,
        totalPrice: newQty * trip.price
      };
    } else {
      newCart = [
        ...cart,
        {
          packageId: trip.id,
          trip,
          travelers,
          departureDate,
          totalPrice: trip.price * travelers
        }
      ];
    }
    saveCart(newCart);
  };

  const removeFromCart = (packageId: string) => {
    saveCart(cart.filter(item => item.packageId !== packageId));
  };

  const updateCartTravelers = (packageId: string, travelers: number) => {
    if (travelers <= 0) {
      removeFromCart(packageId);
      return;
    }
    const updated = cart.map(item =>
      item.packageId === packageId
        ? { ...item, travelers, totalPrice: item.trip.price * travelers }
        : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartDiscount = cart.length > 0 ? Math.round(cartSubtotal * 0.1) : 0; // 10% promo
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // BOOKING ACTIONS
  const createBookingFromCart = (customerInfo: {
    name: string;
    email: string;
    paymentMethod: string;
    notes?: string;
  }): Booking[] => {
    const createdBookings: Booking[] = cart.map((item, idx) => ({
      id: `BK-${Date.now().toString().slice(-4)}${idx}`,
      customerId: 'user-customer-1',
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      tripId: item.trip.id,
      tripTitle: item.trip.title.en,
      city: item.trip.city,
      country: item.trip.country.en,
      travelers: item.travelers,
      totalPrice: item.totalPrice,
      bookingDate: new Date().toISOString().split('T')[0],
      departureDate: item.departureDate || '2025-11-20',
      status: 'pending' as BookingStatus,
      paymentMethod: customerInfo.paymentMethod,
      notes: customerInfo.notes
    }));

    saveBookings([...createdBookings, ...bookings]);
    clearCart();
    return createdBookings;
  };

  const createSingleBooking = (
    trip: TripPackage,
    travelers: number,
    departureDate: string,
    customerInfo: { name: string; email: string; paymentMethod: string }
  ): Booking => {
    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-4)}`,
      customerId: 'user-customer-1',
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      tripId: trip.id,
      tripTitle: trip.title.en,
      city: trip.city,
      country: trip.country.en,
      travelers,
      totalPrice: trip.price * travelers,
      bookingDate: new Date().toISOString().split('T')[0],
      departureDate,
      status: 'pending',
      paymentMethod: customerInfo.paymentMethod
    };

    saveBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const approveBooking = (bookingId: string, approvedBy = 'Staff Operations') => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'approved' as BookingStatus, approvedBy } : b
    );
    saveBookings(updated);
  };

  const cancelBooking = (bookingId: string) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b
    );
    saveBookings(updated);
  };

  const updateBookingDate = (bookingId: string, newDate: string) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, departureDate: newDate } : b
    );
    saveBookings(updated);
  };

  // USER MANAGEMENT
  const addUser = (name: string, email: string, role: UserRole) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    saveUsers([...users, newUser]);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const updated = users.map(u => (u.id === userId ? { ...u, role: newRole } : u));
    saveUsers(updated);
  };

  const toggleUserStatus = (userId: string) => {
    const updated = users.map(u =>
      u.id === userId
        ? { ...u, status: (u.status === 'active' ? 'suspended' : 'active') as 'active' | 'suspended' }
        : u
    );
    saveUsers(updated);
  };

  const deleteUser = (userId: string) => {
    saveUsers(users.filter(u => u.id !== userId));
  };

  return (
    <TravelStoreContext.Provider
      value={{
        trips,
        addTrip,
        updateTrip,
        deleteTrip,
        cart,
        addToCart,
        removeFromCart,
        updateCartTravelers,
        clearCart,
        cartTotal,
        cartSubtotal,
        cartDiscount,
        bookings,
        createBookingFromCart,
        createSingleBooking,
        approveBooking,
        cancelBooking,
        updateBookingDate,
        users,
        addUser,
        updateUserRole,
        toggleUserStatus,
        deleteUser
      }}
    >
      {children}
    </TravelStoreContext.Provider>
  );
};

export const useTravelStore = () => {
  const context = useContext(TravelStoreContext);
  if (!context) {
    throw new Error('useTravelStore must be used within a TravelStoreProvider');
  }
  return context;
};
