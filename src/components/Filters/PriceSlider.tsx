import React, { useCallback, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PriceSlider: React.FC<{ price?: string }> = ({ price }) => {
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

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const debounsedMinPrice = useDebounce(minPrice, 500);
  const debounsedMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
    if (!!debounsedMinPrice && !!debounsedMaxPrice) {
      router.push(
        pathname +
          '?' +
          createQueryString(
            'price',
            `${debounsedMinPrice} >= ${debounsedMaxPrice}`
          ),
        { scroll: false }
      );
    } else if (!debounsedMinPrice && !debounsedMaxPrice) {
      router.replace(pathname + '?' + deleteQueryString('price'), {
        scroll: false,
      });
    }
  }, [
    createQueryString,
    debounsedMaxPrice,
    debounsedMinPrice,
    deleteQueryString,
    pathname,
    price,
    router,
  ]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case 'minPrice':
        if (e.target.value.includes('-')) {
          setMinPrice(e.target.value.replace('-', '').trim());
        } else {
          setMinPrice(e.target.value);
        }
        break;
      case 'maxPrice':
        if (e.target.value.includes('-')) {
          setMaxPrice(e.target.value.replace('-', '').trim());
        } else {
          setMaxPrice(e.target.value);
        }
        break;
      default:
        console.log('some thing wrong');

        break;
    }
  };

  return (
    <div className={styles.priceSlider}>
      <span>Ціна</span>
      <div className={styles.inputs}>
        <input
          name="minPrice"
          type="text"
          inputMode="numeric"
          value={minPrice}
          onChange={handlePriceChange}
          placeholder="От"
          className={styles.inputNumber}
          min={0}
        />
        <input
          name="maxPrice"
          type="text"
          inputMode="numeric"
          value={maxPrice}
          onChange={handlePriceChange}
          placeholder="До"
          className={styles.inputNumber}
          min={0}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
