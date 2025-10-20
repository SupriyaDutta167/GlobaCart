// Path: frontend/src/services/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // backend base URL
  withCredentials: true,               // send cookies for session-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Customize error object to return backend message
    const err = error.response?.data || error.message || 'An error occurred';
    return Promise.reject(err);
  }
);

export default api;
