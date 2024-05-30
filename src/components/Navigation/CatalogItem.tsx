'use client';
import React, { useState } from 'react';
import { ArrowCatalogIcon } from '../icons';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { Brand, Category } from '@/lib/db/types';

interface catalogItemProps {
  category: Category;
  brands: Brand[];
}

function CatalogItem({ category, brands }: catalogItemProps) {
  const { id, name } = category;
  const categoryBrands = brands.filter((brand) => brand.category_id === id);
  const [isClicked, setIsClicked] = useState(false);
  const handleArrowClick = () => {
    setIsClicked((prevState) => !prevState);
  };
  return (
    <div className={styles.category}>
      <div className={styles.category_item}>
        <Link href={`/categories/${name}`}>{name}</Link>
        {categoryBrands.length ? (
          <button onClick={handleArrowClick} id="arrowBtn">
            <ArrowCatalogIcon />
          </button>
        ) : null}
      </div>
      {categoryBrands.length ? (
        <>
          <div
            id="subcategory-wrapper"
            className={classNames(styles.subcategory, {
              [styles.open]: isClicked,
            })}
          >
            <ul>
              {categoryBrands.map((item) => (
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
