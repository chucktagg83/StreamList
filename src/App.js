// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './Components/CartContext';
import { AuthProvider } from './Components/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import Streamlist from './Components/StreamList';
import About from './Components/About';
import Cart from './Components/Cart';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import { useAuth } from './Components/AuthContext';

// This component decides whether to show the login page or redirect to home
const LoginRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Login onLogin={() => {}} />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/*" element={<ProtectedApp />} />
          </Routes>
          <ToastContainer position="top-center" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// This component contains all the protected routes
const ProtectedApp = () => {
  const { logout } = useAuth();
  
  return (
    <div className="app">
      <Navbar onLogout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Streamlist />
            </PrivateRoute>
          } />
          <Route path="/about" element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          } />
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
