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
  getCartItemByID,
  getFavorites,
} from '@/services/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ConfirmationModal from './ConfirmationalModal';
import { useState, useRef } from 'react';
type CartItemProps = {
  id: number;
  close: any;
};

export function CartItem({ id, close }: CartItemProps) {
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
    addToCart,
    cartQuantity,
    cartItems,
    decreaseFromCart,
  } = useShoppingCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const trashButtonRef = useRef(null);
  const { data: item } = useQuery({
    queryKey: ['cartItem', id],
    queryFn: () => getCartItemByID(id),
    staleTime: 10 * 1000,
  });
  if (item == null) return null;
  const handleRemoveClick = () => {
    setIsModalOpen(true);
  };
  const handleDecrease = () => {
    decreaseFromCart(id);
  };

  const handleConfirmRemove = () => {
    removeFromCart(id);
    setIsModalOpen(false);
  };
  const increaseCartQuantity = () => {
    addToCart(id);
  };

  const cartItem = cartItems?.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.number : 1;

  const total = (price: number | undefined, quantity: number): number => {
    if (price === undefined) {
      return 0; // Если цена не определена, вернем 0
    }
    return price * quantity;
  };
  const cartItemPrice = cartItem?.price;
  const quantitys = cartItem?.number ?? 1;
  // console.log(total(cartItemPrice, quantitys));

  return (
    <div key={cartItem?.id} className="cart-item">
      <div className="product-info">
        <Link href={`/${cartItem?.id}`} replace onClick={close}>
          <Image
            className="image"
            src={
              cartItem?.images
                ? `data:${cartItem?.images[0][0]}; base64, ${cartItem?.images[0][1]}`
                : notFoundImage
            }
            alt={`${cartItem?.name} image`}
            width={80}
            height={98}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
        <span className="product-name">
          <Link href={`/${cartItem?.id}`} replace onClick={close}>
            {cartItem?.name}
          </Link>
        </span>
      </div>
      <div className="info-wrapper">
        <div className="items-info">
          <div className="product-description">
            <p>Ціна</p>
            <span>{formatPriceUAH(cartItem?.price)}</span>
          </div>
          <div className="product-description">
            <p>Кількість</p>
            <div className="quantity-controls">
              <button
                onClick={() => handleDecrease()}
                // disabled={cartQuantity === 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => increaseCartQuantity()}>+</button>
            </div>
          </div>
          <div className="product-description">
            <p>Сума</p>
            <span>{formatPriceUAH(total(cartItemPrice, quantitys))}</span>
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
