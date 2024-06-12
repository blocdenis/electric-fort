'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from '../icons/HomeIcon';
import styles from './Breadcramb.module.scss';

type BreadcrambLink = {
  name: string;
  href: string;
};

interface BreadCrumbProps {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  linksСorrespondence: BreadcrambLink[];
  linksNotFromURL?: (string | undefined)[];
}

function Breadcramb({
  homeElement,
  separator,
  // containerClasses,
  // listClasses,
  // activeClasses,
  capitalizeLinks,
  linksСorrespondence,
  linksNotFromURL,
}: BreadCrumbProps) {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  return (
    <div>
      <ul className={styles.container}>
        <li className={styles.list}>
          <Link className={styles.link} href={'/'}>
            <div className="flex items-center justify-center">
              <HomeIcon />
              {homeElement}
            </div>
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemClasses = paths === href ? styles.link_active : styles.link;

          let corLink = linksСorrespondence.find(
            (item) => item.href === link
          )?.name;

          if (corLink) {
            let itemLink = capitalizeLinks
              ? corLink[0].toUpperCase() + corLink.slice(1, corLink.length)
              : corLink;

            return (
              <React.Fragment key={index}>
                <li className={styles.list}>
                  <Link href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && separator}
              </React.Fragment>
            );
          } else {
            return linksNotFromURL?.map((link, indexLink) => (
              <React.Fragment key={indexLink}>
                <li className={styles.list}>
                  <Link href={href}>{link}</Link>
                </li>
                {linksNotFromURL.length !== indexLink + 1 && separator}
              </React.Fragment>
            ));
          }
        })}
      </ul>
    </div>
  );
}

export default Breadcramb;
