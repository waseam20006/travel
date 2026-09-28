'use client';

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { BookingStatus } from '@/types';
import { CheckCircle, XCircle, Calendar, Users, Clock, AlertCircle } from 'lucide-react';

export const BookingActionTable: React.FC = () => {
  const { t } = useI18n();
  const { bookings, approveBooking, cancelBooking, updateBookingDate } = useTravelStore();

  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const handleSaveDate = (id: string) => {
    if (newDate) {
      updateBookingDate(id, newDate);
      setEditingBookingId(null);
      setNewDate('');
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden space-y-4">
      
      {/* Table Filter Tabs */}
      <div className="p-6 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-dark dark:text-white">
            {t('emp_tab_bookings')}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total active bookings: {bookings.length}
          </span>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-surface p-1 rounded-xl border border-gray-200 dark:border-dark-border self-start sm:self-auto text-xs">
          {(['all', 'pending', 'approved', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all ${
                filter === status
                  ? 'bg-white dark:bg-dark-card text-primary shadow-sm font-bold'
                  : 'text-gray-500 hover:text-dark dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs">
          <thead className="bg-gray-50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-6 text-start">Reference & Customer</th>
              <th className="py-3.5 px-6 text-start">Destination & Trip</th>
              <th className="py-3.5 px-6 text-start">Departure Date</th>
              <th className="py-3.5 px-6 text-start">Total Price</th>
              <th className="py-3.5 px-6 text-start">Status</th>
              <th className="py-3.5 px-6 text-start">Staff Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No bookings found for the selected filter.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-surface/30 transition-colors">
                  
                  {/* Reference & Customer */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-dark dark:text-white block font-mono">
                      {b.id}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 block">{b.customerName}</span>
                    <span className="text-[10px] text-gray-400">{b.customerEmail}</span>
                  </td>

                  {/* Trip Details */}
                  <td className="py-4 px-6">
                    <span className="font-semibold text-dark dark:text-white block line-clamp-1">
                      {b.tripTitle}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3" /> {b.travelers} traveler(s) &bull; {b.city}, {b.country}
                    </span>
                  </td>

                  {/* Departure Date */}
                  <td className="py-4 px-6 text-dark-body dark:text-gray-300">
                    {editingBookingId === b.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="p-1 rounded border border-gray-200 dark:border-dark-border text-xs bg-white dark:bg-dark-card"
                        />
                        <button
                          onClick={() => handleSaveDate(b.id)}
                          className="px-2 py-1 rounded bg-emerald-600 text-white font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{b.departureDate}</span>
                        <button
                          onClick={() => { setEditingBookingId(b.id); setNewDate(b.departureDate); }}
                          className="text-[10px] text-primary hover:underline ms-1"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Total Price */}
                  <td className="py-4 px-6 font-bold text-dark dark:text-white">
                    ${b.totalPrice.toLocaleString()}
                    <span className="block text-[10px] font-normal text-gray-400">{b.paymentMethod}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      b.status === 'approved'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : b.status === 'pending'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                    }`}>
                      {b.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                      {b.status === 'pending' && <Clock className="w-3 h-3" />}
                      {b.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                      <span className="capitalize">{b.status}</span>
                    </span>
                  </td>

                  {/* Staff Moderation Actions */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {b.status !== 'approved' && (
                        <button
                          onClick={() => approveBooking(b.id, 'Operations Team')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                          title="Approve booking"
                        >
                          {t('emp_approve_btn')}
                        </button>
                      )}

                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 hover:bg-red-100 transition-all"
                          title="Cancel booking"
                        >
                          {t('emp_reject_btn')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
