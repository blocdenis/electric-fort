import { CrossIcon } from '@/components/icons';
import classNames from 'classnames';

interface FilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  withCross?: boolean;
}

function FilterButton({
  children,
  onClick,
  type,
  className,
  withCross = false,
}: FilterButtonProps) {
  return (
    <button
      className={classNames(
        'flex items-center gap-3 border border-solid border-secondary_green bg-white rounded-md text-black text-sm px-3 py-2 hover:border-yellow transition-colors',
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
      {withCross ? (
        <CrossIcon width={17} height={17} className=" [&>rect]:fill-yellow" />
      ) : null}
    </button>
  );
}

export default FilterButton;
