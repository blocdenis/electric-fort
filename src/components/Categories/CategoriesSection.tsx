import React from 'react';
import Section from '../Section/Section';
import CategoryCard from './CategoryCard';
import { categories } from '@/lib/db/categories';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import ButtonLink from '../Buttons/ButtonLink/ButtonLink';

function CategoriesSection() {
  return (
    <Section>
      <div className=" pr-[64px] mx-auto">
        <SectionTitle title="Категорії товарів" className=" mb-4" />
        <ul className="flex gap-[23px] pl-6">
          {categories.map(({ id, name, image }, index) => {
            if (index <= 3) {
              return (
                <li key={id}>
                  <CategoryCard id={id} name={name} image={image} />
                </li>
              );
            }
          })}
        </ul>
        <div className="flex justify-end">
          <ButtonLink
            className=" mt-6"
            href="/categories"
            title="Переглянути всі"
          />
        </div>
      </div>
    </Section>
  );
}

export default CategoriesSection;
