import { SVGProps } from 'react';
const CatalogIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="25"
    viewBox="0 0 26 25"
    fill="none"
    {...props}
  >
    <rect
      width="8.5"
      height="8.5"
      x="1.715"
      y="3.286"
      stroke="#fff"
      strokeWidth="1.5"
      rx="1.25"
    />
    <rect
      width="8.5"
      height="8.5"
      x="1.715"
      y="15.286"
      stroke="#fff"
      strokeWidth="1.5"
      rx="1.25"
    />
    <rect
      width="8.5"
      height="8.5"
      x="13.715"
      y="15.286"
      stroke="#fff"
      strokeWidth="1.5"
      rx="1.25"
    />
    <rect
      width="8.5"
      height="8.5"
      x="11.954"
      y="7.536"
      stroke="#fff"
      strokeWidth="1.5"
      rx="1.25"
      transform="rotate(-45 11.954 7.536)"
    />
  </svg>
);
export default CatalogIcon;
