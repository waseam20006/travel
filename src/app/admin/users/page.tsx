'use client';

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserManagementTable } from '@/components/admin/UserManagementTable';
import { Lock } from 'lucide-react';

export default function AdminUsersPage() {
  const { t } = useI18n();
  const { role, switchRole } = useAuth();

  if (role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark dark:text-white">
          Admin Authorization Required
        </h2>
        <p className="text-xs text-dark-body dark:text-gray-400">
          This panel is strictly restricted to platform administrators.
        </p>
        <button
          onClick={() => switchRole('admin')}
          className="px-6 py-3 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all"
        >
          Switch to Demo Admin Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50/50 dark:bg-dark-surface">
      <Sidebar type="admin" />
      
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-dark dark:text-white">
            {t('admin_user_management')}
          </h1>
          <p className="text-xs text-dark-body dark:text-gray-400">
            Control employee credentials, modify roles, and supervise customer accounts.
          </p>
        </div>

        {/* User Management Panel */}
        <UserManagementTable />
      </main>
    </div>
  );
}
