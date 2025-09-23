class CompanyInfoService {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL
  }

  async getCompanyInfo(token) {
    try {
      const response = await fetch(`${this.baseURL}/company-info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch company information')
      }

      return data
    } catch (error) {
      console.error('Get company info error:', error)
      throw error
    }
  }

  async updateCompanyInfo(companyData, token) {
    try {
      const response = await fetch(`${this.baseURL}/company-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(companyData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update company information')
      }

      return data
    } catch (error) {
      console.error('Update company info error:', error)
      throw error
    }
  }

  async uploadLogo(file, token) {
    try {
      const formData = new FormData()
      formData.append('logo', file)

      const response = await fetch(`${this.baseURL}/company-info/logo`, {
        method: 'POST',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload logo')
      }

      return data
    } catch (error) {
      console.error('Upload logo error:', error)
      throw error
    }
  }
}

export const companyInfoService = new CompanyInfoService()
export default companyInfoService
