'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import CustomCheckbox from './CustomCheckbox';
import { Brand } from '@/lib/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '@/context/FiltersContext';

const BrandsFilter: React.FC = () => {
  const {
    shownBrands: brands,
    selectedBrands,
    onBrandCheckboxChange,
  } = useFilters();
  const [search, setSearch] = useState<string>('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const brandsFromURL = searchParams.get('brand_id') ?? '';

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
    // if (brandsFromURL.charAt(0) === ',') {
    //   setSelectedBrands(brandsFromURL.slice(1).split(','));
    // } else {
    //   setSelectedBrands(brandsFromURL.split(','));
    // }
    if (selectedBrands?.length) {
      router.push(
        pathname +
          '?' +
          createQueryString('brand_id', `${selectedBrands.toString()}`),
        { scroll: false }
      );
    } else {
      router.replace(pathname + '?' + deleteQueryString('brand_id'), {
        scroll: false,
      });
    }
  }, [
    brandsFromURL,
    createQueryString,
    deleteQueryString,
    pathname,
    router,
    selectedBrands,
  ]);

  return (
    <div className={styles.brandsFilter}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук"
        className={styles.searchInput}
      />
      <div className={styles.brandsList}>
        {brands
          ?.filter((brand) =>
            brand.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((brand) => (
            <label key={brand.id} className={styles.brandItem}>
              <CustomCheckbox
                checked={selectedBrands.includes(brand.id.toString())}
                onChange={() => onBrandCheckboxChange(brand.id.toString())}
              />
              {brand.name}
            </label>
          ))}
      </div>
    </div>
  );
};

export default BrandsFilter;
