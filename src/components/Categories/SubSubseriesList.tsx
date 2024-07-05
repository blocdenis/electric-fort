import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getSubSubSeriesBySubSeriesId } from '@/services/api/api';

interface SeriesListProps {
  categoryId: number;
  brandId: number;
  seriesId: number;
  subSeriesId: number;
}

async function SubSubseriesList({
  categoryId,
  brandId,
  seriesId,
  subSeriesId,
}: SeriesListProps) {
  const subSubSeriesData = await getSubSubSeriesBySubSeriesId(subSeriesId);
  return (
    <ul className={styles.categories_list}>
      {subSubSeriesData?.map((subsubseria) => (
        <li key={subsubseria.id} className="w-[220px] h-[228px]">
          <CategoryCard
            category_id={categoryId}
            brand_id={brandId}
            series_id={seriesId}
            subseries_id={subSeriesId}
            subsubseries_id={subsubseria.id}
            name={subsubseria.name}
            image={subsubseria.image}
          />
        </li>
      ))}
    </ul>
  );
}

export default SubSubseriesList;
