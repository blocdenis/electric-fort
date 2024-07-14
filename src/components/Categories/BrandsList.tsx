'use client';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getBrandsByCategoryId } from '@/services/api/api';

interface BrandsListProps {
  categoryId: number;
}

function BrandsList({ categoryId }: BrandsListProps) {
  // const brands = await getBrandsByCategoryId(categoryId);

  const { data } = useQuery({
    queryKey: ['category_brands', categoryId],
    queryFn: () => getBrandsByCategoryId(categoryId),
    staleTime: 10 * 1000,
  });

  const brands = data?.data;

  return (
    <ul className={styles.categories_list}>
      {brands?.map((brand) => (
        <li
          key={brand.id}
          className=" w-[168px] h-[203px] tablet:w-[220px] tablet:h-[228px]"
        >
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
