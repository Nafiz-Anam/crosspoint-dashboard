import { toast } from 'react-toastify'

/**
 * Toast Service - Centralized toast notification management
 * Handles success, error, warning, and info messages consistently
 */

// Toast configuration
const defaultToastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

// Toast types with custom styling
const toastTypes = {
  success: {
    className: 'toast-success'
  },
  error: {
    className: 'toast-error'
  },
  warning: {
    className: 'toast-warning'
  },
  info: {
    className: 'toast-info'
  }
}

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {object} options - Additional toast options
 */
export const showSuccess = (message, options = {}) => {
  const config = {
    ...defaultToastConfig,
    ...options,
    className: `${toastTypes.success.className} ${options.className || ''}`
  }

  toast.success(message, config)
}

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {object} options - Additional toast options
 */
export const showError = (message, options = {}) => {
  const config = {
    ...defaultToastConfig,
    autoClose: 7000, // Longer duration for errors
    ...options,
    className: `${toastTypes.error.className} ${options.className || ''}`
  }

  toast.error(message, config)
}

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {object} options - Additional toast options
 */
export const showWarning = (message, options = {}) => {
  const config = {
    ...defaultToastConfig,
    ...options,
    className: `${toastTypes.warning.className} ${options.className || ''}`
  }

  toast.warning(message, config)
}

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {object} options - Additional toast options
 */
export const showInfo = (message, options = {}) => {
  const config = {
    ...defaultToastConfig,
    ...options,
    className: `${toastTypes.info.className} ${options.className || ''}`
  }

  toast.info(`${toastTypes.info.icon} ${message}`, config)
}

/**
 * Handle API error responses consistently
 * @param {Error|Response} error - Error object or fetch response
 * @param {string} fallbackMessage - Fallback message if error parsing fails
 * @param {object} options - Additional toast options
 */
export const handleApiError = async (error, fallbackMessage = 'An unexpected error occurred', options = {}) => {
  let errorMessage = fallbackMessage

  try {
    // Handle fetch response errors
    if (error && typeof error.json === 'function') {
      try {
        const errorData = await error.json()
        errorMessage = errorData.message || errorData.error || fallbackMessage
      } catch (jsonError) {
        // Handle cases where response is not JSON (like HTML error pages)
        if (jsonError.message.includes('Unexpected token') || jsonError.message.includes('<!DOCTYPE')) {
          if (error.status === 404) {
            errorMessage = 'The requested resource was not found. Please check your connection and try again.'
          } else if (error.status === 500) {
            errorMessage = 'Server error occurred. Please try again later.'
          } else if (error.status === 401) {
            handleAuthError(error, fallbackMessage, options)
            return // Don't show regular error toast, auth handler takes care of it
          } else if (error.status === 403) {
            errorMessage = 'You do not have permission to perform this action.'
          } else if (error.status === 0) {
            errorMessage = 'Network error. Please check your internet connection.'
          } else {
            errorMessage = `Server error (${error.status}). Please try again later.`
          }
        } else {
          errorMessage = fallbackMessage
        }
      }
    }
    // Handle axios/other error objects
    else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message
    }
    // Handle direct error messages
    else if (error?.message) {
      // Check for authentication errors
      if (error.message.includes('Please authenticate') || error.message.includes('Authentication failed')) {
        handleAuthError(error, fallbackMessage, options)
        return // Don't show regular error toast, auth handler takes care of it
      }
      // Check for common JSON parsing errors
      else if (error.message.includes('Unexpected token') || error.message.includes('<!DOCTYPE')) {
        errorMessage = 'Server returned an invalid response. Please try again later.'
      } else {
        errorMessage = error.message
      }
    }
    // Handle string errors
    else if (typeof error === 'string') {
      errorMessage = error
    }
  } catch (parseError) {
    console.error('Error parsing API error:', parseError)
    // Use fallback message if parsing fails
  }

  showError(errorMessage, options)
}

/**
 * Handle API success responses consistently
 * @param {string} action - Action performed (e.g., 'created', 'updated', 'deleted')
 * @param {string} entity - Entity name (e.g., 'Invoice', 'Client', 'Task')
 * @param {object} options - Additional toast options
 */
export const handleApiSuccess = (action, entity, options = {}) => {
  const message = `${entity} ${action} successfully!`
  showSuccess(message, options)
}

/**
 * Handle loading states with toast
 * @param {Promise} promise - Promise to handle
 * @param {object} options - Options for success/error handling
 * @returns {Promise} - The original promise
 */
export const handleAsyncOperation = async (promise, options = {}) => {
  const {
    loadingMessage = 'Processing...',
    successMessage = 'Operation completed successfully!',
    errorMessage = 'Operation failed',
    showLoading = false
  } = options

  let loadingToastId = null

  try {
    if (showLoading) {
      loadingToastId = toast.loading(loadingMessage)
    }

    const result = await promise

    if (loadingToastId) {
      toast.dismiss(loadingToastId)
    }

    if (successMessage) {
      showSuccess(successMessage)
    }

    return result
  } catch (error) {
    if (loadingToastId) {
      toast.dismiss(loadingToastId)
    }

    await handleApiError(error, errorMessage)
    throw error
  }
}

/**
 * Clear all toasts
 */
export const clearAllToasts = () => {
  toast.dismiss()
}

/**
 * Clear specific toast by ID
 * @param {string|number} toastId - Toast ID to dismiss
 */
export const clearToast = toastId => {
  toast.dismiss(toastId)
}

/**
 * Handle authentication errors specifically
 * @param {Error} error - Error object
 * @param {string} fallbackMessage - Fallback message
 * @param {object} options - Additional toast options
 */
export const handleAuthError = (error, fallbackMessage = 'Authentication failed', options = {}) => {
  const authErrorMessage = 'Your session has expired. Please log in again.'

  // Show error toast
  showError(authErrorMessage, {
    ...options,
    autoClose: 5000 // Longer duration for auth errors
  })

  // Redirect to login page after a delay
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      // Clear any stored tokens
      localStorage.removeItem('token')
      sessionStorage.clear()

      // Redirect to login
      window.location.href = '/login'
    }
  }, 3000)
}

/**
 * Enhanced fetch wrapper with better error handling
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
export const enhancedFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-type': 'web',
        ...options.headers
      },
      ...options
    })

    // Check if response is ok
    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json()
        const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
        error.status = response.status
        error.response = response
        throw error
      } catch (jsonError) {
        // If JSON parsing fails, create a meaningful error
        const error = new Error(`Server error (${response.status}): ${response.statusText}`)
        error.status = response.status
        error.response = response
        throw error
      }
    }

    // Try to parse JSON response
    try {
      const data = await response.json()
      return { ...response, data }
    } catch (jsonError) {
      // If response is not JSON, return the response as is
      return response
    }
  } catch (error) {
    // Re-throw with enhanced error message if needed
    if (error.message && error.message.includes('Unexpected token')) {
      throw new Error('Server returned an invalid response. Please check your connection and try again.')
    }
    throw error
  }
}

// Default export for backward compatibility
const toastService = {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  handleApiError,
  handleApiSuccess,
  handleAsyncOperation,
  handleAuthError,
  clearAllToasts,
  clearToast,
  enhancedFetch
}

export default toastService
