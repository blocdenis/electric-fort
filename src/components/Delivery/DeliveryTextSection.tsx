import React, { PropsWithChildren } from 'react';
import styles from './Delivery.module.scss';

function DeliveryTextSection({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <div className={styles.delivery_text_section}>
      <h2 className={styles.delivery_text_title}>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export default DeliveryTextSection;
