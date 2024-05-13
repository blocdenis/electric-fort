'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import notFoundImage from '@/../public/notFound.jpg';
import Image from 'next/image';
import { products } from '@/lib/db/products';
import { HeartWithShadowIcon } from '../icons';
import TrashIcon from '../icons/TrashIcon';
import { formatPriceUAH } from '@/services/formatCurrency';
type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const {
    removeFromCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    getItemQuantity,
  } = useShoppingCart();
  const item = products.find((i) => i.id === id);
  if (item == null) return null;
  console.log(quantity);
  return (
    <div key={item.id} className="cart-item">
      <Image
        className=""
        src={item.image ? item.image : notFoundImage}
        alt={`${item.name} image`}
        width={80}
        height={98}
        priority
      />
      <span className="product-name">{item.name}</span>
      <span>{formatPriceUAH(item.price)}</span>
      <div className="quantity-controls">
        <button onClick={() => decreaseCartQuantity(item.id)}>-</button>
        <span>{getItemQuantity(item.id)}</span>
        <button onClick={() => increaseCartQuantity(item.id)}>+</button>
      </div>
      <span>{formatPriceUAH(getItemQuantity(item.id) * item.price)}</span>
      <div className="icon-container">
        <HeartWithShadowIcon
          width={41}
          height={41}
          className="fill-yellow hover:scale-[128%] transition-transform duration-300"
        />
        <button onClick={() => removeFromCart(item.id)}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
