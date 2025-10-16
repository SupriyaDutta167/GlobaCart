import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/auth';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor to add Authorization header for requests after login (Basic Auth)
api.interceptors.request.use(config => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password'); // store temporarily for basic auth
  if (username && password) {
    const token = btoa(`${username}:${password}`); // Base64 encode
    config.headers.Authorization = `Basic ${token}`;
  }
  return config;
});

export default api;
