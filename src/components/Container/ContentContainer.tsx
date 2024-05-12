import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './Container.module.scss';

function ContentContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames(styles.content_container, className)}>
      {children}
    </div>
  );
}

export default ContentContainer;
