'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BurgerIcon,
  CartIcon,
  HeartIcon,
  InstagramIcon,
  MainLogo,
  PhoneIcon,
  ProfileIcon,
  TikTokIcon,
} from '../icons';
import styles from './Header.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import SearchInput from '../SearchInput/SearchInput';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';
import Backdrop from '../Backdrop/Backdrop';
import LogoIcon from '../icons/LogoIcon';
import Link from 'next/link';
import AuthModal from '../AuthModal/AuthModal';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import Container from '../Container/Container';
import { useFavorites } from '@/context/FavoritesContext';
import CircleWithQuantity from '../CircleWithQuantity/CircleWithQuantity';
import FilterIcon from '../icons/FilterIcon';
import Filters from '../Filters/Filters';
import { useParams, usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const params = useParams();
  const pathname = usePathname();

  const { category_id } = params;
  const isFiltersShown = category_id ? true : false;

  const { openCart, cartQuantity } = useShoppingCart();
  const { openCloseFavorites, favoritesQuantity } = useFavorites();
  const { isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'UA' | 'RU'>('UA');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#auth') {
      setIsAuthOpen(true);
    }
  }, [pathname]);

  const handleFiltersOpen = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleToggle = (language: 'UA' | 'RU') => {
    setActiveLanguage(language);
  };
  const openModal = () => {
    setIsAuthOpen(true);
  };

  const closeModal = () => {
    setIsAuthOpen(false);
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-backgroung sticky top-[-213px] z-[11] tablet:top-[-165px] laptop:top-0 ">
      <div className={styles.header}>
        <div className={styles.header_top}>
          <Container>
            <div className={styles.container_top}>
              <div className={styles.mobile_header}>
                <button onClick={handleMenuToggle}>
                  <BurgerIcon />
                </button>

                <button onClick={openCart} style={{ position: 'relative' }}>
                  <CartIcon />
                  {cartQuantity > 0 && (
                    <div
                      className="bg-yellow d-flex justify-content-center align-items-center"
                      style={{
                        color: 'white',
                        width: '25.5px',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        transform: 'translate(25%, -110%)',
                        borderRadius: '50%',
                      }}
                    >
                      {cartQuantity}
                    </div>
                  )}
                </button>
              </div>
              <div className={styles.content}>
                <div className={styles.container_icons}>
                  <TikTokIcon
                    href="https://www.tiktok.com/@electrychna_fortec?_t=8jWQfj7DEsH&_r=1"
                    color="#69af00"
                    target="_blank"
                  />
                  <InstagramIcon
                    href="https://www.instagram.com/electrychna_fortecia/"
                    color="#69af00"
                    target="_blank"
                  />
                </div>
                <div className={styles.container_lang}>
                  <button
                    className={`${styles.button} ${
                      activeLanguage === 'UA' ? styles.active : ''
                    }`}
                    onClick={() => handleToggle('UA')}
                  >
                    UA
                  </button>
                  <div className={styles.line}></div>
                  <button
                    className={`${styles.button} ${
                      activeLanguage === 'RU' ? styles.active : ''
                    }`}
                    onClick={() => handleToggle('RU')}
                  >
                    RU
                  </button>
                </div>
                <div>
                  {isAuthenticated ? (
                    <Link
                      href={'/user_profile'}
                      className=" hidden laptop:block"
                    >
                      <ProfileIcon className="w-[34px] h-[34px]" />
                    </Link>
                  ) : (
                    <button className="hidden laptop:block" onClick={openModal}>
                      <p>Увійти</p>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className={styles.container_bot}>
            <Link href="/">
              <LogoIcon />
            </Link>
            <div className={styles.container_search}>
              <div className={styles.container_contact}>
                <ContactText textToCopy="+38(066) 459-88-87" />
                <ContactText textToCopy="+38(068) 459-88-87" />
              </div>
              <div className=" w-full flex gap-4">
                <SearchInput placeholder="Пошук" />
                {isFiltersShown && (
                  <button
                    onClick={handleFiltersOpen}
                    className="w-[38px] h-[38px] laptop:hidden"
                  >
                    <FilterIcon
                      className={classNames(
                        {
                          ' bg-primary_green': isFiltersOpen,
                        },
                        'transition-all'
                      )}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.container_icons}>
              <button onClick={openCloseFavorites} className=" relative">
                <HeartIcon />
                {favoritesQuantity > 0 && (
                  <CircleWithQuantity quantity={favoritesQuantity} />
                )}
              </button>
              <button onClick={openCart} style={{ position: 'relative' }}>
                <CartIcon />
                {cartQuantity > 0 && (
                  <div
                    className="bg-yellow d-flex justify-content-center align-items-center"
                    style={{
                      color: 'white',
                      width: '25.5px',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      transform: 'translate(25%, -110%)',
                      borderRadius: '50%',
                    }}
                  >
                    {cartQuantity}
                  </div>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>
      {isFiltersShown && isFiltersOpen && (
        <div className=" laptop:hidden">
          <Filters />
        </div>
      )}
      <Navigation />
      <Backdrop
        isOpen={isMenuOpen}
        onClick={handleMenuToggle}
        className=" bg-backdrop_green lg:hidden"
      >
        <BurgerMenu isOpen={isMenuOpen} onCloseClick={handleMenuToggle} />
      </Backdrop>
      {isAuthOpen && (
        <AuthModal isRegistrationForm={false} id="auth" onClose={closeModal} />
      )}
    </header>
  );
};

export default Header;
