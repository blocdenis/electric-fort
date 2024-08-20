'use client';
import React from 'react';
import styles from './Advantages.module.scss';
import AdvantagesSection from './AdvantageSection';
import AdvantageCard from './AdvantageCard';
import {
  AdvantagesIconDiscounts,
  AdvantagesIconFast,
  AdvantagesIconIndividual,
  AdvantagesIconOfficial,
  AdvantagesIconPrices,
  AdvantagesIconStorage,
} from '../icons';

import useMediaQuery from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';

const Advantages: React.FC = () => {
  const t = useTranslations('advantages');
  const isAboveMediumScreens = useMediaQuery('(min-width:768px)');

  return (
    <div>
      <div className={styles.wrapper_desktop}>
        <AdvantagesSection title={t('title')}>
          <div className={styles.cards_wrapper}>
            <AdvantageCard icon={AdvantagesIconStorage} text={t('storage')} />
            <AdvantageCard
              icon={AdvantagesIconIndividual}
              text={t('individual')}
            />
            <AdvantageCard
              icon={AdvantagesIconFast}
              text={t('fastProcessing')}
            />
            <AdvantageCard
              icon={AdvantagesIconPrices}
              text={t('wholesalePrices')}
            />
            <AdvantageCard
              icon={AdvantagesIconOfficial}
              text={t('officialRepresentative')}
            />
            <AdvantageCard
              icon={AdvantagesIconDiscounts}
              text={t('additionalDiscounts')}
            />
          </div>
        </AdvantagesSection>
      </div>
    </div>
  );
};

export default Advantages;
