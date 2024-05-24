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
          <div className={styles.block}>
            <div className={styles.logo_wrapper}>
              {/* <Brand /> */}
              <Link href="/">
                <LogoIcon className="[&_path]:fill-black" />
              </Link>
            </div>
            <Map />
          </div>
          <div className={styles.block}>
            <h3 id="contacts">Контакти</h3>
            <ContactText color="black" />
            <ContactText color="black" />
            <ContactContent color="black" />
            <div className={styles.container_icons}>
              <TikTokIcon href={''} color="black" />
              <InstagramIcon href={''} color="black" />
            </div>
          </div>
          <div className={styles.block}>
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
                  <Link href="/programa_loyalnosti">Програма лояльності</Link>
                </li>
                <li>
                  <Link href="/policy">Політика конфіденційності</Link>
                </li>
                <li>
                  <Link href="/cooperation">Співпраця</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.block}>
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
