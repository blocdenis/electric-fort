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
const advantagesData = [
  {
    icon: AdvantagesIconStorage,
    text: 'Власний склад та найбільший асортимент',
  },
  { icon: AdvantagesIconIndividual, text: 'Індивідуальний підхід' },
  { icon: AdvantagesIconFast, text: 'Швидка обробка замовлень' },
  { icon: AdvantagesIconPrices, text: 'Оптові ціни' },
  {
    icon: AdvantagesIconOfficial,
    text: 'Офіційний представник провідних виробників електричної продукції',
  },
  { icon: AdvantagesIconDiscounts, text: 'Додаткові знижки для електриків' },
];

const Advantages: React.FC = () => {
  return (
    // <div className={styles.wrapper}>
    //   <AdvantagesSection title="Наші переваги">
    //     <AdvantagesList>
    //       <AdvantageCard
    //         icon={AdvantagesIconStorage}
    //         text="Власний склад та найбільший асортимент"
    //       />
    //       <AdvantageCard
    //         icon={AdvantagesIconIndividual}
    //         text="Індивідуальний підхід"
    //       />
    //       <AdvantageCard
    //         icon={AdvantagesIconFast}
    //         text="Швидка обробка замовлень"
    //       />
    //     </AdvantagesList>
    //     <AdvantagesList>
    //       <AdvantageCard icon={AdvantagesIconPrices} text="Оптові ціни" />
    //       <AdvantageCard
    //         icon={AdvantagesIconOfficial}
    //         text="Офіційний представник провідних виробників електричної продукції"
    //       />
    //       <AdvantageCard
    //         icon={AdvantagesIconDiscounts}
    //         text="Додаткові знижки для електриків"
    //       />
    //     </AdvantagesList>
    //   </AdvantagesSection>
    // </div>
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default Advantages;
