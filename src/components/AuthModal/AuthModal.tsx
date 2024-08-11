import { FC, useEffect, useRef } from 'react';
import styles from './AuthModal.module.scss';
import LogoIcon from '../icons/LogoIcon';
import SignUpForm from '../SignUpForm/SignUpForm';
import { CrossIcon } from '../icons';

interface AuthModalProps {
  onClose: () => void;
  id?: string;
}

const AuthModal: FC<AuthModalProps> = ({ onClose, id }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div id={id} className={styles.modal}>
      <div className={styles.modal_content} ref={modalRef}>
        <span className={styles.close} onClick={onClose}>
          <CrossIcon />
        </span>
        <LogoIcon />
        <SignUpForm />
      </div>
    </div>
  );
};

export default AuthModal;
