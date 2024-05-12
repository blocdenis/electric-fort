import React from 'react';

import ButtonLink from '../Buttons/ButtonLink/ButtonLink';
import styles from './Error.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import error404 from './../../../public/404.png';
import error505 from './../../../public/404.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ErrorProps {
  errorText: String;
  errorCode: string | StaticImport;
}

function Error({ errorText, errorCode }: ErrorProps) {
  return (
    <div className={styles.error}>
      <p className={styles.error_code}>
        <Image src={errorCode} alt="errorCode" width={250} height={100} />
      </p>
      <div className={styles.text_button_container}>
        <p className={styles.error_text}>{errorText}</p>
        <ButtonLink
          title="Повернутись на головну"
          href="/"
          className="w-[331px]"
        />
      </div>
    </div>
  );
}

export default Error;
