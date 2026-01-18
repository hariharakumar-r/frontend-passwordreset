import axios from 'axios';

// Determine API URL based on current hostname
const getAPIURL = () => {
  const hostname = window.location.hostname;
  const isProduction = hostname === 'frontend-passwordreset.vercel.app';
  
  const apiUrl = isProduction
    ? 'https://backend-passwordreset-7owr.onrender.com/api'
    : 'http://localhost:5000/api';
  
  console.log(`[API Config] Hostname: ${hostname}, Environment: ${isProduction ? 'PRODUCTION' : 'LOCAL'}, API URL: ${apiUrl}`);
  
  return apiUrl;
};

const API_URL = getAPIURL();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 30000 // Increased from 10000 to 30000ms (30 seconds) for email operations
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.statusText}`, response.data);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      backendError: error.response?.data?.error,
      error: error.message,
      code: error.code
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => {
    console.log('[authService] Calling register');
    return api.post('/auth/register', data);
  },
  login: (data) => {
    console.log('[authService] Calling login');
    return api.post('/auth/login', data);
  },
  forgotPassword: (email) => {
    console.log('[authService] Calling forgotPassword for:', email);
    return api.post('/auth/forgot-password', { email });
  },
  verifyOTP: (data) => {
    console.log('[authService] Calling verifyOTP');
    return api.post('/auth/verify-otp', data);
  },
  resetPassword: (data) => {
    console.log('[authService] Calling resetPassword');
    return api.post('/auth/reset-password', data);
  },
  getProfile: () => {
    console.log('[authService] Calling getProfile');
    return api.get('/auth/profile');
  }
};

export default api;
