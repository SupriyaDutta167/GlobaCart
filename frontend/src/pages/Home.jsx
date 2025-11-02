// Path: frontend/src/pages/Home.jsx
import React, { useState } from 'react'; // <-- REMOVED useEffect
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PageStyle/Home.css';
import Loader from '../components/Loader'; // <-- ADDED Loader

const Home = () => {
  // const [user, setUser] = useState(null); // <-- This line being removed is critical
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  
  // MODIFIED: Get user and loading directly from context
  const { user, loading, logout } = useAuth(); 
  
  const navigate = useNavigate();

  // REMOVED: The entire useEffect hook that called getUser() is gone.
  // ProtectedRoute in App.jsx now handles loading and auth checks.

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // MODIFIED: Use the 'loading' state from useAuth()
  if (loading) return <Loader />;

  // This is a safety check. ProtectedRoute should prevent this,
  // but if we land here, 'user' must be null, so show Loader.
  if (!user) return <Loader />; 

  // If we get here, loading is false AND user is not null.
  return (
    <div className="home-container">
      <header className="home-header">
        {/* ... (rest of your component is fine) ... */}
        <div className="header-content">
          <h1>Welcome back, {user.username}!</h1>
          <p className="header-subtitle">Manage your account and explore your dashboard</p>
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

      {/* Check user role */}
      {user.role === 'SELLER' ? (
        
        // --- IF SELLER, show Seller Dashboard ---
        <section className="dashboard-section">
          <h2 className="section-title">Seller Dashboard</h2>
          <div className="dashboard-grid">
            
            <div className="dashboard-card" onClick={() => navigate('/admin/manage-products')}>
              <div className="card-icon orders-icon"> {/* Using existing class */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="card-title">Manage Products</h3>
              <p className="card-description">Add, edit, or delete your ads</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/orders')}>
              <div className="card-icon orders-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
                </svg>
              </div>
              <h3 className="card-title">View Orders</h3>
              <p className="card-description">View sales and fulfill orders</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/settings')}>
              <div className="card-icon settings-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m-6-6h6m6 0h6"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
              </div>
              <h3 className="card-title">Settings</h3>
              <p className="card-description">Manage preferences</p>
            </div>
            
          </div>
        </section>

      ) : (
        
        // --- ELSE, show ORIGINAL User Dashboard ---
        <section className="dashboard-section">
          <h2 className="section-title">Your Dashboard</h2>
          <div className="dashboard-grid">
            <div className="dashboard-card" onClick={() => navigate('/orders')}>
              <div className="card-icon orders-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
                </svg>
              </div>
              <h3 className="card-title">My Orders</h3>
              <p className="card-description">Track, return, or buy again</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/cart')}>
              <div className="card-icon cart-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
              </div>
              <h3 className="card-title">My Cart</h3>
              <p className="card-description">View and edit your cart</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/buy-again')}>
              <div className="card-icon buyagain-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                </svg>
              </div>
              <h3 className="card-title">Buy Again</h3>
              <p className="card-description">Reorder your favorites</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/your-lists')}>
              <div className="card-icon lists-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </div>
              <h3 className="card-title">Your Lists</h3>
              <p className="card-description">Manage wishlists & ideas</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/nation')}>
              <div className="card-icon nation-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="card-title">Nation</h3>
              <p className="card-description">Explore regional products</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/settings')}>
              <div className="card-icon settings-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m-6-6h6m6 0h6"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
              </div>
              <h3 className="card-title">Settings</h3>
              <p className="card-description">Manage preferences</p>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/help')}>
              <div className="card-icon help-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h3 className="card-title">Help</h3>
              <p className="card-description">Get support & assistance</p>
            </div>
          </div>
        </section>

      )}
      {/* --- END: ADDED LOGIC --- */}

    </div>
  );
};

export default Home;

