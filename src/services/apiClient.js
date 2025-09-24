import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1'

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
    // Get token from localStorage or config
    let token = null

    if (typeof window !== 'undefined') {
      // First try to get token from localStorage
      token = localStorage.getItem('token')

      // If no token in localStorage, try to get from session (if available)
      if (!token && window.sessionStorage) {
        token = sessionStorage.getItem('accessToken')
      }

      // If still no token, try to get from global session object
      if (!token && window.__NEXT_DATA__?.props?.pageProps?.session?.accessToken) {
        token = window.__NEXT_DATA__.props.pageProps.session.accessToken
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
  error => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        sessionStorage.clear()
        // Show toast before redirect
        if (window.toastService) {
          window.toastService.showError('Your session has expired. Please log in again.')
        }
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
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
