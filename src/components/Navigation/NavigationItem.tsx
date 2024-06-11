'use client';
import React from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

interface NavigationItemProps {
  title: string;
  href?: string;
  accent?: boolean;
  onClick?: () => void;
  subitems?: { title: string; href: string }[];
}

function NavigationItem({
  title,
  href,
  accent,
  onClick,
  subitems,
}: NavigationItemProps) {
  const pathname = usePathname();
  return (
    <li
      onClick={onClick}
      className={classNames(
        styles.menu_item,
        {
          [styles.menu_item__accent]: accent,
        },
        { [styles.menu_item__active]: pathname === href }
      )}
    >
      {href ? (
        <Link href={href}>{title}</Link>
      ) : (
        <div className=" cursor-pointer">{title}</div>
      )}
      {subitems ? (
        <ul className={styles.menu_subitems_list}>
          {subitems.map((item) => (
            <li className={styles.menu_subitem} key={item.title}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default NavigationItem;
