// client/src/components/Register.js
import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await axios.post('https://task-managemenr-server.onrender.com/api/auth/register', { username, password });
    console.log(data);
    if (data.status === 201){
        navigate('/login');  
    }
    // navigator.vibrate(200);
    alert(data.data.message);
  };

  return (
    <div>
      <form 
        onSubmit={handleRegister} 
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
        <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Create an Account</h2>
        
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
          Register
        </button>
      </form>

      <button 
        onClick={() => navigate('/login')} // Navigate to /login
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
        Login
      </button>
    </div>
  );
};

export default Register;
