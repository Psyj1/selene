import axios from 'axios';

// ✅ CORREÇÃO: URL completa do backend
const api = axios.create({
  baseURL: 'http://localhost:4000', // ← DEVE SER ESTA URL
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;