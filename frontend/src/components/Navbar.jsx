// Updated Navbar.jsx with Search Bar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ComponentStyle/Navbar.css';
import favicon from "../assets/GlobaCart-favicon.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality here
      console.log('Searching for:', searchQuery);
      // You can navigate to search results page or filter products
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo"
          aria-label="GlobaCart - Go to homepage"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="navbar-title">
            <img src={favicon} alt="GlobaCart Logo" className="navbar-favicon" />
            <span>GlobaCart</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/products" 
            className="navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
          
          <Link 
            to="/cart" 
            className="navbar-cart"
            aria-label={`Shopping cart with ${itemCount} items`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="cart-badge">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="navbar-user">
              <Link 
                to="/profile" 
                className="user-greeting"
                title={`Go to profile for ${user.username || user.email}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👤 {user.username || user.email.split('@')[0]}
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
              <Link 
                to="/login" 
                className="navbar-btn navbar-btn-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="navbar-btn navbar-btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}