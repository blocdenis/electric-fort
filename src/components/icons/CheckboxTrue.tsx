import * as React from 'react';
import { SVGProps } from 'react';
const CheckboxTrue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <rect width={24} height={24} x={0.5} y={0.5} fill="#F9F9F9" rx={1.5} />
    <rect width={24} height={24} x={0.5} y={0.5} stroke="#9CEC25" rx={1.5} />
    <path
      fill="#69AF00"
      d="M10.328 21a1.807 1.807 0 0 1-1.416-.671L4.36 14.598c-.592-.745-.438-1.807.344-2.371.783-.565 1.896-.417 2.488.328l2.994 3.768 7.53-11.525c.519-.793 1.613-1.036 2.447-.542.832.494 1.087 1.538.568 2.332l-8.895 13.614a1.792 1.792 0 0 1-1.508.798Z"
    />
  </svg>
);
export default CheckboxTrue;
