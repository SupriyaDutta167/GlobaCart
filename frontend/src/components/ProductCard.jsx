import React, { useState, useEffect } from 'react';
import './ComponentStyle/ProductCard.css';
import Portal from './Portal'; // Add this import

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const discountPercent = product.discountPrice 
    ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="product-image-wrapper">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="product-image"
          />
          {discountPercent > 0 && (
            <div className="discount-badge">-{discountPercent}%</div>
          )}
          {product.quantity === 0 && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
        
        <div className="product-info">
          <p className="product-company">{product.company}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          
          <div className="product-price">
            <span className="current-price">₹{product.discountPrice || product.originalPrice}</span>
            {product.discountPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="product-quick-actions">
          <button 
            className="quick-add-btn"
            onClick={(e) => { 
              e.stopPropagation(); 
              onAddToCart(product); 
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Use Portal to render modal at body level */}
      {showModal && (
        <Portal>
          <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="modal-layout">
                <div className="modal-image-section">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="modal-image"
                  />
                  {discountPercent > 0 && (
                    <div className="modal-discount-badge">
                      <span className="discount-value">{discountPercent}%</span>
                      <span className="discount-label">OFF</span>
                    </div>
                  )}
                </div>

                <div className="modal-details-section">
                  <div className="modal-header">
                    <p className="modal-company">{product.company}</p>
                    <h2 className="modal-title">{product.name}</h2>
                    <span className="modal-category">{product.category}</span>
                  </div>

                  <div className="modal-pricing">
                    <div className="price-row">
                      <span className="modal-current-price">₹{product.discountPrice || product.originalPrice}</span>
                      {product.discountPrice && (
                        <span className="modal-original-price">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {discountPercent > 0 && (
                      <p className="savings-text">You save ₹{product.originalPrice - product.discountPrice}!</p>
                    )}
                  </div>

                  <div className="modal-info">
                    <div className="info-item">
                      <svg className="info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 7h-9M14 17H5M17 12H5"/>
                      </svg>
                      <div>
                        <span className="info-label">Description</span>
                        <p className="info-value">{product.description || 'No description available'}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <svg className="info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div>
                        <span className="info-label">Quantity Available</span>
                        <p className="info-value">{product.quantity} units</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <svg className="info-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {product.quantity > 0 ? (
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        ) : (
                          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        )}
                      </svg>
                      <div>
                        <span className="info-label">Availability</span>
                        <p className={`info-value ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button 
                      className="modal-btn modal-btn-primary"
                      onClick={() => { onBuyNow(product); handleClose(); }}
                      disabled={product.quantity === 0}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                      Buy Now
                    </button>
                    <button 
                      className="modal-btn modal-btn-secondary"
                      onClick={() => { onAddToCart(product); handleClose(); }}
                      disabled={product.quantity === 0}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}