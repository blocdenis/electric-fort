'use client';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import React from 'react';
import './OrderForm.scss';
import { useProducts } from '@/hooks/useProducts';
import { CartItem } from '../ShoppingCart/CartItem';
import { applyDiscount, discounts } from '@/services/applyDiscount';
import { formatPriceUAH } from '@/services/formatCurrency';

const OrderCart = () => {
  const { cartItems, closeCart } = useShoppingCart();
  const { products } = useProducts();
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
      <>
        <h2 className="cart-hero">Ваше замовлення</h2>
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
        </div>
      </>
    </div>
  );
};

export default OrderCart;
