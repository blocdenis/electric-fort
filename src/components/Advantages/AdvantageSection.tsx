// AdvantagesSection.tsx
import React, { ReactNode } from 'react';
import styles from './Advantages.module.scss';

interface AdvantagesSectionProps {
  title: string;
  children?: ReactNode;
}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.advantages}>
      <h2>{title}</h2>
      <div className={styles.cards_wrapper}>{children}</div>
    </div>
  );
};

export default AdvantagesSection;
