class AttendanceService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL
  }

  async checkIn(token = null) {
    try {
      const response = await fetch(`${this.baseURL}/attendance/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        }
        // body: JSON.stringify({ notes })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Check-in failed')
      }

      return data
    } catch (error) {
      console.error('Check-in error:', error)
      throw error
    }
  }

  async checkOut(token = null) {
    try {
      const response = await fetch(`${this.baseURL}/attendance/check-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        }
        // body: JSON.stringify({ notes })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Check-out failed')
      }

      return data
    } catch (error) {
      console.error('Check-out error:', error)
      throw error
    }
  }

  async getMyAttendance(date = null, token = null) {
    try {
      const url = date
        ? `${this.baseURL}/attendance/my-attendance?date=${date}`
        : `${this.baseURL}/attendance/my-attendance`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch attendance')
      }

      return data
    } catch (error) {
      console.error('Get attendance error:', error)
      throw error
    }
  }

  async getMyAttendanceRange(startDate, endDate, token = null) {
    try {
      const response = await fetch(
        `${this.baseURL}/attendance/my-attendance/range?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch attendance range')
      }

      return data
    } catch (error) {
      console.error('Get attendance range error:', error)
      throw error
    }
  }

  async getMyAttendanceStats(startDate, endDate, token = null) {
    try {
      const response = await fetch(
        `${this.baseURL}/attendance/my-attendance/stats?startDate=${startDate}&endDate=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch attendance stats')
      }

      return data
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
