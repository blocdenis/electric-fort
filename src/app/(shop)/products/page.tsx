import React from 'react';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductsList from '@/components/ProductList/ProductList';
import { fetchProducts } from '@/services/products';
import getQueryClient from '@/lib/utils/getQueryClient';
import { getAllBrands, getFilteredProductsInSearch } from '@/services/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Brand } from '@/lib/types/types';

const ProductsPage = async ({ searchParams }: any) => {
  const fetchedBrands = await getAllBrands();
  let brands: Brand[] = [];
  if (fetchedBrands) {
    brands = fetchedBrands;
  }
  const { sort, brand_id, price, page: urlPage } = searchParams;
  const query = searchParams.q || '';
  if (!query) {
    return <p>Please provide a search query</p>;
  }

  const page = 1;
  const itemsPerPage = 15;
  let pageSize = 15;
  if (urlPage) {
    pageSize = Number(urlPage) * itemsPerPage;
  }
  let sorter = '-add_date';
  if (sort) {
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    } else {
      sorter = sort;
    }
  }
  let filterPrice = '';
  if (price) {
    filterPrice = price;
  }
  let filteredBrands = '';
  if (brand_id) {
    filteredBrands = brand_id;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      'filteredSearchProducts',
      query,
      filteredBrands,
      filterPrice,
      sorter,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProductsInSearch(
        query,
        filteredBrands,
        filterPrice,
        sorter,
        page,
        pageSize,
        {
          cache: 'no-store',
        }
      ),
    staleTime: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  // const productsData = await fetchProducts(query);

  return (
    <div>
      <Breadcrumbs items={[{ name: 'Результати пошуку' }]} />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="py-6 lg:py-10">
          <HydrationBoundary state={dehydratedState}>
            <ProductsList
              query={query}
              filteredBrands={filteredBrands}
              sorter={sorter}
              filterPrice={filterPrice}
              allBrands={brands}
            />
          </HydrationBoundary>
        </div>
      </Suspense>
    </div>
  );
};

export default ProductsPage;
