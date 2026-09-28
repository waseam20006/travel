'use client';

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { TripPackage, TripCategory } from '@/types';
import { X, Image as ImageIcon } from 'lucide-react';

interface PackageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TripPackage | null;
}

export const PackageFormModal: React.FC<PackageFormModalProps> = ({
  isOpen,
  onClose,
  initialData
}) => {
  const { t } = useI18n();
  const { addTrip, updateTrip } = useTravelStore();

  const [titleEn, setTitleEn] = useState(initialData?.title.en || '');
  const [titleAr, setTitleAr] = useState(initialData?.title.ar || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [countryEn, setCountryEn] = useState(initialData?.country.en || '');
  const [countryAr, setCountryAr] = useState(initialData?.country.ar || '');
  const [price, setPrice] = useState(initialData?.price || 3500);
  const [days, setDays] = useState(initialData?.durationDays || 7);
  const [category, setCategory] = useState<TripCategory>(initialData?.category || 'europe');
  const [image, setImage] = useState(initialData?.image || '/assets/images/destination/dest1.jpg');
  const [descEn, setDescEn] = useState(initialData?.description.en || '');
  const [descAr, setDescAr] = useState(initialData?.description.ar || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packagePayload = {
      title: { en: titleEn, ar: titleAr },
      city,
      country: { en: countryEn, ar: countryAr },
      price: Number(price),
      durationDays: Number(days),
      category,
      image: image || '/assets/images/destination/dest1.jpg',
      rating: initialData?.rating || 4.9,
      reviewsCount: initialData?.reviewsCount || 10,
      description: { en: descEn, ar: descAr },
      availableSeats: 20
    };

    if (initialData) {
      updateTrip(initialData.id, packagePayload);
    } else {
      addTrip(packagePayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-2xl my-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-dark-border">
          <h3 className="font-bold text-lg text-dark dark:text-white">
            {initialData ? t('emp_edit_package') : t('emp_add_package_btn')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_title_en')}
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Venice Canal Tour"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_title_ar')}
              </label>
              <input
                type="text"
                required
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: جولة قنوات البندقية الساحرة"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white text-end"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_city')}
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Venice"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_country_en')}
              </label>
              <input
                type="text"
                required
                value={countryEn}
                onChange={(e) => setCountryEn(e.target.value)}
                placeholder="e.g. Italy"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_country_ar')}
              </label>
              <input
                type="text"
                required
                value={countryAr}
                onChange={(e) => setCountryAr(e.target.value)}
                placeholder="إيطاليا"
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white text-end"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_price')}
              </label>
              <input
                type="number"
                required
                min="100"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_days')}
              </label>
              <input
                type="number"
                required
                min="1"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_category')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TripCategory)}
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              >
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="beach">Beach</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {t('emp_package_form_image')}
            </label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://... or /assets/images/destination/dest1.jpg"
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_desc_en')}
              </label>
              <textarea
                rows={3}
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                placeholder="English description..."
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {t('emp_package_form_desc_ar')}
              </label>
              <textarea
                rows={3}
                value={descAr}
                onChange={(e) => setDescAr(e.target.value)}
                placeholder="الوصف باللغة العربية..."
                className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white text-end"
                dir="rtl"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all"
            >
              {t('emp_save_package')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
