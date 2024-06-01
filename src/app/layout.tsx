import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import Provider from '@/context/Providers';
import { FavoritesProvider } from '@/context/FavoritesContext';

export const metadata: Metadata = {
  title: 'Elektrychna fortecia',
  description: 'E-commerce electric  goods',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShoppingCartProvider>
          <FavoritesProvider>
            <Header />
            <main>
              <Provider>{children}</Provider>
            </main>
            <Footer />
          </FavoritesProvider>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
