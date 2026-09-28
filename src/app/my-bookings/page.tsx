'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Navigation,
  Compass,
  FileText
} from 'lucide-react';

export default function MyBookingsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const { bookings, cancelBooking } = useTravelStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-dark dark:text-white">
          {t('my_bookings_title')}
        </h1>
        <p className="text-sm text-dark-body dark:text-gray-400 max-w-xl">
          {t('my_bookings_subtitle')}
        </p>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border space-y-4">
            <Compass className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="font-bold text-base text-dark dark:text-white">No bookings yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Ready to embark on a new adventure? Explore our catalog and plan your next journey today.
            </p>
            <Link
              href="/packages"
              className="inline-block px-6 py-3 rounded-xl text-xs font-bold bg-primary text-white"
            >
              {t('hero_btn_explore')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-card transition-all"
              >
                
                {/* Left info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-dark-surface font-mono text-xs font-bold text-dark dark:text-gray-200">
                      {booking.id}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'approved'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : booking.status === 'pending'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                    }`}>
                      {booking.status === 'approved' && <CheckCircle className="w-3.5 h-3.5" />}
                      {booking.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                      {booking.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                      <span>{t(`booking_status_${booking.status}` as any) || booking.status}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-dark dark:text-white">
                    {booking.tripTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-dark-body dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-primary" />
                      {booking.city}, {booking.country}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      Departure: <strong>{booking.departureDate}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      {booking.travelers} Traveler(s)
                    </span>
                  </div>
                </div>

                {/* Right price & action */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-dark-border">
                  <div className="text-start md:text-end">
                    <span className="text-[11px] text-gray-400 block">Total Amount</span>
                    <span className="text-2xl font-bold text-dark dark:text-white">
                      ${booking.totalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400 block">{booking.paymentMethod}</span>
                  </div>

                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      {t('booking_cancel_btn')}
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
