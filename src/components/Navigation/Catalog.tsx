import React from 'react';
import { CatalogIcon } from '../icons';
import styles from './Navigation.module.scss';

interface CatalogProps {
  onClick?: () => void;
}

function Catalog({ onClick }: CatalogProps) {
  return (
    <div className={styles.catalog} onClick={onClick}>
      <CatalogIcon />
      <p className=" cursor-pointer">Каталог</p>
    </div>
  );
}

export default Catalog;
