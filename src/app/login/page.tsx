'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import { Compass, Shield, Briefcase, User as UserIcon, ArrowRight, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { t, dir } = useI18n();
  const { login, switchRole } = useAuth();

  const [email, setEmail] = useState('admin@jadoo.com');
  const [password, setPassword] = useState('password123');

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    router.push('/');
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
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
            {t('auth_login_title')}
          </h1>
          <p className="text-xs text-dark-body dark:text-gray-400">
            {t('auth_login_desc')}
          </p>
        </div>

        {/* 1-Click Fast Role Login Helpers */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-dark-border space-y-2.5">
          <span className="text-[11px] font-bold text-gray-400 block uppercase text-center">
            {t('auth_quick_demo_hint')}
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin('admin')}
              className="py-2 px-2.5 rounded-xl font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:scale-105 transition-all text-center flex flex-col items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => handleQuickLogin('employee')}
              className="py-2 px-2.5 rounded-xl font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:scale-105 transition-all text-center flex flex-col items-center gap-1"
            >
              <Briefcase className="w-4 h-4" />
              <span>Employee</span>
            </button>
            <button
              onClick={() => handleQuickLogin('customer')}
              className="py-2 px-2.5 rounded-xl font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 hover:scale-105 transition-all text-center flex flex-col items-center gap-1"
            >
              <UserIcon className="w-4 h-4" />
              <span>Customer</span>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('auth_email_label')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all flex items-center justify-center gap-2"
          >
            <span>{t('auth_login_btn')}</span>
            <Arrow className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            {t('nav_register')}
          </Link>
        </div>

      </div>
    </div>
  );
}
