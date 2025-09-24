import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const save = (next) => {
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const addItem = (product, qty = 1) => {
    const exists = items.find(i => i.product.id === product.id);
    if (exists) {
      save(items.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
    } else {
      save([...items, { product, qty }]);
    }
  };

  const updateItem = (productId, qty) => {
    save(items.map(i => i.product.id === productId ? { ...i, qty } : i));
  };

  const removeItem = (productId) => {
    save(items.filter(i => i.product.id !== productId));
  };

  const clear = () => {
    save([]);
  };

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
