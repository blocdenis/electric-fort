import { FC, SVGProps } from 'react';

interface EnvelopIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}
const EnvelopeIcon: FC<EnvelopIconProps> = ({ color = 'white', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    {...rest}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m2.5 2 5.98 6.208c.2.208.419.4.675.534a4 4 0 0 0 4.064-.221L20 2.5M5 19h12a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4Z"
    />
  </svg>
);
export default EnvelopeIcon;
