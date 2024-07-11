import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import {
  getBrandsByCategoryId,
  getCategoryById,
  getFilteredProducts,
  getProducts,
  getProductsByCategory,
  getSortedProductsByCategory,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import BrandsList from '@/components/Categories/BrandsList';
import Sort from '@/components/Sort/Sort';
import getQueryClient from '@/lib/utils/getQueryClient';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoriesProductsList from '@/components/Categories/CategoriesProductsList';
import Container from '@/components/Container/Container';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import ContentContainer from '@/components/Container/ContentContainer';
import FilteredProductsList from '@/components/Products/ProductList/FilteredProductsList';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';

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
  } else if (brandData) {
    brandId = brandData?.map((item) => item.id)?.toString();
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

  const products = queryClient.getQueryData([
    'products',
    category_id,
  ]) as getProducts;

  const filteredProducts = queryClient.getQueryData([
    'productsFilteredSorted',
    brandId,
    filterPrice,
    sorter,
  ]) as getProducts;

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

  if ((brand_id && brandData) || (price && brandData)) {
    const brandsNames = brand_id
      ? brandData.filter((brand) => {
          return brandId.split(',').indexOf(brand.id.toString()) !== -1;
        })
      : brandData.filter((brand) => {
          return (
            filteredProducts.data
              .map((item) => item.brand_id)
              .indexOf(brand.id) !== -1
          );
        });
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
                <SectionTitle className="mb-4" title={category.name} />
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
              <SectionTitle className="mb-4" title={category.name} />
              {brandData?.length ? (
                <BrandsList categoryId={category_id} />
              ) : (
                <>
                  <Sort isDisable={!products?.data.length} />
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
        </HydrationBoundary>
      </ContentContainer>
    </Container>
  );
}

export default Page;
