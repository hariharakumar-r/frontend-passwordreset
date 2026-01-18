import axios from 'axios';

// Determine API URL based on current hostname
const getAPIURL = () => {
  const hostname = window.location.hostname;
  const isProduction = hostname === 'frontend-passwordreset.vercel.app';
  
  if (isProduction) {
    return import.meta.env.VITE_API_URL_PROD || 'https://backend-passwordreset-7owr.onrender.com/api';
  } else {
    return import.meta.env.VITE_API_URL_LOCAL || 'http://localhost:5000/api';
  }
};

const API_URL = getAPIURL();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getProfile: () => api.get('/auth/profile')
};

export default api;
