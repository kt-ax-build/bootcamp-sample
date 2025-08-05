import axios from 'axios';

// 환경 변수 안전하게 처리
const getBaseURL = () => {
  // Jest 환경에서는 기본값 사용
  if (typeof jest !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // 환경 변수에서 API 기본 URL 가져오기
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  
  // 환경 변수가 있으면 사용, 없으면 프록시 사용
  if (apiBaseURL) {
    return apiBaseURL;
  }
  
  // 개발 환경에서는 프록시 사용
  return '';
};

// const baseURL = getBaseURL();

declare global {
  interface ImportMetaEnv {
    VITE_API_BASE_URL?: string;
  }
}

export const axiosInstance = axios.create({
  // baseURL: baseURL,
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
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