import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
      throw new Error('Unable to connect to the server. Please ensure the backend is running on port 8003.');
    }
    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please log in again.');
    }
    if (error.response?.status === 413) {
      throw new Error('File size too large. Maximum size is 10MB.');
    }
    if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || 'Invalid request. Please check your file format and size.');
    }
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    throw error;
  }
);
