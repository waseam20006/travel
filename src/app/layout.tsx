'use client';

import React, { useState } from 'react';
import './globals.css';
import { I18nProvider } from '@/context/I18nContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { TravelStoreProvider } from '@/context/TravelStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/customer/CartDrawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Jadoo — Travel, enjoy and live a new and full life</title>
        <link rel="shortcut icon" href="/assets/images/fav/fav.png" type="image/x-icon" />
      </head>
      <body className="min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <TravelStoreProvider>
                <div className="flex-1 flex flex-col">
                  <Navbar onOpenCart={() => setCartOpen(true)} />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
              </TravelStoreProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
