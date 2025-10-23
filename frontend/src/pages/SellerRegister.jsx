// Path: frontend/src/pages/SellerRegister.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Register.css'; // Reusing the same styles

export default function SellerRegister() {
  const [form, setForm] = useState({ username: '', email: '', password: '' }); // Fixed
  const [error, setError] = useState(''); // Fixed
  const { registerSeller } = useAuth(); // Fixed
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerSeller(form); // Using registerSeller
      navigate('/login'); // redirect to login, they can now log in as a seller
    } catch (err) {
      setError(err || 'Seller registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Become a Seller</h2>
        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Create your seller account
        </p>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Store Name (Username)"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Business Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register as Seller</button>
        </form>

        <div className="register-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#007bff' }}>
              Login here
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}