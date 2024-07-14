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

interface CategoriesProductsListProps {
  urlPage: number;
  onShowMoreClick: () => void;
  productGroup: ProductGroup;
  categoryId: number;
  groupIds: string;
  sort: string;
  price: string;
}

function FilteredProductsList({
  urlPage,
  onShowMoreClick,
  productGroup,
  categoryId,
  groupIds,
  sort = '%2Bprice',
  price,
}: CategoriesProductsListProps) {
  const page = 1; //for fetching data
  const itemsPerPage = 6;
  const pageSize = urlPage * itemsPerPage; //for fetching data
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
    if (urlPage > 1) {
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

  console.log(urlPage);

  console.log(productGroup);

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

  const { data, isLoading } = useQuery({
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

  if (!data) {
    return null;
  }

  const estimatedNumberOfPages = data.count
    ? Math.ceil(data.count / itemsPerPage)
    : 1;

  console.log('Hello from filtered Product list');
  console.log(data);

  return (
    <>
      {isLoading ? (
        <div>Lading</div>
      ) : (
        <>
          <ProductList products={data.data} />
        </>
      )}
      {estimatedNumberOfPages > urlPage ? (
        <ShowMoreButton className="mt-6" onClick={onShowMoreClick} />
      ) : null}
    </>
  );
}

export default FilteredProductsList;
