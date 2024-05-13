import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './ShoppingCart.scss';

import { CartItem } from './CartItem';
type ShoppingCartProps = {
  isOpen: boolean;
};
const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { cartItems, cartQuantity, closeCart } = useShoppingCart();

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
            <div>
              <span>До сплати :</span>
              <span>Вартість зі знижкою : </span>
              <button>Оформити замовлення</button>
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
