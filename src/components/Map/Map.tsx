import React, { HtmlHTMLAttributes } from 'react';
import styles from './Map.module.scss';

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  // google map api to do
  return (
    <div className={className}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82057.64157504801!2d36.15007255168088!3d50.00570767208873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a09f63ab0f8b%3A0x2d4c18681aa4be0a!2z0KXQsNGA0YzQutC-0LIsINCl0LDRgNGM0LrQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0Yw!5e0!3m2!1sru!2sua!4v1713193858192!5m2!1sru!2sua"
        width="304"
        height="183"
        // style="border:0;"
        // allowullscreen=""
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
