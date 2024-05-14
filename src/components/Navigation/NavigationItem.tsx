'use client';
import React from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

interface NavigationItemProps {
  title: string;
  href: string;
  accent?: boolean;
  onClick?: () => void;
}

function NavigationItem({ title, href, accent, onClick }: NavigationItemProps) {
  const pathname = usePathname();
  return (
    <li
      onClick={onClick}
      className={classNames(
        styles.menu_item
        // {
        //   [styles.menu_item__accent]: accent,
        // },
        // { [styles.menu_item__active]: pathname === href }
      )}
    >
      <Link href={href}>{title}</Link>
    </li>
  );
}

export default NavigationItem;
