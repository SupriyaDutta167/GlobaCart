import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader'; // <-- Import Loader
import './PageStyle/Cart.css'; // <-- Add this import

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
    <div className="max-w-4xl mx-auto p-4 cart-container">
      <div className="cart-header">
        <h2 className="text-3xl font-bold mb-6 cart-title">
          Shopping Cart
          {items.length > 0 && (
            <span className="cart-item-count">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </h2>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart-wrapper">
          <div className="empty-cart-icon">🛒</div>
          <p className="text-xl text-gray-600 empty-cart-text">Your cart is empty</p>
          <button onClick={() => navigate('/products')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 cart-items-list">
            {items.map((it, index) => (
              <div key={it.product.id} className="cart-item-wrapper" style={{'--item-index': index}}>
                <CartItem
                  item={it} // 'it' is the CartItemDTO
                  onUpdate={(id, qty) => updateItem(id, qty)}
                  onRemove={(id) => removeItem(id)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow cart-summary">
            <div className="promo-banner">
              🎉 Free shipping on orders over ₹500!
            </div>
            
            <div className="summary-stats">
              <div className="stat-card">
                <span className="stat-value">{items.length}</span>
                <span className="stat-label">Items</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">₹0</span>
                <span className="stat-label">Shipping</span>
              </div>
            </div>
            
            <div className="summary-content">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-700 subtotal-label">Total:</span>
                <span className="text-2xl font-bold subtotal-amount">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <p className="tax-info">Taxes and shipping calculated at checkout</p>
            </div>
            
            <div className="flex gap-2 mt-4 action-buttons">
              <button 
                onClick={handleCheckout} 
                className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 checkout-btn"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => clearCart()} // <-- MODIFIED
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="security-badge">
              <span className="security-icon">🔒</span>
              <span>Secure 256-bit SSL Checkout</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}