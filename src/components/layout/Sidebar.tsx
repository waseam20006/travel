'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  PackageOpen,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  type: 'admin' | 'employee';
}

export const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const pathname = usePathname();
  const { t, dir } = useI18n();
  const { role } = useAuth();

  const adminLinks = [
    { label: t('admin_title'), href: '/admin', icon: LayoutDashboard },
    { label: t('admin_user_management'), href: '/admin/users', icon: Users },
  ];

  const employeeLinks = [
    { label: t('emp_tab_bookings'), href: '/employee', icon: CalendarCheck },
    { label: t('emp_tab_packages'), href: '/employee/packages', icon: PackageOpen },
  ];

  const links = type === 'admin' ? adminLinks : employeeLinks;
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-dark-card border-e border-gray-100 dark:border-dark-border p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Role Badge Indicator */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-dark-border">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
            type === 'admin' ? 'bg-purple-600 shadow-lg shadow-purple-500/20' : 'bg-blue-600 shadow-lg shadow-blue-500/20'
          }`}>
            {type === 'admin' ? <ShieldAlert className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-dark dark:text-white capitalize">
              {type === 'admin' ? t('admin_role_admin') : t('admin_role_employee')}
            </h2>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              {type === 'admin' ? 'Executive Desk' : 'Operations Desk'}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? type === 'admin'
                      ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold shadow-sm'
                      : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold shadow-sm'
                    : 'text-dark-body dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-surface'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? (type === 'admin' ? 'text-purple-600' : 'text-blue-600') : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Customer Portal */}
      <div className="pt-6 border-t border-gray-100 dark:border-dark-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          <span>{t('nav_home')}</span>
        </Link>
      </div>
    </aside>
  );
};
