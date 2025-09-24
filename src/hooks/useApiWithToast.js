import { useState, useCallback } from 'react'
import toastService from '../services/toastService'

/**
 * Custom hook for API calls with integrated toast notifications
 * Handles loading states, success/error toasts automatically
 */
export const useApiWithToast = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Execute API call with toast notifications
   * @param {Function} apiCall - Function that returns a promise
   * @param {Object} options - Configuration options
   * @returns {Promise} - Result of the API call
   */
  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      successMessage = null,
      errorMessage = 'Operation failed',
      showLoading = false,
      loadingMessage = 'Processing...',
      showSuccess = true,
      showError = true,
      onSuccess = null,
      onError = null
    } = options

    setLoading(true)
    setError(null)

    try {
      const result = await apiCall()

      if (showSuccess && successMessage) {
        toastService.showSuccess(successMessage)
      }

      if (onSuccess) {
        onSuccess(result)
      }

      return result
    } catch (err) {
      const errorMsg = err?.message || errorMessage
      setError(errorMsg)

      if (showError) {
        await toastService.handleApiError(err, errorMessage)
      }

      if (onError) {
        onError(err)
      }

      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Execute API call with loading toast
   * @param {Function} apiCall - Function that returns a promise
   * @param {Object} options - Configuration options
   * @returns {Promise} - Result of the API call
   */
  const executeWithLoading = useCallback(
    async (apiCall, options = {}) => {
      return execute(apiCall, { ...options, showLoading: true })
    },
    [execute]
  )

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
  }, [])

  return {
    loading,
    error,
    execute,
    executeWithLoading,
    clearError,
    reset
  }
}

export default useApiWithToast
