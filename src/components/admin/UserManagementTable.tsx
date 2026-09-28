'use client';

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { UserRole } from '@/types';
import { UserPlus, Shield, Briefcase, User as UserIcon, Trash2, CheckCircle, Ban, X } from 'lucide-react';

export const UserManagementTable: React.FC = () => {
  const { t } = useI18n();
  const { users, addUser, updateUserRole, toggleUserStatus, deleteUser } = useTravelStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('customer');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    addUser(newName, newEmail, newRole);
    setNewName('');
    setNewEmail('');
    setNewRole('customer');
    setModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
      
      {/* Table Action Header */}
      <div className="p-6 border-b border-gray-100 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-dark dark:text-white">
            {t('admin_user_management')}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total registered accounts: {users.length}
          </span>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t('admin_add_user')}</span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs">
          <thead className="bg-gray-50 dark:bg-dark-surface/50 text-gray-500 dark:text-gray-400 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-6 text-start">{t('admin_col_name')}</th>
              <th className="py-3.5 px-6 text-start">{t('admin_col_email')}</th>
              <th className="py-3.5 px-6 text-start">{t('admin_col_role')}</th>
              <th className="py-3.5 px-6 text-start">{t('admin_col_status')}</th>
              <th className="py-3.5 px-6 text-start">{t('admin_col_actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-surface/30 transition-colors">
                
                {/* User info */}
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-dark dark:text-white block">{u.name}</span>
                    <span className="text-[10px] text-gray-400">Joined {u.createdAt}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="py-4 px-6 text-dark-body dark:text-gray-300">
                  {u.email}
                </td>

                {/* Role with Dropdown Selector */}
                <td className="py-4 px-6">
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                    className="py-1 px-2 rounded-lg text-xs font-semibold bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-dark dark:text-white focus:outline-none"
                  >
                    <option value="admin">🛡️ {t('admin_role_admin')}</option>
                    <option value="employee">💼 {t('admin_role_employee')}</option>
                    <option value="customer">🧳 {t('admin_role_customer')}</option>
                  </select>
                </td>

                {/* Status Badge */}
                <td className="py-4 px-6">
                  <button
                    onClick={() => toggleUserStatus(u.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      u.status === 'active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                    }`}
                    title="Click to toggle status"
                  >
                    {u.status === 'active' ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <Ban className="w-3 h-3" /> Suspended
                      </>
                    )}
                  </button>
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                    title="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-dark-border">
              <h3 className="font-bold text-base text-dark dark:text-white">
                {t('admin_add_user')}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t('checkout_full_name')}
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t('checkout_email')}
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t('auth_role_label')}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
                >
                  <option value="customer">Customer</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white shadow-danger"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
