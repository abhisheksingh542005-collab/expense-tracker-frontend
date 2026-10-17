import axios from 'axios';

const API = axios.create({
  baseURL: 'https://expense-tracker-backend-72iv.onrender.com/api',
});

// Automatically attach JWT token to every request if available
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;