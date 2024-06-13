import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import { brands } from '@/lib/db/brands';
import React from 'react';
import styles from '@/components/Categories/CategoriesList.module.scss';
import CategoryCard from '@/components/Categories/CategoryCard';
import { categories } from '@/lib/db/categories';
import { products } from '@/lib/db/products';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

export interface PageProps {
  params: { category_id: number };
}

function Page({ params }: PageProps) {
  const { category_id } = params;

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
        <div className=" pr-[64px] mx-auto overflow-hidden">
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
        <div className=" pr-[64px] mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Товари" />
          <ul className=" pl-6 grid laptop:grid-cols-2 desktop:grid-cols-3 gap-x-[45px] gap-y-8">
            {products.map(
              ({
                id,
                name,
                unit_of_measurement,
                price,
                description,
                in_stock,
                popular,
                images,
                series_id,
                subseries_id,
                brand_id,
                updated_info_date,
                add_date,
                article,
              }) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  unit_of_measurement={unit_of_measurement}
                  price={price}
                  description={description}
                  in_stock={in_stock}
                  popular={popular}
                  images={images}
                  series_id={series_id}
                  subseries_id={subseries_id}
                  brand_id={brand_id}
                  updated_info_date={updated_info_date}
                  add_date={add_date}
                  article={article}
                />
              )
            )}
          </ul>
        </div>
      </Section>
    </>
  );
}

export default Page;
