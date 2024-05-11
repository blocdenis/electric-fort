import React, { PropsWithChildren } from 'react';
import styles from './Container.module.scss';
import classNames from 'classnames';

function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

export default Container;
