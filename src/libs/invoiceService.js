const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/v1'

class InvoiceService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/invoices`
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

  // Get all invoices with filters
  async getInvoices(params = {}) {
    try {
      const queryParams = new URLSearchParams()

      // Add filter parameters
      if (params.clientId) queryParams.append('clientId', params.clientId)
      if (params.branchId) queryParams.append('branchId', params.branchId)
      if (params.employeeId) queryParams.append('employeeId', params.employeeId)
      if (params.status) queryParams.append('status', params.status)
      if (params.invoiceNumber) queryParams.append('invoiceNumber', params.invoiceNumber)

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
      console.error('Error fetching invoices:', error)
      throw error
    }
  }

  // Get single invoice by ID
  async getInvoiceById(id, token = null) {
    try {
      console.log('Fetching invoice with ID:', id)
      console.log('Using token:', token ? 'Yes' : 'No')
      console.log('API URL:', `${this.baseURL}/${id}`)

      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: this.getHeaders(token)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('Invoice data received:', result)
      console.log('Invoice data structure:', result.data)
      console.log('Invoice object:', result.data?.invoice)
      return result.data.invoice
    } catch (error) {
      console.error('Error fetching invoice:', error)
      throw error
    }
  }

  // Create new invoice
  async createInvoice(invoiceData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(invoiceData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw error
    }
  }

  // Update invoice
  async updateInvoice(id, invoiceData, token = null) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(token),
        body: JSON.stringify(invoiceData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating invoice:', error)
      throw error
    }
  }

  // Delete invoice
  async deleteInvoice(id, token = null) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(token)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting invoice:', error)
      throw error
    }
  }

  // Update invoice status
  async updateInvoiceStatus(id, status, token = null) {
    try {
      const response = await fetch(`${this.baseURL}/${id}/status`, {
        method: 'PATCH',
        headers: this.getHeaders(token),
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating invoice status:', error)
      throw error
    }
  }

  // Get invoice statistics - Commented out for now
  // async getInvoiceStats(params = {}) {
  //   try {
  //     const queryParams = new URLSearchParams()

  //     if (params.branchId) queryParams.append('branchId', params.branchId)
  //     if (params.clientId) queryParams.append('clientId', params.clientId)
  //     if (params.employeeId) queryParams.append('employeeId', params.employeeId)
  //     if (params.startDate) queryParams.append('startDate', params.startDate)
  //     if (params.endDate) queryParams.append('endDate', params.endDate)

  //     const url = `${this.baseURL}/stats?${queryParams.toString()}`
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: this.getHeaders()
  //     })

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }

  //     return await response.json()
  //   } catch (error) {
  //     console.error('Error fetching invoice stats:', error)
  //     throw error
  //   }
  // }

  // Generate invoice number
  async generateInvoiceNumber() {
    try {
      const response = await fetch(`${this.baseURL}/generate-number`, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error generating invoice number:', error)
      throw error
    }
  }
}

export default new InvoiceService()
