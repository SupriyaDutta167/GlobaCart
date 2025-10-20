// Path: frontend/src/context/AuthContext.jsx
import React, { createContext, useContext } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      return res.data; // backend user object
    } catch (err) {
      throw err.response?.data || 'Login failed';
    }
  };

  const register = async (userData) => {
    try {
      const res = await registerUser(userData);
      return res.data;
    } catch (err) {
      throw err.response?.data || 'Registration failed';
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUser();
      return res.data;
    } catch (err) {
      throw err.response?.data || 'Logout failed';
    }
  };

  const getUser = async () => {
    try {
      const res = await getCurrentUser();
      return res.data;
    } catch (err) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
