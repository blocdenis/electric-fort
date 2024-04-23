import { SVGProps } from 'react';

function HeartWithShadowFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="33"
      viewBox="0 0 35 33"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <path
          fill="#FFE500"
          d="M24.7.5c-2.784 0-5.456 1.324-7.2 3.4C15.756 1.825 13.084.5 10.3.5 5.372.5 1.5 4.44 1.5 9.492c0 6.163 5.44 11.215 13.68 18.85L17.5 30.5l2.32-2.158c8.24-7.635 13.68-12.687 13.68-18.85C33.5 4.44 29.628.5 24.7.5Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width="34"
          height="32"
          x=".5"
          y=".5"
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
            result="effect1_dropShadow_26_11515"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_26_11515"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default HeartWithShadowFilledIcon;
