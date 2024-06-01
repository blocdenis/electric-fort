import { Product } from '@/lib/types/types';
import ProductCard from '../Products/ProductCard/ProductCard';
import styles from './Favorites.module.scss';

interface FavoritesListProps {
  products: Product[];
}

function FavoritesList({ products }: FavoritesListProps) {
  return (
    <ul className=" grid grid-cols-4 gap-8">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
