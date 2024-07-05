import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import CategoriesProductsList from '@/components/Categories/CategoriesProductsList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Sort from '@/components/Sort/Sort';
import { Product } from '@/lib/types/types';
import getQueryClient from '@/lib/utils/getQueryClient';

import {
  getBrandById,
  getCategoryById,
  getProductsBySubSubSeria,
  getSeriaById,
  getSortedProductsBySubSubSeria,
  getSubSeriaById,
  getSubSubSeriaById,
} from '@/services/api/api';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export interface PageProps {
  params: {
    category_id: number;
    brand_id: number;
    series_id: number;
    subseries_id: number;
    subsubseries_id: number;
  };
  searchParams: { sort: string | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id, subseries_id, subsubseries_id } =
    params;
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
    queryKey: ['products', subsubseries_id],
    queryFn: () =>
      getProductsBySubSubSeria(subsubseries_id, 1, 6, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', subsubseries_id, sorter],
    queryFn: () =>
      getSortedProductsBySubSubSeria(subsubseries_id, sorter, 1, 6, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  const products = queryClient.getQueryData([
    'products',
    subsubseries_id,
  ]) as Product[];

  const dehydratedState = dehydrate(queryClient);

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriaById(subseries_id);
  const subSubSeriesData = await getSubSubSeriaById(subsubseries_id);

  if (
    !categoryData ||
    !brandData ||
    !seriesData ||
    !subSeriesData ||
    !subSubSeriesData
  ) {
    return NotFound();
  }

  const [category] = categoryData;
  const [brand] = brandData;
  const [series] = seriesData;
  const [subSeries] = subSeriesData;
  const [subSubSeries] = subSeriesData;

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
      href: `/categories/${category_id}/${brand_id}/${series_id}/${subseries_id}`,
    },
    {
      name: subSubSeries.name,
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden text-center">
          <SectionTitle className="mb-4" title={subSubSeries.name} />
          <Sort isDisable={!products?.length} />
          <FiltersPanel incomeFilters={[brand.name]} categoryId={category_id} />
          <CategoriesProductsList
            productGroup="subsubseria"
            groupId={subsubseries_id}
            sort={sorter}
          />
        </div>
      </Section>
    </HydrationBoundary>
  );
}

export default Page;
