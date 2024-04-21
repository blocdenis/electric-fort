'use client';
import React, { MouseEventHandler, useState } from 'react';
import { ArrowCatalogIcon } from '../icons';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { Category } from '@/lib/db/types';

interface catalogItemProps {
  category: Category;
}

function CatalogItem({ category }: catalogItemProps) {
  const { id, name, subcategories } = category;
  const [isClicked, setIsClicked] = useState(false);
  const handleArrowClick = () => {
    setIsClicked((prevState) => !prevState);
  };
  return (
    <div className={styles.category}>
      <div className={styles.category_item}>
        <Link href={`/categories/${name}`}>{name}</Link>
        {subcategories ? (
          <button onClick={handleArrowClick} id="arrowBtn">
            <ArrowCatalogIcon />
          </button>
        ) : null}
      </div>
      {subcategories ? (
        <>
          <div
            id="subcategory-wrapper"
            className={classNames(styles.subcategory, {
              [styles.open]: isClicked,
            })}
          >
            <ul>
              {subcategories?.map((item) => (
                <li key={item.id}>
                  <Link href={`/categories/${name}/${item.name}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default CatalogItem;
