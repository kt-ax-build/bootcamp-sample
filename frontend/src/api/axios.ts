import axios from 'axios';

// 환경 변수 안전하게 처리
const getBaseURL = () => {
  // Jest 환경에서는 기본값 사용
  if (typeof jest !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // 브라우저 환경에서는 환경 변수 사용 (Vite에서 자동으로 주입)
  // @ts-ignore - import.meta는 Vite에서만 사용 가능
  const viteEnv = (globalThis as any).import?.meta?.env;
  if (viteEnv?.VITE_API_BASE_URL) {
    return viteEnv.VITE_API_BASE_URL;
  }
  
  return 'http://localhost:8080';
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
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