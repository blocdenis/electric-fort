import * as React from 'react';
import { SVGProps } from 'react';
const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    {...props}
  >
    <path
      fill="#FFE500"
      d="M6.328 17.5a1.807 1.807 0 0 1-1.416-.671L.36 11.098c-.592-.745-.438-1.807.344-2.371.783-.565 1.896-.417 2.488.328l2.994 3.768 7.53-11.525C14.235.505 15.33.262 16.163.756c.832.494 1.087 1.538.568 2.332L7.836 16.702a1.792 1.792 0 0 1-1.508.798Z"
    />
  </svg>
);
export default CheckMarkIcon;
