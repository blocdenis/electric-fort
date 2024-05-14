import { SVGProps } from 'react';
const BurgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="50"
    height="28"
    viewBox="0 0 50 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="50" height="4" rx="2" fill="#FFE500" />
    <rect y="12" width="50" height="4" rx="2" fill="#FFE500" />
    <rect y="24" width="50" height="4" rx="2" fill="#FFE500" />
  </svg>
);
export default BurgerIcon;
