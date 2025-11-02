import api from './api';

// --- Cart Endpoints ---

/**
 * Fetches the user's entire cart
 * @param {number} userId - The ID of the logged-in user
 */
export const getCart = (userId) => {
  return api.get(`/cart/${userId}`);
};

/**
 * Adds an item to the cart
 * @param {number} userId - The ID of the user
 * @param {number} productId - The ID of the product
 * @param {number} quantity - The quantity to add
 */
export const addToCart = (userId, productId, quantity) => {
  return api.post(`/cart/${userId}`, { productId, quantity });
};

/**
 * Updates the quantity of an item in the cart
 * @param {number} userId - The ID of the user
 * @param {number} productId - The ID of the product
 * @param {number} quantity - The new quantity
 */
export const updateCartItem = (userId, productId, quantity) => {
  // The backend endpoint uses a query param: /api/cart/{userId}/{productId}?quantity=5
  return api.put(`/cart/${userId}/${productId}?quantity=${quantity}`);
};

/**
 * Removes an item from the cart
 * @param {number} userId - The ID of the user
 * @param {number} productId - The ID of the product
 */
export const removeFromCart = (userId, productId) => {
  return api.delete(`/cart/${userId}/${productId}`);
};

// --- Order Endpoints ---

/**
 * Creates an order from the user's cart
 * @param {number} userId - The ID of the user
 * @param {object} shippingDetails - { shippingName, shippingAddressLine1, shippingCity, shippingPostalCode }
 */
export const createOrder = (userId, shippingDetails) => {
  return api.post(`/orders/${userId}`, shippingDetails);
};

/**
 * Fetches all past orders for a user
 * @param {number} userId - The ID of the user
 */
export const getOrderHistory = (userId) => {
  return api.get(`/orders/${userId}`);
};

