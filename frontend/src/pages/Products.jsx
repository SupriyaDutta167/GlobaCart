// Updated Products.jsx - Fixed alignment and removed default filtering
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../services/productAPI';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './PageStyle/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states - NO DEFAULT FILTERS
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]); // Increased max price
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Sample categories and data
  const categories = [
    { id: 'electronics', name: 'Electronics', count: 12 },
    { id: 'clothing', name: 'Clothing', count: 8 },
    { id: 'home', name: 'Home & Kitchen', count: 15 },
    { id: 'books', name: 'Books', count: 6 },
    { id: 'sports', name: 'Sports', count: 9 },
    { id: 'beauty', name: 'Beauty', count: 7 }
  ];

  const ratings = [
    { stars: 5, text: '5 Stars & Up', count: 23 },
    { stars: 4, text: '4 Stars & Up', count: 45 },
    { stars: 3, text: '3 Stars & Up', count: 67 },
    { stars: 2, text: '2 Stars & Up', count: 89 }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await listProducts();
        setProducts(data);
        setFilteredProducts(data); // Set filtered products to ALL products initially
        
        // Calculate max price for range
        if (data.length > 0) {
          const maxPrice = Math.max(...data.map(p => p.discountPrice || p.originalPrice || 0));
          setPriceRange([0, Math.ceil(maxPrice * 1.1)]); // 10% buffer
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters only when explicitly changed
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Only apply category filter if categories are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category?.toLowerCase())
      );
    }

    // Price filter - always apply but with wide default range
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.originalPrice || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Rating filter - only apply if rating is selected
    if (selectedRating > 0) {
      filtered = filtered.filter(product => 
        (product.rating || 0) >= selectedRating
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountPrice || a.originalPrice || 0) - (b.discountPrice || b.originalPrice || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.discountPrice || b.originalPrice || 0) - (a.discountPrice || a.originalPrice || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Assuming products have createdAt field
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, priceRange, selectedRating, sortBy]);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addItem(product.id, 1);
    alert(`Added ${product.name} to cart!`);
  };

  const handleBuyNow = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addItem(product.id, 1);
    navigate('/cart');
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    // Reset price range to include all products
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => p.discountPrice || p.originalPrice || 0));
      setPriceRange([0, Math.ceil(maxPrice * 1.1)]);
    }
    setSelectedRating(0);
    setSortBy('featured');
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategories.length > 0 || selectedRating > 0 || sortBy !== 'featured';

  if (loading) {
    return (
      <div className="products-container">
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-layout">
        {/* Header */}
        <div className="products-header">
          <h1 className="products-title">Discover Products</h1>
          <p className="products-subtitle">
            Find amazing cultural treasures and artisan goods from around the world
          </p>
        </div>

        {/* Mobile Filters Toggle */}
        <button className="mobile-filters-toggle" onClick={toggleMobileFilters}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filters & Sort
        </button>

        {/* Filters Overlay */}
        <div 
          className={`filters-overlay ${showMobileFilters ? 'mobile-open' : ''}`}
          onClick={toggleMobileFilters}
        ></div>

        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showMobileFilters ? 'mobile-open' : ''}`}>
          <button className="filters-close" onClick={toggleMobileFilters}>
            ✕
          </button>

          <div className="filters-header">
            <h3 className="filters-title">Filters</h3>
            {hasActiveFilters && (
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              Price Range
            </h4>
            <div className="price-range">
              <div className="price-inputs">
                <input
                  type="number"
                  className="price-input"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span>-</span>
                <input
                  type="number"
                  className="price-input"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
              <input
                type="range"
                className="price-slider"
                min="0"
                max={priceRange[1] * 2} // Dynamic max for slider
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
              </svg>
              Categories
            </h4>
            <div className="category-list">
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`category-item ${selectedCategories.includes(category.id) ? 'active' : ''}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="category-checkbox"></div>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">({category.count})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              Customer Rating
            </h4>
            <div className="rating-filters">
              {ratings.map(rating => (
                <div
                  key={rating.stars}
                  className={`rating-item ${selectedRating === rating.stars ? 'active' : ''}`}
                  onClick={() => setSelectedRating(selectedRating === rating.stars ? 0 : rating.stars)}
                >
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">
                        {i < rating.stars ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">{rating.text}</span>
                  <span className="category-count">({rating.count})</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Main Content */}
        <main className="products-main">
          {/* Products Grid Header */}
          <div className="products-grid-header">
            <div className="products-count">
              Showing <span>{filteredProducts.length}</span> of <span>{products.length}</span> products
              {hasActiveFilters && (
                <span style={{marginLeft: '10px', color: '#7e22ce', fontSize: '0.9rem'}}>
                  (Filters applied)
                </span>
              )}
            </div>
            <div className="sort-options">
              <span className="sort-label">Sort by:</span>
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3 className="no-products-text">No products found</h3>
              <p>Try adjusting your filters to see more results</p>
              <button className="refresh-button" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-card-wrapper"
                  style={{ '--card-index': index }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}