import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">GlobaCart</Link>
        <div className="flex items-center gap-4">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({items.length})</Link>
          {user ? (
            <>
              <Link to="/profile">Hi, {user.name || user.email}</Link>
              <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 border rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
