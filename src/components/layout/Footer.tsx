'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { Compass, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-100 dark:border-dark-border">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center text-white shadow-primary">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-dark dark:text-white">
                {t('brand_name')}
              </span>
            </Link>
            <p className="text-sm text-dark-body dark:text-gray-400 max-w-sm leading-relaxed">
              {t('brand_tagline')}
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-dark dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-dark-body dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Contact Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-dark dark:text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-dark-body dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Help / FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Affiliates</a></li>
            </ul>
          </div>

          {/* Social & Discovery */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border flex items-center justify-center text-dark dark:text-gray-300 hover:text-primary hover:scale-105 transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-105 transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border flex items-center justify-center text-dark dark:text-gray-300 hover:text-primary hover:scale-105 transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Discover our mobile app
            </p>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-gray-800">
                <span>Google Play</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-gray-800">
                <span>Apple Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          All rights reserved &copy; {new Date().getFullYear()} Jadoo Travels Inc.
        </div>
      </div>
    </footer>
  );
};
