import { SVGProps } from 'react';
const FavoritesEmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="145"
    height="197"
    viewBox="0 0 145 197"
    fill="none"
    {...props}
  >
    <path
      stroke="#69AF00"
      strokeWidth="4"
      d="M6 191.97V19.19h36.27V6h60.672v13.19h36.271v172.78H6ZM53.48 17.21h38.25"
    />
    <path
      stroke="#9CEC25"
      strokeWidth="4"
      d="M27.104 42.272h89.688M27.104 58.098h89.688M27.104 73.926h89.688M27.104 89.752h89.688M27.104 105.579h89.688M27.104 121.407h89.688M27.104 137.234h89.688M27.104 153.062h89.688M27.104 168.889h89.688"
    />
    <path
      stroke="#69AF00"
      strokeWidth="4"
      d="M17.872 180.759V30.4h108.153V180.76H17.872Z"
    />
    <g filter="url(#a)">
      <path
        fill="#FFE500"
        d="M87.742 67.991c-5.852 0-11.469 2.795-15.135 7.176-3.666-4.381-9.282-7.176-15.135-7.176-10.359 0-18.498 8.315-18.498 18.976 0 13.007 11.436 23.667 28.756 39.779l4.877 4.554 4.877-4.554c17.32-16.112 28.756-26.772 28.756-39.78 0-10.66-8.139-18.975-18.498-18.975Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width="69.266"
        height="65.309"
        x="37.974"
        y="67.991"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation=".5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_726_27278"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_726_27278"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default FavoritesEmptyIcon;
