'use client';
//don't use filters context
import classNames from 'classnames';
import styles from './ShowMoreButton.module.scss';

interface ShowMoreButtonProps {
  className?: string;
  isDisabled?: boolean;
  onShowMoreClick: () => void;
  children: React.ReactNode;
}
function ShowMoreButton({
  className,
  isDisabled,
  onShowMoreClick,
  children,
}: ShowMoreButtonProps) {
  return (
    <button
      className={classNames(styles.show_more, className)}
      disabled={isDisabled}
      onClick={onShowMoreClick}
    >
      {children}
    </button>
  );
}

export default ShowMoreButton;
