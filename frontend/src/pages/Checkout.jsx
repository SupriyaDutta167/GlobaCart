import React from 'react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, subtotal } = useCart();

  const handlePlaceOrder = () => {
    alert('Checkout flow not implemented yet. Hook this to your backend payment API.');
  };

  if (items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Checkout</h2>
      <div className="border p-4 rounded">
        <div>Items: {items.length}</div>
        <div className="mt-2 font-bold">Total: ₹{subtotal.toFixed(2)}</div>
        <button onClick={handlePlaceOrder} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Place Order (demo)</button>
      </div>
    </div>
  );
}
