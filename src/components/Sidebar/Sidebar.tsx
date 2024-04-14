import React, { PropsWithChildren } from 'react';
import styles from './Sidebar.module.scss';

function Sidebar({ children }: PropsWithChildren) {
  return (
    <aside className={styles.sidebar}>
      <h2>Sidebar</h2>
      {children}
    </aside>
  );
}

export default Sidebar;
