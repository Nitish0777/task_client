// client/src/components/TaskForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../services/api';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await api.post('/tasks', { title, description });
    console.log(title, description);
    const data = await axios.post('https://task-managemenr-server.onrender.com/api/tasks', { title, description });
    console.log(data);
    setTitle('');
    setDescription('');
    onTaskAdded();
    if (data.status === 201){
        navigate('/tasks');
    }
  };

  const handleSeeTasks = () => {
    navigate('/tasks'); // Navigate to /tasks page
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Add New Task</h2>
      
      <div style={{ marginBottom: '15px', width: '100%' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
          rows="4"
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
            resize: 'none',
          }}
        />
      </div>

      <button 
        type="submit" 
        style={{
          padding: '10px 30px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#28a745',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          marginBottom: '10px', // Space between buttons
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Add Task
      </button>

      <button 
        type="button" // This button doesn't submit the form
        onClick={handleSeeTasks}
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
        See Tasks
      </button>
    </form>
  );
};

export default TaskForm;
