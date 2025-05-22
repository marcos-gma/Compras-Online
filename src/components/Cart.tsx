import React from 'react';
import './Cart.css';
import type { CartItem } from '../types/types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    // ...dentro do seu componente Cart
<div className="cart-container">
  <h2 className="cart-title">Shopping Cart</h2>
  {items.length === 0 ? (
    <p className="cart-empty">Your cart is empty.</p>
  ) : (
    <div className="cart-grid">
      <div>
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.product.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>${item.product.price.toFixed(2)} x {item.quantity}</p>
                  <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.product.id)}
                className="cart-remove-btn"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <h3 className="cart-summary-title">Order Summary</h3>
        <div className="cart-summary-row">
          <span>Items:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="cart-summary-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="cart-checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default Cart;