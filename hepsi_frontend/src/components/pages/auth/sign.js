import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./sign.css";

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmitSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/signin', {
        username,
        password,
      });
      console.log('Access Token:', response.data.accessToken);
      localStorage.setItem('token', response.data.accessToken); 
      setSuccess('Logged in successfully!');
      setError(null);
      navigate('/');
    } catch (error) {
      console.error('Error during signin:', error.response?.data || error.message);
      setError('Error during signin: ' + (error.response?.data?.message || error.message));
      setSuccess(null);
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/signup', {
        username,
        password,
      });
      console.log('User registered:', response.data);
      setSuccess('User registered successfully!');
      setError(null);
      // Автоматический переход на страницу входа
      setIsSignUp(false);
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      setError('Error during signup: ' + (error.response?.data?.message || error.message));
      setSuccess(null);
    }
  };
  
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="container_auth">
      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
          <form onSubmit={handleSubmitSignup}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        
        <div className={`form-container sign-in ${!isSignUp ? 'active' : ''}`}>
          <form onSubmit={handleSubmitSignin}>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
              <h1>Kruto</h1>
              <p>Write your name to signup</p>
              <button className="hidden" id="login" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className={`toggle-panel toggle-right ${!isSignUp ? 'active' : ''}`}>
              <h1>Kruto</h1>
              <p>Login with your name</p>
              <button className="hidden" id="register" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
