import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  localStorage.setItem('token', response.data.token);
};

export const register = async (username, password) => {
  await api.post('/auth/register', { username, password });
};

export const logout = () => {
  localStorage.removeItem('token');
};
