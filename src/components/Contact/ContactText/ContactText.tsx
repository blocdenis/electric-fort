'use client';
import React, { useState } from 'react';
import styles from './ContactText.module.scss';
import { PhoneIcon } from '@/components/icons';

interface ContactTextProps {
  color?: string;
}

const ContactText: React.FC<ContactTextProps> = ({ color }) => {
  const textToCopy = '+38(000) 000-00-00';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <div className={styles.container}>
      <PhoneIcon color={color} />
      <span onClick={handleCopy}>{textToCopy}</span>
      {copied && <div className={styles.notification}>Cкопійовано!</div>}
    </div>
  );
};

export default ContactText;
