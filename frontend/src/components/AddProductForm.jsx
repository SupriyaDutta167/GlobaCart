import React, { useState } from 'react';

// Form fields based on your ProductDTO
const initialState = {
  name: '',
  company: '',
  category: '',
  originalPrice: 0,
  discountPrice: 0,
  discountPercent: 0,
  description: '',
  quantity: 0,
  imageUrl: ''
};

export default function AddProductForm({ onSubmit }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!form.name || !form.category || form.originalPrice <= 0 || form.quantity <= 0) {
      setError('Please fill in all required fields (Name, Category, Price, Quantity).');
      return;
    }

    // Call the parent's submit function
    onSubmit(form);
    setForm(initialState); // Reset form
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      
      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Brand/Company" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" />
      
      <div className="form-row">
        <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="Original Price" />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
      </div>
      
      <div className="form-row">
        <input name="discountPrice" type="number" value={form.discountPrice} onChange={handleChange} placeholder="Discount Price (Optional)" />
        <input name="discountPercent" type="number" value={form.discountPercent} onChange={handleChange} placeholder="Discount % (Optional)" />
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
}