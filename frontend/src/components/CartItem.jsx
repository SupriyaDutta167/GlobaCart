import React from 'react';

export default function CartItem({ item, onUpdate, onRemove, deliveryDate }) {
  const { product, quantity } = item;
  const price = product.discountPrice || product.originalPrice;
  const totalPrice = price * quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        {/* Product Image */}
        <div className="product-image-container">
          <img 
            src={product.imageUrl || 'https://via.placeholder.com/100x100?text=No+Image'} 
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-company">by {product.company}</p>
          
          {/* Stock Status */}
          <div className="stock-status">
            {product.quantity > 0 ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Delivery Info */}
          {deliveryDate && (
            <div className="delivery-info">
              <span className="delivery-label">Delivery:</span>
              <span className="delivery-date">{deliveryDate}</span>
            </div>
          )}

          {/* Gift Options */}
          <div className="gift-options">
            <label className="gift-option">
              <input type="checkbox" />
              <span className="checkmark"></span>
              This is a gift
            </label>
          </div>

          {/* Actions */}
          <div className="item-actions">
            <div className="quantity-selector">
              <label htmlFor={`quantity-${product.id}`}>Qty:</label>
              <select 
                id={`quantity-${product.id}`}
                value={quantity}
                onChange={(e) => onUpdate(product.id, Number(e.target.value))}
                className="quantity-dropdown"
              >
                {[...Array(Math.min(10, product.quantity))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="action-buttons">
              <button 
                onClick={() => onRemove(product.id)}
                className="delete-btn"
              >
                Delete
              </button>
              <button className="save-btn">Save for later</button>
              <button className="compare-btn">Compare with similar items</button>
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className="product-pricing">
          <div className="price-amount">₹{price.toFixed(2)}</div>
          {product.discountPrice && (
            <div className="original-price">₹{product.originalPrice.toFixed(2)}</div>
          )}
          <div className="total-price">₹{totalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}