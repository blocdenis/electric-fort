import CategoryCard from './CategoryCard';
import styles from '@/components/Categories/CategoriesList.module.scss';
import { getSubSubSeriesBySubSeriesId } from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';

interface SeriesListProps {
  categoryId: number;
  brandId: number;
  seriesId: number;
  subSeriesId: number;
}

function SubSubseriesList({
  categoryId,
  brandId,
  seriesId,
  subSeriesId,
}: SeriesListProps) {
  // const subSubSeriesData = await getSubSubSeriesBySubSeriesId(subSeriesId);
  const { data: subSubSeriesData } = useQuery({
    queryKey: ['subseries_subsubseries', subSeriesId],
    queryFn: () => getSubSubSeriesBySubSeriesId(subSeriesId),
    staleTime: 10 * 1000,
  });

  return (
    <ul className={styles.categories_list}>
      {subSubSeriesData?.map((subsubseria) => (
        <li
          key={subsubseria.id}
          className="w-[168px] h-full tablet:w-[220px] tablet:h-[228px]"
        >
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
