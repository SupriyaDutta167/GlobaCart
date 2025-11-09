// Enhanced Register.jsx with World-Class Design
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Register.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Left Side - Brand Section */}
        <div className="register-left-section">
          <div className="brand-content">
            <div className="brand-logo">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 15L20 40L30 55L40 50L35 70L65 70L60 50L70 55L80 40L50 15Z" fill="white"/>
                <circle cx="50" cy="35" r="8" fill="#fbbf24"/>
              </svg>
            </div>
            <h1 className="brand-title">Join GlobaCart</h1>
            <p className="brand-subtitle">
              Become part of our global community and discover authentic cultural treasures 
              from artisans around the world.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"/>
                </svg>
                <span className="feature-text">Exclusive Member Deals</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="feature-text">Secure Account Protection</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                </svg>
                <span className="feature-text">Fast & Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="register-right-section">
          <div className="register-content">
            {/* Header */}
            <div className="register-header">
              <h2 className="register-title">Create Account</h2>
              <p className="register-subtitle">
                Join thousands of happy shoppers worldwide
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠</span>
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="register-button" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span className="button-text">Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span className="button-text">Create Account</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Register Divider */}
            <div className="divider">or sign up with</div>

            {/* Social Register Buttons */}
            <div className="social-register">
              <button type="button" className="social-btn google">
                <span>Google</span>
              </button>
              <button type="button" className="social-btn facebook">
                <span>Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <div className="register-footer">
              <p className="footer-text">
                Already have an account?{' '}
                <Link to="/login" className="footer-link">
                  Sign in here
                </Link>
              </p>
              <p className="footer-text" style={{ marginTop: '0.5rem' }}>
                Are you a seller?{' '}
                <Link to="/seller/register" className="footer-link">
                  Register as Seller
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}