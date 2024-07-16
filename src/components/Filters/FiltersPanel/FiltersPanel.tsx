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
  const price = searchParams.get('price');
  const brand_id = searchParams.get('price');

  const {
    category_id,
    brand_id: brandId,
    series_id,
    subseries_id,
    subsubseries_id,
  } = params;

  console.log(
    category_id,
    brandId,
    series_id,
    subseries_id,
    subseries_id,
    subsubseries_id
  );
  const { setMinPrice, setMaxPrice, setUrlPage, setSelectedBrands } =
    useFilters();
  const [filters, setFilters] = useState<Brand[]>([]);

  useEffect(() => {
    if (incomeFilters) {
      setFilters(incomeFilters);
    }
  }, [incomeFilters]);

  const onCancelClick = (
    category_id: string | string[] | undefined,
    brandId: string | string[] | undefined,
    series_id: string | string[] | undefined,
    subseries_id: string | string[] | undefined,
    subsubseries_id: string | string[] | undefined,
    price: string | null,
    brand_id: string | null
  ) => {
    if (
      !brand_id &&
      !series_id &&
      !subseries_id &&
      !subsubseries_id &&
      category_id
    ) {
      console.log('Hello from cancel btn1');

      setMinPrice('');
      setMaxPrice('');
      setUrlPage('1');
      setSelectedBrands([]);
      router.replace(pathname, { scroll: false });
    } else if (price) {
      console.log(`Hello from cancel btn${searchParams.toString()}`);
      router.replace(`/categories/${category_id}`, { scroll: false });
      setMinPrice('');
      setMaxPrice('');
      setSelectedBrands([]);
    }
    router.replace(`/categories/${category_id}`, { scroll: false });
  };

  const onItemClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (filters.length <= 1) {
      onCancelClick(
        category_id,
        brandId,
        series_id,
        subseries_id,
        subseries_id,
        price,
        brand_id
      );
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
      <FilterButton
        onClick={() =>
          onCancelClick(
            category_id,
            brandId,
            series_id,
            subseries_id,
            subseries_id,
            price,
            brand_id
          )
        }
      >
        Скасувати
      </FilterButton>
      {filters?.map((filter) => (
        <FilterButton onClick={onItemClick} withCross={true} key={filter.id}>
          {filter.name}
        </FilterButton>
      ))}
    </div>
  );
}

export default FiltersPanel;
