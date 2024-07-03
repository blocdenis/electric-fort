import { SVGProps } from 'react';

const ArrowSortIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="15"
    viewBox="0 0 16 15"
    // fill="none"
    {...props}
  >
    <path
      fill="#ACACAC"
      fillRule="evenodd"
      d="m8.22 11.03 3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V1.5a.75.75 0 0 0-1.5 0v10.19L9.28 9.97a.75.75 0 0 0-1.06 1.06ZM4.28.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06L3 3.31V13.5a.75.75 0 0 0 1.5 0V3.31l1.72 1.72a.75.75 0 0 0 1.06-1.06l-3-3Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowSortIcon;
