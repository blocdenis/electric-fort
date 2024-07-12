'use client';
import FilterButton from '@/components/Buttons/FilerButton/FilterButton';
import { Brand } from '@/lib/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

interface FiltersPanelProps {
  // incomeFilters: Brand[] | undefined;
  // categoryId: number | undefined;
  filters: Brand[];
  onCancelClick: () => void;
  onItemClick: MouseEventHandler<HTMLButtonElement>;
}

function FiltersPanel({
  filters,
  onCancelClick,
  onItemClick,
}: FiltersPanelProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const [filters, setFilters] = useState<Brand[]>([]);

  // useEffect(() => {
  //   if (incomeFilters) {
  //     setFilters(incomeFilters);
  //   }
  // }, [incomeFilters]);

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  // const handleCancelClick = () => {
  //   setFilters([]);
  //   router.replace(`/categories/${categoryId}`);
  // };
  // const handleItemClick: React.MouseEventHandler<HTMLButtonElement> = (
  //   event
  // ) => {
  //   const filterName = (event.currentTarget as HTMLElement).textContent;
  //   setFilters((prevVal) => prevVal.filter((item) => item.name !== filterName));

  //   const filtersToUpdate = filters.filter((item) => item.name !== filterName);

  //   if (!filtersToUpdate.length) {
  //     router.push(`/categories/${categoryId}`);
  //   } else {
  //     router.push(
  //       pathname +
  //         '?' +
  //         createQueryString(
  //           'brand_id',
  //           `${filtersToUpdate.map((item) => item.id).join(',')}`
  //         ),
  //       {
  //         scroll: false,
  //       }
  //     );
  //   }
  // };

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
