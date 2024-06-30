import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getSeriesByBrandId, getSubSeriesBySeriesId } from '@/services/api/api';

interface SeriesListProps {
  categoryId: number;
  brandId: number;
  seriesId: number;
}

async function SubseriesList({
  categoryId,
  brandId,
  seriesId,
}: SeriesListProps) {
  const subSeriesData = await getSubSeriesBySeriesId(seriesId);
  return (
    <ul className={styles.categories_list}>
      {subSeriesData?.map((subseria) => (
        <li key={subseria.id} className="w-[220px] h-[228px]">
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
