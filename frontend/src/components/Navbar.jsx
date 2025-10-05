// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ComponentStyle/Navbar.css';
import favicon from "../assets/GlobaCart-favicon.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo"
          aria-label="GlobaCart - Go to homepage"
        >
          <span className="navbar-title"><img src={favicon} alt="GlobaCart Logo" className="navbar-favicon" />GlobaCart</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          
          <Link 
            to="/cart" 
            className="navbar-cart"
            aria-label={`Shopping cart with ${items.length} items`}
          >
            Cart
            {items.length > 0 && (
              <span className="cart-badge">
                {items.length > 99 ? '99+' : items.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="navbar-user">
              <Link 
                to="/profile" 
                className="navbar-link user-greeting"
                title={`Go to profile for ${user.name || user.email}`}
              >
                Hi, {user.name || user.email.split('@')[0]}
              </Link>
              <button 
                onClick={handleLogout} 
                className="navbar-btn navbar-btn-secondary"
                aria-label="Logout from your account"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-btn navbar-btn-text">
                Login
              </Link>
              <Link to="/register" className="navbar-btn navbar-btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
