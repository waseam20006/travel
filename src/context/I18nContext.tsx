'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations } from '@/data/translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: keyof typeof translations.en) => string;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('jadoo_locale') as Locale;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jadoo_locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const toggleLocale = () => {
    setLocaleState(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: keyof typeof translations.en): string => {
    const dict = translations[locale] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
