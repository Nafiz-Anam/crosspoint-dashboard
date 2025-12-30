import apiClient from '@/services/apiClient'

class EmployeeService {
  constructor() {
    this.baseURL = '/employees'
  }

  // Get all employees for dropdown (no pagination)
  async getAllEmployees() {
    try {
      const response = await apiClient.get(`${this.baseURL}/list/all`)

      return response.data
    } catch (error) {
      console.error('Error fetching all employees:', error)
      throw error
    }
  }

  // Get all employees with filters
  async getEmployees(params = {}) {
    try {
      const response = await apiClient.get(this.baseURL, { params })

      return response.data
    } catch (error) {
      console.error('Error fetching employees:', error)
      throw error
    }
  }

  // Get single employee by ID
  async getEmployeeById(id) {
    try {
      const response = await apiClient.get(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error fetching employee:', error)
      throw error
    }
  }

  // Create new employee
  async createEmployee(employeeData) {
    try {
      const response = await apiClient.post(this.baseURL, employeeData)

      return response.data
    } catch (error) {
      console.error('Error creating employee:', error)
      throw error
    }
  }

  // Update employee
  async updateEmployee(id, employeeData) {
    try {
      const response = await apiClient.patch(`${this.baseURL}/${id}`, employeeData)

      return response.data
    } catch (error) {
      console.error('Error updating employee:', error)
      throw error
    }
  }

  // Delete employee
  async deleteEmployee(id) {
    try {
      const response = await apiClient.delete(`${this.baseURL}/${id}`)

      return response.data
    } catch (error) {
      console.error('Error deleting employee:', error)
      throw error
    }
  }
}

export default new EmployeeService()
