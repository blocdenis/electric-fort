import Link from 'next/link';
import { ReactNode } from 'react';

export interface BurgerMenuItemProps {
  title: string;
  value?: number;
  children?: ReactNode;
}

function BurgerMenuItem({ children, title, value }: BurgerMenuItemProps) {
  return (
    <li className="flex justify-between items-center mb-6 last:mb-0 ">
      <Link href="/cart" className="flex items-center justify-center">
        {children ? (
          <div className="w-[40px] h-[40px] [&_svg]:w-full flex items-center">
            {children}
          </div>
        ) : null}
        <p className="ml-3">{title}</p>
      </Link>
      {value ? (
        <span className="flex items-center justify-center text-white w-[29px] h-[29px] rounded-full bg-yellow">
          {value}
        </span>
      ) : null}
    </li>
  );
}

export default BurgerMenuItem;
