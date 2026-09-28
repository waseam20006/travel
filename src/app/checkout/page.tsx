'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { useTravelStore } from '@/context/TravelStore';
import {
  CreditCard,
  CheckCircle,
  ShieldCheck,
  Plane,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  AlertCircle
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { t, locale, dir } = useI18n();
  const { user } = useAuth();
  const { cart, cartSubtotal, cartDiscount, cartTotal, createBookingFromCart } = useTravelStore();

  const [fullName, setFullName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'customer@jadoo.com');
  const [phone, setPhone] = useState('+1 (555) 349-2018');
  const [notes, setNotes] = useState('Window seats preferred, vegetarian dinner option.');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'paypal'>('credit_card');

  // Simulated Card Inputs
  const [cardNumber, setCardNumber] = useState('4532 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 8921');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');

  // Confirmation state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const created = createBookingFromCart({
      name: fullName,
      email,
      paymentMethod:
        paymentMethod === 'credit_card'
          ? 'Credit Card (Visa)'
          : paymentMethod === 'apple_pay'
          ? 'Apple Pay'
          : 'PayPal',
      notes
    });

    if (created && created.length > 0) {
      setConfirmedBookingId(created[0].id);
    }
  };

  if (confirmedBookingId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-dark dark:text-white">
            {t('checkout_success_title')}
          </h1>
          <p className="text-sm text-dark-body dark:text-gray-400">
            {t('checkout_success_desc')}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border text-start space-y-3 font-mono text-xs max-w-md mx-auto">
          <div className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-2">
            <span className="text-gray-500">{t('checkout_ticket_no')}:</span>
            <span className="font-bold text-dark dark:text-white">{confirmedBookingId}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-2">
            <span className="text-gray-500">Passenger:</span>
            <span className="font-bold text-dark dark:text-white">{fullName}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-2">
            <span className="text-gray-500">Total Paid:</span>
            <span className="font-bold text-emerald-600">${cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="font-bold text-amber-500">Pending Operations Review</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/my-bookings"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all"
          >
            {t('checkout_view_bookings')}
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300"
          >
            {t('nav_home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark dark:text-white">
          {t('checkout_title')}
        </h1>
        <p className="text-sm text-dark-body dark:text-gray-400">
          {t('checkout_subtitle')}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border space-y-4">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="font-bold text-base text-dark dark:text-white">{t('cart_empty')}</h3>
          <Link
            href="/packages"
            className="inline-block px-6 py-3 rounded-xl text-xs font-bold bg-primary text-white"
          >
            {t('hero_btn_explore')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Left Column (7 cols) */}
          <form onSubmit={handleSimulatePayment} className="lg:col-span-7 space-y-8">
            
            {/* Passenger Info */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm space-y-5">
              <h3 className="text-base font-bold text-dark dark:text-white pb-3 border-b border-gray-100 dark:border-dark-border">
                {t('checkout_personal_info')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout_full_name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout_email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout_phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {t('checkout_special_requests')}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm space-y-5">
              <h3 className="text-base font-bold text-dark dark:text-white pb-3 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
                <span>{t('checkout_payment_method')}</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
                </span>
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-center font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 dark:border-dark-border text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-surface'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-center font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 dark:border-dark-border text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-surface'
                  }`}
                >
                  <span className="text-lg leading-none"></span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-center font-semibold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 dark:border-dark-border text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-surface'
                  }`}
                >
                  <span className="font-bold text-blue-600">P</span>
                  <span>PayPal</span>
                </button>
              </div>

              {/* Simulated Card Fields */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {t('checkout_card_number')}
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 0000 0000 0000"
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {t('checkout_card_exp')}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        {t('checkout_card_cvc')}
                      </label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface text-dark dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod !== 'credit_card' && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-xs text-gray-500 text-center">
                  You will simulate instant authorization via {paymentMethod === 'apple_pay' ? 'Touch ID / Face ID' : 'PayPal sandbox'}.
                </div>
              )}

            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl text-sm font-bold bg-primary hover:bg-primary-hover text-white shadow-danger transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>{t('checkout_pay_now')} (${cartTotal.toLocaleString()})</span>
              <Arrow className="w-4 h-4" />
            </button>

          </form>

          {/* Right Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm space-y-6">
              <h3 className="text-base font-bold text-dark dark:text-white pb-3 border-b border-gray-100 dark:border-dark-border">
                {t('cart_title')}
              </h3>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.packageId} className="flex gap-3 text-xs">
                    <img
                      src={item.trip.image}
                      alt={item.trip.title.en}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-dark dark:text-white truncate">
                        {item.trip.title[locale] || item.trip.title.en}
                      </h4>
                      <span className="text-gray-400 block">
                        {item.travelers} {t('cart_travelers')} &bull; {item.departureDate}
                      </span>
                      <span className="font-bold text-primary block mt-0.5">
                        ${item.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-dark-border text-xs text-dark-body dark:text-gray-400">
                <div className="flex justify-between">
                  <span>{t('cart_subtotal')}</span>
                  <span className="font-semibold text-dark dark:text-white">
                    ${cartSubtotal.toLocaleString()}
                  </span>
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

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
