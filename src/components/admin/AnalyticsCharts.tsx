'use client';

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { useTravelStore } from '@/context/TravelStore';
import { TrendingUp, DollarSign, CalendarCheck, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

export const AnalyticsCharts: React.FC = () => {
  const { t } = useI18n();
  const { bookings, users } = useTravelStore();

  const totalRevenue = bookings.reduce((sum, b) => (b.status === 'approved' ? sum + b.totalPrice : sum), 0);
  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(b => b.status === 'approved').length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  const approvalRate = totalBookings > 0 ? Math.round((approvedBookings / totalBookings) * 100) : 0;

  // Monthly breakdown mock data for dynamic bar chart
  const monthlyData = [
    { month: 'May', revenue: 24000, height: '40%' },
    { month: 'Jun', revenue: 38000, height: '65%' },
    { month: 'Jul', revenue: 52000, height: '88%' },
    { month: 'Aug', revenue: 45000, height: '75%' },
    { month: 'Sep', revenue: 61000, height: '100%' },
    { month: 'Oct', revenue: 32000, height: '55%' },
  ];

  return (
    <div className="space-y-8">
      
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t('admin_metric_revenue')}
            </span>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              ${(totalRevenue || 124500).toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t('admin_metric_bookings')}
            </span>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {totalBookings}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12 new this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Approval Rate */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t('admin_metric_approval_rate')}
            </span>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {approvalRate}%
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              {approvedBookings} of {totalBookings} confirmed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Active Accounts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {t('admin_metric_customers')}
            </span>
            <div className="text-2xl font-bold text-dark dark:text-white mt-1">
              {users.length}
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              3 Staff / {users.length - 3} Customers
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Monthly Revenue Bar Chart (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-dark dark:text-white">
              {t('admin_sales_chart_title')}
            </h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
              Growth: +24% YoY
            </span>
          </div>

          {/* Dynamic SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-2 border-b border-gray-100 dark:border-dark-border">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(item.revenue / 1000).toFixed(0)}k
                </span>
                <div
                  style={{ height: item.height }}
                  className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-primary/70 to-primary group-hover:from-secondary group-hover:to-primary transition-all duration-300 shadow-sm"
                />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking Status Breakdown (1 col) */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm space-y-6">
          <h3 className="text-base font-bold text-dark dark:text-white">
            {t('admin_booking_status_title')}
          </h3>

          {/* Status Breakdown Metric Bars */}
          <div className="space-y-5 pt-2">
            
            {/* Approved */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                </span>
                <span className="font-bold text-dark dark:text-white">
                  {approvedBookings} ({approvalRate}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-dark-surface overflow-hidden">
                <div
                  style={{ width: `${approvalRate}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Pending */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-amber-500">
                  <Clock className="w-3.5 h-3.5" /> Pending Approval
                </span>
                <span className="font-bold text-dark dark:text-white">
                  {pendingBookings}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-dark-surface overflow-hidden">
                <div
                  style={{ width: `${totalBookings > 0 ? (pendingBookings / totalBookings) * 100 : 0}%` }}
                  className="h-full bg-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* Cancelled */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-red-500">
                  <XCircle className="w-3.5 h-3.5" /> Cancelled
                </span>
                <span className="font-bold text-dark dark:text-white">
                  {cancelledBookings}
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-dark-surface overflow-hidden">
                <div
                  style={{ width: `${totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0}%` }}
                  className="h-full bg-red-500 rounded-full"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
