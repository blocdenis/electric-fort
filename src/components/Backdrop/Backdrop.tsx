import classNames from 'classnames';
import { type PropsWithChildren } from 'react';

type BackdropProps = PropsWithChildren<{
  isOpen: boolean;
  onClick: () => void;
}>;
function Backdrop({ isOpen, onClick, children }: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'fixed top-0 right-0 w-[100vw] h-full z-20 bg-backdrop transition-opacity duration-1000 overflow-y-scroll ',
        { 'opacity-1': isOpen },
        { 'opacity-0 pointer-events-none': !isOpen }
      )}
    >
      {children}
    </div>
  );
}

export default Backdrop;
