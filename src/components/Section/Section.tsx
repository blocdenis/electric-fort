import React, { PropsWithChildren } from 'react';

function Section({ children }: PropsWithChildren) {
  return <section className=" py-10">{children}</section>;
}

export default Section;
