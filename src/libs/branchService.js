import apiClient from '@/services/apiClient'

class BranchService {
  constructor() {
    this.baseURL = '/branches'
  }

  // Get all branches with filters and pagination
  async getBranches(params = {}) {
    try {
      const response = await apiClient.get(this.baseURL, { params })

      return response.data
    } catch (error) {
      console.error('Error fetching branches:', error)
      throw error
    }
  }

  // Get active branches only (for dropdowns and selections)
  async getActiveBranches() {
    try {
      const response = await apiClient.get(`${this.baseURL}/active`)

      return response.data
    } catch (error) {
      console.error('Error fetching active branches:', error)
      throw error
    }
  }

  // Get single branch by ID
  async getBranchById(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error fetching branch:', error)
      throw error
    }
  }

  // Create new branch
  async createBranch(branchData) {
    try {
      const response = await apiClient.post(this.baseURL, branchData)

      return response.data
    } catch (error) {
      console.error('Error creating branch:', error)
      throw error
    }
  }

  // Update branch
  async updateBranch(id, branchData) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}`, branchData)

      return response.data
    } catch (error) {
      console.error('Error updating branch:', error)
      throw error
    }
  }

  // Delete branch
  async deleteBranch(id) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error deleting branch:', error)
      throw error
    }
  }

  // Get branch statistics
  async getBranchStats(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}/statistics`)

      return response.data
    } catch (error) {
      console.error('Error fetching branch stats:', error)
      throw error
    }
  }
}

export default new BranchService()
