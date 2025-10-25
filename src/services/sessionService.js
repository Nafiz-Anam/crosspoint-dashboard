// Session Management Service
import authApiClient from './authApiClient'

class SessionService {
  constructor() {
    this.sessionId = null
    this.deviceInfo = this.getDeviceInfo()
    this.setupSessionTracking()
  }

  // Get device information for session tracking
  getDeviceInfo() {
    if (typeof window === 'undefined') return 'Server'

    const userAgent = navigator.userAgent
    const platform = navigator.platform
    const language = navigator.language

    // Detect device type
    let deviceType = 'Desktop'
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'Mobile'
    } else if (/iPad|Android/i.test(userAgent)) {
      deviceType = 'Tablet'
    }

    return `${deviceType} - ${platform} (${language})`
  }

  // Setup session tracking
  setupSessionTracking() {
    if (typeof window === 'undefined') return

    // Store session ID in localStorage
    this.sessionId = localStorage.getItem('sessionId')

    // Add session ID to all API requests
    this.addSessionHeader()

    // Listen for storage events (other tabs)
    window.addEventListener('storage', this.handleStorageChange.bind(this))

    // Listen for beforeunload to clean up
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this))
  }

  // Add session ID header to API requests
  addSessionHeader() {
    if (this.sessionId) {
      authApiClient.client.defaults.headers.common['x-session-id'] = this.sessionId
    }
  }

  // Handle storage changes (other tabs)
  handleStorageChange(event) {
    if (event.key === 'sessionTerminated' && event.newValue) {
      this.handleSessionTermination()
    }
  }

  // Handle before unload
  handleBeforeUnload() {
    // Mark session as inactive when user closes tab
    if (this.sessionId) {
      this.updateSessionActivity()
    }
  }

  // Handle session termination
  handleSessionTermination() {
    // Clear all auth data
    localStorage.removeItem('token')
    localStorage.removeItem('sessionId')
    sessionStorage.clear()

    // Show notification
    if (window.toastService) {
      window.toastService.showWarning(
        'Your account has been logged in from another device. You have been logged out for security reasons.'
      )
    }

    // Redirect to login
    setTimeout(() => {
      window.location.href = '/login'
    }, 3000)
  }

  // Set session ID
  setSessionId(sessionId) {
    this.sessionId = sessionId
    localStorage.setItem('sessionId', sessionId)
    this.addSessionHeader()
  }

  // Clear session
  clearSession() {
    this.sessionId = null
    authApiClient.clearSession()
    delete authApiClient.client.defaults.headers.common['x-session-id']
  }

  // Get active sessions
  async getActiveSessions() {
    try {
      const response = await authApiClient.get('/auth/sessions')
      return response.data.data.sessions
    } catch (error) {
      console.error('Error fetching active sessions:', error)
      throw error
    }
  }

  // Terminate a specific session
  async terminateSession(sessionId) {
    try {
      const response = await authApiClient.delete(`/auth/sessions/${sessionId}`)
      return response.data
    } catch (error) {
      console.error('Error terminating session:', error)
      throw error
    }
  }

  // Terminate all other sessions
  async terminateAllSessions() {
    try {
      const response = await authApiClient.delete('/auth/sessions')
      return response.data
    } catch (error) {
      console.error('Error terminating all sessions:', error)
      throw error
    }
  }

  // Update session activity
  async updateSessionActivity() {
    if (!this.sessionId) return

    try {
      // This would typically be called on API requests
      // For now, we'll just update the timestamp
      localStorage.setItem('lastActivity', Date.now().toString())
    } catch (error) {
      console.error('Error updating session activity:', error)
    }
  }

  // Check if session is still valid
  isSessionValid() {
    const lastActivity = localStorage.getItem('lastActivity')
    if (!lastActivity) return true

    const now = Date.now()
    const lastActivityTime = parseInt(lastActivity)
    const sessionTimeout = 30 * 60 * 1000 // 30 minutes

    return now - lastActivityTime < sessionTimeout
  }

  // Handle login response
  handleLoginResponse(response) {
    const { sessionId, previousSessionsTerminated } = response.data

    if (sessionId) {
      this.setSessionId(sessionId)
    }

    if (previousSessionsTerminated) {
      // Show notification about terminated sessions
      if (window.toastService) {
        window.toastService.showInfo(
          'Previous sessions have been terminated. You are now logged in on this device only.'
        )
      }
    }
  }

  // Handle logout
  handleLogout() {
    this.clearSession()

    // Notify other tabs
    if (typeof window !== 'undefined') {
      localStorage.setItem('sessionTerminated', Date.now().toString())
    }
  }
}

// Create singleton instance
const sessionService = new SessionService()

export default sessionService
