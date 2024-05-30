// import { categories } from '@/lib/db/categories';
import React from 'react';
import CatalogItem from './CatalogItem';
import { Brand, Category } from '@/lib/db/types';

type Props = {
  categories: Category[];
  brands: Brand[];
};

function CatalogList({ categories, brands }: Props) {
  return (
    <ul className=" bg-backgroung">
      {categories?.map((category) => (
        <li key={category.id}>
          <CatalogItem brands={brands} category={category} />
        </li>
      ))}
    </ul>
  );
}

export default CatalogList;
