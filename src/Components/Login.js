// src/components/Login.js
import React, { useState } from 'react';
import { FaGithub, FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Here you would integrate with your authentication service
      // For now, we'll simulate a successful login/registration
      setTimeout(() => {
        const user = { email, name: name || email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(user));
        onLogin(user);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setError('');
    // Here you would integrate with social login providers
    // For demonstration, we'll simulate a successful login
    setTimeout(() => {
      const user = { 
        email: `user@${provider}.com`, 
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User` 
      };
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p>{isLogin ? 'Access your account' : 'Join our community'}</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">
                <FaUser />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope />
              <span>Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock />
              <span>Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="#reset">Forgot password?</a>
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-buttons">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="social-button google"
            >
              <FaGoogle /> Google
            </button>
            <button 
              onClick={() => handleSocialLogin('github')}
              className="social-button github"
            >
              <FaGithub /> GitHub
            </button>
          </div>
        </div>

        <div className="login-footer">
          {isLogin ? (
            <p>Don't have an account? <button onClick={toggleMode}>Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={toggleMode}>Sign In</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
