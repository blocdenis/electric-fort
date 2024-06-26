'use client';
import React, { useState } from 'react';
import {
  BurgerIcon,
  CartIcon,
  HeartIcon,
  InstagramIcon,
  MainLogo,
  PhoneIcon,
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

const Header = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  const { openCloseFavorites, favoritesQuantity } = useFavorites();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<'UA' | 'RU'>('UA');

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
    <header className="bg-backgroung">
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
                  <button onClick={openModal}>
                    <h1>Увійти</h1>
                  </button>
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
                <ContactText />
                <ContactText />
              </div>
              <SearchInput placeholder="Пошук" />
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
      <Navigation />
      <Backdrop
        isOpen={isMenuOpen}
        onClick={handleMenuToggle}
        className=" bg-backdrop_green lg:hidden"
      >
        <BurgerMenu isOpen={isMenuOpen} onCloseClick={handleMenuToggle} />
      </Backdrop>
      {isAuthOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
