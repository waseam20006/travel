'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { FilterBar } from '@/components/customer/FilterBar';
import { TripCard } from '@/components/customer/TripCard';

export default function PackagesPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { t, locale } = useI18n();
  const { trips } = useTravelStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // Category match
      if (selectedCategory !== 'all' && trip.category !== selectedCategory) {
        return false;
      }

      // Price match
      if (trip.price > maxPrice) {
        return false;
      }

      // Query match (title, city, country)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleEn = trip.title.en.toLowerCase();
        const titleAr = trip.title.ar.toLowerCase();
        const city = trip.city.toLowerCase();
        const countryEn = trip.country.en.toLowerCase();
        const countryAr = trip.country.ar.toLowerCase();

        return (
          titleEn.includes(q) ||
          titleAr.includes(q) ||
          city.includes(q) ||
          countryEn.includes(q) ||
          countryAr.includes(q)
        );
      }

      return true;
    });
  }, [trips, selectedCategory, maxPrice, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 text-center sm:text-start">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-dark dark:text-white">
          {t('nav_packages')}
        </h1>
        <p className="text-sm text-dark-body dark:text-gray-400 max-w-xl">
          Discover our curated collection of luxury itineraries, adventurous mountain trails, and serene island getaways.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        maxPrice={maxPrice}
        onPriceChange={setMaxPrice}
      />

      {/* Results Count and Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>Showing {filteredTrips.length} available packages</span>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border space-y-3">
            <span className="text-4xl block">🔍</span>
            <h3 className="font-bold text-base text-dark dark:text-white">No packages found</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Try adjusting your search criteria or price slider to explore more destinations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
