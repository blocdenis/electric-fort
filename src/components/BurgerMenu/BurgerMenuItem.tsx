import Link from 'next/link';
import { ReactNode } from 'react';

export interface BurgerMenuItemProps {
  title: string;
  href?: string;
  value?: number;
  children?: ReactNode;
  onClick: () => void;
}

function BurgerMenuItem({
  children,
  title,
  value,
  href,
  onClick,
}: BurgerMenuItemProps) {
  return (
    <li
      onClick={onClick}
      className="flex justify-between items-center mb-6 last:mb-0 "
    >
      {href ? (
        <Link href={href} className="flex items-center justify-center">
          {children ? (
            <div className="w-[40px] h-[40px] [&_svg]:w-full [&_path]:stroke-white flex items-center justify-center">
              {children}
            </div>
          ) : null}
          <p className="ml-3">{title}</p>
        </Link>
      ) : (
        <div className="flex items-center justify-center">
          {children ? (
            <div className="w-[40px] h-[40px] [&_svg]:w-full [&_path]:stroke-white flex items-center justify-center">
              {children}
            </div>
          ) : null}
          <p className="ml-3">{title}</p>
        </div>
      )}
      {value ? (
        <span className="flex items-center justify-center text-white w-[29px] h-[29px] rounded-full bg-yellow">
          {value}
        </span>
      ) : null}
    </li>
  );
}

export default BurgerMenuItem;
