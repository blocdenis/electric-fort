import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import Provider from '@/context/Providers';

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
          <Header />
          <main>
            <Provider>{children}</Provider>
          </main>
          <Footer />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
