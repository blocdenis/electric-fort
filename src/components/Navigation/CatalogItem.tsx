import React from 'react';
import { ArrowCatalogIcon } from '../icons';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Navigation.module.scss';

type Category = {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
};

interface catalogItemProps {
  category: Category;
}

function CatalogItem({ category }: catalogItemProps) {
  const { id, name, subcategories } = category;
  return (
    <div className={styles.category}>
      <Link href={`/${id}`} className={styles.category_item}>
        {name}
        <ArrowCatalogIcon />
      </Link>
      {category.subcategories ? (
        <div className={styles.subcategory}>
          <ul>
            {subcategories?.map((item) => (
              <li key={item.id}>
                <Link href={`/${item.name}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default CatalogItem;
