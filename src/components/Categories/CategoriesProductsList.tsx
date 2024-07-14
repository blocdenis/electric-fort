'use client';
import { useState } from 'react';
import ShowMoreButton from '../Buttons/ShowMoreButton/ShowMoreButton';
import ProductList from '../Products/ProductList/ProductList';
import {
  getProductsByBrand,
  getProductsByCategory,
  getProductsBySeria,
  getProductsBySubSeria,
  getProductsBySubSubSeria,
  getSortedProductsByBrand,
  getSortedProductsByCategory,
  getSortedProductsBySeria,
  getSortedProductsBySubSeria,
  getSortedProductsBySubSubSeria,
} from '@/services/api/api';
import { useQuery } from '@tanstack/react-query';

export type ProductGroup =
  | 'category'
  | 'brand'
  | 'seria'
  | 'subseria'
  | 'subsubseria';

interface CategoriesProductsListProps {
  productGroup: ProductGroup;
  groupId: number | undefined;
  sort: string;
}

function CategoriesProductsList({
  productGroup,
  groupId,
  sort,
}: CategoriesProductsListProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pageSize = page * itemsPerPage;

  console.log(productGroup);

  const queryFn = (
    key: string,
    id: number | undefined,
    pageSize: number,
    sort: string
  ) => {
    if (id) {
      if (sort !== '') {
        switch (key) {
          case 'category':
            return () => getSortedProductsByCategory(id, sort, 1, pageSize);

          case 'brand':
            return () => getSortedProductsByBrand(id, sort, 1, pageSize);

          case 'seria':
            return () => getSortedProductsBySeria(id, sort, 1, pageSize);

          case 'subseria':
            return () => getSortedProductsBySubSeria(id, sort, 1, pageSize);

          case 'subsubseria':
            return () => getSortedProductsBySubSubSeria(id, sort, 1, pageSize);

          default:
            break;
        }
      }
      switch (key) {
        case 'category':
          return () => getProductsByCategory(id, 1, pageSize);

        case 'brand':
          return () => getProductsByBrand(id, 1, pageSize);

        case 'seria':
          return () => getProductsBySeria(id, 1, pageSize);

        case 'subseria':
          return () => getProductsBySubSeria(id, 1, pageSize);

        case 'subsubseria':
          return () => getProductsBySubSubSeria(id, 1, pageSize);

        default:
          break;
      }
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ['products', groupId, pageSize, sort],
    queryFn: queryFn(productGroup, groupId, pageSize, sort),
    staleTime: 10 * 1000,
  });

  if (!data) {
    return null;
  }

  const estimatedNumberOfPages = data.count
    ? Math.ceil(data.count / itemsPerPage)
    : 1;

  console.log('Hello from categories Products List');

  return (
    <>
      {isPending ? <div>Lading</div> : <ProductList products={data.data} />}
      {estimatedNumberOfPages > page ? (
        <ShowMoreButton
          className="mt-6"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        />
      ) : null}
    </>
  );
}

export default CategoriesProductsList;
