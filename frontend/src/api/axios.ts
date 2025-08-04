import axios from 'axios';

// 환경 변수 안전하게 처리
const getBaseURL = () => {
  // Jest 환경에서는 기본값 사용
  if (typeof jest !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // 개발 환경에서는 프록시 사용
  return '';
};

const baseURL = getBaseURL();

declare global {
  interface ImportMetaEnv {
    VITE_API_BASE_URL?: string;
  }
}

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('AUTH_TOKEN');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 