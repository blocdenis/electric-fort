import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './ShoppingCart.scss';

import { CartItem } from './CartItem';
import { products } from '@/lib/db/products';
import { applyDiscount } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';
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
            <h2>Кошик</h2>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="checkout-container">
              <span>До сплати {formatPriceUAH(calculateTotal())}</span>
              <span className="discount">
                Вартість зі знижкою{' '}
                {formatPriceUAH(applyDiscount(calculateTotal()))}
              </span>
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
            <h2>кошик порожній</h2>
            <h1>Ви ще не додали жодного товару</h1>
            <button>Назад до покупок</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
