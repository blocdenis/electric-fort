'use client';
import classNames from 'classnames';
import styles from './ShowMoreButton.module.scss';
import { useFilters } from '@/context/FiltersContext';
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ShowMoreButtonProps {
  className?: string;
  isDisabled?: boolean;
}
function ShowMoreButton({ className, isDisabled }: ShowMoreButtonProps) {
  const { onShowMoreClick } = useFilters();

  return (
    <button
      className={classNames(styles.show_more, className)}
      disabled={isDisabled}
      onClick={onShowMoreClick}
    >
      Показати ще...
    </button>
  );
}

export default ShowMoreButton;
