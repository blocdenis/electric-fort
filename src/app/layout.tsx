import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import CatalogList from '@/components/Navigation/CatalogList';
import ContactText from '@/components/Contact/ContactText/ContactText';
import ContactContent from '@/components/Contact/ContactContent/ContactContent';

import classNames from 'classnames';
import Map from '@/components/Map/Map';

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
        <Header />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
