import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';

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
          <main>{children}</main>
          <Footer />
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
