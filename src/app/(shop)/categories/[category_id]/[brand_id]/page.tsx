import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
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
import SeriesList from '@/components/Categories/SeriesList';
import Sort from '@/components/Sort/Sort';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import getQueryClient from '@/lib/utils/getQueryClient';
import { Product } from '@/lib/types/types';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoriesProductsList from '@/components/Categories/CategoriesProductsList';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import FilteredProductsList from '@/components/Products/ProductList/FilteredProductsList';

export interface PageProps {
  params: { category_id: number; brand_id: number };
  searchParams: {
    sort: string | undefined;
    price: string | undefined;
    brand_id: string | undefined;
  };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id, brand_id } = params;
  const { sort, price, brand_id: brandParam } = searchParams;

  let sorter = '';
  if (sort) {
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    } else {
      sorter = sort;
    }
  }

  let brandId = String(brand_id);
  if (brandParam) {
    brandId = brandParam;
  }

  let filterPrice = ' >= ';
  if (price) {
    filterPrice = price;
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', brand_id],
    queryFn: () => getProductsByBrand(brand_id, 1, 6, { cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['productsSorted', brand_id, sorter],
    queryFn: () =>
      getSortedProductsByBrand(brand_id, sorter, 1, 6, {
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

  const products = queryClient.getQueryData([
    'products',
    brand_id,
  ]) as getProducts;

  const filteredProducts = queryClient.getQueryData([
    'productsFilteredSorted',
    brandId,
    filterPrice,
    sorter,
  ]) as getProducts;

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
                <SectionTitle className="mb-4" title={brand.name} />
                <Sort isDisable={!filteredProducts?.data.length} />
                <FiltersPanel
                  incomeFilters={brandsNames}
                  categoryId={category.id}
                />
                <FilteredProductsList
                  productGroup="brand"
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
              <SectionTitle className="mb-4" title={brand.name} />
              {seriesData?.length ? (
                <SeriesList categoryId={category_id} brandId={brand_id} />
              ) : (
                <>
                  <Sort isDisable={!products?.data.length} />
                  <FiltersPanel
                    incomeFilters={[brand]}
                    categoryId={category_id}
                  />
                  <CategoriesProductsList
                    productGroup="brand"
                    groupId={brand_id}
                    sort={sorter}
                  />
                </>
              )}
            </div>
          </Section>
          {seriesData?.length ? (
            <Section>
              <div className=" mx-auto overflow-hidden text-center">
                <SectionTitle className="mb-4" title="Товари" />
                <CategoriesProductsList
                  productGroup="brand"
                  groupId={brand_id}
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
