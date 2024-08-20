'use client';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import ContactText from '../Contact/ContactText/ContactText';
import { EnvelopeIcon, InstagramIcon, TikTokIcon } from '../icons';
import ContactContent from '../Contact/ContactContent/ContactContent';
import PaymentMethods from '../PaymentMethods/PaymentMethods';
import Map from '../Map/Map';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import LogoIcon from '../icons/LogoIcon';
import Container from '../Container/Container';
import SupportButton from '../SupportButton/SupportButton';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <footer className={styles.footer_wrapper}>
      <Container>
        <div className={styles.footer}>
          <div className={styles.block1}>
            <div className={styles.logo_wrapper}>
              <Link href="/">
                <LogoIcon className="[&_path]:fill-black" />
              </Link>
            </div>
            <Map className="h-[157px] w-[343px] tablet:h-[183px] tablet:w-[304px] bg-gray-100" />
          </div>
          <div className={styles.block2}>
            <h3 id="contacts">{t('contacts')}</h3>
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
              <h3>{t('customers')}</h3>
              <button className={styles.menu_toggle} onClick={toggleMenu}>
                +
              </button>
            </div>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
              <ul>
                <li>
                  <Link href="/delivery">{t('deliveryPayment')}</Link>
                </li>
                <li>
                  <Link href="/return_policy">{t('returnPolicy')}</Link>
                </li>
                <li>
                  <Link href="/oferta">{t('publicOffer')}</Link>
                </li>
                <li>
                  <Link href="/policy">{t('privacyPolicy')}</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.block4}>
            <h3>{t('paymentMethods')}</h3>
            <PaymentMethods />
          </div>
        </div>
      </Container>
      <div className={styles.bottomBar}>
        <h4>
          © 2024 <br />
          {t('allRightsReserved')}
        </h4>
        <ScrollToTopButton />
      </div>
      <SupportButton />
    </footer>
  );
};

export default Footer;
