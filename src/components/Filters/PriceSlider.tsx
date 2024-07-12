import React, { useCallback, useEffect } from 'react';
import styles from './Filters.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PriceSliderProps {
  minPrice?: string;
  maxPrice?: string;
  onPriceChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
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

  // const [minPrice, setMinPrice] = useState<string>('');
  // const [maxPrice, setMaxPrice] = useState<string>('');
  const debounsedMinPrice = useDebounce(minPrice, 500);
  const debounsedMaxPrice = useDebounce(maxPrice, 500);

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

  // const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   switch (e.target.name) {
  //     case 'minPrice':
  //       if (e.target.value.includes('-')) {
  //         setMinPrice(e.target.value.replace('-', '').trim());
  //       } else {
  //         setMinPrice(e.target.value);
  //       }
  //       break;
  //     case 'maxPrice':
  //       if (e.target.value.includes('-')) {
  //         setMaxPrice(e.target.value.replace('-', '').trim());
  //       } else {
  //         setMaxPrice(e.target.value);
  //       }
  //       break;
  //     default:
  //       console.log('wrong price name');
  //       break;
  //   }
  // };

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
          placeholder="От"
          className={styles.inputNumber}
          min={0}
        />
        <input
          name="maxPrice"
          type="text"
          inputMode="numeric"
          value={maxPrice}
          onChange={onPriceChange}
          placeholder="До"
          className={styles.inputNumber}
          min={0}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
