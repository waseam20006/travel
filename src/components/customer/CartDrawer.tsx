'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { locale, t, dir } = useI18n();
  const {
    cart,
    removeFromCart,
    updateCartTravelers,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    clearCart
  } = useTravelStore();

  if (!isOpen) return null;

  const CheckoutArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className={`fixed inset-y-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} max-w-full flex`}>
        <div className="w-screen max-w-md bg-white dark:bg-dark-surface shadow-2xl flex flex-col justify-between border-s border-gray-100 dark:border-dark-border">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-dark dark:text-white">
                {t('cart_title')} ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('cart_empty')}
                </p>
                <Link
                  href="/packages"
                  onClick={onClose}
                  className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white"
                >
                  {t('hero_btn_explore')}
                </Link>
              </div>
            ) : (
              cart.map((item) => {
                const title = item.trip.title[locale] || item.trip.title.en;
                return (
                  <div
                    key={item.packageId}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.trip.image}
                        alt={title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-dark dark:text-white truncate">
                          {title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.trip.city}, {item.trip.country[locale] || item.trip.country.en}
                        </span>
                        <div className="text-xs font-bold text-primary mt-1">
                          ${item.totalPrice.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.packageId)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-dark-border text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t('cart_travelers')}:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartTravelers(item.packageId, item.travelers - 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-dark dark:text-white w-4 text-center">
                          {item.travelers}
                        </span>
                        <button
                          onClick={() => updateCartTravelers(item.packageId, item.travelers + 1)}
                          className="w-6 h-6 rounded-md bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-card/50 space-y-4">
              <div className="space-y-1.5 text-xs text-dark-body dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{t('cart_subtotal')}</span>
                  <span className="font-semibold text-dark dark:text-white">${cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{t('cart_discount')}</span>
                  <span className="font-semibold">-${cartDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-dark dark:text-white pt-2 border-t border-gray-200 dark:border-dark-border">
                  <span>{t('cart_total')}</span>
                  <span className="text-primary">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-primary hover:bg-primary-hover text-white shadow-danger flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{t('cart_checkout_btn')}</span>
                <CheckoutArrow className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
