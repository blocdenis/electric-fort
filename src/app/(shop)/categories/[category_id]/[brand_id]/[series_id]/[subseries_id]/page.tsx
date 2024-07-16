import NotFound from '@/app/not-found';
import CategoriesProductGroupPage from '@/components/CategoriesProductGroupPage/CategoriesProductGroupPage';
import getQueryClient from '@/lib/utils/getQueryClient';
import {
  getBrandById,
  getCategoryById,
  getFilteredProductsBySubSeria,
  getProducts,
  getProductsBySubSeria,
  getSeriaById,
  getSortedProductsBySubSeria,
  getSubSeriaById,
  getSubSubSeriesBySubSeriesId,
} from '@/services/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface PageProps {
  params: {
    category_id: number;
    brand_id: number;
    series_id: number;
    subseries_id: number;
  };
  searchParams: {
    sort: string | undefined;
    price: string | undefined;
    brand_id: string | undefined;
    page: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id, subseries_id } = params;
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
    queryKey: ['products', subseries_id, page, pageSize],
    queryFn: () =>
      getProductsBySubSeria(subseries_id, page, pageSize, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['subcategoties', subseries_id],
    queryFn: () =>
      getSubSubSeriesBySubSeriesId(subseries_id, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', subseries_id, sorter, page, pageSize],
    queryFn: () =>
      getSortedProductsBySubSeria(subseries_id, sorter, page, pageSize, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: [
      'products',
      category_id,
      subseries_id,
      filterPrice,
      sorter,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProductsBySubSeria(
        category_id,
        subseries_id,
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
  const subSeriesData = await getSubSeriaById(subseries_id);
  const subSubSeriesData = await getSubSubSeriesBySubSeriesId(subseries_id);

  if (
    !categoryData?.length ||
    !brandData?.length ||
    !seriesData?.length ||
    !subSeriesData?.length
  ) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;
  const [subSeries] = subSeriesData;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name, href: `/categories/${category_id}` },
    { name: brand.name, href: `/categories/${category_id}/${brand_id}` },
    {
      name: series.name,
      href: `/categories/${category_id}/${brand_id}/${series_id}`,
    },
    {
      name: subSeries.name,
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoriesProductGroupPage
        productsGroup="subseria"
        category={category}
        brand={brand}
        seria={series}
        subseria={subSeries}
        groupBrands={brandData}
        groupSubSubSeries={subSubSeriesData}
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
