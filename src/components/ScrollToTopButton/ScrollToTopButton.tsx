import React from 'react';
import styles from './ScrollToTopButton.module.scss';
import { BackButton } from '../icons';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className={styles.button} onClick={scrollToTop}>
      <BackButton />
    </button>
  );
};

export default ScrollToTopButton;
