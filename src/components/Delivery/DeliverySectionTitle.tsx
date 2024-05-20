import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './Delivery.module.scss';

function DeliverySectionTitle({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={classNames(styles.delivery_title, className)}>{children}</h2>
  );
}

export default DeliverySectionTitle;
