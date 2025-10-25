// Idle Session Manager
class IdleSessionManager {
  constructor() {
    this.idleTimeout = 30 * 60 * 1000 // 30 minutes
    this.warningTimeout = 25 * 60 * 1000 // 25 minutes (5 min warning)
    this.idleTimer = null
    this.warningTimer = null
    this.isWarningShown = false
    this.lastActivity = Date.now()
    this.isActive = true

    this.setupActivityListeners()
  }

  setupActivityListeners() {
    if (typeof window === 'undefined') return

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

    events.forEach(event => {
      document.addEventListener(event, this.resetIdleTimer.bind(this), true)
    })

    // Track visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))

    // Track focus/blur
    window.addEventListener('focus', this.handleWindowFocus.bind(this))
    window.addEventListener('blur', this.handleWindowBlur.bind(this))
  }

  resetIdleTimer() {
    this.lastActivity = Date.now()
    this.isActive = true

    // Clear existing timers
    if (this.idleTimer) clearTimeout(this.idleTimer)
    if (this.warningTimer) clearTimeout(this.warningTimer)

    this.isWarningShown = false

    // Set new timers
    this.warningTimer = setTimeout(() => {
      this.showIdleWarning()
    }, this.warningTimeout)

    this.idleTimer = setTimeout(() => {
      this.handleIdleTimeout()
    }, this.idleTimeout)
  }

  showIdleWarning() {
    if (this.isWarningShown || !this.isActive) return

    this.isWarningShown = true

    if (window.toastService) {
      window.toastService.showWarning(
        'You will be automatically logged out due to inactivity in 5 minutes. Click anywhere to stay logged in.',
        { duration: 0 } // Don't auto-dismiss
      )
    }

    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Session Timeout Warning', {
        body: 'You will be logged out in 5 minutes due to inactivity.',
        icon: '/favicon.ico'
      })
    }
  }

  handleIdleTimeout() {
    if (!this.isActive) return

    // Clear all timers
    if (this.idleTimer) clearTimeout(this.idleTimer)
    if (this.warningTimer) clearTimeout(this.warningTimer)

    // Show final warning
    if (window.toastService) {
      window.toastService.showError('Session expired due to inactivity. You will be redirected to login.')
    }

    // Logout after short delay
    setTimeout(() => {
      this.performIdleLogout()
    }, 2000)
  }

  async performIdleLogout() {
    try {
      // Call logout API if available
      if (window.authApiClient) {
        await window.authApiClient.logout()
      }
    } catch (error) {
      console.error('Error during idle logout:', error)
    } finally {
      // Clear session data
      if (window.authApiClient) {
        window.authApiClient.clearSession()
      }

      // Redirect to login
      window.location.href = '/login'
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause timers
      this.pauseTimers()
    } else {
      // Page is visible, resume timers
      this.resumeTimers()
    }
  }

  handleWindowFocus() {
    this.resumeTimers()
  }

  handleWindowBlur() {
    // Don't pause on blur, only on visibility change
  }

  pauseTimers() {
    if (this.idleTimer) clearTimeout(this.idleTimer)
    if (this.warningTimer) clearTimeout(this.warningTimer)
  }

  resumeTimers() {
    if (this.isActive) {
      this.resetIdleTimer()
    }
  }

  // Public methods
  start() {
    this.isActive = true
    this.resetIdleTimer()
  }

  stop() {
    this.isActive = false
    this.pauseTimers()
  }

  updateTimeout(newTimeout) {
    this.idleTimeout = newTimeout
    this.warningTimeout = newTimeout - 5 * 60 * 1000 // 5 minutes before
    this.resetIdleTimer()
  }

  getTimeUntilTimeout() {
    const timeSinceActivity = Date.now() - this.lastActivity
    return Math.max(0, this.idleTimeout - timeSinceActivity)
  }

  isIdle() {
    return Date.now() - this.lastActivity > this.warningTimeout
  }
}

// Create singleton instance
const idleSessionManager = new IdleSessionManager()

export default idleSessionManager
