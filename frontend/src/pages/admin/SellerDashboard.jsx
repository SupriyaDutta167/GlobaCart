// Path: frontend/src/pages/admin/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSellerProducts } from '../../services/productAPI';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.id) {
      getSellerProducts(user.id)
        .then(setProducts)
        .catch(console.error);
    }
  }, [user]);

  if (!user) return <p>Please log in as a seller.</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>Welcome, {user.username} (Seller Dashboard)</h2>
      <Link to="/seller/add-product">➕ Add New Product</Link>

      <h3>Your Products</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map(p => (
          <div key={p.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center'
          }}>
            <img src={p.image_url || '/default.jpg'} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h4>{p.name}</h4>
            <p>{p.category}</p>
            <p><b>₹{p.discount_price || p.original_price}</b></p>
            <Link to={`/seller/product/${p.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
