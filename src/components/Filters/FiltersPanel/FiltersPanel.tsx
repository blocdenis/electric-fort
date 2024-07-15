'use client';
import FilterButton from '@/components/Buttons/FilerButton/FilterButton';
import { useFilters } from '@/context/FiltersContext';
import { Brand } from '@/lib/types/types';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

interface FiltersPanelProps {
  incomeFilters: Brand[] | undefined;
  // categoryId: number | undefined;
  // filters: Brand[];
  // onCancelClick: () => void;
  // onItemClick: MouseEventHandler<HTMLButtonElement>;
}

function FiltersPanel({
  incomeFilters,
}: // filters,
// onCancelClick,
// onItemClick,
FiltersPanelProps) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const price = searchParams.toString();
  console.log(price);

  const { category_id, brand_id, series_id, subseries_id, subsubseries_id } =
    params;
  const { setMinPrice, setMaxPrice, setUrlPage, setSelectedBrands } =
    useFilters();
  const [filters, setFilters] = useState<Brand[]>([]);

  useEffect(() => {
    if (incomeFilters) {
      setFilters(incomeFilters);
    }
  }, [incomeFilters]);

  const onCancelClick = () => {
    if (
      !brand_id &&
      !series_id &&
      !subseries_id &&
      !subsubseries_id &&
      category_id
    ) {
      console.log('Hello from cancel btn');

      setMinPrice('');
      setMaxPrice('');
      setUrlPage('1');
      setSelectedBrands([]);
      router.replace(pathname, { scroll: false });
    } else if (searchParams.toString()) {
      console.log('Hello from cancel btn');
      router.replace(`/categories/${category_id}`, { scroll: false });
      setMinPrice('');
      setMaxPrice('');
      setSelectedBrands([]);
    } else {
      router.replace(`/categories/${category_id}`, { scroll: false });
    }
  };

  const onItemClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (filters.length <= 1) {
      onCancelClick();
    } else {
      const filterName = (event.currentTarget as HTMLElement).textContent;
      setFilters((prevFilters) =>
        prevFilters.filter((item) => item.name !== filterName)
      );
      const filtersToUpdate = filters
        .filter((item) => item.name !== filterName)
        .map((item) => item.id.toString());
      setSelectedBrands(filtersToUpdate);
    }
  };

  return (
    <div className="flex gap-6 items-center mb-3 pl-6">
      <FilterButton onClick={onCancelClick}>Скасувати</FilterButton>
      {filters?.map((filter) => (
        <FilterButton onClick={onItemClick} withCross={true} key={filter.id}>
          {filter.name}
        </FilterButton>
      ))}
    </div>
  );
}

export default FiltersPanel;
