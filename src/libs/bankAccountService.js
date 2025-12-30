import apiClient from '@/services/apiClient'

class BankAccountService {
  constructor() {
    this.baseURL = '/bank-accounts'
  }

  // Get all bank accounts with filters
  async getBankAccounts(params = {}) {
    try {
      const response = await apiClient.get(this.baseURL, { params })

      return response.data
    } catch (error) {
      console.error('Error fetching bank accounts:', error)
      throw error
    }
  }

  // Get single bank account by ID
  async getBankAccountById(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error fetching bank account:', error)
      throw error
    }
  }

  // Create new bank account
  async createBankAccount(bankAccountData) {
    try {
      const response = await apiClient.post(this.baseURL, bankAccountData)

      return response.data
    } catch (error) {
      console.error('Error creating bank account:', error)
      throw error
    }
  }

  // Update bank account
  async updateBankAccount(id, bankAccountData) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}`, bankAccountData)

      return response.data
    } catch (error) {
      console.error('Error updating bank account:', error)
      throw error
    }
  }

  // Delete bank account
  async deleteBankAccount(id) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error deleting bank account:', error)
      throw error
    }
  }

  // Get active bank accounts
  async getActiveBankAccounts() {
    try {
      const response = await apiClient.get(`${this.baseURL}/active`)

      return response.data
    } catch (error) {
      console.error('Error fetching active bank accounts:', error)
      throw error
    }
  }
}

export default new BankAccountService()
