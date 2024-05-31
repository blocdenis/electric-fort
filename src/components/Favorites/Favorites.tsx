import styles from './Favorites.module.scss';
import Button from '../Buttons/Button/Button';
import FavoritesList from './FavoritesList';
import { products } from '@/lib/db/products';
import FavoritesEmpty from './FavoritesEmpty';

function Favorites() {
  const isAuthUser = false;

  return (
    <section>
      <h2 className={styles.title}>Список бажань</h2>
      {!isAuthUser ? (
        <div className={styles.warrning_block}>
          <p className={styles.warning_text}>
            Звертаємо вашу увагу, додані Вами товари будуть видалені через 3 дні
            Для того щоб вони були збережені увійдіть у свій обліковий запис або
            зареєструйтесь.
          </p>
          <div className={styles.warning_buttons_block}>
            <Button>Увійти</Button>
            <Button>Зареєструватися</Button>
          </div>
        </div>
      ) : null}
      {products.length ? (
        <FavoritesList products={products} />
      ) : (
        <FavoritesEmpty />
      )}
    </section>
  );
}

export default Favorites;
