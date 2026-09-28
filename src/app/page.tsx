'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { TripCard } from '@/components/customer/TripCard';
import {
  Play,
  Search,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MapPin,
  CreditCard,
  Plane,
  Heart,
  Mail,
  Send
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { t, locale, dir } = useI18n();
  const { trips } = useTravelStore();

  const [destinationSearch, setDestinationSearch] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredTrips = trips.slice(0, 3);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/packages?q=${encodeURIComponent(destinationSearch)}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-8 pb-16 lg:py-24">
        {/* Background Decore SVG */}
        <div className="absolute top-0 right-0 -z-10 pointer-events-none max-w-[50vw] opacity-80 dark:opacity-20">
          <img src="/assets/images/hero/hero-bg.svg" alt="" aria-hidden="true" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <span className="inline-block text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                {t('hero_tagline')}
              </span>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-dark dark:text-white leading-[1.1]">
                {t('hero_title_part1')}
                <span className="highlight-brush text-dark dark:text-white">
                  {t('hero_title_enjoy')}
                </span>
                {t('hero_title_part2')}
              </h1>

              <p className="text-base text-dark-body dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero_desc')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2">
                <Link
                  href="/packages"
                  className="px-7 py-4 rounded-xl text-sm font-bold bg-secondary hover:bg-secondary-hover text-white shadow-primary transition-all hover:scale-105"
                >
                  {t('hero_btn_explore')}
                </Link>

                <button
                  onClick={() => router.push('/packages')}
                  className="flex items-center gap-3 text-sm font-bold text-dark-body dark:text-gray-300 hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-danger group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                  <span>{t('hero_btn_demo')}</span>
                </button>
              </div>

              {/* Quick Trip Search Bar Component */}
              <form
                onSubmit={handleHeroSearch}
                className="mt-8 p-3 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-card flex flex-col sm:flex-row items-center gap-3"
              >
                <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full border-b sm:border-b-0 sm:border-e border-gray-100 dark:border-dark-border">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <input
                    type="text"
                    value={destinationSearch}
                    onChange={(e) => setDestinationSearch(e.target.value)}
                    placeholder={t('hero_search_destination')}
                    className="w-full text-xs font-medium bg-transparent text-dark dark:text-white placeholder:text-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto border-b sm:border-b-0 sm:border-e border-gray-100 dark:border-dark-border">
                  <Calendar className="w-4 h-4 text-secondary shrink-0" />
                  <input
                    type="date"
                    defaultValue="2025-11-15"
                    className="text-xs font-medium bg-transparent text-dark dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto">
                  <Users className="w-4 h-4 text-primary shrink-0" />
                  <select className="text-xs font-medium bg-transparent text-dark dark:text-white focus:outline-none">
                    <option value="1">1 {t('cart_travelers')}</option>
                    <option value="2">2 {t('cart_travelers')}</option>
                    <option value="4">4+ {t('cart_travelers')}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-danger flex items-center justify-center gap-2 transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span className="whitespace-nowrap">{t('hero_search_btn')}</span>
                </button>
              </form>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <img
                src="/assets/images/hero/hero-img.png"
                alt="Smiling traveler"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-14">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {t('services_subtitle')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark dark:text-white">
            {t('services_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Service 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-center space-y-4 hover:shadow-cardHover hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <img src="/assets/images/category/icon1.png" alt="" className="max-h-16" />
            </div>
            <h3 className="font-bold text-lg text-dark dark:text-white">
              {t('service_1_title')}
            </h3>
            <p className="text-xs text-dark-body dark:text-gray-400 leading-relaxed">
              {t('service_1_desc')}
            </p>
          </div>

          {/* Service 2 (Featured Card) */}
          <div className="relative p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-center space-y-4 shadow-card hover:shadow-cardHover hover:-translate-y-2 transition-all">
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-3xl -z-10" />
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <img src="/assets/images/category/icon2.png" alt="" className="max-h-16" />
            </div>
            <h3 className="font-bold text-lg text-dark dark:text-white">
              {t('service_2_title')}
            </h3>
            <p className="text-xs text-dark-body dark:text-gray-400 leading-relaxed">
              {t('service_2_desc')}
            </p>
          </div>

          {/* Service 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-center space-y-4 hover:shadow-cardHover hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <img src="/assets/images/category/icon3.png" alt="" className="max-h-16" />
            </div>
            <h3 className="font-bold text-lg text-dark dark:text-white">
              {t('service_3_title')}
            </h3>
            <p className="text-xs text-dark-body dark:text-gray-400 leading-relaxed">
              {t('service_3_desc')}
            </p>
          </div>

          {/* Service 4 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-center space-y-4 hover:shadow-cardHover hover:-translate-y-2 transition-all">
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <img src="/assets/images/category/icon4.png" alt="" className="max-h-16" />
            </div>
            <h3 className="font-bold text-lg text-dark dark:text-white">
              {t('service_4_title')}
            </h3>
            <p className="text-xs text-dark-body dark:text-gray-400 leading-relaxed">
              {t('service_4_desc')}
            </p>
          </div>

        </div>
      </section>

      {/* ===== TOP DESTINATIONS SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {t('dest_subtitle')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark dark:text-white">
              {t('dest_title')}
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            <span>{t('dest_view_all')}</span>
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* ===== 3 EASY STEPS SECTION WITH FLOATING CARDS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Steps Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {t('steps_subtitle')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark dark:text-white leading-tight">
                {t('steps_title')}
              </h2>
            </div>

            <div className="space-y-6">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-dark dark:text-white">
                    {t('step_1_title')}
                  </h4>
                  <p className="text-xs text-dark-body dark:text-gray-400 mt-1 max-w-md leading-relaxed">
                    {t('step_1_desc')}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-dark dark:text-white">
                    {t('step_2_title')}
                  </h4>
                  <p className="text-xs text-dark-body dark:text-gray-400 mt-1 max-w-md leading-relaxed">
                    {t('step_2_desc')}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-dark dark:text-white">
                    {t('step_3_title')}
                  </h4>
                  <p className="text-xs text-dark-body dark:text-gray-400 mt-1 max-w-md leading-relaxed">
                    {t('step_3_desc')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Floating Booking Cards Right Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Greece Trip Card */}
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-5 shadow-2xl relative">
              <img
                src="/assets/images/booking/booking-img.jpg"
                alt="Trip to Greece"
                className="w-full h-44 rounded-2xl object-cover"
              />
              <div className="pt-4 space-y-3">
                <h3 className="font-bold text-lg text-dark dark:text-white">
                  Trip To Greece
                </h3>
                <span className="text-xs text-gray-400 block">
                  14-29 June | by Robbin Joseph
                </span>
                
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center text-xs">🌿</span>
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center text-xs">🗺️</span>
                  <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface flex items-center justify-center text-xs">✈️</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-dark-border text-xs text-gray-500">
                  <span>🏛️ 24 {t('dest_people_going')}</span>
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                </div>
              </div>

              {/* Floating Sub-Card for Ongoing Trip to Rome */}
              <div className="absolute -bottom-8 -end-8 w-60 rounded-2xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border p-4 shadow-xl flex items-center gap-3 animate-pulse">
                <img
                  src="/assets/images/booking/favorite-placeholder.png"
                  alt="Rome"
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">Ongoing</span>
                  <h5 className="font-bold text-xs text-dark dark:text-white truncate">Trip to Rome</h5>
                  <div className="mt-1 w-full bg-gray-100 dark:bg-dark-border rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-600 h-full w-[40%] rounded-full" />
                  </div>
                  <span className="text-[10px] text-purple-600 font-bold block mt-1">40% completed</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[40px] sm:rounded-[60px] bg-gradient-to-tr from-purple-100/60 to-pink-100/40 dark:from-dark-card dark:to-dark-surface border border-purple-200/50 dark:border-dark-border p-8 sm:p-16 text-center space-y-6 overflow-hidden">
          
          <div className="absolute top-4 end-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Send className="w-6 h-6 rotate-45" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-dark dark:text-white max-w-2xl mx-auto leading-relaxed">
            {t('sub_title')}
          </h2>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 font-bold max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t('sub_success')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('sub_placeholder')}
                  className="w-full ps-11 pe-4 py-3.5 rounded-xl bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-xs text-dark dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all whitespace-nowrap"
              >
                {t('sub_btn')}
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
