// Path: frontend/src/services/authAPI.js
import api from './api';

// Registration (USER)
export const registerUser = (userData) => {
  return api.post('/auth/register/user', userData, { withCredentials: true });
};

// Registration (SELLER)
export const registerSeller = (userData) => {
  return api.post('/auth/register/seller', userData, { withCredentials: true });
};

// Login (handles both roles)
export const loginUser = (credentials) => {
  // credentials: { email, password, role }
  if (credentials.role === 'seller') { // 'seller' matches your Login.jsx state
    return api.post('/auth/login/seller', credentials, { withCredentials: true });
  }
  // Default to user login
  return api.post('/auth/login/user', credentials, { withCredentials: true });
};

// Logout
export const logoutUser = () => {
  return api.post('/auth/logout', {}, { withCredentials: true });
};

// Get current user
export const getCurrentUser = () => {
  return api.get('/auth/me', { withCredentials: true });
};