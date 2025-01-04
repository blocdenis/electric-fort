'use client';
import React from 'react';
import CategoryCard from './CategoryCard';
import styles from './CategoriesList.module.scss';
import { getAllCategories } from '@/services/api/api';
import { formatedString } from '@/lib/utils/formatString';
import { useQuery } from '@tanstack/react-query';

function CategoriesList() {
  const { data: categories, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
    staleTime: 10 * 1000,
  });
  // const categories = await getAllCategories();

  return (
    <ul className={styles.categories_list}>
      {categories?.map((category) => (
        <li
          key={category.id}
          className=" w-[168px] h-full tablet:w-[220px] tablet:h-[228px]"
        >
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
