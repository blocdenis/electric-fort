import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import CategoriesList from '@/components/Categories/CategoriesList';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import getQueryClient from '@/lib/utils/getQueryClient';
import { getAllBrands, getAllCategories } from '@/services/api/api';
import { dehydrate } from '@tanstack/react-query';
import { unstable_setRequestLocale } from 'next-intl/server';

async function Page({ params: { locale } }: { params: { locale: string } }) {
  const links = [{ name: 'Категорії' }];
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 100 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: () => getAllBrands(),
    staleTime: 100 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);
  unstable_setRequestLocale(locale);
  return (
    <Container className="flex">
      <SidebarWithAttachments showFilters={false} />
      <ContentContainer>
        <Breadcrumbs items={links} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title="Категорії товарів" />
            <CategoriesList />
          </div>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default Page;
