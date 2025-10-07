const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1'

class BankAccountService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/bank-accounts`
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

  // Get all bank accounts with filters
  async getBankAccounts(params = {}) {
    try {
      const queryParams = new URLSearchParams()

      // Add filter parameters
      if (params.bankName) queryParams.append('bankName', params.bankName)
      if (params.accountNumber) queryParams.append('accountNumber', params.accountNumber)
      if (params.isActive !== undefined) queryParams.append('isActive', params.isActive)

      // Add pagination parameters
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortType) queryParams.append('sortType', params.sortType)

      const url = `${this.baseURL}?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching bank accounts:', error)
      throw error
    }
  }

  // Get single bank account by ID
  async getBankAccountById(id) {
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
      console.error('Error fetching bank account:', error)
      throw error
    }
  }

  // Create new bank account
  async createBankAccount(bankAccountData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(bankAccountData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating bank account:', error)
      throw error
    }
  }

  // Update bank account
  async updateBankAccount(id, bankAccountData) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(bankAccountData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating bank account:', error)
      throw error
    }
  }

  // Delete bank account
  async deleteBankAccount(id) {
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
      console.error('Error deleting bank account:', error)
      throw error
    }
  }

  // Get active bank accounts
  async getActiveBankAccounts(token = null) {
    try {
      const response = await fetch(`${this.baseURL}/active`, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching active bank accounts:', error)
      throw error
    }
  }
}

export default new BankAccountService()
