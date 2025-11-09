// Enhanced Login.jsx with Improved Features
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const credentials = { ...form, role };
      const res = await login(credentials);

      // Redirect based on returned role from backend
      if (res.role === 'SELLER') {
        navigate('/seller/dashboard', { replace: true });
      } else if (res.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side - Brand Section */}
        <div className="login-left-section">
          <div className="brand-content">
            <div className="brand-logo">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 15L20 40L30 55L40 50L35 70L65 70L60 50L70 55L80 40L50 15Z" fill="white"/>
                <circle cx="50" cy="35" r="8" fill="#fbbf24"/>
              </svg>
            </div>
            <h1 className="brand-title">Welcome to GlobaCart</h1>
            <p className="brand-subtitle">
              Your gateway to authentic cultural treasures from around the world. 
              Shop with confidence and discover unique artisan goods.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="feature-text">Secure & Trusted Shopping</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
                <span className="feature-text">Global Artisan Products</span>
              </div>
              <div className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="feature-text">Fast Worldwide Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right-section">
          <div className="login-content">
            {/* Role Toggle */}
            <div className="role-toggle-container">
              <div className={`role-toggle ${role === 'seller' ? 'seller-active' : ''}`}>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === 'buyer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>🛒 Buyer</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === 'seller'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>🏪 Seller</span>
                </label>
              </div>
            </div>

            {/* Header */}
            <div className="login-header">
              <h2 className="login-title">Sign In</h2>
              <p className="login-subtitle">
                Access your {role === 'seller' ? 'Seller' : 'Shopping'} account
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠</span>
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
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
                    placeholder="Enter your password"
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
                className="login-button" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span className="button-text">Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="button-text">Sign In</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Login Divider */}
            <div className="divider">or continue with</div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button type="button" className="social-btn google">
                <span>Google</span>
              </button>
              <button type="button" className="social-btn facebook">
                <span>Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <div className="login-footer">
              {role === 'buyer' ? (
                <p className="footer-text">
                  Don't have an account?{' '}
                  <Link to="/register" className="footer-link">
                    Create one here
                  </Link>
                </p>
              ) : (
                <p className="footer-text">
                  Not a seller yet?{' '}
                  <Link to="/seller/register" className="footer-link">
                    Register as a Seller
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}