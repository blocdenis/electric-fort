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
import Container from '../Container/Container';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
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
    <header className=" bg-backgroung">
      <div className={styles.header}>
        <div className={styles.header_top}>
          <Container>
            <div className={styles.container_top}>
              <div className={styles.mobile_header}>
                <button onClick={handleMenuToggle}>
                  <BurgerIcon />
                </button>
                <CartIcon />
              </div>
              <div className={styles.content}>
                <div className={styles.container_icons}>
                  <TikTokIcon href="https://www.tiktok.com/" color="#ADFE35" />
                  <InstagramIcon
                    href="https://www.instagram.com"
                    color="#ADFE35"
                  />
                </div>
                <div className={styles.container_lang}>
                  <button>
                    <span>UA</span>
                  </button>
                  <div className={styles.line}></div>
                  <button>
                    <span>RU</span>
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
              <HeartIcon />
              <CartIcon />
            </div>
          </div>
        </Container>
      </div>
      <Navigation />
      <Backdrop isOpen={isMenuOpen} onClick={handleMenuToggle}>
        <BurgerMenu isOpen={isMenuOpen} onCloseClick={handleMenuToggle} />
      </Backdrop>
      {isAuthOpen && <AuthModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
