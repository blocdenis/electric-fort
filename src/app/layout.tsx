import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import Provider from '@/context/Providers';
import SupportButton from '@/components/SupportButton/SupportButton';

export const metadata: Metadata = {
  title: 'Electrychna fortecia',
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
        <Provider>
          <Header />
          <SupportButton />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
