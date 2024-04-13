import { SVGProps } from 'react';

function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="inherit"
      {...props}
    >
      <rect
        width={37.049}
        height={2.423}
        fill="#fff"
        rx={1.212}
        transform="scale(.99704 1.00295) rotate(45 .935 2.279)"
      />
      <rect
        width={36.947}
        height={2.423}
        fill="#fff"
        rx={1.212}
        transform="matrix(.70501 -.7092 .70501 .7092 0 26.202)"
      />
    </svg>
  );
}

export default CrossIcon;
