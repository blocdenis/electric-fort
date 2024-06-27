import React, { useState } from 'react';
import styles from './Filters.module.scss';
import CustomCheckbox from './CustomCheckbox';

const BrandsFilter: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = ['Brand1', 'Schneider Electric', 'Brand3', 'Brand4'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
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
          .filter((brand) => brand.toLowerCase().includes(search.toLowerCase()))
          .map((brand) => (
            <label key={brand} className={styles.brandItem}>
              <CustomCheckbox
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
      </div>
    </div>
  );
};

export default BrandsFilter;
