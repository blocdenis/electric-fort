import { PropsWithChildren } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Popup.module.scss';
import { CrossIcon } from '../icons';

interface PopupProps {
  onClick: () => void;
  isOpen: boolean;
}

function Popup({ onClick, isOpen, children }: PropsWithChildren<PopupProps>) {
  return (
    <Backdrop
      className=" bg-backdrop_black flex justify-center"
      onClick={onClick}
      isOpen={isOpen}
    >
      <div className={styles.popup_body} onClick={(e) => e.stopPropagation()}>
        <div onClick={onClick} className={styles.icon_wrapper}>
          <CrossIcon className={styles.icon} />
        </div>
        {children}
      </div>
    </Backdrop>
  );
}

export default Popup;
