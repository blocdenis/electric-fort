import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import { brands } from '@/lib/db/brands';
import React from 'react';
import styles from '@/components/Categories/CategoriesList.module.scss';
import CategoryCard from '@/components/Categories/CategoryCard';
import { categories } from '@/lib/db/categories';
import { products } from '@/lib/db/products';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import ProductList from '@/components/Products/ProductList/ProductList';
import getQueryClient from '@/lib/utils/getQueryClient';
import {
  getBrandsByCategoryId,
  getCategories,
  getCategoriesById,
} from '@/services/api/api';
import { Category } from '@/lib/types/types';
import { notFound } from 'next/navigation';

export interface PageProps {
  params: { category_id: number };
}

async function Page({ params }: PageProps) {
  const { category_id } = params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['category_brands', category_id],
    queryFn: () => getBrandsByCategoryId(category_id),
    staleTime: 10 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ['categories', category_id],
    queryFn: () => getCategoriesById(category_id),
    staleTime: 10 * 1000,
  });

  const category = queryClient.getQueryData([
    'categories',
    category_id,
  ]) as Category;
  if (!category) {
    notFound();
  }

  const categoryName = categories.find(
    (category) => category.id === Number(category_id)
  )?.name;

  const breadcrumsItems = [
    { name: 'Категорії', href: '/categories' },
    { name: categoryName },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumsItems} />
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title={categoryName} />
          <ul className={styles.categories_list}>
            {brands
              .filter((item) => item.category_id === Number(category_id))
              .map((brand) => (
                <li key={brand.id} className="w-[220px] h-[228px]">
                  <CategoryCard
                    category_id={category_id}
                    brand_id={brand.id}
                    name={brand.name}
                    image={brand.image}
                  />
                </li>
              ))}
          </ul>
        </div>
      </Section>
      <Section>
        <div className=" mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Товари" />
          <ProductList products={products} />
        </div>
      </Section>
    </>
  );
}

export default Page;
