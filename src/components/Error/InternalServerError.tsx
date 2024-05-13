import React from 'react';

import ButtonLink from '../Buttons/ButtonLink/ButtonLink';
import styles from './Error.module.scss';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ErrorProps {
  errorText: String;
  // errorCode: string | StaticImport;
}

function InternalServerError({ errorText }: ErrorProps) {
  return (
    <div className={styles.error}>
      <div className={styles.error_wrapper}>
        <div className={styles.text_button_container}>
          <h2 className={styles.error_text}>{errorText}</h2>
          <ButtonLink
            title="Повернутись на головну"
            href="/"
            className="w-[331px] max-w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default InternalServerError;
