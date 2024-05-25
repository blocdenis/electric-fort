import React from 'react';
import styles from './ContactContent.module.scss';
import { EnvelopeIcon, LocationIcon } from '@/components/icons';

interface ContactContentProps {
  color: string;
}
const ContactContent: React.FC<ContactContentProps> = ({ color }) => {
  return (
    <div className={styles.container_content}>
      <div className={styles.container}>
        <a href="mailto:electricalfortress@gmail.com">
          <EnvelopeIcon color={color} />
        </a>
        <p>electricalfortress@gmail.com</p>
      </div>
      <div className={styles.container}>
        <LocationIcon color={color} />
        <p>м.Харків вул.Аааааааа, 46</p>
      </div>
    </div>
  );
};

export default ContactContent;
