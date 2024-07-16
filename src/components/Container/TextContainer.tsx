import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

function TextContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={classNames(
        'pt-0 pb-6  pl-4 pr-4 laptop:pb-10 laptop:pl-6  laptop:pr-[42px]',
        className
      )}
    >
      {children}
    </div>
  );
}

export default TextContainer;
