'use client';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import { EnvelopeIcon, InstagramIcon, TikTokIcon } from '../icons';
import ContactContent from '../Contact/ContactContent/ContactContent';
import PaymentMethods from '../PaymentMethods/PaymentMethods';
import Brand from '../Brand/Brand';
import Map from '../Map/Map';
import Link from 'next/link';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import LogoIcon from '../icons/LogoIcon';
import Container from '../Container/Container';

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('toggled' + isMenuOpen);
  };
  return (
    <footer className={styles.footer_wrapper}>
      <Container>
        <div className={styles.footer}>
          <div className={styles.block1}>
            <div className={styles.logo_wrapper}>
              {/* <Brand /> */}
              <Link href="/">
                <LogoIcon className="[&_path]:fill-black" />
              </Link>
            </div>
            <Map className="h-[157px] w-[343px] tablet:h-[183px] tablet:w-[304px] bg-gray-100" />
          </div>
          <div className={styles.block2}>
            <h3 id="contacts">Контакти</h3>
            <ContactText textToCopy="+38(066) 459-88-87" color="black" />
            <ContactText textToCopy="+38(068) 459-88-87" color="black" />
            <ContactContent color="black" />
            <div className={styles.container_icons}>
              <TikTokIcon
                href="https://www.tiktok.com/@electrychna_fortec?_t=8jWQfj7DEsH&_r=1"
                color="black"
                target="_blank"
              />
              <InstagramIcon
                href="https://www.instagram.com/electrychna_fortecia/"
                color="black"
                target="_blank"
              />
            </div>
          </div>
          <div className={styles.block3}>
            <div className={styles.s}>
              <h3>Клієнтам</h3>
              <button className={styles.menu_toggle} onClick={toggleMenu}>
                +
              </button>
            </div>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
              <ul>
                <li>
                  <Link href="/delivery">Доставка і оплата</Link>
                </li>

                <li>
                  <Link href="/return_policy">Повернення та обмін</Link>
                </li>
                <li>
                  <Link href="/oferta">Публічна оферта</Link>
                </li>
                <li>
                  <Link href="/policy">Політика конфіденційності</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.block4}>
            <h3>Способи оплати:</h3>
            <PaymentMethods />
          </div>
        </div>
      </Container>
      <div className={styles.bottomBar}>
        <h4>
          © 2024 <br />
          Інтернет-магазин електротоварів Всі права захищені{' '}
        </h4>
        <ScrollToTopButton />
      </div>
    </footer>
  );
};

export default Footer;
