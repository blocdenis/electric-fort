import React from 'react';
import PassIcon from '../icons/PassIcon';
import CartIconDelivery from '../icons/CartIconDelivery';
import TruckIcon from '../icons/TruckIcon';
import CashIcon from '../icons/CashIcon';
import GeoIcon from '../icons/GeoIcon';
import styles from './Delivery.module.scss';

function DeliveryStagesSection() {
  return (
    <div className={styles.delivery_stages}>
      <div className={styles.delivery_stages_item}>
        <div>
          <CartIconDelivery width={46} height={46} />
        </div>
        <p className=" text-center items-center">Обрати товар</p>
      </div>
      <div className={styles.delivery_stages_item}>
        <div>
          <PassIcon width={46} height={46} />
        </div>
        <p className=" text-center">Вказати дані для відправки</p>
      </div>
      <div className={styles.delivery_stages_item}>
        <div>
          <TruckIcon />
        </div>
        <p className=" text-center">Обрати спосіб доставки</p>
      </div>
      <div className={styles.delivery_stages_item}>
        <div>
          <CashIcon />
        </div>
        <p className=" text-center">Обрати спосіб оплати</p>
      </div>
      <div className={styles.delivery_stages_item}>
        <div>
          <GeoIcon />
        </div>
        <p className=" text-center">Отримати замовлення</p>
      </div>
    </div>
  );
}

export default DeliveryStagesSection;
