'use client';
import React, { useState } from 'react';
import PriceSlider from './PriceSlider';
import BrandsFilter from './BrandsFilter';
import styles from './Filters.module.scss';
import { ArrowCatalogIcon, ArrowCategoriesIcon } from '../icons';
import { Brand } from '@/lib/types/types';

interface FiltersProps {
  //   brands?: Brand[];
  //   selectedBrands?: string[];
  //   onBrandCheckboxChange?: (brandId: string) => void;
  //   minPrice?: string;
  //   maxPrice?: string;
  //   onPriceChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filters: React.FC = () => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(true);
  const [brandOpen, setBrandOpen] = useState<boolean>(true);

  return (
    <div className={styles.filters}>
      <div className="hidden laptop:flex laptop:flex-row laptop:justify-between laptop:w-full ">
        <p className={styles.hero}>Фільтри</p>
        <span
          className={styles.arrowIcon}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? (
            <ArrowCatalogIcon rotation={270} />
          ) : (
            <ArrowCatalogIcon rotation={90} />
          )}
        </span>
      </div>

      {filtersOpen && (
        <div className={styles.filterItem}>
          <PriceSlider />
          <div className={styles.filterItem}>
            <div
              className={styles.filterHeader}
              onClick={() => setBrandOpen(!brandOpen)}
            >
              <span>Виробник</span>
              <span className={styles.arrowIcon}>
                {brandOpen ? (
                  <ArrowCatalogIcon rotation={270} />
                ) : (
                  <ArrowCatalogIcon rotation={90} />
                )}
              </span>
            </div>
            {brandOpen && <BrandsFilter />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
