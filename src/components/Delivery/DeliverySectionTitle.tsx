import classNames from 'classnames';
import { PropsWithChildren } from 'react';

function DeliverySectionTitle({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={classNames(
        ' text-lg font-bold mt-[42px] text-center',
        className
      )}
    >
      {children}
    </h2>
  );
}

export default DeliverySectionTitle;
