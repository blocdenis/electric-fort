'use client';
// import { categories } from '@/lib/db/categories';
import React from 'react';
import CatalogItem from './CatalogItem';
import { Brand, Category } from '@/lib/types/types';
import { useQuery } from '@tanstack/react-query';
import { getBrands, getCategories } from '@/services/api/api';

// type Props = {
//   categories: Category[];
//   brands: Brand[];
// };

function CatalogList() {
  // { categories, brands }: Props
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: 10 * 1000,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getBrands(),
    staleTime: 10 * 1000,
  });

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
