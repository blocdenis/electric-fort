import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import styles from './ButtonLink.module.scss';

interface ButtonLinkProps {
  title: string;
  href: string;
  className?: string;
}

function ButtonLink({ title, href, className }: ButtonLinkProps) {
  return (
    <div className={classNames(styles.button_link, className)}>
      <Link className="py-[12px] px-[50px]" href={href}>
        {title}
      </Link>
    </div>
  );
}

export default ButtonLink;
