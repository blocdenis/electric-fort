import {
  getBrandById,
  getCategoryById,
  getFilteredProducts,
  getProducts,
  getProductsByBrand,
  getSeriesByBrandId,
  getSortedProductsByBrand,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import getQueryClient from '@/lib/utils/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoriesProductGroupPage from '@/components/CategoriesProductGroupPage/CategoriesProductGroupPage';

export interface PageProps {
  params: { category_id: number; brand_id: number };
  searchParams: {
    sort: string | undefined;
    price: string | undefined;
    brand_id: string | undefined;
    page: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id } = params;
  const { sort, price, brand_id: brandParam, page: urlPage } = searchParams;
  const page = 1;
  const itemsPerPage = 6;
  let pageSize = 6;
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

  let brandId = '';
  if (brandParam) {
    brandId = brandParam;
  }

  let filterPrice = '';
  if (price) {
    filterPrice = price;
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', brand_id, page, pageSize],
    queryFn: () =>
      getProductsByBrand(brand_id, page, pageSize, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['brands_series', brand_id],
    queryFn: () => getSeriesByBrandId(brand_id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', brand_id, sorter, page, pageSize],
    queryFn: () =>
      getSortedProductsByBrand(brand_id, sorter, page, pageSize, {
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

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriesByBrandId(brand_id);

  if (!categoryData?.length || !brandData?.length) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoriesProductGroupPage
        productsGroup="brand"
        category={category}
        brand={brand}
        groupBrands={brandData}
        groupSeries={seriesData}
        breadcrumsItems={breadcrumsItems}
        filterBrands={brandId}
        sort={sorter}
        filterPrice={filterPrice}
        page={page}
        pageSize={pageSize}
      />
    </HydrationBoundary>
  );
}

export default Page;
