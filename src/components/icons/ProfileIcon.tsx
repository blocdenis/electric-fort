import { SVGProps } from 'react';

function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M29.15 30.833C27.461 26.316 23.106 23.1 18 23.1c-5.106 0-9.461 3.216-11.15 7.733m22.3 0A16.96 16.96 0 0 0 35 18c0-9.389-7.611-17-17-17S1 8.611 1 18a16.96 16.96 0 0 0 5.85 12.833m22.3 0A16.934 16.934 0 0 1 18 35a16.934 16.934 0 0 1-11.15-4.167"
      />
      <circle
        cx={5.1}
        cy={5.1}
        r={5.1}
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={2}
        transform="matrix(1 0 0 -1 12.9 18)"
      />
    </svg>
  );
}

export default ProfileIcon;
