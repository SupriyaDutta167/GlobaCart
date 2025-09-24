import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productAPI';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      }
    };
    load();
  }, [id]);

  if (!product) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto">
      {error && <div className="text-red-600">{error}</div>}
      <div className="flex gap-6">
        <img src={product.imageUrl || '/assets/no-image.png'} alt={product.name} className="w-96 h-96 object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="mt-2">{product.description}</p>
          <div className="mt-4 font-bold">₹{product.price}</div>
          <button onClick={() => addItem(product, 1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
