import { SVGProps } from 'react';

function HeartWithShadowFilledIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="35"
      height="33"
      viewBox="0 0 35 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_2480_11651)">
        <path
          d="M24.7 0.5C21.916 0.5 19.244 1.82425 17.5 3.90054C15.756 1.82425 13.084 0.5 10.3 0.5C5.372 0.5 1.5 4.44005 1.5 9.49183C1.5 15.6553 6.94 20.7071 15.18 28.342L17.5 30.5L19.82 28.342C28.06 20.7071 33.5 15.6553 33.5 9.49183C33.5 4.44005 29.628 0.5 24.7 0.5Z"
          fill="#FFE500"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2480_11651"
          x="0.5"
          y="0.5"
          width="34"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2480_11651"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2480_11651"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default HeartWithShadowFilledIcon;
