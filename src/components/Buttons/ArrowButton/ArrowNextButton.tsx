import classNames from 'classnames';
import styles from './ArrowButton.module.scss';

function ArrowNextButton({ id }: { id?: string }) {
  return (
    <div
      id={id}
      className={classNames(styles.arrow_button, styles.arrow_next_button)}
    ></div>
  );
}

export default ArrowNextButton;
