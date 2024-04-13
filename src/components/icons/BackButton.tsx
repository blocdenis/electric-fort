import { SVGProps } from 'react';
const ArrowCategoriesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="46"
    height="45"
    viewBox="0 0 46 45"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_i_552_864)">
      <rect x="0.5" width="45" height="45" rx="22.5" fill="#FFE500" />
      <path
        d="M35.0107 29.5194C35.1658 29.368 35.2889 29.1882 35.3728 28.9903C35.4568 28.7924 35.5 28.5802 35.5 28.3659C35.5 28.1516 35.4568 27.9394 35.3728 27.7414C35.2889 27.5435 35.1658 27.3637 35.0107 27.2124L23.9394 16.3812C23.8162 16.2603 23.6698 16.1645 23.5086 16.0991C23.3474 16.0337 23.1747 16 23.0002 16C22.8257 16 22.6529 16.0337 22.4917 16.0991C22.3306 16.1645 22.1842 16.2603 22.0609 16.3812L10.9896 27.2124C10.3368 27.851 10.3368 28.8807 10.9896 29.5194C11.6424 30.158 12.6949 30.158 13.3478 29.5194L23.0068 20.0828L32.6659 29.5324C33.3054 30.158 34.3712 30.158 35.0107 29.5194Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_552_864"
        x="-1.5"
        y="0"
        width="47"
        height="47"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-2" dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.641667 0 0 0 0 0.39678 0 0 0 0 0.0294515 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_552_864"
        />
      </filter>
    </defs>
  </svg>
);
export default ArrowCategoriesIcon;
