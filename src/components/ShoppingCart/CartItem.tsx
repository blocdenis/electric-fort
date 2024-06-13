'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import notFoundImage from '@/../public/notFound.jpg';
import Image from 'next/image';
import { products } from '@/lib/db/products';
import { HeartWithShadowFilledIcon, HeartWithShadowIcon } from '../icons';
import TrashIcon from '../icons/TrashIcon';
import { formatPriceUAH } from '@/services/formatCurrency';
import {
  addFavorites,
  deleteFavorites,
  getFavorites,
} from '@/services/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
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
  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div key={item.id} className="cart-item">
      <div className="product-info">
        <Image
          className=""
          src={item.images ? item.images : notFoundImage}
          alt={`${item.name} image`}
          width={80}
          height={98}
          priority
        />
        <span className="product-name">{item.name}</span>
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
              <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
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
          <button onClick={() => removeFromCart(item.id)}>
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
