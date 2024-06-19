import FavoritesEmptyIcon from '../icons/FavoritesEmptyIcon';
import styles from './Favorites.module.scss';

function FavoritesEmpty() {
  return (
    <div className={styles.fav_empty}>
      <div>
        <FavoritesEmptyIcon />
      </div>
      <p className={styles.fav_empty_text}>
        Ви ще не додали жодного товару в список бажань...
      </p>
    </div>
  );
}

export default FavoritesEmpty;
