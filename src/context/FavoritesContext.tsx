'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Popup from '@/components/Popup/Popup';
import Favorites from '@/components/Favorites/Favorites';
import { Product } from '@/lib/types/types';
import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from '@/services/api/api';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

type FavoritesProviderProps = {
  children: ReactNode;
};

// type FavoritesItem = {
//   id: number;
// };

type FavoritesContext = {
  openCloseFavorites: () => void;
  deleteFromFavorites: UseMutationResult<string, Error, number, unknown>;
  addToFavorites: UseMutationResult<string, Error, number, unknown>;
  favoritesItems: Product[] | undefined;
  isPending: boolean;
  favoritesQuantity: number;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext({} as FavoritesContext);

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: favorites, isPending } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 10 * 1000,
  });

  const [favoritesItems, setFavoritesItems] = useLocalStorage<
    Product[] | undefined
  >('favorites', favorites);

  const queryClient = useQueryClient();

  const addToFavorites = useMutation({
    mutationFn: addFavorites,
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ['favorites'] }, (oldData) => {
        if (oldData) {
          [oldData, data];
        }
      });
    },
  });

  const deleteFromFavorites = useMutation({
    mutationFn: deleteFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const isFavorite = (id: number) =>
    !!favoritesItems?.find((item) => item.id === id) ?? false;

  const openCloseFavorites = () => setIsOpen((prevVal) => !prevVal);

  const favoritesQuantity = favoritesItems?.length ? favoritesItems.length : 0;

  return (
    <FavoritesContext.Provider
      value={{
        addToFavorites,
        deleteFromFavorites,
        openCloseFavorites,
        favoritesItems,
        isPending,
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
