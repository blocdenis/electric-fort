import React from 'react';
import PassIcon from '../icons/PassIcon';
import CartIconDelivery from '../icons/CartIconDelivery';
import TruckIcon from '../icons/TruckIcon';
import CashIcon from '../icons/CashIcon';
import GeoIcon from '../icons/GeoIcon';
import styles from './Delivery.module.scss';

function DeliveryStagesSection() {
  return (
    <section className={styles.delivery_stages}>
      <h2 className={styles.delivery_text_title}>Як це працює?</h2>
      <ul className={styles.delivery_stages_list}>
        <li className={styles.delivery_stages_item}>
          <div>
            <CartIconDelivery width={46} height={46} />
          </div>
          <p className=" text-center items-center">Обрати товар</p>
        </li>
        <li className={styles.delivery_stages_item}>
          <div>
            <PassIcon width={46} height={46} />
          </div>
          <p className=" text-center">Вказати дані для відправки</p>
        </li>
        <li className={styles.delivery_stages_item}>
          <div>
            <TruckIcon />
          </div>
          <p className=" text-center">Обрати спосіб доставки</p>
        </li>
        <li className={styles.delivery_stages_item}>
          <div>
            <CashIcon />
          </div>
          <p className=" text-center">Обрати спосіб оплати</p>
        </li>
        <li className={styles.delivery_stages_item}>
          <div>
            <GeoIcon />
          </div>
          <p className=" text-center">Отримати замовлення</p>
        </li>
      </ul>
    </section>
  );
}

export default DeliveryStagesSection;
