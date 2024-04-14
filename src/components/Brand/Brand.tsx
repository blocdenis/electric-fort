import React from 'react';
import { MainLogo } from '../icons';
import styles from './Brand.module.scss';
const Brand = () => {
  return (
    <div className={styles.container_logo}>
      <MainLogo />
      <h2>
        Електрична<span>фортеця</span>
      </h2>
    </div>
  );
};

export default Brand;
