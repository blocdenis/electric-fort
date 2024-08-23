'use client';
import React from 'react';
import CatalogItem from './CatalogItem';
import { getAllBrands, getAllCategories } from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';

interface CatalogListProps {
  onItemClick?: () => void;
}

function CatalogList({ onItemClick }: CatalogListProps) {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 100 * 1000,
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => getAllBrands(),
    staleTime: 100 * 1000,
  });

  return (
    <ul className=" bg-backgroung">
      {categories?.map((category) => (
        <li key={category.id}>
          <CatalogItem
            onItemClick={onItemClick}
            brands={brands}
            category={category}
          />
        </li>
      ))}
    </ul>
  );
}

export default CatalogList;
