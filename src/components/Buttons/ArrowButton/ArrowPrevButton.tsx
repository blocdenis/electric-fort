import classNames from 'classnames';
import styles from './ArrowButton.module.scss';

function ArrowPrevButton({ id }: { id?: string }) {
  return (
    <div
      id={id}
      className={classNames(styles.arrow_button, styles.arrow_prev_button)}
    ></div>
  );
}

export default ArrowPrevButton;
