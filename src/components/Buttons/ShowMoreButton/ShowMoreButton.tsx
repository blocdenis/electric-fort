'use client';
import classNames from 'classnames';
import styles from './ShowMoreButton.module.scss';

interface ShowMoreButtonProps {
  className?: string;
  isDisabled?: boolean;
  onClick: () => void;
}
function ShowMoreButton({
  className,
  isDisabled,
  onClick,
}: ShowMoreButtonProps) {
  return (
    <button
      className={classNames(styles.show_more, className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      Показати ще...
    </button>
  );
}

export default ShowMoreButton;
