// Path: frontend/src/pages/admin/AddProduct.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addProduct } from '../../services/productAPI';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    company: '',
    category: '',
    original_price: '',
    discount_price: '',
    discount_percent: '',
    description: '',
    quantity: '',
    image_url: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("Login first as seller");
    try {
      await addProduct(user.id, form);
      alert('Product added!');
      navigate('/seller/dashboard');
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', textTransform: 'capitalize' }}>{key.replace('_', ' ')}:</label>
            <input
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
