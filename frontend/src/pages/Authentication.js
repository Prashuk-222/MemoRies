import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../svg_files/arrow.svg';
import { URL } from '../constants';
import '../auth.css';
import { useVerification } from './global';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { isVerified, setIsVerified } = useVerification();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}account/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login Successful:', data);
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        setIsVerified(true);
        navigate(`/notes`);
      } else {
        alert(data.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong during login.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isLogin && password1 !== password2) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`${URL}account/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password1,
          first_name: Name, // Only include this during registration
          password2: password2,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Registration Successful:', data);
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to login after registration
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong during registration.');
    }
  };
  
  const handleClick = (event) => {
    if (isLogin) {
      handleLogin(event);
    } else {
      handleRegister(event);
    }
  };

  return (
    <div className="auth">
      <div className="note-header">
        <h3>
          <Link to="/">
            {/* <Arrow /> */}
          </Link>
        </h3>
      </div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleClick}>
        {isLogin && (
          <>
          <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
          </>
        )}
        {!isLogin && (
          <>
            <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password1}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          </>
        )}
        {/* {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )} */}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="auth-footer">
        <p>
          <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account?' : 'Already have an account?'}
            {/* {isLogin ? 'Register' : 'Login'} */}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
