import React from 'react';
import { Link } from 'react-router-dom';
import './ComponentStyle/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="brand-section">
                <Link to="/" className="footer-logo">
                  GlobaCart
                </Link>
                <div className="brand-underline"></div>
              </div>
              <p className="footer-description">
                Discover authentic cultural treasures from around the world. 
                Connecting communities through curated artisan goods and traditional crafts.
              </p>
              <div className="social-links">
                <a 
                  href="#" 
                  className="social-link facebook"
                  aria-label="Facebook"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="social-link instagram"
                  aria-label="Instagram"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="social-link twitter"
                  aria-label="Twitter"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="social-link youtube"
                  aria-label="YouTube"
                >
                  <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/products" className="footer-link">
                    <span className="link-bullet blue"></span>
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer-link">
                    <span className="link-bullet blue"></span>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="footer-link">
                    <span className="link-bullet blue"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    <span className="link-bullet blue"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/help" className="footer-link">
                    <span className="link-bullet purple"></span>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="footer-link">
                    <span className="link-bullet purple"></span>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="footer-link">
                    <span className="link-bullet purple"></span>
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link">
                    <span className="link-bullet purple"></span>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h3 className="newsletter-heading">Stay Connected</h3>
            <p className="newsletter-description">
              Get the latest updates on new arrivals, cultural stories, and exclusive artisan collections.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {new Date().getFullYear()} GlobaCart — cultural goods marketplace. All rights reserved.
            </div>
            <div className="legal-links">
              <Link to="/terms" className="legal-link">
                Terms of Service
              </Link>
              <Link to="/privacy" className="legal-link">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="legal-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}