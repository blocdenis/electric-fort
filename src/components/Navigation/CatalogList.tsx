// 'use client';
// import { categories } from '@/lib/db/categories';
import React from 'react';
import CatalogItem from './CatalogItem';
import { Brand, Category } from '@/lib/types/types';
import { useQuery } from '@tanstack/react-query';
import { getAllBrands, getAllCategories } from '@/services/api/api';
import { categories } from '@/lib/db/categories';
import { brands } from '@/lib/db/brands';

async function CatalogList() {
  const categories = await getAllCategories({ next: { revalidate: 3600 } });
  const brands = await getAllBrands({ next: { revalidate: 3600 } });

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
