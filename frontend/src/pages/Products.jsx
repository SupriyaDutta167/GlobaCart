import React, { useEffect, useState } from 'react';
import { listProducts } from '../services/productAPI';
import ProductCard from '../components/ProductCard';
import './PageStyle/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
    // Implement actual cart logic later
  };

  const handleBuyNow = (product) => {
    alert(`Buying ${product.name}...`);
    // Redirect to checkout or cart page later
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
