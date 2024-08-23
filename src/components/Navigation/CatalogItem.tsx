'use client';
import React, { useState } from 'react';
import { ArrowCatalogIcon } from '../icons';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { Brand, Category } from '@/lib/types/types';
import { formatedString } from '@/lib/utils/formatString';

interface catalogItemProps {
  category: Category;
  brands: Brand[] | undefined;
  onItemClick: () => void;
}

function CatalogItem({ category, brands, onItemClick }: catalogItemProps) {
  const { id, name } = category;
  const categoryBrands = brands?.filter((brand) => brand.category_id === id);
  const [isClicked, setIsClicked] = useState(false);
  const handleArrowClick = () => {
    setIsClicked((prevState) => !prevState);
  };
  return (
    <div className={styles.category}>
      <div className={styles.category_item}>
        <Link onClick={onItemClick} href={`/categories/${id}`}>
          {formatedString(name)}
        </Link>
        {categoryBrands?.length ? (
          <button onClick={handleArrowClick} id="arrowBtn">
            <ArrowCatalogIcon />
          </button>
        ) : null}
      </div>
      {categoryBrands?.length ? (
        <>
          <div
            id="subcategory-wrapper"
            className={classNames(styles.subcategory, {
              [styles.open]: isClicked,
            })}
          >
            <ul>
              {categoryBrands.map((item) => (
                <li onClick={onItemClick} key={item.id}>
                  <Link href={`/categories/${id}/${item.id}`}>
                    {formatedString(item.name)}
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
