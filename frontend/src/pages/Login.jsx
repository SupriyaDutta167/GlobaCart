import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form); // pass { username, password } to login
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data || 'Login failed'); // Spring backend error
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your GlobaCart account</p>
        </div>
        
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              id="username"
              name="username" 
              type="text" 
              placeholder="Enter your username" 
              value={form.username} 
              onChange={handleChange} 
              className="form-input"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
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
          
          <button type="submit" className="login-button">
            <span className="button-text">Sign In</span>
            <span className="button-icon">→</span>
          </button>
        </form>
        
        <div className="login-footer">
          <p className="footer-text">
            Don't have an account? 
            <a href="/register" className="footer-link">Create one here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
