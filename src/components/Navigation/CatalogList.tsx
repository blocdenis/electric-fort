import React from 'react';
import CatalogItem from './CatalogItem';
import { getAllBrands, getAllCategories } from '@/services/api/api';

async function CatalogList() {
  const categories = await getAllCategories({ next: { revalidate: 60 } });
  const brands = await getAllBrands({ next: { revalidate: 60 } });

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
