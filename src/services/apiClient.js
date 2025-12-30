import axios from 'axios'
import { getSession } from 'next-auth/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'

// Variables for token refresh queuing
let isRefreshing = false
let failedQueue = []

/**
 * Process the queue of failed requests
 * @param {Error|null} error - Error if refresh failed
 * @param {string|null} token - New access token if refresh succeeded
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-client-type': 'web'
  }
})

/**
 * Helper to handle session expiration and redirect
 */
const handleAuthFailure = () => {
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

/**
 * Common response interceptor to handle common errors and token refresh
 */
const addResponseInterceptors = (client) => {
  client.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config

      // Handle authentication errors (401)
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If refresh is already in progress, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return client(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            console.log('[apiClient] Token expired, attempting refresh...')
            
            // Trigger session refresh via NextAuth
            const session = await getSession()
            const newToken = session?.accessToken

            if (newToken) {
              console.log('[apiClient] Token refreshed successfully.')
              
              // Update storage for consistency
              if (typeof window !== 'undefined') {
                localStorage.setItem('token', newToken)
                sessionStorage.setItem('accessToken', newToken)
              }
              
              // Process the queue with the new token
              processQueue(null, newToken)
              
              // Retry the original request
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              resolve(client(originalRequest))
            } else {
              console.error('[apiClient] Refresh failed: No token returned from session.')
              throw new Error('Refresh failed')
            }
          } catch (refreshError) {
            console.error('[apiClient] Refresh process error:', refreshError)
            processQueue(refreshError, null)
            handleAuthFailure()
            reject(refreshError)
          } finally {
            isRefreshing = false
          }
        })
      }

      // Handle other common errors
      if (!error.response) {
        error.message = 'Network error. Please check your internet connection.'
      } else if (error.response.status >= 500) {
        error.message = 'Server error. Please try again later.'
      } else if (error.response.status >= 400) {
        if (error.response.data?.message) {
          error.message = error.response.data.message
        } else {
          error.message = `Request failed with status ${error.response.status}`
        }
      }

      return Promise.reject(error)
    }
  )
}

// Add interceptors to the default instance
addResponseInterceptors(apiClient)

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

  // Add the same response interceptors to this client
  addResponseInterceptors(client)

  return client
}

export default apiClient
