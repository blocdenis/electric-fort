import { SVGProps } from 'react';
const GeoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    {...props}
  >
    <g fill="#9CEC25" clipPath="url(#a)">
      <path d="M34.977 25.703c-1.506 3.053-3.547 6.095-5.635 8.826A92.015 92.015 0 0 1 23 41.917a91.994 91.994 0 0 1-6.342-7.388c-2.088-2.732-4.129-5.773-5.635-8.827-1.524-3.084-2.398-5.974-2.398-8.452a14.375 14.375 0 1 1 28.75 0c0 2.478-.877 5.368-2.398 8.453ZM23 46s17.25-16.347 17.25-28.75a17.25 17.25 0 1 0-34.5 0C5.75 29.653 23 46 23 46Z" />
      <path d="M23 23a5.75 5.75 0 1 1 0-11.5A5.75 5.75 0 0 1 23 23Zm0 2.875a8.625 8.625 0 1 0 0-17.25 8.625 8.625 0 0 0 0 17.25Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h46v46H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default GeoIcon;
