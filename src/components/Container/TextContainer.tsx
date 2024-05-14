import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

function TextContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('pt-0 pb-10 pl-6 pr-[42px]', className)}>
      {children}
    </div>
  );
}

export default TextContainer;
