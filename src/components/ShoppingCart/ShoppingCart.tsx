import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './ShoppingCart.scss';
import { CartItem } from './CartItem';
import { applyDiscount, discounts } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';
import { EmptyCart } from '../icons';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

const ShoppingCart = () => {
  const { cartItems, cartQuantity, closeCart } = useShoppingCart();
  const { products } = useProducts();
  const calculateTotal = () => {
    const total = cartItems?.reduce((total, cartItem) => {
      const item = products.find((i) => i.id === cartItem.id);
      const itemPrice = item?.price || 0;
      const itemQuantity = cartItem.number || 0; // Ensure cartItem.number is defined

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
  );
};

export default ShoppingCart;
