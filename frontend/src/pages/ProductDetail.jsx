import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- ADDED useNavigate
import { getProduct } from '../services/productAPI';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- ADDED
import Loader from '../components/Loader';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // <-- ADDED
  const { addItem } = useCart();
  const { user } = useAuth(); // <-- ADDED
  const navigate = useNavigate(); // <-- ADDED
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

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addItem(product.id, quantity); // <-- MODIFIED
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  if (!product) return <Loader />;

  // Get the correct price to display
  const displayPrice = product.discountPrice || product.originalPrice;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.imageUrl || 'https://placehold.co/400x400/eee/ccc?text=No+Image'} alt={product.name} className="w-full md:w-96 h-96 object-cover rounded-lg shadow-md" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-600 mt-1">{product.company}</p>
          <p className="mt-4 text-gray-800">{product.description}</p>
          
          <div className="mt-4">
            <span className="text-3xl font-bold text-blue-600">₹{displayPrice.toFixed(2)}</span>
            {product.discountPrice && (
              <span className="ml-2 text-lg line-through text-gray-500">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <div className="mt-6 flex items-center gap-4">
            <label htmlFor="quantity" className="font-medium">Quantity:</label>
            <input 
              type="number" 
              id="quantity"
              min="1" 
              max={product.quantity} // Set max quantity to stock
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button 
            onClick={handleAddToCart} 
            className="mt-6 w-full px-4 py-3 bg-blue-600 text-white rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-200"
            disabled={product.quantity === 0} // Disable if out of stock
          >
            {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
