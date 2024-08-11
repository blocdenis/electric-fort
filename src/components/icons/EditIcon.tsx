import { SVGProps } from 'react';
const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      // fill="#fff"
      fillRule="evenodd"
      d="M.057 18.938a.773.773 0 0 0 .168.836c.22.22.549.286.835.169l5.51-2.246a.77.77 0 0 0 .254-1.26l-3.267-3.272a.77.77 0 0 0-1.259.254L.057 18.938ZM13.303 2.34l-9.29 9.284a2.3 2.3 0 0 1 .633.45l3.268 3.272c.189.19.341.408.453.643l9.293-9.285-4.357-4.364Zm1.09-1.09 4.357 4.364.572-.57a2.322 2.322 0 0 0 .001-3.276L18.234.678a2.308 2.308 0 0 0-3.265-.002l-.576.574Z"
      clipRule="evenodd"
    />
  </svg>
);
export default EditIcon;
