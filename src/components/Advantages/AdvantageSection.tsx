// AdvantagesSection.tsx
import React, { ReactNode } from 'react';
import styles from './Advantages.module.scss';
import SectionTitle from '../Section/SectionTitle/SectionTitle';

interface AdvantagesSectionProps {
  title: string;
  children?: ReactNode;
}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({
  children,
  title,
}) => {
  return (
    <div className={styles.section_desktop_wrapper}>
      <div className={styles.advantages}>{title}</div>
      <SectionTitle title={title} />
      {children}
    </div>
  );
};

export default AdvantagesSection;
