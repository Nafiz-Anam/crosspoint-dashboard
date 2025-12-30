import apiClient, { createApiClient } from './apiClient'

class DashboardService {
  constructor() {
    this.endpoint = '/dashboard'
  }

  // Get API client with optional token
  getApiClient(token = null) {
    if (token) {
      return createApiClient(token)
    }
    return apiClient
  }

  // Get dashboard statistics
  async getDashboardStats(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/stats`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }

  // Get weekly earnings data
  async getWeeklyEarnings(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/weekly-earnings`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching weekly earnings:', error)
      throw error
    }
  }

  // Get earnings data for any period (week/month/year)
  async getEarningsData(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/earnings`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching earnings data:', error)
      throw error
    }
  }

  // Get invoice statistics
  async getInvoiceStats(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/invoice-stats`, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching invoice stats:', error)
      throw error
    }
  }

  // Get invoices list
  async getInvoices(params = {}, token = null) {
    try {
      const client = this.getApiClient(token)
      // Invoices are at the root level, not under /dashboard
      const response = await client.get('/invoices', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService()

export default dashboardService
