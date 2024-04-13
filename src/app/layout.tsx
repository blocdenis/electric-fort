import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
