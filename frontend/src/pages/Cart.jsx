import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import './PageStyle/Cart.css';

export default function Cart() {
  const { items, updateItem, removeItem, subtotal, clearCart, loading } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Calculate delivery date (3-5 days from now)
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 3);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading && items.length === 0) {
    return <Loader />;
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        {items.length > 0 && (
          <div className="cart-subtitle">
            <span className="item-count">{items.length} items</span>
            <button className="deselect-all" onClick={clearCart}>Deselect all items</button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">Your Cart is Empty</h2>
            <p className="empty-cart-description">
              Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
            </p>
            <button 
              onClick={() => navigate('/products')} 
              className="continue-shopping-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Main Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <div className="price-header">Price</div>
            </div>
            
            <div className="cart-items-list">
              {items.map((item, index) => (
                <div key={item.product.id} className="cart-item-wrapper">
                  <CartItem
                    item={item}
                    onUpdate={(id, qty) => updateItem(id, qty)}
                    onRemove={(id) => removeItem(id)}
                    deliveryDate={getDeliveryDate()}
                  />
                </div>
              ))}
            </div>

            <div className="cart-subtotal-mobile">
              <div className="subtotal-text">Subtotal ({items.length} items):</div>
              <div className="subtotal-amount">₹{subtotal.toFixed(2)}</div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-section">
            <div className="order-summary-card">
              <div className="summary-header">
                <span className="summary-title">Order Summary</span>
              </div>
              
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal ({items.length} items):</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="free-shipping">FREE</span>
                </div>
                
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span className="total-amount">₹{subtotal.toFixed(2)}</span>
                </div>

                {subtotal > 0 && (
                  <div className="savings-banner">
                    <span className="savings-icon">🎉</span>
                    <span className="savings-text">Your order qualifies for FREE Shipping</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleCheckout} 
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>

              <div className="security-notice">
                <span className="lock-icon">🔒</span>
                <span>Secure transaction</span>
              </div>
            </div>

            {/* Additional Features */}
            <div className="additional-features">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <div className="feature-content">
                  <div className="feature-title">Free Delivery</div>
                  <div className="feature-description">Enjoy free delivery on orders above ₹499</div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">↩️</div>
                <div className="feature-content">
                  <div className="feature-title">Easy Returns</div>
                  <div className="feature-description">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}