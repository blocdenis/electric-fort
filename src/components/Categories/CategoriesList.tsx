import React from 'react';
import CategoryCard from './CategoryCard';
import styles from './CategoriesList.module.scss';
import { getAllCategories } from '@/services/api/api';
import { formatedString } from '@/lib/utils/formatString';
import { categories } from '@/lib/db/categories';

async function CategoriesList() {
  const categories = await getAllCategories();

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
