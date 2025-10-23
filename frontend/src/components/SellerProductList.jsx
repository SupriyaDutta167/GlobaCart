import React from 'react';

export default function SellerProductList({ products, onDelete }) {
  if (products.length === 0) {
    return <p>You have not added any products yet.</p>;
  }

  return (
    <div className="seller-product-list">
      {products.map(product => (
        <div key={product.id} className="seller-product-item">
          <img src={product.imageUrl || 'https://via.placeholder.com/100'} alt={product.name} />
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>Price: ${product.discountPrice || product.originalPrice}</p>
            <p>Stock: {product.quantity}</p>
          </div>
          <div className="product-actions">
            <button className="btn-edit" onClick={() => alert('Edit not implemented yet')}>Edit</button>
            <button className="btn-delete" onClick={() => onDelete(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}