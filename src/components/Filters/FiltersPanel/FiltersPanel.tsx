'use client';
import FilterButton from '@/components/Buttons/FilerButton/FilterButton';
import { Brand } from '@/lib/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

interface FiltersPanelProps {
  incomeFilters: Brand[];
  categoryId: number | undefined;
}

function FiltersPanel({ incomeFilters, categoryId }: FiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filters, setFilters] = useState<Brand[]>([]);

  useEffect(() => {
    setFilters(incomeFilters);
  }, [incomeFilters]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCancelClick = () => {
    setFilters([]);
    router.push(`/categories/${categoryId}`);
  };
  const handleItemClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const filterName = (event.target as HTMLElement).textContent;
    setFilters((prevVal) => prevVal.filter((item) => item.name !== filterName));

    const filtersToUpdate = filters.filter((item) => item.name !== filterName);

    if (!filtersToUpdate.length) {
      router.push(`/categories/${categoryId}`);
    } else {
      router.push(
        pathname +
          '?' +
          createQueryString(
            'brand_id',
            `${filtersToUpdate.map((item) => item.id).join(',')}`
          ),
        {
          scroll: false,
        }
      );
    }
  };

  return (
    <div className="flex gap-6 items-center mb-3 pl-6">
      <FilterButton onClick={handleCancelClick}>Скасувати</FilterButton>
      {filters?.map((filter) => (
        <FilterButton
          onClick={handleItemClick}
          withCross={true}
          key={filter.id}
        >
          {filter.name}
        </FilterButton>
      ))}
    </div>
  );
}

export default FiltersPanel;
