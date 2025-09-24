const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1'

class DashboardService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/dashboard`
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

  // Get dashboard statistics
  async getDashboardStats(params = {}, token = null) {
    try {
      const queryParams = new URLSearchParams()
      if (params.startDate) queryParams.append('startDate', params.startDate)
      if (params.endDate) queryParams.append('endDate', params.endDate)

      const url = `${this.baseURL}/stats?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }

  // Get weekly earnings data
  async getWeeklyEarnings(params = {}, token = null) {
    try {
      const queryParams = new URLSearchParams()
      if (params.weeks) queryParams.append('weeks', params.weeks)

      const url = `${this.baseURL}/weekly-earnings?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching weekly earnings:', error)
      throw error
    }
  }

  // Get earnings data for any period (week/month/year)
  async getEarningsData(params = {}, token = null) {
    try {
      const queryParams = new URLSearchParams()
      if (params.branchId) queryParams.append('branchId', params.branchId)
      if (params.period) queryParams.append('period', params.period)

      const url = `${this.baseURL}/earnings?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching earnings data:', error)
      throw error
    }
  }

  // Get invoice statistics
  async getInvoiceStats(params = {}, token = null) {
    try {
      const queryParams = new URLSearchParams()
      if (params.startDate) queryParams.append('startDate', params.startDate)
      if (params.endDate) queryParams.append('endDate', params.endDate)

      const url = `${this.baseURL}/invoice-stats?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching invoice stats:', error)
      throw error
    }
  }

  // Get invoices list
  async getInvoices(params = {}, token = null) {
    try {
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.status) queryParams.append('status', params.status)
      if (params.search) queryParams.append('search', params.search)

      const url = `${this.baseURL.replace('/dashboard', '')}/invoices?${queryParams.toString()}`
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService()

export default dashboardService
