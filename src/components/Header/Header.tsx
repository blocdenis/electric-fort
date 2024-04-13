import React from 'react';
import {
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
import Brand from '../Brand/Brand';
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container_top}>
        <div className={styles.content}>
          <div className={styles.container_icons}>
            <TikTokIcon href="https://www.tiktok.com/" color="#ADFE35" />
            <InstagramIcon href="https://www.instagram.com" color="#ADFE35" />
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
            <h1>Увійти</h1>
          </div>
        </div>
      </div>
      <div className={styles.container_bot}>
        <Brand />
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
    </div>
  );
};

export default Header;
