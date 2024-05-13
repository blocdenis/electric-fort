import React, { ButtonHTMLAttributes } from 'react';
import styles from './SecondaryButton.module.scss';
import classNames from 'classnames';

function SecondaryButton({
  children,
  className,
  onClick,
  type,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
