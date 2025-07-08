import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nutrangvietnam.com/wp-json',
  headers: {
    'Content-Type': 'application/json'
  }
  
});

// Gắn Bearer token nếu có
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token'); // hoặc cookie nếu dùng SSR
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
