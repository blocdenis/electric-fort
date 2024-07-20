import React, { useCallback, useEffect } from 'react';
import styles from './Filters.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFilters } from '@/context/FiltersContext';

const PriceSlider: React.FC = () => {
  const { minPrice, maxPrice, onPriceChange, setMinPrice, setMaxPrice } =
    useFilters();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filterPriceFromURL = searchParams.get('price');

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

  const debounsedMinPrice = useDebounce(minPrice, 500);
  const debounsedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
    if (filterPriceFromURL) {
      setMinPrice(filterPriceFromURL.split(' >= ')[0]);
      setMaxPrice(filterPriceFromURL.split(' >= ')[1]);
    }
  }, [filterPriceFromURL, setMaxPrice, setMinPrice]);

  useEffect(() => {
    if (
      !!minPrice &&
      !!maxPrice &&
      !!debounsedMinPrice &&
      !!debounsedMaxPrice
    ) {
      router.push(
        pathname +
          '?' +
          createQueryString(
            'price',
            `${debounsedMinPrice} >= ${debounsedMaxPrice}`
          ),
        { scroll: false }
      );
    } else if (
      !debounsedMinPrice &&
      !debounsedMaxPrice &&
      !minPrice &&
      !maxPrice
    ) {
      router.replace(pathname + '?' + deleteQueryString('price'), {
        scroll: false,
      });
    }
  }, [
    createQueryString,
    debounsedMaxPrice,
    debounsedMinPrice,
    deleteQueryString,
    maxPrice,
    minPrice,
    pathname,
    router,
  ]);

  return (
    <div className={styles.priceSlider}>
      <span>Ціна</span>
      <div className={styles.inputs}>
        <input
          name="minPrice"
          type="text"
          inputMode="numeric"
          value={minPrice}
          onChange={onPriceChange}
          placeholder="від"
          className={styles.inputNumber}
          min={0}
        />
        <input
          name="maxPrice"
          type="text"
          inputMode="numeric"
          value={maxPrice}
          onChange={onPriceChange}
          placeholder="до"
          className={styles.inputNumber}
          min={0}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
