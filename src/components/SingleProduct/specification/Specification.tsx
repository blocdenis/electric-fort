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
    // <div className={styles.specification}>
    <>
      {items.map((item, index) => (
        <div key={index} className={styles.specificationItem}>
          <p className={styles.characteristic}>{item.characteristic}</p>
          <span className={styles.underline}></span>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </>

    //  </div>
  );
};

export default Specification;
