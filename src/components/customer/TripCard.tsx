'use client';

import React from 'react';
import Link from 'next/link';
import { TripPackage } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { Navigation, Star, Clock, ShoppingCart, Check } from 'lucide-react';

interface TripCardProps {
  trip: TripPackage;
  onBookNow?: (trip: TripPackage) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onBookNow }) => {
  const { locale, t } = useI18n();
  const { addToCart, cart } = useTravelStore();

  const title = trip.title[locale] || trip.title.en;
  const country = trip.country[locale] || trip.country.en;
  const isAlreadyInCart = cart.some(item => item.packageId === trip.id);

  return (
    <div className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-dark-border shadow-card hover:shadow-cardHover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
      
      {/* Thumbnail with Badge */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-dark-surface">
        <img
          src={trip.image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md text-xs font-bold text-dark dark:text-white shadow-sm flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{trip.rating}</span>
          <span className="text-gray-400 text-[10px]">({trip.reviewsCount})</span>
        </div>

        <div className="absolute bottom-4 end-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-danger">
          ${trip.price.toLocaleString()}
        </div>
      </div>

      {/* Content Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-dark-body dark:text-gray-400 mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Navigation className="w-3.5 h-3.5 text-primary" />
              {trip.city}, {country}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              {trip.durationDays} {t('dest_days')}
            </span>
          </div>

          <h3 className="font-bold text-lg text-dark dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="mt-2 text-xs text-dark-body dark:text-gray-400 line-clamp-2 leading-relaxed">
            {trip.description[locale] || trip.description.en}
          </p>
        </div>

        {/* Buttons Action Bar */}
        <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex items-center gap-2">
          <button
            onClick={() => addToCart(trip, 1)}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isAlreadyInCart
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-100 dark:bg-dark-surface text-dark dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            {isAlreadyInCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            <span>{isAlreadyInCart ? 'Added' : t('dest_add_cart')}</span>
          </button>

          <Link
            href="/checkout"
            onClick={() => {
              if (!isAlreadyInCart) addToCart(trip, 1);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white text-center shadow-danger hover:scale-[1.02] transition-all"
          >
            {t('dest_book_now')}
          </Link>
        </div>
      </div>
    </div>
  );
};
