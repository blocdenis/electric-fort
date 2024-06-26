'use client';

import Image from 'next/image';
import ArrowSortIcon from '@/components/icons/ArrowSortIcon';

function Sort() {
  return (
    <div className="flex items-center justify-end gap-6 text-grey text-sm mb-4">
      <p>Сортувати:</p>
      <button
        className="flex items-center"
        onClick={() => console.log('sorted by added date')}
      >
        за датою додавання
        <span>
          <ArrowSortIcon />
        </span>
      </button>
      <button
        className="flex items-center"
        onClick={() => console.log('sorted by price')}
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
