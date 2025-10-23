import api from './api';

// Fetch all products (optional params for filtering/pagination)
export const listProducts = (params = {}) => {
  return api.get('/products/', { params }).then(res => res.data);
};

// Fetch single product by ID
export const getProduct = (id) => {
  return api.get(`/products/${id}`).then(res => res.data);
};

// Fetch products by seller
export const getSellerProducts = (sellerId) => api.get(`/products/seller/${sellerId}`).then(res => res.data);

// Add product by seller
export const addProduct = (sellerId, productData) => api.post(`/products/add/${sellerId}`, productData).then(res => res.data);

// --- ADD THIS FUNCTION ---
// Delete product by ID
export const deleteProduct = (productId) => {
  return api.delete(`/products/${productId}`).then(res => res.data);
};

// --- (Optional) ADD UPDATE FUNCTION ---
// You will need this for "update product" later
export const updateProduct = (productId, sellerId, productData) => {
  return api.put(`/products/update/${productId}/seller/${sellerId}`, productData).then(res => res.data);
};