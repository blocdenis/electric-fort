import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

import Footer from '@/components/Footer/Footer';

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
        {/* <Header /> */}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
