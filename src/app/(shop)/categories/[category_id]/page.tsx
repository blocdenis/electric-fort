import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductList from '@/components/Products/ProductList/ProductList';
import {
  getBrandsByCategoryId,
  getCategoryById,
  getProductsByCategory,
  getSortedProductsByCategory,
} from '@/services/api/api';
import NotFound from '@/app/not-found';
import BrandsList from '@/components/Categories/BrandsList';
import Sort from '@/components/Sort/Sort';

export interface PageProps {
  params: { category_id: number };
  searchParams: { sort: string | undefined; page: number | undefined };
}

async function Page({ params, searchParams }: PageProps) {
  const { category_id } = params;
  const { sort, page } = searchParams;

  const products = (await getProductsByCategory(category_id, 1))?.data;
  const brandData = await getBrandsByCategoryId(category_id);

  const data = await getCategoryById(category_id);
  if (!data) {
    return NotFound();
  }
  const [category] = data;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: category.name },
  ];

  if (sort) {
    let sorter = sort;
    if (!sort.includes('-')) {
      sorter = `%2B` + sort;
    }

    const sortedProductsRes = await getSortedProductsByCategory(
      category_id,
      sorter,
      page
    );
    const sortedProducts = sortedProductsRes?.data;

    return (
      <>
        <Breadcrumbs items={breadcrumsItems} />
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title={category.name} />
            <Sort isDisable={sortedProducts?.length === 0} />
            <ProductList products={sortedProducts} />
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={category.name} />
          {brandData?.length ? (
            <BrandsList categoryId={category_id} />
          ) : (
            <>
              <Sort isDisable={products?.length === 0} />
              {/* <FiltersPanel
                incomeFilters={[brand.name]}
                categoryId={category_id}
              /> */}
              <ProductList products={products} />
            </>
          )}
        </div>
      </Section>
      {brandData?.length ? (
        <Section>
          <div className=" mx-auto overflow-hidden">
            <SectionTitle className="mb-4" title="Товари" />
            <ProductList products={products} />
          </div>
        </Section>
      ) : null}
    </>
  );
}

export default Page;
