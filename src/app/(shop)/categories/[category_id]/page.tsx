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
    page: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id } = params;
  const { sort, brand_id, price, page: urlPage } = searchParams;
  const page = 1;
  const itemsPerPage = 15;
  let pageSize = 15;
  if (urlPage) {
    pageSize = Number(urlPage) * itemsPerPage;
  }

  const response = await getBrandsByCategoryId(category_id, {
    cache: 'no-store',
  });
  const brandData = response?.data;

  let sorter = '-add_date';
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
    queryKey: ['products', category_id, page, pageSize],
    queryFn: () =>
      getProductsByCategory(category_id, page, pageSize, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['category_brands', category_id],
    queryFn: () => getBrandsByCategoryId(category_id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', category_id, sorter, page, pageSize],
    queryFn: () =>
      getSortedProductsByCategory(category_id, sorter, page, pageSize, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: [
      'products',
      category_id,
      brandId,
      filterPrice,
      sorter,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProducts(
        category_id,
        brandId,
        filterPrice,
        sorter,
        page,
        pageSize,
        {
          cache: 'no-store',
        }
      ),
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
        page={page}
        pageSize={pageSize}
        filterPrice={filterPrice}
      />
    </HydrationBoundary>
  );
}

export default Page;
