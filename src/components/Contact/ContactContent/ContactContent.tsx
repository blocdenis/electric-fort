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
        <a
          href="mailto:electricalfortress@gmail.com"
          className="flex flex-row gap-2.5"
        >
          <EnvelopeIcon color={color} />
          <span>electricalfortress@gmail.com</span>
        </a>
      </div>
      <div className={styles.container}>
        <a className="flex gap-2" href="">
          <LocationIcon width={22} height={25} color={color} />
          <span>61206, м. Харків, вул. Академіка Павлова, буд. 156-Б</span>
        </a>
      </div>
    </div>
  );
};

export default ContactContent;
