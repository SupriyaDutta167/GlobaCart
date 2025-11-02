import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- ADDED
import { listProducts } from '../services/productAPI';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext'; // <-- ADDED
import { useAuth } from '../context/AuthContext'; // <-- ADDED
import './PageStyle/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart(); // <-- ADDED
  const { user } = useAuth(); // <-- ADDED
  const navigate = useNavigate(); // <-- ADDED

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
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    // We pass the product ID and quantity
    addItem(product.id, 1); // <-- MODIFIED
    alert(`Added ${product.name} to cart!`);
  };

  const handleBuyNow = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Add item and wait, then redirect
    await addItem(product.id, 1); // <-- MODIFIED
    navigate('/cart');
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
