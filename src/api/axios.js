import axios from 'axios';

// Create axios instance with custom config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can add auth tokens or other headers here
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common errors here
//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       // e.g., redirect to login page
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;