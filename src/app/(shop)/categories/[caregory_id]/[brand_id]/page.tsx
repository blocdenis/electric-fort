import PageBredcramb from '@/components/Breadcrumb/PageBredcramb';
import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import React from 'react';
import styles from '@/components/Categories/CategoriesList.module.scss';
import CategoryCard from '@/components/Categories/CategoryCard';
import { categories } from '@/lib/db/categories';
import { brands } from '@/lib/db/brands';
import { products } from '@/lib/db/products';
import ProductCard from '@/components/Products/ProductCard/ProductCard';
import { series } from '@/lib/db/productSeries';

export interface PageProps {
  params: { brand_id: number };
}

function Page({ params }: PageProps) {
  const { brand_id } = params;
  const categoryId = brands.find(
    (brand) => brand.id === Number(brand_id)
  )?.category_id;

  const brandName = brands.find((brand) => brand.id === Number(brand_id))?.name;
  const categoryName = categories.find(
    (category) => category.id === categoryId
  )?.name;

  console.log('Hello');

  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>
        <PageBredcramb />
        <Section>
          <div className=" pr-[64px] mx-auto overflow-hidden">
            <SectionTitle
              className="mb-4"
              title={
                brands.find((brand) => brand.id === Number(brand_id))?.name
              }
            />
            <ul className={styles.categories_list}>
              {series
                .filter((item) => item.brand_id === Number(brand_id))
                .map((seria) => (
                  <li key={seria.id} className="w-[220px] h-[228px]">
                    <CategoryCard
                      category_id={categoryId}
                      brand_id={brand_id}
                      series_id={seria.id}
                      name={seria.name}
                      image={seria.image}
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
      </ContentContainer>
    </Container>
  );
}

export default Page;
