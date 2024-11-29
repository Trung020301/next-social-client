// apiClient.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Thêm interceptor để gắn token vào headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // Lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // Gắn token vào headers
  }
  return config
})

// Axios Interceptor: Response Method
apiClient.interceptors.response.use(
  (response) => {
    // Can be modified response
    return response
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error)
  },
)

export default apiClient
