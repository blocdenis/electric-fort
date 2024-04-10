import { SVGProps } from 'react';

function HeartWithShadowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="35"
      height="33"
      viewBox="0 0 35 33"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_596_6402)">
        <path d="M17.66 25.9223L17.5 26.0858L17.324 25.9223C9.724 18.876 4.7 14.2166 4.7 9.49183C4.7 6.22207 7.1 3.76975 10.3 3.76975C12.764 3.76975 15.164 5.40463 16.012 7.62807H18.988C19.836 5.40463 22.236 3.76975 24.7 3.76975C27.9 3.76975 30.3 6.22207 30.3 9.49183C30.3 14.2166 25.276 18.876 17.66 25.9223ZM24.7 0.5C21.916 0.5 19.244 1.82425 17.5 3.90054C15.756 1.82425 13.084 0.5 10.3 0.5C5.372 0.5 1.5 4.44005 1.5 9.49183C1.5 15.6553 6.94 20.7071 15.18 28.342L17.5 30.5L19.82 28.342C28.06 20.7071 33.5 15.6553 33.5 9.49183C33.5 4.44005 29.628 0.5 24.7 0.5Z" />
      </g>
      <defs>
        <filter
          id="filter0_d_596_6402"
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
            result="effect1_dropShadow_596_6402"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_596_6402"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default HeartWithShadowIcon;
