'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useTravelStore } from '@/context/TravelStore';
import {
  Sun,
  Moon,
  Globe,
  ShoppingCart,
  User as UserIcon,
  Shield,
  Briefcase,
  LogOut,
  Menu,
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const pathname = usePathname();
  const { locale, toggleLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, role, logout, switchRole } = useAuth();
  const { cart } = useTravelStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.travelers, 0);

  const navLinks = [
    { label: t('nav_home'), href: '/' },
    { label: t('nav_packages'), href: '/packages' },
    { label: t('nav_my_bookings'), href: '/my-bookings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border-b border-gray-100 dark:border-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-white shadow-primary">
              <Compass className="w-6 h-6 transform group-hover:rotate-45 transition-transform" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-dark dark:text-white">
              {t('brand_name')}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    active
                      ? 'text-primary font-semibold'
                      : 'text-dark-body dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Special Role Dashboards Links */}
            {role === 'admin' && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:scale-105 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                {t('nav_admin')}
              </Link>
            )}

            {role === 'employee' && (
              <Link
                href="/employee"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all"
              >
                <Briefcase className="w-3.5 h-3.5" />
                {t('nav_employee')}
              </Link>
            )}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-card transition-all"
                title={t('nav_switch_role')}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="capitalize font-semibold">{role || 'Role'}</span>
              </button>

              {roleMenuOpen && (
                <div className="absolute end-0 mt-2 w-48 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl p-2 z-50">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                    {t('nav_switch_role')}
                  </div>
                  <button
                    onClick={() => { switchRole('admin'); setRoleMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                      role === 'admin' ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 font-bold' : 'hover:bg-gray-100 dark:hover:bg-dark-surface'
                    }`}
                  >
                    <span>🛡️ {t('admin_role_admin')}</span>
                    {role === 'admin' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('employee'); setRoleMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                      role === 'employee' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold' : 'hover:bg-gray-100 dark:hover:bg-dark-surface'
                    }`}
                  >
                    <span>💼 {t('admin_role_employee')}</span>
                    {role === 'employee' && <span className="text-[10px]">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('customer'); setRoleMenuOpen(false); }}
                    className={`w-full text-start px-3 py-2 text-xs rounded-lg flex items-center justify-between ${
                      role === 'customer' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 font-bold' : 'hover:bg-gray-100 dark:hover:bg-dark-surface'
                    }`}
                  >
                    <span>🧳 {t('admin_role_customer')}</span>
                    {role === 'customer' && <span className="text-[10px]">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLocale}
              className="p-2 rounded-lg text-dark-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors flex items-center gap-1.5"
              title={locale === 'en' ? 'تبديل إلى العربية' : 'Switch to English'}
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-bold uppercase">{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-dark-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg text-dark-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              aria-label="Open Booking Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center animate-bounce shadow-danger">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {user ? (
              <div className="flex items-center gap-2 ps-2 border-s border-gray-200 dark:border-dark-border">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30"
                />
                <button
                  onClick={logout}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                  title={t('nav_logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white shadow-primary hover:bg-primary-hover transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span>{t('nav_login')}</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-card"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-surface px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-dark-body dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-card"
            >
              {link.label}
            </Link>
          ))}

          {role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40"
            >
              🛡️ {t('nav_admin')}
            </Link>
          )}

          {role === 'employee' && (
            <Link
              href="/employee"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
            >
              💼 {t('nav_employee')}
            </Link>
          )}

          <div className="pt-3 border-t border-gray-100 dark:border-dark-border flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase">{t('nav_switch_role')}</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs rounded-lg border text-center font-medium ${
                  role === 'admin' ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50 text-purple-600' : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => { switchRole('employee'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs rounded-lg border text-center font-medium ${
                  role === 'employee' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                Employee
              </button>
              <button
                onClick={() => { switchRole('customer'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs rounded-lg border text-center font-medium ${
                  role === 'customer' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-600' : 'border-gray-200 dark:border-dark-border'
                }`}
              >
                Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
