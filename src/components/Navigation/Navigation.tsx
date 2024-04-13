import Link from 'next/link';
import { CatalogIcon } from '../icons';
import styles from './Navigation.module.scss';
import classNames from 'classnames';

function Navigation() {
  return (
    <div className={styles.navigation}>
      <div className={styles.catalog}>
        <CatalogIcon />
        <p>Каталог</p>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menu_list}>
          <li className={styles.menu_item}>
            <Link href="/about_us">Про нас</Link>
          </li>
          <li className={styles.menu_item}>
            <Link href="/delivery">Доставка і оплата</Link>
          </li>
          <li className={styles.menu_item}>
            <Link href="/return_policy">Повернення та обмін</Link>
          </li>
          <li className={styles.menu_item}>
            <Link href="#">Контакти</Link>
          </li>
          <li
            className={classNames(styles.menu_item, styles.menu_item__accent)}
          >
            <Link href="/cooperation">Співпраця</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
