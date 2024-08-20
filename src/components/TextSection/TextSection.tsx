'use client';
import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import styles from './TextSection.module.scss';
import { useTranslations } from 'next-intl';

const TextSection = () => {
  const t = useTranslations('textSection');

  const products: string[] = t('products').split(';');

  return (
    <Section>
      <SectionTitle title={t('title')} />
      <div className={styles.text_wrapper}>
        <p className={styles.heading2}>
          <span className={styles.heading1}>{t('title')}</span> - {t('intro')}
        </p>
        <br />
        <p className={styles.heading2}>
          <span className={styles.heading1}>{t('productIntro')}</span>
        </p>
        <ol className={styles.heading2}>
          {products.map((product, index) => (
            <li key={index}>{product.trim()}</li>
          ))}
        </ol>
        <br />
        <span className={styles.heading1}>{t('callToAction')}</span>
      </div>
    </Section>
  );
};

export default TextSection;
