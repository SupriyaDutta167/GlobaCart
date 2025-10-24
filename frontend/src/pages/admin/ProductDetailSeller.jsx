// Path: frontend/src/pages/admin/ProductDetailSeller.jsx
import React, { useEffect, useState } from 'react';
import { getProduct } from '../../services/productAPI';
import { useParams } from 'react-router-dom';

const ProductDetailSeller = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  // --- FIX: Use camelCase (e.g., product.imageUrl) ---
  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h2>{product.name}</h2>
      <p><b>Company:</b> {product.company}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Original Price:</b> ₹{product.originalPrice}</p>
      <p><b>Discount Price:</b> ₹{product.discountPrice}</p>
      <p><b>Discount %:</b> {product.discountPercent}%</p>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Available Quantity:</b> {product.quantity}</p>
    </div>
  );
};

export default ProductDetailSeller;