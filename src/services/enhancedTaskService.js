import { taskService } from './taskService'
import toastService from './toastService'

/**
 * Enhanced Task Service with Toast Integration
 * Wraps the existing task service with toast notifications
 */
class EnhancedTaskService {
  constructor() {
    this.baseService = taskService
  }

  // Get all tasks with toast notifications
  async getTasks(token = null, params = {}, options = {}) {
    const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch tasks' } = options

    try {
      const result = await this.baseService.getMyTasks(params.status, token)

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

  // Get single task by ID with toast notifications
  async getTaskById(id, options = {}) {
    const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch task details' } = options

    try {
      // This would need to be implemented in the base service
      const result = await this.baseService.getTaskById(id)

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

  // Create new task with toast notifications
  async createTask(taskData, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Task created successfully!',
      errorMessage = 'Failed to create task',
      showLoading = true
    } = options

    const apiCall = async () => {
      try {
        return await this.baseService.createTask(taskData, token)
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
        loadingMessage: 'Creating task...',
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

  // Update task with toast notifications
  async updateTask(id, taskData, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Task updated successfully!',
      errorMessage = 'Failed to update task',
      showLoading = true
    } = options

    const apiCall = async () => {
      try {
        return await this.baseService.updateTask(id, taskData, token)
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
        loadingMessage: 'Updating task...',
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

  // Delete task with toast notifications
  async deleteTask(id, token = null, options = {}) {
    const {
      showToast = true,
      successMessage = 'Task deleted successfully!',
      errorMessage = 'Failed to delete task',
      showLoading = true
    } = options

    const apiCall = () => this.baseService.deleteTask(id, token)

    if (showLoading) {
      return toastService.handleAsyncOperation(apiCall, {
        loadingMessage: 'Deleting task...',
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

  // Get task statistics with toast notifications
  async getTaskStats(token = null, options = {}) {
    const { showToast = false, successMessage = null, errorMessage = 'Failed to fetch task statistics' } = options

    try {
      const result = await this.baseService.getTaskStats(token)

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
}

export default new EnhancedTaskService()
