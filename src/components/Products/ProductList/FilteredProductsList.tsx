'use client';
import { useState } from 'react';
import ShowMoreButton from '@/components/Buttons/ShowMoreButton/ShowMoreButton';
import ProductList from '@/components/Products/ProductList/ProductList';
import { getFilteredProducts } from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';
import Sort from '@/components/Sort/Sort';
import FiltersPanel from '@/components/Filters/FiltersPanel/FiltersPanel';
import { Brand } from '@/lib/types/types';

interface CategoriesProductsListProps {
  categoryId: number;
  brandIds: string;
  brandNames: Brand[];
  sort: string;
  // price: string;
}

function FilteredProductsList({
  categoryId,
  brandIds,
  brandNames,
  sort = '%2Bprice',
}: // price,
CategoriesProductsListProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pageSize = page * itemsPerPage;

  const { data, isPending } = useQuery({
    queryKey: ['products', brandIds, pageSize, sort],
    queryFn: () => getFilteredProducts(brandIds, sort, 1, pageSize),
    staleTime: 10,
  });

  if (!data) {
    return null;
  }

  const estimatedNumberOfPages = data.count
    ? Math.ceil(data.count / itemsPerPage)
    : 1;

  return (
    <>
      {isPending ? (
        <div>Lading</div>
      ) : (
        <>
          {/* <Sort isDisable={!data.data.length} />
          <FiltersPanel incomeFilters={brandNames} categoryId={categoryId} /> */}
          <ProductList products={data.data} />
        </>
      )}
      {estimatedNumberOfPages > page ? (
        <ShowMoreButton
          className="mt-6"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        />
      ) : null}
    </>
  );
}

export default FilteredProductsList;
