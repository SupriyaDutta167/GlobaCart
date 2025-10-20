// Path: frontend/src/services/authAPI.js
import api from './api'; // your axios instance or similar

// Registration: { username, email, password }
export const registerUser = (userData) => {
  return api.post('/auth/register', userData, { withCredentials: true });
};

// Login: { email, password }
export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials, { withCredentials: true });
};

// Logout
export const logoutUser = () => {
  return api.post('/auth/logout', {}, { withCredentials: true });
};

// Get current user
export const getCurrentUser = () => {
  return api.get('/auth/me', { withCredentials: true });
};
