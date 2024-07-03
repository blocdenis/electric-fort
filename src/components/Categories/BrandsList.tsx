// 'use client';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getBrandsByCategoryId, getCategoryById } from '@/services/api/api';

interface BrandsListProps {
  categoryId: number;
}

async function BrandsList({ categoryId }: BrandsListProps) {
  const brands = await getBrandsByCategoryId(categoryId);

  return (
    <ul className={styles.categories_list}>
      {brands?.map((brand) => (
        <li key={brand.id} className="w-[220px] h-[228px]">
          <CategoryCard
            category_id={categoryId}
            brand_id={brand.id}
            name={brand.name}
            image={brand.image}
          />
        </li>
      ))}
    </ul>
  );
}

export default BrandsList;
