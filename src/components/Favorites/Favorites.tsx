// 'use client';
import styles from './Favorites.module.scss';
import Button from '../Buttons/Button/Button';
import FavoritesList from './FavoritesList';
import FavoritesEmpty from './FavoritesEmpty';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';

function Favorites() {
  const { isAuthenticated, isLoading } = useAuth();

  const {
    favoritesItems,
    isPending,
    openCloseFavorites,
    openCloseAuth,
    openCloseRegister,
  } = useFavorites();

  function handleEnterLoginClick() {
    // openCloseFavorites();
    openCloseAuth();
  }
  function handleEnterRegisterClick() {
    // openCloseFavorites();
    openCloseRegister();
  }

  return (
    <section>
      <h2 className={styles.title}>Список бажань</h2>
      {isLoading ? (
        <div>Loading user</div>
      ) : !isAuthenticated ? (
        <div className={styles.warrning_block}>
          <p className={styles.warning_text}>
            Звертаємо вашу увагу,<br></br>
            додані Вами товари будуть видалені через 3 дні. Для того щоб вони
            були збережені увійдіть у свій обліковий запис або зареєструйтесь.
          </p>
          <div className={styles.warning_buttons_block}>
            <Button
              className="w-[281px] py-[11px]"
              onClick={handleEnterLoginClick}
            >
              Увійти
            </Button>
            <Button
              className="w-[281px] py-[11px]"
              onClick={handleEnterRegisterClick}
            >
              Зареєструватися
            </Button>
          </div>
        </div>
      ) : null}
      {isPending ? (
        <div>Loading</div>
      ) : favoritesItems?.length ? (
        <FavoritesList products={favoritesItems} />
      ) : (
        <FavoritesEmpty />
      )}
    </section>
  );
}

export default Favorites;
