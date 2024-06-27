import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
// import { categories } from '@/lib/db/categories';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import getQueryClient from '@/lib/utils/getQueryClient';
import { getCategories } from '@/services/api/api';
import CategoriesList from '@/components/Categories/CategoriesList';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

async function Page() {
  const links = [{ name: 'Категорії' }];
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Breadcrumbs items={links} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Категорії товарів" />
          <CategoriesList />
        </div>
      </Section>
    </HydrationBoundary>
  );
}

export default Page;
