'use client';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import {
  EnvelopeIcon,
  InstagramIcon,
  LocationIcon,
  TikTokIcon,
} from '../icons';
import ContactContent from '../Contact/ContactContent/ContactContent';
import PaymentMethods from '../PaymentMethods/PaymentMethods';
import Brand from '../Brand/Brand';
import Map from '../Map/Map';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('toggled' + isMenuOpen);
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.block}>
        <Brand />
        <Map />
      </div>
      <div className={styles.block}>
        <h3>Контакти</h3>
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
            <li>Публічна оферта</li>
            <li>Програма лояльності</li>
            <li>Політика конфеденційності</li>
            <li>Співпраця з партнерами</li>
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
    </footer>
  );
};

export default Footer;
