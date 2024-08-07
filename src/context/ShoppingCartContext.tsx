'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import Popup from '@/components/Popup/Popup';
import {
  addCartItem,
  getCartItems,
  deleteCartItem,
  decreaseCartItem,
} from '@/services/api/api'; // Подключение функций API
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/lib/types/types';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

interface CartItem extends Product {
  quantity: number;
}
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  openCloseShopCart: () => void;
  cartItems: Product[] | undefined;
  isPending: boolean;
  cartQuantity: number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  decreaseFromCart: (id: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: cartItems, isPending } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    initialData: [],
  });

  const queryClient = useQueryClient();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  const handleAddToCart = (id: number) => {
    addToCart.mutate(id);
  };
  const decreaseFromCart = useMutation({
    mutationFn: decreaseCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  const decreaseCartQuantity = (id: number) => {
    decreaseFromCart.mutate(id);
  };
  const isInCart = (id: number) => {
    return cartItems?.some((item) => item.id === id) || false;
  };
  const removeFromCart = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleRemoveFromCart = (id: number) => {
    removeFromCart.mutate(id);
  };
  const clearCart = async () => {
    if (cartItems && cartItems.length > 0) {
      for (const item of cartItems) {
        await removeFromCart.mutateAsync(item.id);
      }
    }
  };

  const cartQuantity = cartItems?.length ? cartItems.length : 0;
  const openCloseShopCart = () => setIsOpen((prevVal) => !prevVal);

  return (
    <ShoppingCartContext.Provider
      value={{
        openCloseShopCart,
        isPending,
        addToCart: handleAddToCart,
        decreaseFromCart: decreaseCartQuantity,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        removeFromCart: handleRemoveFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
      <Popup onClick={openCloseShopCart} isOpen={isOpen}>
        <ShoppingCart />
      </Popup>
    </ShoppingCartContext.Provider>
  );
}
