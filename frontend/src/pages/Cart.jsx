import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader'; // <-- Import Loader

export default function Cart() {
  const { items, updateItem, removeItem, subtotal, clearCart, loading } = useCart(); // <-- MODIFIED: added loading, renamed clear
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading && items.length === 0) {
    return <Loader />; // Show loader on initial load
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
      {items.length === 0 ? (
        <div>
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button onClick={() => navigate('/products')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(it => (
              <CartItem
                key={it.product.id}
                item={it} // 'it' is the CartItemDTO
                onUpdate={(id, qty) => updateItem(id, qty)}
                onRemove={(id) => removeItem(id)}
              />
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="text-xl font-medium text-gray-700">Subtotal:</span>
              <span className="text-2xl font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => clearCart()} // <-- MODIFIED
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout} 
                className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
