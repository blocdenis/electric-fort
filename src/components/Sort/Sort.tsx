'use client';

import ArrowSortIcon from '@/components/icons/ArrowSortIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useState } from 'react';
import styles from './Sort.module.scss';
import classNames from 'classnames';

interface SortProps {
  isDisable?: boolean;
}

function Sort({ isDisable }: SortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceSort, setPriceSort] = useState('price');
  const [dateSort, setDateSort] = useState('add_date');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSortClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const btn = event.currentTarget;

    switch (event.currentTarget.textContent) {
      case 'за датою додавання':
        if (dateSort !== 'add_date') {
          setDateSort('add_date');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
          router.push(
            pathname + '?' + createQueryString('sort', `${dateSort}`)
          );
        } else {
          setDateSort('-add_date');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
          router.push(
            pathname + '?' + createQueryString('sort', `${dateSort}`)
          );
        }

        break;
      case 'за ціною':
        if (priceSort !== 'price') {
          setPriceSort('price');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
          router.push(
            pathname + '?' + createQueryString('sort', `${priceSort}`)
          );
        } else {
          setPriceSort('-price');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
          router.push(
            pathname + '?' + createQueryString('sort', `${priceSort}`)
          );
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-start px-4 laptop:flex-row laptop:items-center laptop:justify-end gap-3 text-grey text-sm mb-4">
      <p className={classNames({ 'text-dark_grey': isDisable })}>Сортувати:</p>
      <div className="flex justify-between w-full laptop:w-fit laptop:gap-3 laptop:justify-end">
        <button
          className={styles.sort}
          onClick={handleSortClick}
          disabled={isDisable}
        >
          за датою додавання
          <span>
            <ArrowSortIcon />
          </span>
        </button>
        <button
          className={styles.sort}
          onClick={handleSortClick}
          disabled={isDisable}
        >
          за ціною
          <span>
            <ArrowSortIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sort;
