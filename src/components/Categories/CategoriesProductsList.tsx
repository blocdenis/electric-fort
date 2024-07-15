'use client';
import { useCallback, useEffect, useState } from 'react';
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
import { useFilters } from '@/context/FiltersContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const location = console.log(pathname);

  const searchParams = useSearchParams();
  const pageFromURL = searchParams.get('page');
  const { urlPage } = useFilters();
  const page = 1; //for fetching data
  const itemsPerPage = 6;
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

  // useEffect(() => {
  //   if (pageFromURL) {
  //     changePage(pageFromURL);
  //   }
  // }, [pageFromURL, changePage]);

  console.log(productGroup);

  const queryFn = (
    key: string,
    id: number | undefined,
    sort: string,
    page: number,
    pageSize: number
  ) => {
    if (id) {
      switch (key) {
        case 'category':
          return () => getSortedProductsByCategory(id, sort, page, pageSize);

        case 'brand':
          return () => getSortedProductsByBrand(id, sort, page, pageSize);

        case 'seria':
          return () => getSortedProductsBySeria(id, sort, page, pageSize);

        case 'subseria':
          return () => getSortedProductsBySubSeria(id, sort, page, pageSize);

        case 'subsubseria':
          return () => getSortedProductsBySubSubSeria(id, sort, page, pageSize);

        default:
          break;
      }
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ['productsSorted', groupId, sort, page, pageSize],
    queryFn: queryFn(productGroup, groupId, sort, page, pageSize),
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
      {estimatedNumberOfPages > Number(urlPage) ? (
        <ShowMoreButton className="mt-6" />
      ) : null}
    </>
  );
}

export default CategoriesProductsList;
