import type { Metadata } from 'next';
import { Cormorant, Crimson_Pro, Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';

export const metadata: Metadata = {
  title: 'Elektrychna fortecia',
  description: 'E-commerce electric  goods',
};
const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} ${crimson.variable} `}
      >
        <Header />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
