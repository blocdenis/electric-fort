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

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.block}>
        <h3>Карта</h3>
        {/* Здесь может быть ваше содержимое для блока "Карта" */}
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
        <p>Доставка і оплата</p>
        <p>Повернення та обмін</p>
        <p>Публічна оферта</p>
        <p>Політика конфеденційності</p>
        <p>Програма лояльності</p>
        <p>Співпраця з партнерами</p>
        <p>Співпраця</p>
      </div>
      <div className={styles.block}>
        <h3>Способи оплати</h3>
        {/* Здесь может быть ваше содержимое для блока "Способы оплаты" */}
      </div>
    </footer>
  );
};

export default Footer;
