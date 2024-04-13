import React from 'react';
import { CatalogIcon } from '../icons';
import styles from './Navigation.module.scss';

function Catalog() {
  return (
    <div className={styles.catalog}>
      <CatalogIcon />
      <p>Каталог</p>
    </div>
  );
}

export default Catalog;
