// AdvantageCard.tsx
import React, { ReactNode } from 'react';
import styles from './Advantages.module.scss';

interface AdvantageCardProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  children?: ReactNode;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({
  icon: Icon,
  text,
  children,
}) => {
  return (
    <div className={styles.item}>
      {/* <Icon style={{ position: 'absolute', zIndex: '999' }} /> */}
      <Icon />
      <p className={styles.text}>{text}</p>
      {children}
    </div>
  );
};

export default AdvantageCard;
