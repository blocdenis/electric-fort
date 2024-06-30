import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import CategoriesList from '@/components/Categories/CategoriesList';

async function Page() {
  const links = [{ name: 'Категорії' }];

  return (
    <>
      <Breadcrumbs items={links} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Категорії товарів" />
          <CategoriesList />
        </div>
      </Section>
    </>
  );
}

export default Page;
