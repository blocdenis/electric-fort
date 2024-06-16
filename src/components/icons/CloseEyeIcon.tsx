import * as React from 'react';
import { SVGProps } from 'react';
const CloseEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={30}
    fill="none"
    {...props}
  >
    <path
      stroke="#B4B4B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.457 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      stroke="#B4B4B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.916 15c1.274-4.057 5.064-7 9.542-7 4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.478 0-8.268-2.943-9.542-7Z"
    />
  </svg>
);
export default CloseEyeIcon;
