// Path: frontend/src/pages/admin/AddProduct.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addProduct } from '../../services/productAPI';
import { useNavigate } from 'react-router-dom';

// Helper to format labels from camelCase
const formatLabel = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // --- 1. Use camelCase keys to match backend ---
  const [form, setForm] = useState({
    name: '',
    company: '',
    category: '',
    originalPrice: '', // Keep as string for input control
    discountPrice: '', // Keep as string for input control
    discountPercent: '', // Keep as string for input control
    description: '',
    quantity: '', // Keep as string for input control
    imageUrl: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("Login first as seller");

    // --- 2. Create a payload with correct types (Number, not String) ---
    // Your backend expects Doubles/Integers, not strings
    const payload = {
      ...form,
      originalPrice: parseFloat(form.originalPrice) || null,
      // Set optional fields to null if empty, not 0
      discountPrice: parseFloat(form.discountPrice) || null,
      discountPercent: parseFloat(form.discountPercent) || null,
      quantity: parseInt(form.quantity) || 0,
    };
    
    // Basic validation
    if (!payload.name || !payload.originalPrice || payload.quantity <= 0) {
       alert('Name, Original Price, and Quantity (must be > 0) are required.');
       return;
    }

    try {
      // --- 3. Send the corrected payload ---
      await addProduct(user.id, payload);
      alert('Product added!');
      // This route comes from your App.jsx
      navigate('/admin/manage-products'); 
    } catch (err) {
      alert('Error: ' + err.message || 'Failed to add product');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* --- 4. Map over camelCase keys --- */}
        {Object.keys(form).map((key) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', textTransform: 'capitalize' }}>
              {formatLabel(key)}:
            </label>
            <input
              // --- 5. Set input type correctly ---
              type={key.includes('Price') || key.includes('Percent') || key.includes('quantity') ? 'number' : 'text'}
              name={key} // name="originalPrice"
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