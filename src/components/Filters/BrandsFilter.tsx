'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import CustomCheckbox from './CustomCheckbox';
import { Brand } from '@/lib/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface BrandsFilterProps {
  brands?: Brand[];
}

const BrandsFilter: React.FC<BrandsFilterProps> = ({ brands }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const brandsFromURL = searchParams.get('brand_id') ?? '';

  useEffect(() => {
    if (brandsFromURL.charAt(0) === ',') {
      setSelectedBrands(brandsFromURL.slice(1).split(','));
    } else {
      setSelectedBrands(brandsFromURL.split(','));
    }
  }, [brandsFromURL]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // const brands = ['Brand1', 'Schneider Electric', 'Brand3', 'Brand4'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : prevSelectedBrands[0] !== ''
        ? [...prevSelectedBrands, brand]
        : [brand]
    );

    const brandsToFilter = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : selectedBrands[0] !== ''
      ? [...selectedBrands, brand]
      : [brand];

    const brandsToFilterIdsArr = brandsToFilter.join(',');

    if (brandsToFilterIdsArr.length) {
      router.push(
        pathname +
          '?' +
          createQueryString('brand_id', `${brandsToFilterIdsArr}`),
        { scroll: false }
      );
    } else {
      router.push(pathname, { scroll: false });
    }
  };

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
                onChange={() => toggleBrand(brand.id.toString())}
              />
              {brand.name}
            </label>
          ))}
      </div>
    </div>
  );
};

export default BrandsFilter;
