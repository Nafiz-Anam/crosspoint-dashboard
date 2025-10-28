const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1'

class ServiceService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/services`
  }

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  // Get headers with auth token
  getHeaders(token = null) {
    const authToken = token || this.getAuthToken()
    return {
      'Content-Type': 'application/json',
      'x-client-type': 'web',
      ...(authToken && { Authorization: `Bearer ${authToken}` })
    }
  }

  // Get all services for dropdown (no pagination)
  async getAllServices(token = null) {
    try {
      const response = await fetch(`${this.baseURL}/list/all`, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching all services:', error)
      throw error
    }
  }

  // Get all services with filters
  async getServices(token = null, params = {}) {
    try {
      const queryParams = new URLSearchParams()

      // Add filter parameters
      if (params.name) queryParams.append('name', params.name)
      if (params.description) queryParams.append('description', params.description)
      if (params.category) queryParams.append('category', params.category)

      // Add pagination parameters
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortType) queryParams.append('sortType', params.sortType)

      const url = `${this.baseURL}?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching services:', error)
      throw error
    }
  }

  // Get single service by ID
  async getServiceById(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching service:', error)
      throw error
    }
  }

  // Create new service
  async createService(serviceData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(serviceData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating service:', error)
      throw error
    }
  }

  // Update service
  async updateService(id, serviceData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(serviceData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating service:', error)
      throw error
    }
  }

  // Delete service
  async deleteService(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting service:', error)
      throw error
    }
  }
}

export default new ServiceService()
