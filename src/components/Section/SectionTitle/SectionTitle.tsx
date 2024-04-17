import classNames from 'classnames';
import React, { ElementType } from 'react';
import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  className?: string;
}

function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2 className={classNames(styles.section_heading, className)}>{title}</h2>
  );
}

export default SectionTitle;
