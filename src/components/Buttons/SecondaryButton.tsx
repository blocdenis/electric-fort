import React, { ButtonHTMLAttributes } from 'react';
import styles from './SecondaryButton.module.scss';
import classNames from 'classnames';

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

function SecondaryButton({ children, className }: SecondaryButtonProps) {
  return (
    <button className={classNames(styles.button, className)}>{children}</button>
  );
}

export default SecondaryButton;
