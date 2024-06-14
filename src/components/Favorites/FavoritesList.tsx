'use client';
import { Product } from '@/lib/types/types';
import ProductCard from '../Products/ProductCard/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';

interface FavoritesListProps {
  products: Product[];
}

function FavoritesList({ products }: FavoritesListProps) {
  const { openCloseFavorites } = useFavorites();
  return (
    <ul className=" grid md:grid-cols-2 lg:grid-cols-3 desktop:grid-cols-4 gap-8">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard {...product} onCardClick={openCloseFavorites} />
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
