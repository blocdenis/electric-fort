'use client';
import { Product } from '@/lib/types/types';
import ProductCard from '../Products/ProductCard/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './Favorites.module.scss';
import { useFilters } from '@/context/FiltersContext';
import Loading from '../Loading/Loading';
import { useState } from 'react';
import ShowMoreButton from '../Buttons/ShowMoreButton/ShowMoreButtonFav';

interface FavoritesListProps {
  products: Product[] | undefined;
}

function FavoritesList({ products }: FavoritesListProps) {
  const { openCloseFavorites } = useFavorites();
  const [page, setPage] = useState<number>(1);
  const itemsPerPage_mobile: number = 3;
  const itemsPerPage_desktop: number = 8;
  const pageSize_mobile: number = page * itemsPerPage_mobile;
  const pageSize_desktop: number = page * itemsPerPage_desktop;

  console.log(pageSize_desktop);

  if (!products) {
    return <Loading />;
  }

  const productsForRender_mobile =
    products?.length > itemsPerPage_mobile
      ? products?.slice(0, pageSize_mobile)
      : products;
  const productsForRender_desktop =
    products?.length > itemsPerPage_desktop
      ? products?.slice(0, pageSize_desktop)
      : products;

  return (
    <div className="flex flex-col items-center gap-8 laptop:items-end ">
      <ul className={styles.fav_list_mobile}>
        {productsForRender_mobile?.map((product) => (
          <li className=" w-fit" key={product.id}>
            <ProductCard {...product} onCardClick={openCloseFavorites} />
          </li>
        ))}
      </ul>
      <ul className={styles.fav_list_desktop}>
        {productsForRender_desktop?.map((product) => (
          <li className=" w-fit" key={product.id}>
            <ProductCard {...product} onCardClick={openCloseFavorites} />
          </li>
        ))}
      </ul>
      {products.length > pageSize_mobile ? (
        <ShowMoreButton
          className=" laptop:hidden"
          onShowMoreClick={() => setPage((prevVal) => prevVal + 1)}
        >
          Показати більше...
        </ShowMoreButton>
      ) : null}
      {products.length > pageSize_desktop ? (
        <ShowMoreButton
          className="hidden laptop:block"
          onShowMoreClick={() => setPage((prevVal) => prevVal + 1)}
        >
          Показати більше...
        </ShowMoreButton>
      ) : null}
    </div>
  );
}

export default FavoritesList;
