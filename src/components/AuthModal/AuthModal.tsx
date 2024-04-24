import { FC } from 'react';
import styles from './AuthModal.module.scss';
import LogoIcon from '../icons/LogoIcon';
import SignUpForm from '../SignUpForm/SignUpForm';
interface AuthModal {
  onClose: () => void;
}

const AuthModal: FC<AuthModal> = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <LogoIcon />
        <SignUpForm />
      </div>
    </div>
  );
};
export default AuthModal;
