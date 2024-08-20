import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './ShoppingCart.scss';
import { CartItem } from './CartItem';
import { applyDiscount, discounts } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';
import { ArrowCatalogIcon, EmptyCart } from '../icons';
// import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import ArrowCategoriesIcon from '../icons/BackButton';
import { Link } from '@/navigation';

const ShoppingCart = () => {
  const { cartItems, cartQuantity, closeCart } = useShoppingCart();
  const { products } = useProducts();
  console.log(cartItems);
  const calculateTotal = () => {
    const total = cartItems?.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === cartItem.id);
      const itemPrice = item?.price || 0;
      const itemQuantity = cartItem.number || 0;

      return total + itemPrice * itemQuantity;
    }, 0);

    return total !== undefined ? total.toFixed(2) : '0.00';
  };
  const totalAmount = parseFloat(calculateTotal());
  return (
    <div className="cart-modal-content">
      {cartQuantity > 0 ? (
        <>
          <h2 className="cart-hero">Кошик</h2>
          {cartItems?.map((item) => (
            <CartItem key={item.id} {...item} close={closeCart} />
          ))}
          <div className="flex flex-col gap-4">
            <div className="checkout-container">
              <div className="checkout-info">
                <p>Сума</p> <span>{calculateTotal()}</span>
              </div>
              <div className="checkout-info">
                <p>Знижка</p> <span>{discounts(totalAmount)} %</span>
              </div>
              <div className="checkout-info">
                <p>До сплати</p>{' '}
                <span>{formatPriceUAH(applyDiscount(totalAmount))}</span>
              </div>
            </div>
            <div className="flex flex-row justify-between content-start">
              <button
                onClick={closeCart}
                className="flex flex-row gap-3 items-center "
              >
                <ArrowCatalogIcon rotation={180} fill="white" />
                <Link href={'/'}>Продовжити покупки</Link>
              </button>
              <button className="checkout-btn" onClick={closeCart}>
                <Link href={'/order'}>Оформити замовлення</Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="empty-cart">
            <EmptyCart />

            <div className="empty-cart-container">
              <h2 className="cart-hero">Кошик порожній</h2>
              <h1>Ви ще не додали жодного товару в кошик...</h1>
            </div>
          </div>
          <div className="btn">
            <button className="checkout-btn" onClick={closeCart}>
              <Link href={'/'}>Назад до покупок</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
