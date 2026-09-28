'use client';

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { useTravelStore } from '@/context/TravelStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { PackageFormModal } from '@/components/employee/PackageFormModal';
import { TripPackage } from '@/types';
import { Plus, Edit, Trash2, Lock, Star, Clock } from 'lucide-react';

export default function EmployeePackagesPage() {
  const { t, locale } = useI18n();
  const { role, switchRole } = useAuth();
  const { trips, deleteTrip } = useTravelStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<TripPackage | null>(null);

  if (role !== 'employee' && role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-dark dark:text-white">
          Staff Authorization Required
        </h2>
        <p className="text-xs text-dark-body dark:text-gray-400">
          This content panel is accessible by staff.
        </p>
        <button
          onClick={() => switchRole('employee')}
          className="px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
        >
          Switch to Demo Employee Profile
        </button>
      </div>
    );
  }

  const handleOpenAdd = () => {
    setEditingTrip(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (trip: TripPackage) => {
    setEditingTrip(trip);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50/50 dark:bg-dark-surface">
      <Sidebar type="employee" />
      
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-dark dark:text-white">
              {t('emp_tab_packages')}
            </h1>
            <p className="text-xs text-dark-body dark:text-gray-400">
              Create, edit, and control travel packages shown to customers worldwide.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t('emp_add_package_btn')}</span>
          </button>
        </div>

        {/* Packages List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const title = trip.title[locale] || trip.title.en;
            return (
              <div
                key={trip.id}
                className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-card transition-all"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={trip.image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 start-2 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-dark-card/90 text-[10px] font-bold text-dark dark:text-white uppercase">
                      {trip.category}
                    </span>
                    <span className="absolute bottom-2 end-2 px-2.5 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                      ${trip.price.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-dark dark:text-white line-clamp-1">
                      {title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                      {trip.city}, {trip.country[locale] || trip.country.en} &bull; {trip.durationDays} Days
                    </span>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                      {trip.description[locale] || trip.description.en}
                    </p>
                  </div>
                </div>

                {/* Edit & Delete Action Bar */}
                <div className="pt-3 border-t border-gray-100 dark:border-dark-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    ★ {trip.rating} ({trip.reviewsCount} reviews)
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(trip)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                      title={t('emp_edit_package')}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTrip(trip.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      title={t('emp_delete_package')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* Package Form Modal */}
      <PackageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingTrip}
      />
    </div>
  );
}
