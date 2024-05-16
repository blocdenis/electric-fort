import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

function Text({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <p className={classNames(' text-base mb-5', className)}>{children}</p>;
}

export default Text;
