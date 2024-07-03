'use client';
import FilterButton from '@/components/Buttons/FilerButton/FilterButton';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

interface FiltersPanelProps {
  incomeFilters: (string | undefined)[];
  categoryId: number | undefined;
}

function FiltersPanel({ incomeFilters, categoryId }: FiltersPanelProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(incomeFilters);
  const handleCancelClick = () => {
    setFilters([]);
    router.push(`/categories/${categoryId}`);
  };
  const handleItemClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const filterName = (event.target as HTMLElement).textContent;

    setFilters((prevVal) => prevVal.filter((item) => item !== filterName));
    router.push(`/categories/${categoryId}`);
  };

  return (
    <div className="flex gap-6 items-center mb-3 pl-6">
      <FilterButton onClick={handleCancelClick}>Скасувати</FilterButton>
      {filters?.map((filter) => (
        <FilterButton onClick={handleItemClick} withCross={true} key={filter}>
          {filter}
        </FilterButton>
      ))}
    </div>
  );
}

export default FiltersPanel;
