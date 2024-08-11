import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

function Section({ children, className }: SectionProps) {
  return (
    <section className={classNames(' py-6 lg:py-10', className)}>
      {children}
    </section>
  );
}

export default Section;
