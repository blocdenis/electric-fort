import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import React from 'react';
import { categories } from '@/lib/db/categories';
import CategoryCard from '@/components/Categories/CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';

function Page() {
  const links = [{ name: 'Категорії' }];
  return (
    <>
      <Breadcrumbs items={links} />
      <Section>
        <div className=" pr-[64px] mx-auto overflow-hidden">
          <SectionTitle className="mb-4" title="Категорії товарів" />
          <ul className={styles.categories_list}>
            {categories.map((category) => (
              <li key={category.id} className="w-[220px] h-[228px]">
                <CategoryCard
                  category_id={category.id}
                  name={category.name}
                  image={category.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

export default Page;
