import BaseService from './BaseService'

/**
 * Service Factory - Creates consistent API services
 * Usage: const userService = ServiceFactory.create('/users')
 */
class ServiceFactory {
  /**
   * Create a new service instance
   * @param {string} endpoint - API endpoint
   * @returns {BaseService} - Service instance
   */
  static create(endpoint) {
    return new BaseService(endpoint)
  }

  /**
   * Create multiple services at once
   * @param {Object} endpoints - Object with service names as keys and endpoints as values
   * @returns {Object} - Object with service instances
   */
  static createMultiple(endpoints) {
    const services = {}
    for (const [name, endpoint] of Object.entries(endpoints)) {
      services[name] = new BaseService(endpoint)
    }
    return services
  }
}

// Pre-configured services
export const services = ServiceFactory.createMultiple({
  clients: '/clients',
  invoices: '/invoices',
  tasks: '/tasks',
  employees: '/employees',
  branches: '/branches',
  services: '/services',
  bankAccounts: '/bank-accounts',
  companyInfo: '/company-info',
  dashboard: '/dashboard',
  attendance: '/attendance'
})

export default ServiceFactory
