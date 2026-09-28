'use client';

import React from 'react';
import { TripCategory } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { Search, Compass, Palmtree, Landmark, Mountain, MapPin } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  maxPrice: number;
  onPriceChange: (p: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  maxPrice,
  onPriceChange
}) => {
  const { t } = useI18n();

  const categories = [
    { id: 'all', label: 'All Packages', icon: Compass },
    { id: 'europe', label: 'Europe', icon: Landmark },
    { id: 'asia', label: 'Asia', icon: MapPin },
    { id: 'beach', label: 'Beach & Island', icon: Palmtree },
    { id: 'adventure', label: 'Adventure', icon: Mountain },
  ];

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 sm:p-6 shadow-sm space-y-5">
      
      {/* Top Search & Price Range */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search destination, city, or package..."
            className="w-full ps-10 pe-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-dark dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Max Price: <strong className="text-primary">${maxPrice.toLocaleString()}</strong>
          </span>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full md:w-40 accent-primary cursor-pointer"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-primary text-white shadow-danger'
                  : 'bg-gray-50 dark:bg-dark-surface text-dark-body dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
