import * as React from 'react';
const SuccessPayment = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={112}
    height={112}
    fill="none"
    {...props}
  >
    <circle cx={56} cy={56} r={56} fill="#9CEC25" />
    <path
      fill="#fff"
      d="M27 34.5V48h62v23H56v5h35c1.6 0 3-2 3-3.5v-39c0-2.4-1-4.5-4-4.5H30.5c-2.8 0-3.5 2.5-3.5 5.5Z"
    />
    <path fill="#69AF00" d="M32 39v-5h57v5H32Z" />
    <circle cx={67} cy={60} r={8} fill="#fff" />
    <circle cx={77} cy={60} r={8} fill="#fff" />
    <circle cx={34.5} cy={69.5} r={17.5} fill="#fff" />
    <path
      fill="#69AF00"
      d="m23 70.5 3-3 5 5.5 11.5-12 3.5 3-14.5 15-8.5-8.5Z"
    />
  </svg>
);
export default SuccessPayment;
