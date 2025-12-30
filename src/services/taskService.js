import apiClient, { createApiClient } from './apiClient'

class TaskService {
  constructor() {
    this.endpoint = '/tasks'
  }

  // Get API client with optional token
  getApiClient(token = null) {
    if (token) {
      return createApiClient(token)
    }
    return apiClient
  }

  async getTaskStats(token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/statistics`)
      return response.data
    } catch (error) {
      console.error('Get task stats error:', error)
      throw error
    }
  }

  // Get tasks from API
  async getMyTasks(status = null, token = null) {
    try {
      const client = this.getApiClient(token)
      const params = status ? { status } : {}
      const response = await client.get(this.endpoint, { params })
      return response.data
    } catch (error) {
      console.error('Get tasks error:', error)
      throw error
    }
  }

  // Create task
  async createTask(taskData, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.post(this.endpoint, taskData)
      return response.data
    } catch (error) {
      console.error('Create task error:', error)
      throw error
    }
  }

  // Update task
  async updateTask(taskId, taskData, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.patch(`${this.endpoint}/${taskId}`, taskData)
      return response.data
    } catch (error) {
      console.error('Update task error:', error)
      throw error
    }
  }

  // Delete task
  async deleteTask(taskId, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.delete(`${this.endpoint}/${taskId}`)
      return response.data
    } catch (error) {
      console.error('Delete task error:', error)
      throw error
    }
  }

  // Get task by ID
  async getTaskById(taskId, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/${taskId}`)
      return response.data
    } catch (error) {
      console.error('Get task by ID error:', error)
      throw error
    }
  }
}

export const taskService = new TaskService()
