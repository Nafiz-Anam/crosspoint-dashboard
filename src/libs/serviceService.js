import apiClient from '@/services/apiClient'

class ServiceService {
  constructor() {
    this.baseURL = '/services'
  }

  // Get all services for dropdown (no pagination)
  async getAllServices() {
    try {
      const response = await apiClient.get(`${this.baseURL}/list/all`)

      return response.data
    } catch (error) {
      console.error('Error fetching all services:', error)
      throw error
    }
  }

  // Get all services with filters
  async getServices(params = {}) {
    try {
      const response = await apiClient.get(this.baseURL, { params })

      return response.data
    } catch (error) {
      console.error('Error fetching services:', error)
      throw error
    }
  }

  // Get single service by ID
  async getServiceById(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error fetching service:', error)
      throw error
    }
  }

  // Create new service
  async createService(serviceData) {
    try {
      const response = await apiClient.post(this.baseURL, serviceData)

      return response.data
    } catch (error) {
      console.error('Error creating service:', error)
      throw error
    }
  }

  // Update service
  async updateService(id, serviceData) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}`, serviceData)

      return response.data
    } catch (error) {
      console.error('Error updating service:', error)
      throw error
    }
  }

  // Delete service
  async deleteService(id) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error deleting service:', error)
      throw error
    }
  }
}

export default new ServiceService()
