import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://task-managemenr-server.onrender.com/api/tasks', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    setTasks(response.data.tasks || response.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://task-managemenr-server.onrender.com/api/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    const task = tasks.find((task) => task._id === id);
    await axios.put(`https://task-managemenr-server.onrender.com/api/tasks/${id}`, {
      ...task,
      status: task.status === 'completed' ? 'pending' : 'completed'
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchTasks();
  };

  const updateTaskDescription = async (id) => {
    await axios.put(`https://task-managemenr-server.onrender.com/api/tasks/${id}`, {
      description: editDescription
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    setEditTaskId(null);
    setEditDescription('');
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
    <div style={containerStyle}>
      <h2 style={headerStyle}>Task List</h2>
      
      <button onClick={handleAddTask} style={addButtonStyle}>
        Add Task
      </button>

      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>

      <ul style={{ listStyle: 'none', padding: '0' }}>
        {tasks?.map((task) => (
          <li key={task._id} style={{ ...taskItemStyle, backgroundColor: task.status === 'completed' ? '#e6ffe6' : '#fff' }}>
            <div style={taskContentStyle}>
              <span style={titleStyle}>{task.title}</span>
              {editTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    style={editInputStyle}
                  />
                  <button onClick={() => updateTaskDescription(task._id)} style={saveButtonStyle}>
                    Save
                  </button>
                  <button onClick={() => setEditTaskId(null)} style={cancelButtonStyle}>
                    Cancel
                  </button>
                </>
              ) : (
                <span style={descriptionStyle}>{task.description}</span>
              )}
              <span style={createdAtStyle}>
                Created at: {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>
            <div style={buttonContainerStyle}>
              <button
                onClick={() => toggleComplete(task._id)}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: task.status === 'completed' ? '#ffc107' : '#28a745'
                }}
              >
                {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: '#dc3545'
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditTaskId(task._id);
                  setEditDescription(task.description);
                }}
                style={{
                  ...actionButtonStyle,
                  backgroundColor: '#007bff'
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles for each section
const containerStyle = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: '#f9f9f9'
};

const headerStyle = {
  fontSize: '24px',
  color: '#333',
  marginBottom: '20px'
};

const addButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '10px',
  marginRight: '10px'
};

const logoutButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#dc3545',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '20px'
};

const taskItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  margin: '10px 0',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
};

const taskContentStyle = {
  flex: 1,
  textAlign: 'left'
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333'
};

const descriptionStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '5px'
};

const createdAtStyle = {
  fontSize: '12px',
  color: '#888'
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px'
};

const actionButtonStyle = {
  padding: '8px 15px',
  fontSize: '14px',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  minWidth: '120px',
  transition: 'background-color 0.3s ease'
};

const editInputStyle = {
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginRight: '10px'
};

const saveButtonStyle = {
  padding: '8px 15px',
  fontSize: '14px',
  color: '#fff',
  backgroundColor: '#28a745',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  padding: '8px 15px',
  fontSize: '14px',
  color: '#fff',
  backgroundColor: '#dc3545',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default TaskList;
