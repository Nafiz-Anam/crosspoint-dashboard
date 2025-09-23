class AttendanceReportService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL
  }

  async downloadAttendanceReport(employeeId, reportData, token) {
    try {
      const response = await fetch(`${this.baseURL}/attendance/report/${employeeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reportData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate report')
      }

      // Get the filename from the response headers
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'attendance-report.xlsx'

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Convert response to blob
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return { success: true, filename }
    } catch (error) {
      console.error('Download report error:', error)
      throw error
    }
  }

  async getAttendanceReportData(employeeId, reportData, token) {
    try {
      const response = await fetch(`${this.baseURL}/attendance/report-data/${employeeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reportData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch report data')
      }

      return data
    } catch (error) {
      console.error('Get report data error:', error)
      throw error
    }
  }
}

export const attendanceReportService = new AttendanceReportService()
export default attendanceReportService
