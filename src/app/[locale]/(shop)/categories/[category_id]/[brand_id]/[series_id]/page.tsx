import NotFound from '@/app/[locale]/not-found';
import CategoriesProductGroupPage from '@/components/CategoriesProductGroupPage/CategoriesProductGroupPage';
import getQueryClient from '@/lib/utils/getQueryClient';
import {
  getBrandById,
  getCategoryById,
  getFilteredProductsBySeria,
  getProducts,
  getProductsBySeria,
  getSeriaById,
  getSortedProductsBySeria,
  getSubSeriesBySeriesId,
} from '@/services/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface PageProps {
  params: { category_id: number; brand_id: number; series_id: number };
  searchParams: {
    sort: string | undefined;
    price: string | undefined;
    brand_id: string | undefined;
    page: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id } = params;
  const { sort, price, brand_id: brandParam, page: urlPage } = searchParams;
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
    queryKey: ['products', series_id, page, pageSize],
    queryFn: () =>
      getProductsBySeria(series_id, page, pageSize, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['series_subseries', series_id],
    queryFn: () => getSubSeriesBySeriesId(series_id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', series_id, sorter, page, pageSize],
    queryFn: () =>
      getSortedProductsBySeria(series_id, sorter, page, pageSize, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: [
      'products',
      category_id,
      series_id,
      filterPrice,
      sorter,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProductsBySeria(
        category_id,
        series_id,
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
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriesBySeriesId(series_id);

  if (!categoryData?.length || !brandData?.length || !seriesData?.length) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name, href: `/categories/${category_id}/${brand_id}` },
    { name: series.name },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoriesProductGroupPage
        productsGroup="seria"
        category={category}
        brand={brand}
        seria={series}
        groupBrands={brandData}
        groupSubSeries={subSeriesData}
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
