// Enhanced Home.jsx with Modern Violet Theme
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PageStyle/Home.css';
import Loader from '../components/Loader';

const Home = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation delays for cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      card.style.setProperty('--card-index', index);
    });
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) return <Loader />;
  if (!user) return <Loader />;

  const userDashboardCards = [
    {
      title: "My Orders",
      description: "Track, return, or buy again",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
        </svg>
      ),
      path: "/orders",
      color: "orders-icon"
    },
    {
      title: "My Cart",
      description: "View and edit your cart",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
      ),
      path: "/cart",
      color: "cart-icon"
    },
    {
      title: "Buy Again",
      description: "Reorder your favorites",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
        </svg>
      ),
      path: "/buy-again",
      color: "buyagain-icon"
    },
    {
      title: "Your Lists",
      description: "Manage wishlists & ideas",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      ),
      path: "/your-lists",
      color: "lists-icon"
    },
    {
      title: "Cultural Nations",
      description: "Explore regional products",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      path: "/nation",
      color: "nation-icon"
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m-6-6h6m6 0h6"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      ),
      path: "/settings",
      color: "settings-icon"
    },
    {
      title: "Help Center",
      description: "Get support & assistance",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      path: "/help",
      color: "help-icon"
    }
  ];

  const sellerDashboardCards = [
    {
      title: "Manage Products",
      description: "Add, edit, or delete your ads",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      path: "/seller/dashboard",
      color: "orders-icon"
    },
    {
      title: "View Orders",
      description: "View sales and fulfill orders",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
        </svg>
      ),
      path: "/orders",
      color: "orders-icon",
      badge: "New"
    },
    {
      title: "Analytics",
      description: "View sales performance",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6"/>
        </svg>
      ),
      path: "/seller/analytics",
      color: "buyagain-icon"
    },
    {
      title: "Store Settings",
      description: "Manage your store preferences",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m-6-6h6m6 0h6"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
      ),
      path: "/settings",
      color: "settings-icon"
    }
  ];

  const currentCards = user.role === 'SELLER' ? sellerDashboardCards : userDashboardCards;

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome back, {user.username}! 👋</h1>
          <p className="header-subtitle">
            {user.role === 'SELLER' 
              ? 'Manage your store and track your performance' 
              : 'Discover amazing products and manage your account'
            }
          </p>
        </div>
        
        <div className="account-menu-wrapper">
          <button 
            className="account-menu-trigger"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            <div className="avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="account-name">{user.username}</span>
            <svg className={`chevron ${accountMenuOpen ? 'open' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {accountMenuOpen && (
            <div className="account-dropdown">
              <div className="dropdown-section">
                <div className="dropdown-header">Account Details</div>
                <div className="dropdown-item">
                  <svg className="dropdown-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div className="dropdown-text">
                    <span className="dropdown-label">Email</span>
                    <span className="dropdown-value">{user.email}</span>
                  </div>
                </div>
                <div className="dropdown-item">
                  <svg className="dropdown-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div className="dropdown-text">
                    <span className="dropdown-label">Password</span>
                    <span className="dropdown-value">••••••••</span>
                  </div>
                  <button className="change-password-btn" onClick={() => navigate('/change-password')}>
                    Change
                  </button>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-logout" onClick={handleLogout}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414 0L4 7.414 5.414 6l3.293 3.293L13.586 6 14 7.414z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Section */}
      <section className={`dashboard-section ${user.role === 'SELLER' ? 'seller-dashboard' : ''}`}>
        <h2 className="section-title">
          {user.role === 'SELLER' ? 'Seller Dashboard' : 'Your Dashboard'}
        </h2>
        
        <div className="dashboard-grid">
          {currentCards.map((card, index) => (
            <div 
              key={index}
              className="dashboard-card"
              onClick={() => navigate(card.path)}
            >
              {card.badge && <div className="new-badge">{card.badge}</div>}
              <div className={`card-icon ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;