// AdvantagesList.tsx
import React, { ReactNode } from 'react';
import styles from './Advantages.module.scss';

interface AdvantagesListProps {
  children?: ReactNode;
}

const AdvantagesList: React.FC<AdvantagesListProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AdvantagesList;
