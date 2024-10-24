import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const { login } = useAuthContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp ? 'http://localhost:5000/api/auth/signup' : 'http://localhost:5000/api/auth/signin';
    try {
      const response = await axios.post(url, { username, email, password });

      if (isSignUp) {
        toast.success('User registered successfully! Please log in.');
        setIsSignUp(false);
      } else {
        login(response.data.user, response.data.token);
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {isSignUp && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        <p onClick={() => setIsSignUp(!isSignUp)} className="toggle-auth">
          {isSignUp ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
        </p>
      </form>
    </div>
  );
};

export default SignIn;