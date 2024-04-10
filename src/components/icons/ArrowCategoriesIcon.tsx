import { SVGProps } from 'react';
const ArrowCategoriesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 1 1 8l7 7M1 8h16"
    />
  </svg>
);
export default ArrowCategoriesIcon;
