import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://task-managemenr-server.onrender.com/api/tasks', {
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTasks(response.data.tasks || response.data);
  };

  const deleteTask = async (id) => {
    // await api.delete(`/tasks/${id}`);
    const res = await axios.delete(`https://task-managemenr-server.onrender.com/api/tasks/${id}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res);

    fetchTasks();
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((task) => task._id === id);
    // await api.put(`/tasks/${id}`, { ...task, status: task.status === 'completed' ? 'pending' : 'completed' });
    const res = await axios.put(`https://task-managemenr-server.onrender.com/api/tasks/${id}`, { ...task, status: task.status === 'completed' ? 'pending' : 'completed' },{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  const handleAddTask = () => {
    navigate('/');
  };

  return (
    <div 
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Task List</h2>
      
      <button 
        onClick={handleAddTask} // Call navigate on click
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Add Task
      </button>

      <button 
        onClick={handleLogout} // Call logout function on click
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

      <ul style={{ listStyle: 'none', padding: '0' }}>
        {tasks?.map((task) => (
          <li 
            key={task._id} 
            style={{
              display: 'flex',
              flexDirection: 'column', // Change to column layout to show title and description
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0',
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              color: task.status === 'completed' ? '#888' : '#333'
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{task.title}</span>
            <span style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{task.description}</span> {/* Displaying description */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => toggleComplete(task._id)} 
                style={{
                  padding: '5px 15px',
                  minWidth: '120px', // Ensures uniform button width
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: task.status === 'completed' ? '#ffc107' : '#28a745',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  lineHeight: '1.5', // Better vertical alignment
                }}
              >
                {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button 
                onClick={() => deleteTask(task._id)}
                style={{
                  padding: '5px 15px',
                  minWidth: '120px', // Ensures uniform button width
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: '#dc3545',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  lineHeight: '1.5', // Better vertical alignment
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
