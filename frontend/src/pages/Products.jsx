import React, { useEffect, useState } from 'react';
import { listProducts } from '../services/productAPI';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function Products() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await listProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      }
    };
    load();
  }, []);

  if (!products) return <Loader />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {error && <div className="text-red-600">{error}</div>}
      {products.length === 0 && <div>No products yet</div>}
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
