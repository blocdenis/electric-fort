'use client';
import { Product } from '@/lib/types/types';
import ProductCard from '../Products/ProductCard/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './Favorites.module.scss';

interface FavoritesListProps {
  products: Product[] | undefined;
}

function FavoritesList({ products }: FavoritesListProps) {
  const { openCloseFavorites } = useFavorites();
  return (
    <ul className={styles.fav_list}>
      {products?.map((product) => (
        <li className=" w-fit" key={product.id}>
          <ProductCard {...product} onCardClick={openCloseFavorites} />
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
