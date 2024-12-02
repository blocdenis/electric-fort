'use client';
import ProductCard from '../Products/ProductCard/ProductCard';
import ProductList from '../Products/ProductList/ProductList';
import Sort from '../Sort/Sort';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import styles from './ProductList.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getFilteredProductsInSearch } from '@/services/api/api';
import ShowMoreButton from '../Buttons/ShowMoreButton/ShowMoreButton';
import { useFilters } from '@/context/FiltersContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Brand } from '@/lib/types/types';

type ProductsListProps = {
  query: string;
  filteredBrands: string;
  sorter: string;
  filterPrice: string;
  allBrands: Brand[];
};

const ProductsList: React.FC<ProductsListProps> = ({
  query,
  filteredBrands,
  sorter,
  filterPrice,
  allBrands,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { urlPage, setShownBrands } = useFilters();
  const page = 1; //for fetching data
  const itemsPerPage = 15;
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

  const { data: products, isPending } = useQuery({
    queryKey: [
      'filteredSearchProducts',
      query,
      filteredBrands,
      filterPrice,
      sorter,
      page,
      pageSize,
    ],
    queryFn: () =>
      getFilteredProductsInSearch(
        query,
        filteredBrands,
        filterPrice,
        sorter,
        page,
        pageSize
      ),
    staleTime: 0,
  });

  useEffect(() => {
    const brandsInSearch = allBrands.filter((brand) => {
      return (
        products?.data.map((item) => item.brand_id).indexOf(brand.id) !== -1
      );
    });
    setShownBrands(brandsInSearch);

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
  }, [
    createQueryString,
    urlPage,
    pathname,
    router,
    deleteQueryString,
    allBrands,
    setShownBrands,
    products?.data,
  ]);

  const estimatedNumberOfPages = products?.count
    ? Math.ceil(products.count / itemsPerPage)
    : 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <SectionTitle title={'Результати пошуку'} />
      </div>

      <div className="px-6 flex flex-col gap-3 tablet:flex-row tablet:justify-between">
        <span className={styles.counter}>
          Знайдено {products?.count} товарів
        </span>
        <Sort />
      </div>

      {isPending ? (
        <div>Lading</div>
      ) : (
        <ProductList products={products?.data} />
      )}
      {estimatedNumberOfPages > Number(urlPage) ? (
        <ShowMoreButton className="mt-6 w-[250px] mx-auto" />
      ) : null}
    </div>
  );
};

export default ProductsList;
