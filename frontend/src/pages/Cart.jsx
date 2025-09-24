import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { items, updateItem, removeItem, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <>
          <div className="space-y-2">
            {items.map(it => (
              <CartItem
                key={it.product.id}
                item={it}
                onUpdate={(id, qty) => updateItem(id, qty)}
                onRemove={(id) => removeItem(id)}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="font-bold">Subtotal: ₹{subtotal.toFixed(2)}</div>
            <div className="flex gap-2">
              <button onClick={() => clear()} className="px-4 py-2 border rounded">Clear</button>
              <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
