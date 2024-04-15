import { categories } from '@/lib/db/categories';
import React from 'react';
import CatalogItem from './CatalogItem';

function CatalogList() {
  return (
    <ul className=" bg-backgroung">
      {categories.map((category) => (
        <li key={category.id}>
          <CatalogItem category={category} />
        </li>
      ))}
    </ul>
  );
}

export default CatalogList;
