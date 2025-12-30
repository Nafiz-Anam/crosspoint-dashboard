import apiClient from './apiClient'

class AttendanceReportService {
  async downloadAttendanceReport(employeeId, reportData) {
    try {
      const response = await apiClient.post(`/attendance/report/${employeeId}`, reportData, {
        responseType: 'blob'
      })

      // Get the filename from the response headers
      const contentDisposition = response.headers['content-disposition']
      let filename = 'attendance-report.xlsx'

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Convert response data to blob (axios already does this if responseType is 'blob')
      const blob = response.data

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

  async getAttendanceReportData(employeeId, reportData) {
    try {
      const response = await apiClient.post(`/attendance/report-data/${employeeId}`, reportData)
      return response.data
    } catch (error) {
      console.error('Get report data error:', error)
      throw error
    }
  }
}

export const attendanceReportService = new AttendanceReportService()
export default attendanceReportService
