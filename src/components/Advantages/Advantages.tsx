import React from 'react';
import styles from './Advantages.module.scss';
import {
  AdvantagesIconDiscounts,
  AdvantagesIconFast,
  AdvantagesIconIndividual,
  AdvantagesIconOfficial,
  AdvantagesIconPrices,
  AdvantagesIconStorage,
} from '../icons';
const Advantages = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.advantages}>Наши переваги</div>
      <div className={styles.cards_wrapper}>
        <div className={styles.container}>
          <div className={styles.item}>
            <AdvantagesIconStorage
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
          <div className={styles.item}>
            <AdvantagesIconIndividual
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
          <div className={styles.item}>
            <AdvantagesIconFast
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.item}>
            <AdvantagesIconPrices
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
          <div className={styles.item}>
            <AdvantagesIconOfficial
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
          <div className={styles.item}>
            <AdvantagesIconDiscounts
              style={{ position: 'absolute', zIndex: '999' }}
            />
            <div className={styles.blurry_ellipse_yellow}> </div>
            <div className={styles.blurry_ellipse_green}> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
