import React from 'react';
import styles from './ContactText.module.scss';
import { PhoneIcon } from '@/components/icons';

interface ContactTextProps {
  color?: string;
}
const ContactText: React.FC<ContactTextProps> = ({ color }) => {
  return (
    <div className={styles.container}>
      <PhoneIcon color={color} />
      <span>+38(000) 000-00-00</span>
    </div>
  );
};

export default ContactText;
