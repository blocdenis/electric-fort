import React from 'react';
import Section from '../Section/Section';
import SectionTitle from '../Section/SectionTitle/SectionTitle';
import styles from './TextSection.module.scss';
const TextSection = () => {
  return (
    <Section>
      <SectionTitle title={'Інтернет магазин “Electrychna Fortecia”'} />
      <div className={styles.text_wrapper}>
        <p className={styles.heading2}>
          <span className={styles.heading1}>
            Інтернет магазин “Electrychna Fortecia”
          </span>
          - місце, де кожен може підібрати електротовари для дому, квартири та
          інших завдань за доступною ціною. Продукція повністю задовольняє
          запити клієнтів.
          <br />
          <br />
          Ми гарантуємо європейську якість, відмінне обслуговування з
          професійним консультуванням. Співробітники завжди готові вислухати і
          прийти на допомогу у виборі правильних товарів під конкретні завдання.
        </p>
        <br />

        <p className={styles.heading2}>
          <span className={styles.heading1}>Електротехнічна продукція </span>
          представлена широким асортиментом, серед якого:
        </p>
        <ol className={styles.heading2}>
          <li>LED – Освітлення.</li>
          <li>Освітлення.</li>
          <li>Автоматика та захисне обладнання.</li>
          <li>
            Інтернет магазин акумуляторів і батарейок у великій кількості,
            будь-якого типу.
          </li>
          <li>Вентиляція.</li>
          <li>Вимикачі та розетки.</li>
          <li>Зарядні станції для електромобілів.</li>
          <li>Вироби для монтажу.</li>
          <li>Кабель, дріт.</li>
          <li>Подовжувачі, колодки, вилки та роз’єми.</li>
          <li>Щити розподільні.</li>
        </ol>
        <br />
        <span className={styles.heading1}>
          Телефонуйте і робіть замовлення вже сьогодні.
        </span>
      </div>
    </Section>
  );
};

export default TextSection;
