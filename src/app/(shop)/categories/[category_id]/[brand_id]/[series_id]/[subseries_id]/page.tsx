import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import CategoriesProductsList from '@/components/Categories/CategoriesProductsList';
import SubSubseriesList from '@/components/Categories/SubSubseriesList';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import FilteredProductsList from '@/components/Products/ProductList/FilteredProductsList';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import Sort from '@/components/Sort/Sort';
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
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id, series_id, subseries_id } = params;
  const { sort, price, brand_id: brandParam } = searchParams;

  let sorter = '';
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

  let filterPrice = ' >= ';
  if (price) {
    filterPrice = price;
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', subseries_id],
    queryFn: () =>
      getProductsBySubSeria(subseries_id, 1, 6, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', subseries_id, sorter],
    queryFn: () =>
      getSortedProductsBySubSeria(subseries_id, sorter, 1, 6, {
        cache: 'no-store',
      }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsFilteredSorted', subseries_id, filterPrice, sorter],
    queryFn: () =>
      getFilteredProductsBySubSeria(subseries_id, filterPrice, sorter, 1, 6, {
        cache: 'no-store',
      }),
    staleTime: 10,
  });

  const subSeriaProducts = queryClient.getQueryData([
    'products',
    subseries_id,
  ]) as getProducts;

  const filteredProducts = queryClient.getQueryData([
    'productsFilteredSorted',
    subseries_id,
    filterPrice,
    sorter,
  ]) as getProducts;

  const dehydratedState = dehydrate(queryClient);

  const categoryData = await getCategoryById(category_id);
  const brandData = await getBrandById(brand_id);
  const seriesData = await getSeriaById(series_id);
  const subSeriesData = await getSubSeriaById(subseries_id);
  const subSubSeriesData = await getSubSubSeriesBySubSeriesId(subseries_id);

  if (!categoryData || !brandData || !seriesData || !subSeriesData) {
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

  if ((brandParam && brandData) || (price && brandData)) {
    const brandsNames = brandData;
    return (
      <Container className="flex">
        <SidebarWithAttachments
          showFilters={true}
          brands={brandData}
          price={filterPrice}
        />
        <ContentContainer>
          <HydrationBoundary state={dehydratedState}>
            <Breadcrumbs items={breadcrumsItems} />
            <Section>
              <div className=" mx-auto overflow-hidden text-center">
                <SectionTitle className="mb-4" title={subSeries.name} />
                <Sort isDisable={!filteredProducts?.data.length} />
                <FiltersPanel
                  incomeFilters={brandsNames}
                  categoryId={category.id}
                />
                <FilteredProductsList
                  productGroup="seria"
                  ids={brandId}
                  sort={sorter}
                  price={filterPrice}
                />
              </div>
            </Section>
          </HydrationBoundary>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container className="flex">
      <SidebarWithAttachments
        showFilters={true}
        brands={brandData}
        price={filterPrice}
      />
      <ContentContainer>
        <HydrationBoundary state={dehydratedState}>
          <Breadcrumbs items={breadcrumsItems} />
          <Section>
            <div className=" mx-auto overflow-hidden text-center">
              <SectionTitle className="mb-4" title={subSeries.name} />
              {subSubSeriesData?.length ? (
                <SubSubseriesList
                  categoryId={category_id}
                  brandId={brand_id}
                  seriesId={series_id}
                  subSeriesId={subseries_id}
                />
              ) : (
                <>
                  <Sort isDisable={!subSubSeriesData?.length} />
                  <FiltersPanel
                    incomeFilters={[brand]}
                    categoryId={category_id}
                  />

                  <CategoriesProductsList
                    productGroup={'subseria'}
                    groupId={subseries_id}
                    sort={sorter}
                  />
                </>
              )}
            </div>
          </Section>
          {subSubSeriesData?.length ? (
            <Section>
              <div className=" mx-auto overflow-hidde text-center">
                <SectionTitle className="mb-4" title="Товари" />
                <CategoriesProductsList
                  productGroup={'subseria'}
                  groupId={subseries_id}
                  sort={sorter}
                />
              </div>
            </Section>
          ) : null}
        </HydrationBoundary>
      </ContentContainer>
    </Container>
  );
}

export default Page;
