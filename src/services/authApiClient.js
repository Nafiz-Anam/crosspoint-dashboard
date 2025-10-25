import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/v1'

class AuthApiClient {
  constructor() {
    this.isRefreshing = false
    this.failedQueue = []
    this.refreshPromise = null

    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'x-client-type': 'web'
      }
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        // Add auth token
        const token = this.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add session ID
        const sessionId = this.getSessionId()
        if (sessionId) {
          config.headers['x-session-id'] = sessionId
        }

        // Add device info
        if (typeof window !== 'undefined') {
          config.headers['x-device-info'] = navigator.userAgent
        }

        return config
      },
      error => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        // Handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Check if it's a session termination error
          const errorMessage = error.response?.data?.message || ''

          if (
            errorMessage.includes('Session expired') ||
            errorMessage.includes('Another device has logged in') ||
            errorMessage.includes('Session has been terminated')
          ) {
            this.handleSessionTermination(errorMessage)
            return Promise.reject(error)
          }

          // Try to refresh token
          if (this.getRefreshToken()) {
            originalRequest._retry = true

            if (this.isRefreshing) {
              // If already refreshing, queue this request
              return new Promise((resolve, reject) => {
                this.failedQueue.push({ resolve, reject })
              })
                .then(token => {
                  originalRequest.headers.Authorization = `Bearer ${token}`
                  return this.client(originalRequest)
                })
                .catch(err => {
                  return Promise.reject(err)
                })
            }

            this.isRefreshing = true

            try {
              const newToken = await this.refreshAccessToken()
              this.processQueue(null, newToken)
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              return this.client(originalRequest)
            } catch (refreshError) {
              this.processQueue(refreshError, null)
              this.handleAuthError(refreshError)
              return Promise.reject(refreshError)
            } finally {
              this.isRefreshing = false
            }
          } else {
            this.handleAuthError(error)
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  async refreshAccessToken() {
    if (this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshPromise = this.performTokenRefresh()

    try {
      const result = await this.refreshPromise
      return result
    } finally {
      this.refreshPromise = null
    }
  }

  async performTokenRefresh() {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh-tokens`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            'x-device-info': typeof window !== 'undefined' ? navigator.userAgent : 'Server'
          }
        }
      )

      if (response.data.success && response.data.data) {
        const { accessToken, sessionId } = response.data.data

        // Update stored tokens
        this.setAccessToken(accessToken.token)
        this.setAccessTokenExpiry(accessToken.expires)

        if (sessionId) {
          this.setSessionId(sessionId)
        }

        // Update NextAuth session if available
        if (typeof window !== 'undefined' && window.nextAuthUpdateToken) {
          window.nextAuthUpdateToken({
            accessToken: accessToken.token,
            accessTokenExpires: new Date(accessToken.expires).getTime()
          })
        }

        return accessToken.token
      } else {
        throw new Error('Invalid refresh response')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      throw error
    }
  }

  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })

    this.failedQueue = []
  }

  handleSessionTermination(message) {
    if (typeof window === 'undefined') return

    // Clear all session data
    this.clearSession()

    // Show notification
    if (window.toastService) {
      window.toastService.showWarning(
        'Your account has been logged in from another device. You have been logged out for security reasons.'
      )
    }

    // Notify other tabs
    localStorage.setItem('sessionTerminated', Date.now().toString())

    // Redirect to login
    setTimeout(() => {
      window.location.href = '/login'
    }, 3000)
  }

  handleAuthError(error) {
    if (typeof window === 'undefined') return

    const errorMessage = error.response?.data?.message || 'Authentication failed. Please log in again.'

    // Clear session data
    this.clearSession()

    // Show error
    if (window.toastService) {
      window.toastService.showError(errorMessage)
    }

    // Redirect to login
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  }

  // Token management methods
  getAccessToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  setAccessToken(token) {
    if (typeof window === 'undefined') return
    localStorage.setItem('accessToken', token)
  }

  getAccessTokenExpiry() {
    if (typeof window === 'undefined') return null
    const expiry = localStorage.getItem('accessTokenExpiry')
    return expiry ? parseInt(expiry) : null
  }

  setAccessTokenExpiry(expiry) {
    if (typeof window === 'undefined') return
    const expiryTime = new Date(expiry).getTime()
    localStorage.setItem('accessTokenExpiry', expiryTime.toString())
  }

  getRefreshToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  }

  setRefreshToken(token) {
    if (typeof window === 'undefined') return
    localStorage.setItem('refreshToken', token)
  }

  getRefreshTokenExpiry() {
    if (typeof window === 'undefined') return null
    const expiry = localStorage.getItem('refreshTokenExpiry')
    return expiry ? parseInt(expiry) : null
  }

  setRefreshTokenExpiry(expiry) {
    if (typeof window === 'undefined') return
    const expiryTime = new Date(expiry).getTime()
    localStorage.setItem('refreshTokenExpiry', expiryTime.toString())
  }

  getSessionId() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('sessionId')
  }

  setSessionId(sessionId) {
    if (typeof window === 'undefined') return
    localStorage.setItem('sessionId', sessionId)
  }

  clearSession() {
    if (typeof window === 'undefined') return

    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpiry')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshTokenExpiry')
    localStorage.removeItem('sessionId')
    sessionStorage.clear()
  }

  // Check if access token is expired or about to expire
  isAccessTokenExpired() {
    const expiry = this.getAccessTokenExpiry()
    if (!expiry) return true

    // Consider token expired if it expires within the next 5 minutes
    const bufferTime = 5 * 60 * 1000 // 5 minutes
    return Date.now() >= expiry - bufferTime
  }

  // Check if refresh token is expired
  isRefreshTokenExpired() {
    const expiry = this.getRefreshTokenExpiry()
    if (!expiry) return true

    return Date.now() >= expiry
  }

  // Public API methods
  get(url, config = {}) {
    return this.client.get(url, config)
  }

  post(url, data, config = {}) {
    return this.client.post(url, data, config)
  }

  put(url, data, config = {}) {
    return this.client.put(url, data, config)
  }

  patch(url, data, config = {}) {
    return this.client.patch(url, data, config)
  }

  delete(url, config = {}) {
    return this.client.delete(url, config)
  }

  // Login method
  async login(email, password) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web'
          }
        }
      )

      if (response.data.success && response.data.data) {
        const { user, accessToken, sessionId, previousSessionsTerminated } = response.data.data

        // Store tokens
        this.setAccessToken(accessToken.token)
        this.setAccessTokenExpiry(accessToken.expires)

        if (sessionId) {
          this.setSessionId(sessionId)
        }

        // Extract refresh token from cookies
        const setCookieHeader = response.headers['set-cookie']
        if (setCookieHeader) {
          const refreshTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('refreshToken='))
          if (refreshTokenCookie) {
            const refreshToken = refreshTokenCookie.split(';')[0].split('=')[1]
            this.setRefreshToken(refreshToken)

            // Extract expiry from cookie
            const expiresMatch = refreshTokenCookie.match(/Expires=([^;]+)/)
            if (expiresMatch) {
              this.setRefreshTokenExpiry(expiresMatch[1])
            }
          }
        }

        // Show notification if previous sessions were terminated
        if (previousSessionsTerminated && window.toastService) {
          window.toastService.showInfo(
            'Previous sessions have been terminated. You are now logged in on this device only.'
          )
        }

        return {
          user,
          accessToken: accessToken.token,
          accessTokenExpires: new Date(accessToken.expires).getTime(),
          sessionId,
          previousSessionsTerminated
        }
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Logout method
  async logout() {
    try {
      const refreshToken = this.getRefreshToken()
      if (refreshToken) {
        await this.client.post('/auth/logout', { refreshToken })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearSession()
    }
  }
}

// Create singleton instance
const authApiClient = new AuthApiClient()

export default authApiClient
