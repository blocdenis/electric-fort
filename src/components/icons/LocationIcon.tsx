import { SVGProps, FC } from 'react';
interface LocationIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}
const LocationIcon: FC<LocationIconProps> = ({ color = 'white', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="25"
    viewBox="0 0 18 25"
    fill="none"
    {...rest}
  >
    <path
      fill={color}
      d="M9 0C4.305 0 .5 3.847.5 8.594.5 13.34 9 25 9 25s8.5-11.66 8.5-16.406C17.5 3.847 13.694 0 9 0ZM2.045 8.594c0-3.878 3.12-7.031 6.955-7.031s6.954 3.153 6.954 7.03c0 2.701-3.865 9.222-6.954 13.72-3.09-4.498-6.955-11.018-6.955-13.72ZM9 4.688c-2.134 0-3.864 1.748-3.864 3.906C5.136 10.75 6.866 12.5 9 12.5s3.864-1.749 3.864-3.906c0-2.158-1.73-3.906-3.864-3.906Zm0 6.25c-1.278 0-2.318-1.052-2.318-2.344C6.682 7.3 7.722 6.25 9 6.25s2.318 1.051 2.318 2.344c0 1.292-1.04 2.344-2.318 2.344Z"
    />
  </svg>
);
export default LocationIcon;
