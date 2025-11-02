// Path: frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerRegister from './pages/SellerRegister'; // <-- 1. IMPORT
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader'; // <-- Loader import
import { useAuth } from './context/AuthContext';

// Seller Pages
import SellerDashboard from './pages/admin/SellerDashboard';
import AddProduct from './pages/admin/AddProduct';
import ProductDetailSeller from './pages/admin/ProductDetailSeller';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />; // <-- replaced Loading... with Loader

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          {/* Public routes */}
          {/* <Route path="/" element={<Home />} /> */}{/* <-- MODIFIED: This is now protected below */}
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller/register" element={<SellerRegister />} /> {/* <-- 2. ADD ROUTE */}

          {/* Protected routes */}
          {/* ADDED: Protected Home Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['USER', 'SELLER', 'ADMIN']}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={['USER', 'SELLER', 'ADMIN']}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={['USER']}>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['USER', 'SELLER', 'ADMIN']}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={['USER', 'SELLER', 'ADMIN']}>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Seller-only routes */}
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute allowedRoles={['SELLER', 'ADMIN']}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/add-product"
            element={
              <ProtectedRoute allowedRoles={['SELLER']}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/product/:id"
            element={
              <ProtectedRoute allowedRoles={['SELLER']}>
                <ProductDetailSeller />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
