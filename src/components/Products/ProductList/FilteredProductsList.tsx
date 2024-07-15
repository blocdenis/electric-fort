'use client';
import { useCallback, useEffect, useState } from 'react';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '@/context/FiltersContext';

interface CategoriesProductsListProps {
  productGroup: ProductGroup;
  categoryId: number;
  groupIds: string;
  sort: string;
  price: string;
}

function FilteredProductsList({
  productGroup,
  categoryId,
  groupIds,
  sort,
  price,
}: CategoriesProductsListProps) {
  const { urlPage } = useFilters();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = 1; //for fetching data
  const itemsPerPage = 15; //for fetching data
  const pageSize = Number(urlPage) * itemsPerPage; //for fetching data

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (Number(urlPage) > 1) {
      router.push(
        pathname + '?' + createQueryString('page', `${urlPage.toString()}`),
        { scroll: false }
      );
    } else {
      router.replace(pathname + '?' + deleteQueryString('page'), {
        scroll: false,
      });
    }
  }, [createQueryString, urlPage, pathname, router, deleteQueryString]);

  const queryFn = (
    key: string,
    categoryId: number,
    id: string,
    price: string,
    sort: string,
    page: number,
    pageSize: number
  ) => {
    if (id) {
      switch (key) {
        case 'category':
          return () =>
            getFilteredProducts(categoryId, id, price, sort, page, pageSize, {
              cache: 'no-store',
            });

        case 'brand':
          return () =>
            getFilteredProducts(categoryId, id, price, sort, page, pageSize, {
              cache: 'no-store',
            });

        case 'seria':
          return () =>
            getFilteredProductsBySeria(
              categoryId,
              Number(id),
              price,
              sort,
              page,
              pageSize,
              {
                cache: 'no-store',
              }
            );

        case 'subseria':
          return () =>
            getFilteredProductsBySubSeria(
              categoryId,
              Number(id),
              price,
              sort,
              page,
              pageSize,
              {
                cache: 'no-store',
              }
            );

        case 'subsubseria':
          return () =>
            getFilteredProductsBySubSubSeria(
              categoryId,
              Number(id),
              price,
              sort,
              page,
              pageSize,
              {
                cache: 'no-store',
              }
            );

        default:
          break;
      }
    }
  };

  const { data, isPending, isLoading } = useQuery({
    queryKey: ['products', categoryId, groupIds, price, sort, page, pageSize],
    queryFn: queryFn(
      productGroup,
      categoryId,
      groupIds,
      price,
      sort,
      page,
      pageSize
    ),
    staleTime: 10,
  });
  console.log(categoryId, groupIds, price, sort, page, pageSize);

  console.log(data);

  if (!data) {
    return isLoading && <div>Hello Loading</div>;
  }

  const estimatedNumberOfPages = data.count
    ? Math.ceil(data.count / itemsPerPage)
    : 1;

  console.log('Hello from filtered Product list');
  console.log(data);

  return (
    <>
      <ProductList products={data.data} />
      {estimatedNumberOfPages > Number(urlPage) ? (
        <ShowMoreButton className="mt-6" />
      ) : null}
    </>
  );
}

export default FilteredProductsList;
