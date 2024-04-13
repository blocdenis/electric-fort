import React from 'react';
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
        <h3>Клієнтам</h3>
        <p>
          <Link href="/delivery">Доставка і оплата</Link>
        </p>
        <p>
          <Link href="/return_policy">Повернення та обмін</Link>
        </p>
        <p>Публічна оферта</p>
        <p>Політика конфеденційності</p>
        <p>Програма лояльності</p>
        <p>Співпраця з партнерами</p>
        <p>
          <Link href="/cooperation">Співпраця</Link>
        </p>
      </div>
      <div className={styles.block}>
        <h3>Способи оплати:</h3>
        <PaymentMethods />
      </div>
    </footer>
  );
};

export default Footer;
