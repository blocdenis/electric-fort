'use client';
// Advantages.tsx
import React from 'react';
import styles from './Advantages.module.scss';
import AdvantagesSection from './AdvantageSection';
import AdvantagesList from './AdvantageList';
import AdvantageCard from './AdvantageCard';
import {
  AdvantagesIconDiscounts,
  AdvantagesIconFast,
  AdvantagesIconIndividual,
  AdvantagesIconOfficial,
  AdvantagesIconPrices,
  AdvantagesIconStorage,
} from '../icons';
import useMediaQuery from '@/services/useMediaQuery';
import { advantagesData } from '@/lib/db/advantagesData';

const Advantages: React.FC = () => {
  const isAboveMediumScreeens = useMediaQuery('(min-width:769px)');
  return (
    <div>
      <div className={styles.wrapper_mobile}>
        <AdvantagesSection title={'Нашi переваги'}>
          <div className={styles.cards_wrapper}>
            <AdvantageCard
              icon={AdvantagesIconStorage}
              text="Власний склад та найбільший асортимент"
            />
            <AdvantageCard
              icon={AdvantagesIconIndividual}
              text="Індивідуальний підхід"
            />
            <AdvantageCard
              icon={AdvantagesIconFast}
              text="Швидка обробка замовлень"
            />

            <AdvantageCard icon={AdvantagesIconPrices} text="Оптові ціни" />
            <AdvantageCard
              icon={AdvantagesIconOfficial}
              text="Офіційний представник провідних виробників електричної продукції"
            />
            <AdvantageCard
              icon={AdvantagesIconDiscounts}
              text="Додаткові знижки для електриків"
            />
          </div>
        </AdvantagesSection>
      </div>
      {isAboveMediumScreeens && (
        <section className={styles.wrapper_desktop}>
          <AdvantagesSection title="Наші переваги">
            <AdvantagesList>
              {advantagesData.slice(0, 3).map(({ icon, text }) => (
                <AdvantageCard icon={icon} text={text} key={text} />
              ))}
            </AdvantagesList>
            <AdvantagesList>
              {advantagesData.slice(3).map(({ icon, text }) => (
                <AdvantageCard icon={icon} text={text} key={text} />
              ))}
            </AdvantagesList>
          </AdvantagesSection>
        </section>
      )}
    </div>
  );
};

export default Advantages;
