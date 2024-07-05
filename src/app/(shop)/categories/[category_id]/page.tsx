import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import {
  getBrandsByCategoryId,
  getCategoryById,
  getProductsByCategory,
  getSortedProductsByCategory,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import BrandsList from '@/components/Categories/BrandsList';
import Sort from '@/components/Sort/Sort';
import getQueryClient from '@/lib/utils/getQueryClient';
import { Product } from '@/lib/types/types';
import { dehydrate } from '@tanstack/react-query';
import CategoriesProductsList from '@/components/Categories/CategoriesProductsList';

export interface PageProps {
  params: { category_id: number };
  searchParams: { sort: string | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id } = params;
  const { sort } = searchParams;

  let sorter = '';
  if (sort) {
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    } else {
      sorter = sort;
    }
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', category_id],
    queryFn: () =>
      getProductsByCategory(category_id, 1, 6, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', category_id, sorter],
    queryFn: () =>
      getSortedProductsByCategory(category_id, sorter, 1, 6, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  const products = queryClient.getQueryData([
    'products',
    category_id,
  ]) as Product[];

  const dehydratedState = dehydrate(queryClient);

  const brandData = await getBrandsByCategoryId(category_id);

  const data = await getCategoryById(category_id);
  if (!data) {
    return NotFound();
  }
  const [category] = data;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden text-center">
          <SectionTitle className="mb-4" title={category.name} />
          {brandData?.length ? (
            <BrandsList categoryId={category_id} />
          ) : (
            <>
              <Sort isDisable={!products?.length} />
              {/* <FiltersPanel
                incomeFilters={[brand.name]}
                categoryId={category_id}
              /> */}
              <CategoriesProductsList
                productGroup="category"
                groupId={category_id}
                sort={sorter}
              />
            </>
          )}
        </div>
      </Section>
      {brandData?.length ? (
        <Section>
          <div className=" mx-auto overflow-hidden text-center">
            <SectionTitle className="mb-4" title="Товари" />
            <CategoriesProductsList
              productGroup="category"
              groupId={category_id}
              sort={sorter}
            />
          </div>
        </Section>
      ) : null}
    </>
  );
}

export default Page;
