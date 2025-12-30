import apiClient from './apiClient'

class CompanyInfoService {
  async getCompanyInfo() {
    try {
      const response = await apiClient.get('/company-info')
      return response.data
    } catch (error) {
      console.error('Get company info error:', error)
      throw error
    }
  }

  async updateCompanyInfo(companyData) {
    try {
      const response = await apiClient.put('/company-info', companyData)
      return response.data
    } catch (error) {
      console.error('Update company info error:', error)
      throw error
    }
  }

  async uploadLogo(file) {
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await apiClient.post('/company-info/logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      return response.data
    } catch (error) {
      console.error('Upload logo error:', error)
      throw error
    }
  }
}

export const companyInfoService = new CompanyInfoService()
export default companyInfoService
