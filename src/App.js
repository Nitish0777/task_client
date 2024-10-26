// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Create a Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Router>
      <div className="App">
        <h1>Task Manager</h1>
        {isLoggedIn && ( // Show logout button if logged in
          <button 
            onClick={handleLogout} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#dc3545',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Logout
          </button>
        )}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<TaskForm onTaskAdded={() => window.location.reload()} />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
