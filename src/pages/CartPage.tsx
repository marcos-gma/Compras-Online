import React from 'react';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext.tsx';

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  // If cart is Product[], map it to CartItem[]
  const cartItems = cart.map((product: any) => ({
    product,
    quantity: 1, // or use the actual quantity if available
  }));

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <Cart items={cartItems} onRemove={removeFromCart} />
    </div>
  );
};

export default CartPage;