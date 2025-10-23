import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSellerProducts, addProduct, deleteProduct } from '../../services/productAPI';
import AddProductForm from '../../components/AddProductForm';
import SellerProductList from '../../components/SellerProductList';
 // You'll need to create this CSS file

export default function ManageProducts() {
  const { user } = useAuth(); // Get the logged-in user
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For success/error messages

  // Function to fetch the seller's products
  const fetchMyProducts = async () => {
    if (!user) return; // Don't fetch if user isn't loaded
    
    setLoading(true);
    try {
      // Use the API function from productAPI.js
      const products = await getSellerProducts(user.id); 
      setMyProducts(products);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts or user ID changes
  useEffect(() => {
    fetchMyProducts();
  }, [user]); // Dependency on user

  // Handler for adding a product
  const handleAddProduct = async (productData) => {
    if (!user) return;
    
    try {
      setMessage('Adding product...');
      // Use the API function from productAPI.js
      // The sellerId is the logged-in user's ID
      await addProduct(user.id, productData); 
      setMessage('Product added successfully!');
      fetchMyProducts(); // Refresh the product list
    } catch (err) {
      setMessage(err.message || 'Failed to add product');
    }
  };

  // Handler for deleting a product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setMessage('Deleting product...');
      // Use the new API function we added
      await deleteProduct(productId); 
      setMessage('Product deleted successfully!');
      fetchMyProducts(); // Refresh the product list
    } catch (err) {
      setMessage(err.message || 'Failed to delete product');
    }
  };

  if (!user || user.role !== 'SELLER') {
    return <div>You are not authorized to view this page.</div>;
  }
  
  if (loading) return <div>Loading your products...</div>;

  return (
    <div className="manage-products-container">
      <h2>Seller Dashboard</h2>
      {message && <div className="message">{message}</div>}
      
      <div className="dashboard-content">
        <div className="form-section">
          <h3>Add a New Product</h3>
          <AddProductForm onSubmit={handleAddProduct} />
        </div>
        
        <div className="list-section">
          <h3>My Products ({myProducts.length})</h3>
          {error && <div className="error-message">{error}</div>}
          <SellerProductList 
            products={myProducts} 
            onDelete={handleDeleteProduct} 
          />
        </div>
      </div>
    </div>
  );
}