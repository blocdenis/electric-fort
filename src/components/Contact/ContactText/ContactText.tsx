'use client';
import React from 'react';
import styles from './ContactText.module.scss';
import { PhoneIcon } from '@/components/icons';

interface ContactTextProps {
  color?: string;
}
const ContactText: React.FC<ContactTextProps> = ({ color }) => {
  const textToCopy = '+38(000) 000-00-00';
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    console.log('copied');
  };
  return (
    <div className={styles.container}>
      <PhoneIcon color={color} />
      <span onClick={handleCopy}>{textToCopy}</span>
    </div>
  );
};

export default ContactText;
