import { SVGProps } from 'react';
const AdvantagesIconDiscounts = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={94}
    height={98}
    viewBox="0 0 94 98"
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <ellipse
        cx={19.362}
        cy={26.201}
        fill="#FFE600"
        fillOpacity={0.4}
        rx={19.362}
        ry={26.201}
        transform="matrix(.87659 .48124 -.4765 .87918 60.053 .5)"
      />
    </g>
    <g filter="url(#b)">
      <ellipse
        cx={19.396}
        cy={26.156}
        fill="#0F0"
        fillOpacity={0.4}
        rx={19.396}
        ry={26.156}
        transform="matrix(.69199 -.72191 .71774 .69631 .002 61.075)"
      />
    </g>
    <path
      stroke="#008C95"
      strokeWidth={3}
      d="M67.002 28.443c-12.363 0-19.02-3.962-21-5.943-1.982 1.981-9.906 5.15-21 5.943v28.132c1.268 6.657 6.735 11.095 20.603 19.416C59.87 67.432 65.417 64.5 67.002 54.594v-26.15Z"
    />
    <path
      fill="#008C95"
      d="M43.765 57.368a2.19 2.19 0 0 1-1.716-.814l-5.517-6.945c-.717-.904-.53-2.19.417-2.874.95-.685 2.298-.505 3.016.397l3.628 4.568 9.126-13.97c.629-.96 1.956-1.254 2.966-.656 1.01.599 1.317 1.864.689 2.826L45.592 56.401a2.172 2.172 0 0 1-1.827.967Z"
    />
    <defs>
      <filter
        id="a"
        width={54.142}
        height={61.711}
        x={37.47}
        y={1.998}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_364_4655"
          stdDeviation={3}
        />
      </filter>
      <filter
        id="b"
        width={58.158}
        height={57.948}
        x={3.117}
        y={36.311}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_364_4655"
          stdDeviation={3}
        />
      </filter>
    </defs>
  </svg>
);
export default AdvantagesIconDiscounts;
