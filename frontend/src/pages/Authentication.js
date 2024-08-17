import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../svg_files/arrow.svg';
import '../auth.css'

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [password2, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleL = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/login/`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'username',
            email: 'email',
            password1: 'password1',
        })
      });

      const data = await response.json();

      if (response.ok) {
          navigate(`/notes`);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleR = async (e)=>{
    e.preventDefault();
    if (!isLogin && password1 !== password2) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`/api/register/`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'username',
            email: 'email',
            password1: 'password1',
            password2: 'password2'
          }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/`);
      } else {
          alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClick = () => {
    if (isLogin===true){
      handleL()
    }
    else{
      handleR()
    }

  }
  return (
    <div className="auth">
      <div className="note-header">
        <h3>
          <Link to="/">
            <Arrow />
          </Link>
        </h3>
      </div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label>UserName:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
            type="password1"
            value={password1}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password2"
              value={password2}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" >{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="auth-footer">
        <p>
          {isLogin ? 'Need an account?' : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Authentication;