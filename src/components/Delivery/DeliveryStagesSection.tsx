import { useTranslations } from 'next-intl';
import React from 'react';
import PassIcon from '../icons/PassIcon';
import CartIconDelivery from '../icons/CartIconDelivery';
import TruckIcon from '../icons/TruckIcon';
import CashIcon from '../icons/CashIcon';
import GeoIcon from '../icons/GeoIcon';
import styles from './Delivery.module.scss';

function DeliveryStagesSection() {
  const t = useTranslations('Delivery');

  const steps = t('steps').split(';');

  return (
    <section className={styles.delivery_stages}>
      <h2 className={styles.delivery_text_title}>{t('how_it_works')}</h2>
      <ul className={styles.delivery_stages_list}>
        {steps.map((step, index) => (
          <li key={index} className={styles.delivery_stages_item}>
            <div>
              {index === 0 && <CartIconDelivery width={46} height={46} />}
              {index === 1 && <PassIcon width={46} height={46} />}
              {index === 2 && <TruckIcon />}
              {index === 3 && <CashIcon />}
              {index === 4 && <GeoIcon />}
            </div>
            <p className="text-center">{step}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DeliveryStagesSection;
