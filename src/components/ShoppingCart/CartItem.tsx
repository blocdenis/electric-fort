'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import Link from 'next/link';
import notFoundImage from '@/../public/notFound.jpg';
import Image from 'next/image';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import TrashIcon from '../icons/TrashIcon';
import { formatPriceUAH } from '@/services/formatCurrency';
import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from '@/services/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useProducts } from '@/hooks/useProducts';
import ConfirmationModal from './ConfirmationalModal';
import { useState, useRef } from 'react';
type CartItemProps = {
  id: number;
  quantity: number;
  close: any;
};

export function CartItem({ id, quantity, close }: CartItemProps) {
  const { data: favoritesItems, isPending } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: 10 * 1000,
  });
  const queryClient = useQueryClient();
  const addToFavorites = useMutation({
    mutationFn: addFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
        exact: true,
        refetchType: 'active',
      });
      console.log('added');
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
  const handleFavoriteIconClick = () => {
    if (isFavorite(id)) {
      deleteFromFavorites.mutateAsync(id);
    } else {
      addToFavorites.mutateAsync(id);
    }
  };

  const {
    removeFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
  } = useShoppingCart();
  const { products } = useProducts();
  const item = products?.find((i) => i.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trashButtonRef = useRef(null);
  if (item == null) return null;
  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    removeFromCart(id);
    setIsModalOpen(false);
  };
  return (
    <div key={item.id} className="cart-item">
      <div className="product-info">
        <Link href={`/products/${item.id}`} replace onClick={close}>
          <Image
            className="image"
            src={
              item.images
                ? `data:${item.images[0][0]}; base64, ${item.images[0][1]}`
                : notFoundImage
            }
            alt={`${item.name} image`}
            width={80}
            height={98}
            priority
          />
        </Link>
        <span className="product-name">
          <Link href={`/products/${item.id}`} replace onClick={close}>
            {item.name}
          </Link>
        </span>
      </div>
      <div className="info-wrapper">
        <div className="items-info">
          <div className="product-description">
            <p>Ціна</p>
            <span>{formatPriceUAH(item.price)}</span>
          </div>
          <div className="product-description">
            <p>Кількість</p>
            <div className="quantity-controls">
              <button
                onClick={() => decreaseCartQuantity(item.id)}
                disabled={getItemQuantity(item.id) === 1}
              >
                -
              </button>
              <span>{getItemQuantity(item.id)}</span>
              <button onClick={() => increaseCartQuantity(item.id)}>+</button>
            </div>
          </div>
          <div className="product-description">
            <p>Сума</p>
            <span>{formatPriceUAH(getItemQuantity(item.id) * item.price)}</span>
          </div>
        </div>
        <div className="icon-container">
          <div className=" flex justify-center items-center w-[41px] h-[41px]">
            {isFavorite(id) ? (
              <HeartWithShadowFilledIcon
                onClick={handleFavoriteIconClick}
                width={32}
                height={30}
                className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
              />
            ) : (
              <HeartWithShadowIcon
                onClick={handleFavoriteIconClick}
                width={32}
                height={30}
                className=" fill-yellow hover:scale-[128%] transition-transform duration-300"
              />
            )}
          </div>
          <button ref={trashButtonRef} onClick={handleRemoveClick}>
            <TrashIcon />
          </button>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmRemove}
            buttonRef={trashButtonRef}
          />
        </div>
      </div>
    </div>
  );
}
