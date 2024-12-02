'use client';

import ArrowSortIcon from '@/components/icons/ArrowSortIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect } from 'react';
import styles from './Sort.module.scss';
import classNames from 'classnames';
import { useFilters } from '@/context/FiltersContext';

interface SortProps {
  isDisable?: boolean;
}

function Sort({ isDisable }: SortProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { sort, setSort, maxPrice, minPrice, shownBrands } = useFilters();

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
    if (sort !== '') {
      // console.log('sort use effect add');
      router.push(pathname + '?' + createQueryString('sort', `${sort}`), {
        scroll: false,
      });
    } else {
      // console.log('sort use effect delete');
      router.push(pathname + '?' + deleteQueryString('sort'), {
        scroll: false,
      });
    }
  }, [createQueryString, deleteQueryString, pathname, router, sort]);

  const handleSortClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const btn = event.currentTarget;

    switch (event.currentTarget.textContent) {
      case 'за датою додавання':
        if (sort !== 'add_date') {
          setSort('add_date');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
        } else {
          setSort('-add_date');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
        }
        break;
      case 'за ціною':
        if (sort !== 'price') {
          setSort('price');
          event.currentTarget.classList.remove(styles.down_sort);
          event.currentTarget.classList.add(styles.up_sort);
        } else {
          setSort('-price');
          event.currentTarget.classList.remove(styles.up_sort);
          event.currentTarget.classList.add(styles.down_sort);
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
