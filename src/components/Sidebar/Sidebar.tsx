import React, { PropsWithChildren } from 'react';
import styles from './Sidebar.module.scss';

function Sidebar({ children }: PropsWithChildren) {
  return <aside className={styles.sidebar}>{children}</aside>;
}

export default Sidebar;
