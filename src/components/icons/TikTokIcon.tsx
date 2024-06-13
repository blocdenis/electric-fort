import { FC, SVGProps } from 'react';

interface TikTokIconProps extends SVGProps<SVGSVGElement> {
  href: string;
  color: string;
  target: string;
}
const TikTokIcon: FC<TikTokIconProps> = ({ href, target, color, ...rest }) => (
  <a href={href} target={target}>
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="1.5" y="1.5" width="42" height="42" rx="21" fill="white" />
      <rect
        x="1.5"
        y="1.5"
        width="42"
        height="42"
        rx="21"
        stroke="#FFE600"
        strokeWidth="3"
      />
      <path
        d="M33.4964 15.9326C33.4976 15.9327 33.4988 15.9328 33.5 15.9329V19.5735C31.5207 19.4785 29.6056 18.7995 27.9886 17.612L27.1926 17.0275V18.015V27.45C27.1926 31.91 23.665 35.5 19.3463 35.5C15.3134 35.5 11.5 32.1578 11.5 27.45C11.5 22.757 15.425 19.0691 19.9904 19.4384V23.0994C17.3846 22.6902 15.0472 24.7779 15.0472 27.45C15.0472 29.8781 16.9939 31.85 19.361 31.85H19.361C20.479 31.8498 21.5511 31.4059 22.3522 30.6153C23.1529 29.8249 23.6204 28.7499 23.6598 27.6174L23.6601 27.6087V27.6V9.5H27.2102C27.3158 10.9937 27.8943 12.4184 28.8668 13.5542C29.944 14.8254 31.2283 15.4246 32.2381 15.7049C32.7427 15.845 33.1813 15.9063 33.4964 15.9326Z"
        stroke={color}
      />
    </svg>
  </a>
);
export default TikTokIcon;
