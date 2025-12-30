import apiClient, { createApiClient } from './apiClient'

class AttendanceService {
  constructor() {
    this.endpoint = '/attendance'
  }

  // Get API client with optional token
  getApiClient(token = null) {
    if (token) {
      return createApiClient(token)
    }
    return apiClient
  }

  async checkIn(token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.post(`${this.endpoint}/check-in`)
      return response.data
    } catch (error) {
      console.error('Check-in error:', error)
      throw error
    }
  }

  async checkOut(token = null, notes = '') {
    try {
      const client = this.getApiClient(token)
      const response = await client.post(`${this.endpoint}/check-out`, { notes })
      return response.data
    } catch (error) {
      console.error('Check-out error:', error)
      throw error
    }
  }

  async getMyAttendance(date = null, token = null) {
    try {
      const client = this.getApiClient(token)
      const params = date ? { date } : {}
      const response = await client.get(`${this.endpoint}/my-attendance`, { params })
      return response.data
    } catch (error) {
      console.error('Get attendance error:', error)
      throw error
    }
  }

  async getMyAttendanceRange(startDate, endDate, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/my-attendance/range`, {
        params: { startDate, endDate }
      })
      return response.data
    } catch (error) {
      console.error('Get attendance range error:', error)
      throw error
    }
  }

  async getMyAttendanceStats(startDate, endDate, token = null) {
    try {
      const client = this.getApiClient(token)
      const response = await client.get(`${this.endpoint}/my-attendance/stats`, {
        params: { startDate, endDate }
      })
      return response.data
    } catch (error) {
      console.error('Get attendance stats error:', error)
      throw error
    }
  }

  // Helper method to get current month date range
  getCurrentMonthRange() {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    return {
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0]
    }
  }
}

export const attendanceService = new AttendanceService()
