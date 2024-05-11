'use client';
import styles from './Navigation.module.scss';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Catalog from './Catalog';
import NavigationItem from './NavigationItem';
import { useEffect, useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import CatalogList from './CatalogList';
import Container from '../Container/Container';

export const navigationItems = [
  { id: '1', title: 'Про нас', href: '/about_us' },
  { id: '2', title: 'Доставка і оплата', href: '/delivery' },
  { id: '3', title: 'Повернення та обмін', href: '/return_policy' },
  { id: '4', title: 'Контакти', href: '#' },
  { id: '5', title: 'Співпраця', href: '/cooperation' },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCloseMenu = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  return (
    <div className={styles.navigation_catalog_container}>
      <Container className=" relative">
        <Catalog onClick={handleOpenCloseMenu} />
        <div className={styles.navigation}>
          <div className={styles.navigation_container}>
            <nav className={styles.menu}>
              <ul className={styles.menu_list}>
                {navigationItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    title={item.title}
                    href={item.href}
                    accent={item.href == '/cooperation'}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
        {isOpen ? (
          <div className={styles.mobile_catalog_container}>
            <CatalogList />
          </div>
        ) : null}
      </Container>
    </div>
  );
}

export default Navigation;
