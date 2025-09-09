const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class ClientService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/clients`
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

  // Get all clients with filters
  async getClients(token = null, params = {}) {
    try {
      const queryParams = new URLSearchParams()

      // Add filter parameters
      if (params.name) queryParams.append('name', params.name)
      if (params.email) queryParams.append('email', params.email)
      if (params.branchId) queryParams.append('branchId', params.branchId)

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
      console.error('Error fetching clients:', error)
      throw error
    }
  }

  // Get single client by ID
  async getClientById(id) {
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
      console.error('Error fetching client:', error)
      throw error
    }
  }

  // Create new client
  async createClient(clientData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(clientData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating client:', error)
      throw error
    }
  }

  // Update client
  async updateClient(id, clientData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(clientData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating client:', error)
      throw error
    }
  }

  // Delete client
  async deleteClient(id) {
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
      console.error('Error deleting client:', error)
      throw error
    }
  }
}

export default new ClientService()
