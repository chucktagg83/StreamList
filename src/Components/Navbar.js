// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YourStore
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        <div className="navbar-actions">
          <div className="user-info">
            <FaUser />
            <span>{user?.name || 'User'}</span>
          </div>
          
          <Link to="/cart" className="cart-icon-container">
            <FaShoppingCart className="cart-icon" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          
          <button onClick={logout} className="logout-btn" aria-label="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
