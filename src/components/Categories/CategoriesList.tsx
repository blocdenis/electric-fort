'use client';
import React from 'react';
import CategoryCard from './CategoryCard';
import styles from './CategoriesList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/api/api';
import { formatedString } from '@/lib/utils/formatString';
import { categories } from '@/lib/db/categories';

function CategoriesList() {
  // const { data: categories } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => getCategories(),
  //   staleTime: 10 * 1000,
  // });
  return (
    <ul className={styles.categories_list}>
      {categories?.map((category) => (
        <li key={category.id} className="w-[220px] h-[228px]">
          <CategoryCard
            category_id={category.id}
            name={formatedString(category.name)}
            image={category.image}
          />
        </li>
      ))}
    </ul>
  );
}

export default CategoriesList;
