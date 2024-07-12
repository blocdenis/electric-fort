'use client';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getSeriesByBrandId, getSubSeriesBySeriesId } from '@/services/api/api';

interface SeriesListProps {
  categoryId: number;
  brandId: number;
  seriesId: number;
}

function SubseriesList({ categoryId, brandId, seriesId }: SeriesListProps) {
  const { data: subSeriesData } = useQuery({
    queryKey: ['series_subseries', seriesId],
    queryFn: () => getSubSeriesBySeriesId(seriesId),
    staleTime: 10 * 1000,
  });
  // const subSeriesData = await getSubSeriesBySeriesId(seriesId);
  return (
    <ul className={styles.categories_list}>
      {subSeriesData?.map((subseria) => (
        <li
          key={subseria.id}
          className="w-[168px] min-h-[203px] tablet:w-[220px] tablet:h-[228px]"
        >
          <CategoryCard
            category_id={categoryId}
            brand_id={brandId}
            series_id={seriesId}
            subseries_id={subseria.id}
            name={subseria.name}
            image={subseria.image}
          />
        </li>
      ))}
    </ul>
  );
}

export default SubseriesList;
