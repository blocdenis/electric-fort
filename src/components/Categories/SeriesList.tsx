'use client';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getSeriesByBrandId } from '@/services/api/api';

interface SeriesListProps {
  categoryId: number;
  brandId: number;
}

function SeriesList({ categoryId, brandId }: SeriesListProps) {
  const { data: series } = useQuery({
    queryKey: ['brands_series', brandId],
    queryFn: () => getSeriesByBrandId(brandId),
    staleTime: 10 * 1000,
  });

  return (
    <ul className={styles.categories_list}>
      {series?.map((seria) => (
        <li
          key={seria.id}
          className=" w-[168px] h-full tablet:w-[220px] tablet:h-[228px]"
        >
          <CategoryCard
            category_id={categoryId}
            brand_id={brandId}
            series_id={seria.id}
            name={seria.name}
            image={seria.image}
          />
        </li>
      ))}
    </ul>
  );
}

export default SeriesList;
