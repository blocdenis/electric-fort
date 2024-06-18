import * as React from 'react';
import { SVGProps } from 'react';
const CheckboxFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <rect width={24} height={24} x={0.5} y={0.5} fill="#fff" rx={1.5} />
    <rect width={24} height={24} x={0.5} y={0.5} stroke="#ACACAC" rx={1.5} />
  </svg>
);
export default CheckboxFalse;
