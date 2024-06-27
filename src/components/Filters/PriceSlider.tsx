import React, { useState } from 'react';
import styles from './Filters.module.scss';

const PriceSlider: React.FC = () => {
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  return (
    <div className={styles.priceSlider}>
      <span>Ціна</span>
      <div className={styles.inputs}>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="От"
          className={styles.inputNumber}
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="До"
          className={styles.inputNumber}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
