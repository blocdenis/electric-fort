import React, { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import HomeIcon from '../icons/HomeIcon';
import styles from './Breadcrumbs.module.scss';
import BreadcrumbsItem, { BreadcrambsItemProps } from './BreadcrumbsItem';

interface BreadCrumbProps {
  homeElement?: ReactNode;
  separator?: ReactNode;
  items: BreadcrambsItemProps[];
}

function Breadcrumbs({
  homeElement = <span className="pl-3">Головна</span>,
  separator = <span>/</span>,
  items,
}: BreadCrumbProps) {
  return (
    <div className={styles.outer_container}>
      <ul className={styles.container}>
        <li className={styles.item}>
          <Link className={styles.link} href={'/'}>
            <div className="flex items-center justify-center">
              <HomeIcon />
              {homeElement}
            </div>
          </Link>
        </li>
        {items.length > 0 && separator}
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <li className={styles.item}>
                <BreadcrumbsItem name={item.name} href={item.href} />
              </li>
              {index !== items.length - 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
