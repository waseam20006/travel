'use client';

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { BookingActionTable } from '@/components/employee/BookingActionTable';
import { Lock } from 'lucide-react';

export default function EmployeeBookingsPage() {
  const { t } = useI18n();
  const { role, switchRole } = useAuth();

  if (role !== 'employee' && role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark dark:text-white">
          Staff Authorization Required
        </h2>
        <p className="text-xs text-dark-body dark:text-gray-400">
          This desk is accessible by employees and managers. You can switch to the Employee profile instantly below:
        </p>
        <button
          onClick={() => switchRole('employee')}
          className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        >
          Switch to Demo Employee Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50/50 dark:bg-dark-surface">
      <Sidebar type="employee" />
      
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-dark dark:text-white">
            {t('emp_desk_title')}
          </h1>
          <p className="text-xs text-dark-body dark:text-gray-400">
            {t('emp_desk_subtitle')}
          </p>
        </div>

        {/* Bookings Moderation Table */}
        <BookingActionTable />
      </main>
    </div>
  );
}
