'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from '@/services/useLocalStorage';
import Popup from '@/components/Popup/Popup';
import Favorites from '@/components/Favorites/Favorites';
import { Product } from '@/lib/types/types';

type FavoritesProviderProps = {
  children: ReactNode;
};

// type FavoritesItem = {
//   id: number;
// };

type FavoritesContext = {
  openCloseFavorites: () => void;
  toggleFavorites: (product: Product) => void;
  favoritesItems: Product[];
  favoritesQuantity: number;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext({} as FavoritesContext);

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [favoritesItems, setFavoritesItems] = useLocalStorage<Product[]>(
    'favorites',
    []
  );

  const isFavorite = (id: number) =>
    !!favoritesItems.find((item) => item.id === id) ?? false;

  const openCloseFavorites = () => setIsOpen((prevVal) => !prevVal);

  const favoritesQuantity = favoritesItems.length ? favoritesItems.length : 0;

  function toggleFavorites(product: Product) {
    setFavoritesItems((currItems) => {
      if (currItems.length) {
        if (favoritesItems.find((item) => item.id === product.id) ?? false) {
          return currItems.filter((item) => item.id !== product.id);
        }
        return [...currItems, product];
      }

      return [product];
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        toggleFavorites,
        openCloseFavorites,
        favoritesItems,
        favoritesQuantity,
        isFavorite,
      }}
    >
      {children}
      <Popup isOpen={isOpen} onClick={openCloseFavorites}>
        <Favorites />
      </Popup>
    </FavoritesContext.Provider>
  );
}
