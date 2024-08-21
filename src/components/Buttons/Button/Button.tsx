import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

function Button({
  children,
  className,
  onClick,
  disabled,
  type,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
