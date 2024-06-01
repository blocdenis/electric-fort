import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './ShoppingCart.scss';
import { CartItem } from './CartItem';
import { products } from '@/lib/db/products';
import { applyDiscount, discounts } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';
import { EmptyCart } from '../icons';
import Link from 'next/link';
type ShoppingCartProps = {
  isOpen: boolean;
};
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { cartItems, cartQuantity, closeCart } = useShoppingCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };
  return (
    <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
      <div className="cart-modal-content">
        <span className="close" onClick={closeCart}>
          &times;
        </span>

        {cartQuantity > 0 ? (
          <>
            <h2 className="cart-hero">Кошик</h2>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="checkout-container">
              <div className="checkout-info">
                <p>Сума</p> <span>{formatPriceUAH(calculateTotal())}</span>
              </div>
              <div className="checkout-info">
                <p>Знижка</p> <span>{discounts(calculateTotal())} %</span>
              </div>
              <div className="checkout-info">
                <p>До сплати</p>{' '}
                <span>{formatPriceUAH(applyDiscount(calculateTotal()))}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => console.log(cartItems)}
              >
                Оформити замовлення
              </button>
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
    </div>
  );
};

export default ShoppingCart;
