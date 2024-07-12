import React from 'react';
import {
  getBrandsByCategoryId,
  getCategoryById,
  getFilteredProducts,
  getProductsByCategory,
  getSortedProductsByCategory,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import getQueryClient from '@/lib/utils/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoriesProductGroupPage from '@/components/CategoriesProductGroupPage/CategoriesProductGroupPage';

export interface PageProps {
  params: { category_id: number };
  searchParams: {
    sort: string | undefined;
    brand_id: string | undefined;
    price: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id } = params;
  const { sort, brand_id, price } = searchParams;

  const brandData = await getBrandsByCategoryId(category_id);

  let sorter = '%2Bprice';
  if (sort) {
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    } else {
      sorter = sort;
    }
  }

  let brandId = '';
  if (brand_id) {
    brandId = brand_id;
  }

  let filterPrice = '';
  if (price) {
    filterPrice = price;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', category_id],
    queryFn: () =>
      getProductsByCategory(category_id, 1, 6, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['category_brands', category_id],
    queryFn: () => getBrandsByCategoryId(category_id, { cache: 'no-store' }),
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

  await queryClient.prefetchQuery({
    queryKey: ['productsFilteredSorted', brandId, filterPrice, sorter],
    queryFn: () =>
      getFilteredProducts(brandId, filterPrice, sorter, 1, 6, {
        cache: 'no-store',
      }),
    staleTime: 10,
  });

  const dehydratedState = dehydrate(queryClient);

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
    <HydrationBoundary state={dehydratedState}>
      <CategoriesProductGroupPage
        productsGroup="category"
        category={category}
        groupBrands={brandData}
        breadcrumsItems={breadcrumsItems}
        filterBrands={brandId}
        sort={sorter}
        filterPrice={filterPrice}
      />
    </HydrationBoundary>
  );
}

export default Page;
