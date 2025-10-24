// Path: frontend/src/pages/admin/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSellerProducts } from '../../services/productAPI';
import { Link } from 'react-router-dom';
import './adminStyles/SellerDashboard.css';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getSellerProducts(user.id)
        .then(setProducts)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="seller-dashboard">
        <div className="empty-state">
          <div className="empty-state-icon">🔒</div>
          <h3>Access Denied</h3>
          <p>Please log in as a seller to access this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h2>Welcome back, {user.username}! 👋</h2>
            <p>Manage your products and grow your business</p>
          </div>
          <div className="header-actions">
            <Link to="/seller/add-product" className="add-product-btn">
              Add New Product
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="section-header">
          <h3>Your Products</h3>
          <span className="product-count">{products.length} Products</span>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h3>No Products Yet</h3>
            <p>Start adding products to build your inventory</p>
            <Link to="/seller/add-product" className="add-product-btn">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={p.imageUrl || '/default.jpg'} 
                    alt={p.name} 
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <Link to={`/seller/product/${p.id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h4 className="product-name">{p.name}</h4>
                  <span className="product-category">{p.category}</span>
                  <div className="product-price">
                    <p className="current-price">₹{p.discountPrice || p.originalPrice}</p>
                    {p.discountPrice && (
                      <p className="original-price">₹{p.originalPrice}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;