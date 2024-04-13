import React from 'react';
import { MasterCardIcon, VisaIcon } from '../icons';
import styles from './PaymentMethods.module.scss';
const PaymentMethods = () => {
  return (
    <div className={styles.container}>
      <VisaIcon />
      <MasterCardIcon />
    </div>
  );
};

export default PaymentMethods;
