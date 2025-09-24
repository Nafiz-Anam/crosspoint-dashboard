import apiClient, { createApiClient } from './apiClient'

/**
 * Base service class that provides common API operations
 * All services should extend this class for consistency
 */
class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  // Get API client with optional token
  getApiClient(token = null) {
    if (token) {
      return createApiClient(token)
    }
    return apiClient
  }

  /**
   * Get all items with optional filters
   * @param {Object} params - Query parameters
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async getAll(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(this.endpoint, { params })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${this.endpoint}:`, error)
      throw error
    }
  }

  /**
   * Get single item by ID
   * @param {string} id - Item ID
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async getById(id, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching ${this.endpoint} by ID:`, error)
      throw error
    }
  }

  /**
   * Create new item
   * @param {Object} data - Item data
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async create(data, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.post(this.endpoint, data)
      return response.data
    } catch (error) {
      console.error(`Error creating ${this.endpoint}:`, error)
      throw error
    }
  }

  /**
   * Update item by ID
   * @param {string} id - Item ID
   * @param {Object} data - Updated data
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async update(id, data, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.patch(`${this.endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating ${this.endpoint}:`, error)
      throw error
    }
  }

  /**
   * Delete item by ID
   * @param {string} id - Item ID
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async delete(id, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.delete(`${this.endpoint}/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting ${this.endpoint}:`, error)
      throw error
    }
  }

  /**
   * Bulk delete items
   * @param {Array} ids - Array of item IDs
   * @param {string} token - Optional auth token
   * @returns {Promise} - API response
   */
  async bulkDelete(ids, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.delete(`${this.endpoint}/bulk`, { data: { ids } })
      return response.data
    } catch (error) {
      console.error(`Error bulk deleting ${this.endpoint}:`, error)
      throw error
    }
  }
}

export default BaseService
