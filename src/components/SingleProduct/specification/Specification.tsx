import React from 'react';
import styles from './Specification.module.scss';

interface SpecificationItem {
  characteristic: string;
  description: string;
}

interface SpecificationProps {
  items: SpecificationItem[];
}

const Specification: React.FC<SpecificationProps> = ({ items }) => {
  return (
    <div className={styles.specification}>
      {items.map((item, index) => (
        <div key={index} className={styles.specificationItem}>
          <div className={styles.characteristic}>{item.characteristic}</div>
          <div className={styles.underline}></div>
          <div className={styles.description}>{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Specification;
