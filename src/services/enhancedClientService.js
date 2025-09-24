import clientService from '../libs/clientService'
import toastService from './toastService'

/**
 * Enhanced Client Service with Toast Integration
 * Wraps the existing client service with toast notifications
 */
class EnhancedClientService {
  constructor() {
    this.baseService = clientService
  }

  // Get all clients with toast notifications
  async getClients(token = null, params = {}, options = {}) {
    const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch clients' } = options

    try {
      const result = await this.baseService.getClients(token, params)

      if (showToast && successMessage) {
        toastService.showSuccess(successMessage)
      }

      return result
    } catch (error) {
      if (showToast) {
        await toastService.handleApiError(error, errorMessage)
      }
      throw error
    }
  }

  // Get single client by ID with toast notifications
  async getClientById(id, options = {}) {
    const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch client details' } = options

    try {
      const result = await this.baseService.getClientById(id)

      if (showToast && successMessage) {
        toastService.showSuccess(successMessage)
      }

      return result
    } catch (error) {
      if (showToast) {
        await toastService.handleApiError(error, errorMessage)
      }
      throw error
    }
  }

  // Create new client with toast notifications
  async createClient(clientData, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Client created successfully!',
      errorMessage = 'Failed to create client',
      showLoading = true
    } = options

    const apiCall = async () => {
      try {
        return await this.baseService.createClient(clientData, token)
      } catch (error) {
        // Enhanced error handling for common API issues
        if (error.message && error.message.includes('Please authenticate')) {
          throw new Error('Your session has expired. Please log in again.')
        } else if (error.message && error.message.includes('Unexpected token')) {
          throw new Error('Server returned an invalid response. Please check your connection and try again.')
        }
        throw error
      }
    }

    if (showLoading) {
      return toastService.handleAsyncOperation(apiCall, {
        loadingMessage: 'Creating client...',
        successMessage: showToast ? successMessage : null,
        errorMessage,
        showLoading: true
      })
    } else {
      try {
        const result = await apiCall()

        if (showToast) {
          toastService.showSuccess(successMessage)
        }

        return result
      } catch (error) {
        if (showToast) {
          await toastService.handleApiError(error, errorMessage)
        }
        throw error
      }
    }
  }

  // Update client with toast notifications
  async updateClient(id, clientData, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Client updated successfully!',
      errorMessage = 'Failed to update client',
      showLoading = true
    } = options

    const apiCall = async () => {
      try {
        return await this.baseService.updateClient(id, clientData, token)
      } catch (error) {
        // Enhanced error handling for common API issues
        if (error.message && error.message.includes('Please authenticate')) {
          throw new Error('Your session has expired. Please log in again.')
        } else if (error.message && error.message.includes('Unexpected token')) {
          throw new Error('Server returned an invalid response. Please check your connection and try again.')
        }
        throw error
      }
    }

    if (showLoading) {
      return toastService.handleAsyncOperation(apiCall, {
        loadingMessage: 'Updating client...',
        successMessage: showToast ? successMessage : null,
        errorMessage,
        showLoading: true
      })
    } else {
      try {
        const result = await apiCall()

        if (showToast) {
          toastService.showSuccess(successMessage)
        }

        return result
      } catch (error) {
        if (showToast) {
          await toastService.handleApiError(error, errorMessage)
        }
        throw error
      }
    }
  }

  // Delete client with toast notifications
  async deleteClient(id, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Client deleted successfully!',
      errorMessage = 'Failed to delete client',
      showLoading = true
    } = options

    const apiCall = () => this.baseService.deleteClient(id, token)

    if (showLoading) {
      return toastService.handleAsyncOperation(apiCall, {
        loadingMessage: 'Deleting client...',
        successMessage: showToast ? successMessage : null,
        errorMessage,
        showLoading: true
      })
    } else {
      try {
        const result = await apiCall()

        if (showToast) {
          toastService.showSuccess(successMessage)
        }

        return result
      } catch (error) {
        if (showToast) {
          await toastService.handleApiError(error, errorMessage)
        }
        throw error
      }
    }
  }

  // Bulk operations with toast notifications
  async bulkDeleteClients(ids, options = {}) {
    const {
      showToast = true,
      successMessage = `${ids.length} clients deleted successfully!`,
      errorMessage = 'Failed to delete clients',
      showLoading = true
    } = options

    const apiCall = async () => {
      const results = await Promise.allSettled(ids.map(id => this.baseService.deleteClient(id)))

      const failed = results.filter(result => result.status === 'rejected')
      if (failed.length > 0) {
        throw new Error(`${failed.length} clients failed to delete`)
      }

      return results.map(result => result.value)
    }

    if (showLoading) {
      return toastService.handleAsyncOperation(apiCall, {
        loadingMessage: `Deleting ${ids.length} clients...`,
        successMessage: showToast ? successMessage : null,
        errorMessage,
        showLoading: true
      })
    } else {
      try {
        const result = await apiCall()

        if (showToast) {
          toastService.showSuccess(successMessage)
        }

        return result
      } catch (error) {
        if (showToast) {
          await toastService.handleApiError(error, errorMessage)
        }
        throw error
      }
    }
  }
}

export default new EnhancedClientService()
