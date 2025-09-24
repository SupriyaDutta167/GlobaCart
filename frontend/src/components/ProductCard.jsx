import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 flex flex-col">
      <img src={product.imageUrl || '/assets/no-image.png'} alt={product.name} className="h-40 object-cover mb-3" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm flex-1">{product.description?.slice(0, 90)}...</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="font-bold">₹{product.price}</div>
        <Link to={`/product/${product.id}`} className="text-sm px-3 py-1 border rounded">View</Link>
      </div>
    </div>
  );
}
