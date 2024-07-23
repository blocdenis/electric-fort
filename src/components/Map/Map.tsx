import React from 'react';
import styles from './Map.module.scss';
interface MapProps {
  className?: string;
}
const Map = ({ className }: MapProps) => {
  // google map api to do
  return (
    <div className={className}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.8787135179882!2d36.33960312948905!3d50.02561278481687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a7377971a3cb%3A0x4afe368cb4ab4150!2z0KMg0KDRg9GB0LvQsNC90LAg0Lgg0J3QsNGC0LDQu9GM0Lg!5e0!3m2!1sru!2sua!4v1720619040646!5m2!1sru!2sua"
        width="100%"
        height="100%"
        // style="border:0;"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
