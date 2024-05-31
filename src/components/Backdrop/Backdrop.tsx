'use client';
import classNames from 'classnames';
import { useEffect, type PropsWithChildren } from 'react';

type BackdropProps = PropsWithChildren<{
  isOpen: boolean;
  onClick: () => void;
  className: string;
}>;
function Backdrop({ isOpen, onClick, className, children }: BackdropProps) {
  useEffect(() => {
    document.body.classList.add('body_overflow');

    return () => {
      document.body.classList.remove('body_overflow');
    };
  }, []);
  return (
    <div
      onClick={onClick}
      className={classNames(
        `fixed top-0 left-0 right-0 w-full h-[100vh] z-20 transition-opacity duration-1000 overflow-y-scroll ${className}`,
        { 'opacity-1': isOpen },
        { 'opacity-0 pointer-events-none': !isOpen }
      )}
    >
      {children}
    </div>
  );
}

export default Backdrop;
