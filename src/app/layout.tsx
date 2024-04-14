import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import { categories } from '@/lib/db/categories';
import CatalogItem from '@/components/Navigation/CatalogItem';

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
        <Sidebar>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <CatalogItem category={category} />
              </li>
            ))}
          </ul>
        </Sidebar>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
