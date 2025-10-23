// Path: frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  registerUser as apiRegisterUser, // aliased to avoid name conflict
  registerSeller as apiRegisterSeller, // aliased
  logoutUser, 
  getCurrentUser 
} from '../services/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Fixed: removed extra '='
  const [loading, setLoading] = useState(true); // Fixed: removed extra '='

  // fetch user on page load
  useEffect(() => {
    (async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials); // This now correctly calls the right API endpoint
    setUser(res.data);
    return res.data;
  };

  // Specific function for USER registration
  const registerUser = async (userData) => {
    const res = await apiRegisterUser(userData);
    setUser(res.data);
    return res.data;
  };

  // Specific function for SELLER registration
  const registerSeller = async (userData) => {
    const res = await apiRegisterSeller(userData);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const getUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data);
      return res.data;
    } catch {
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        registerUser, // renamed from 'register'
        registerSeller, // added
        logout, 
        getUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);