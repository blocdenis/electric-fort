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
}

function FiltersPanel({ incomeFilters }: FiltersPanelProps) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { category_id } = params;

  const { setMinPrice, setMaxPrice, setUrlPage, setSelectedBrands, setSort } =
    useFilters();
  const [filters, setFilters] = useState<Brand[]>([]);

  useEffect(() => {
    if (incomeFilters) {
      setFilters(incomeFilters);
    }
  }, [incomeFilters]);

  const onCancelClick = () => {
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    setUrlPage('1');

    setTimeout(() => {
      router.replace(`/categories/${category_id}`, { scroll: false });
    }, 300);
  };

  const onItemClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (filters.length <= 1) {
      setSelectedBrands([]);
      setMinPrice('');
      setMaxPrice('');
      setSort('');
      setUrlPage('1');

      setTimeout(() => {
        router.replace(`/categories/${category_id}`, { scroll: false });
      }, 300);
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
