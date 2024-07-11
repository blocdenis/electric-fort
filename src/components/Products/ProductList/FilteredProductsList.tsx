'use client';
import { useState } from 'react';
import ShowMoreButton from '@/components/Buttons/ShowMoreButton/ShowMoreButton';
import ProductList from '@/components/Products/ProductList/ProductList';
import {
  getFilteredProducts,
  getFilteredProductsBySeria,
  getFilteredProductsBySubSeria,
  getFilteredProductsBySubSubSeria,
} from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';
import { Brand } from '@/lib/types/types';
import { ProductGroup } from '@/components/Categories/CategoriesProductsList';

interface CategoriesProductsListProps {
  productGroup: ProductGroup;
  ids: string;
  sort: string;
  price: string;
}

function FilteredProductsList({
  productGroup,
  ids,
  sort = '%2Bprice',
  price,
}: CategoriesProductsListProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pageSize = page * itemsPerPage;

  const queryFn = (
    key: string,
    id: string,
    price: string,
    pageSize: number,
    sort: string
  ) => {
    if (id) {
      switch (key) {
        case 'category':
          return () => getFilteredProducts(id, price, sort, 1, pageSize);
        case 'brand':
          return () => getFilteredProducts(id, price, sort, 1, pageSize);

        case 'seria':
          return () =>
            getFilteredProductsBySeria(Number(id), price, sort, 1, pageSize);

        case 'subseria':
          return () =>
            getFilteredProductsBySubSeria(Number(id), price, sort, 1, pageSize);

        case 'subsubseria':
          return () =>
            getFilteredProductsBySubSubSeria(
              Number(id),
              price,
              sort,
              1,
              pageSize
            );

        default:
          break;
      }
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ['products', ids, price, pageSize, sort],
    queryFn: queryFn(productGroup, ids, price, pageSize, sort),
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
