import React from 'react';

import ButtonLink from '../Buttons/ButtonLink/ButtonLink';
import styles from './Error.module.scss';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ErrorProps {
  errorText: String;
  // errorCode: string | StaticImport;
}

function NotFoundError({ errorText }: ErrorProps) {
  return (
    <div className={styles.error}>
      <div className={styles.text_button_container}>
        <p className={styles.error_text}>{errorText}</p>
        <ButtonLink
          title="Повернутись на головну"
          href="/"
          className="w-[331px] max-w-full"
        />
      </div>
    </div>
  );
}

export default NotFoundError;
