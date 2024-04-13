'use client';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Catalog from './Catalog';

function Navigation() {
  return (
    <div className={styles.navigation_catalog_container}>
      <Catalog />
      <div className={styles.navigation}>
        <div className={styles.navigation_container}>
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
                className={classNames(
                  styles.menu_item,
                  styles.menu_item__accent
                )}
              >
                <Link href="/cooperation">Співпраця</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <BurgerMenu isOpen={true} onCloseClick={() => console.log('close')} />
    </div>
  );
}

export default Navigation;
