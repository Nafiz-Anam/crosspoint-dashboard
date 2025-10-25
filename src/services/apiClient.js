import axios from 'axios'
import authApiClient from './authApiClient'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-client-type': 'web'
  }
})

// Function to create API client with specific token
export const createApiClient = token => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'x-client-type': 'web',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  })

  // Add response interceptor for error handling
  client.interceptors.response.use(
    response => response,
    error => {
      // Handle authentication errors
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token')
          sessionStorage.clear()
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )

  return client
}

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  config => {
    // Use the auth client to get the current token
    const token = authApiClient.getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add session ID if available
    const sessionId = authApiClient.getSessionId()
    if (sessionId) {
      config.headers['x-session-id'] = sessionId
    }

    // Add device info for session tracking
    if (typeof window !== 'undefined') {
      config.headers['x-device-info'] = navigator.userAgent
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || 'Your session has expired. Please log in again.'

      // Check if it's a session termination error
      if (
        errorMessage.includes('Session expired') ||
        errorMessage.includes('Another device has logged in') ||
        errorMessage.includes('Session has been terminated')
      ) {
        // Use auth client to handle session termination
        authApiClient.handleSessionTermination(errorMessage)
        return Promise.reject(error)
      } else {
        // Try to refresh token for regular 401 errors
        try {
          const newToken = await authApiClient.refreshAccessToken()
          if (newToken) {
            // Retry the original request with new token
            const originalRequest = error.config
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return apiClient(originalRequest)
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          authApiClient.handleAuthError(error)
        }
      }
    }

    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your internet connection.'
    }

    // Handle server errors
    if (error.response?.status >= 500) {
      error.message = 'Server error. Please try again later.'
    }

    // Handle client errors
    if (error.response?.status >= 400 && error.response?.status < 500) {
      if (error.response?.data?.message) {
        error.message = error.response.data.message
      } else {
        error.message = `Request failed with status ${error.response.status}`
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
