'use client';

import ArrowSortIcon from '@/components/icons/ArrowSortIcon';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import styles from './Sort.module.scss';
import classNames from 'classnames';

interface SortProps {
  isDisable?: boolean;
}

function Sort({ isDisable }: SortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [priceSort, setPriceSort] = useState('price');
  const [dateSort, setDateSort] = useState('add_date');

  const handleSortClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const btn = event.currentTarget;
    console.log(event.currentTarget.textContent);

    switch (event.currentTarget.textContent) {
      case 'за датою додавання':
        if (dateSort !== 'add_date') {
          setDateSort('add_date');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
          router.push(`${pathname}?sort=${dateSort}`);
        } else {
          setDateSort('-add_date');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
          router.push(`${pathname}?sort=${dateSort}`);
        }

        break;
      case 'за ціною':
        if (priceSort !== 'price') {
          setPriceSort('price');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
          router.push(`${pathname}?sort=${priceSort}`);
        } else {
          setPriceSort('-price');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
          router.push(`${pathname}?sort=${priceSort}`);
        }

        break;

      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-end gap-6 text-grey text-sm mb-4">
      <p className={classNames({ 'text-dark_grey': isDisable })}>Сортувати:</p>
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
  );
}

export default Sort;
