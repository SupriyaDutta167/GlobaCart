// Path: frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [role, setRole] = useState('buyer'); // buyer | seller
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      const credentials = { ...form, role }; // include role
      const res = await login(credentials); // loginUser in AuthContext now supports role

      // Redirect based on returned role from backend
      if (res.role === 'SELLER') {
        navigate('/seller/dashboard', { replace: true });
      } else if (res.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true }); // buyer
      }
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left side logo is handled by CSS pseudo-elements */}
        
        {/* Right Side Content */}
        <div className="login-right-section">
          {/* Role Toggle Section at Top */}
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

          {/* Login Content */}
          <div className="login-content">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">
                Sign in to your {role === 'seller' ? 'Seller' : 'GlobaCart'} account
              </p>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠</span>
                {error}
              </div>
            )}

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
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                <span className="button-text">
                  {loading ? 'Signing In...' : 'Sign In'}
                </span>
                <span className="button-icon">→</span>
              </button>
            </form>

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