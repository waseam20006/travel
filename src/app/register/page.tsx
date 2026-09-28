'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { t, dir } = useI18n();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password, role);
    if (role === 'admin') router.push('/admin');
    else if (role === 'employee') router.push('/employee');
    else router.push('/packages');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-white mx-auto shadow-primary">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-dark dark:text-white">
            {t('auth_register_title')}
          </h1>
          <p className="text-xs text-dark-body dark:text-gray-400">
            {t('auth_register_desc')}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('auth_name_label')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Layla Hassan"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('auth_email_label')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="layla@example.com"
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('auth_password_label')}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('auth_role_label')}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
            >
              <option value="customer">Customer (Book trips & explore)</option>
              <option value="employee">Employee (Manage bookings & packages)</option>
              <option value="admin">Admin (Full platform access & analytics)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all flex items-center justify-center gap-2"
          >
            <span>{t('auth_register_btn')}</span>
            <Arrow className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            {t('nav_login')}
          </Link>
        </div>

      </div>
    </div>
  );
}
