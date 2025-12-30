import apiClient from '@/services/apiClient'

class InvoiceService {
  constructor() {
    this.baseURL = '/invoices'
  }

  // Get all invoices with filters
  async getInvoices(params = {}) {
    try {
      const response = await apiClient.get(this.baseURL, { params })

      return response.data
    } catch (error) {
      console.error('Error fetching invoices:', error)
      throw error
    }
  }

  // Get single invoice by ID
  async getInvoiceById(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}`)
      const result = response.data

      return result.data?.invoice || result.data || result
    } catch (error) {
      console.error('Error fetching invoice:', error)
      throw error
    }
  }

  // Create new invoice
  async createInvoice(invoiceData) {
    try {
      const response = await apiClient.post(this.baseURL, invoiceData)

      return response.data
    } catch (error) {
      console.error('Error creating invoice:', error)
      throw error
    }
  }

  // Update invoice
  async updateInvoice(id, invoiceData) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}`, invoiceData)

      return response.data
    } catch (error) {
      console.error('Error updating invoice:', error)
      throw error
    }
  }

  // Delete invoice
  async deleteInvoice(id) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error deleting invoice:', error)
      throw error
    }
  }

  // Update invoice status
  async updateInvoiceStatus(id, status) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}/status`, { status })

      return response.data
    } catch (error) {
      console.error('Error updating invoice status:', error)
      throw error
    }
  }

  // Generate invoice number
  async generateInvoiceNumber() {
    try {
      const response = await apiClient.get(`${this.baseURL}/generate-number`)

      return response.data
    } catch (error) {
      console.error('Error generating invoice number:', error)
      throw error
    }
  }
}

export default new InvoiceService()
