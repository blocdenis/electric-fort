import React from 'react';
import styles from './Navigation.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

interface NavigationItemProps {
  title: string;
  href: string;
  accent: boolean;
}

function NavigationItem({ title, href, accent }: NavigationItemProps) {
  return (
    <li
      className={classNames(styles.menu_item, {
        [styles.menu_item__accent]: accent,
      })}
    >
      <Link href={href}>{title}</Link>
    </li>
  );
}

export default NavigationItem;
