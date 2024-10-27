import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // await login(username, password);
    const data = await axios.post('https://task-managemenr-server.onrender.com/api/auth/login', {
      username,
      password,
    },{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(data);
    if (data.status === 200){
        localStorage.setItem('token', data.data.token);
        navigate('/');
    }
    window.location.reload();
  };

  return (
    <div>
      <form 
        onSubmit={handleLogin} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          margin: '50px auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Login</h2>
        
        <div style={{ marginBottom: '15px', width: '100%' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={{
              width: '90%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px', width: '100%' }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              width: '90%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            padding: '10px 30px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Login
        </button>
      </form>

      <button 
        onClick={() => navigate('/register')} // Navigate to /register
        style={{
          marginTop: '15px',
          padding: '10px 30px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#28a745',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
