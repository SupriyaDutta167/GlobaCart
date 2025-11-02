import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartAPI from '../services/cartAPI';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // --- 1. Fetch Cart when User Logs In ---
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // User logged out, clear the cart
      setItems([]);
    }
  }, [user]);

  // --- 2. Helper to Fetch/Re-fetch Cart ---
  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await cartAPI.getCart(user.id);
      setItems(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  // --- 3. API-driven Cart Functions ---

  const addItem = async (productId, qty = 1) => {
    if (!user) {
      setError('Please log in to add items to your cart.');
      return;
    }
    setLoading(true);
    try {
      await cartAPI.addToCart(user.id, productId, qty);
      await fetchCart(); // Refresh cart from backend
    } catch (err) {
      setError(err.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (productId, qty) => {
    if (!user) return;
    setLoading(true);
    try {
      await cartAPI.updateCartItem(user.id, productId, qty);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError(err.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!user) return;
    setLoading(true);
    try {
      await cartAPI.removeFromCart(user.id, productId);
      await fetchCart(); // Refresh cart
    } catch (err) {
      setError(err.message || 'Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    // Backend clears cart on order creation, so this is for manual clear
    if (!user) return;
    setLoading(true);
    try {
      // Loop and remove each item
      for (const item of items) {
        await cartAPI.removeFromCart(user.id, item.product.id);
      }
      setItems([]); // Set locally to empty
    } catch (err) {
      setError(err.message || 'Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (shippingDetails) => {
    if (!user) {
      setError('Please log in to place an order.');
      throw new Error('User not logged in');
    }
    setLoading(true);
    try {
      const res = await cartAPI.createOrder(user.id, shippingDetails);
      setItems([]); // Order successful, clear cart locally
      return res.data; // Return the new order
    } catch (err) {
      setError(err.message || 'Failed to create order');
      throw err; // Re-throw for the Checkout page to handle
    } finally {
      setLoading(false);
    }
  };

  // --- 4. Subtotal Calculation ---
  // The 'items' array now holds CartItemDTOs
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.originalPrice;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        createOrder,
        subtotal,
        loading,
        error,
        itemCount: items.length, // Use this for the navbar badge
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
