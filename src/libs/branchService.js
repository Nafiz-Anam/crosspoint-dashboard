const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class BranchService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/branches`
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

  // Get all branches with filters
  async getBranches(token = null, params = {}) {
    try {
      const queryParams = new URLSearchParams()

      // Add filter parameters
      if (params.name) queryParams.append('name', params.name)
      if (params.city) queryParams.append('city', params.city)
      if (params.isActive !== undefined) queryParams.append('isActive', params.isActive)

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
      console.error('Error fetching branches:', error)
      throw error
    }
  }

  // Get single branch by ID
  async getBranchById(id) {
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
      console.error('Error fetching branch:', error)
      throw error
    }
  }

  // Create new branch
  async createBranch(branchData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(branchData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating branch:', error)
      throw error
    }
  }

  // Update branch
  async updateBranch(id, branchData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(branchData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating branch:', error)
      throw error
    }
  }

  // Delete branch
  async deleteBranch(id) {
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
      console.error('Error deleting branch:', error)
      throw error
    }
  }

  // Get branch statistics
  async getBranchStats(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/statistics`, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching branch stats:', error)
      throw error
    }
  }
}

export default new BranchService()
