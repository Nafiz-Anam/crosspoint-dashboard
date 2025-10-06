/**
 * Role-based access control utilities
 * Based on the permission system defined in backend/src/config/roles.ts
 */

// Define module permissions mapping
export const MODULE_PERMISSIONS = {
  // Employee Management Module
  EMPLOYEE: {
    requiredPermissions: ['CREATE_EMPLOYEE', 'READ_EMPLOYEE', 'UPDATE_EMPLOYEE', 'DELETE_EMPLOYEE', 'MANAGE_EMPLOYEES'],
    roles: ['ADMIN', 'HR', 'MANAGER'] // Roles that have access to this module
  },

  // Client Management Module
  CLIENT: {
    requiredPermissions: ['CREATE_CLIENT', 'READ_CLIENT', 'UPDATE_CLIENT', 'DELETE_CLIENT'],
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },

  // Task Management Module
  TASK: {
    requiredPermissions: ['CREATE_TASK', 'READ_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'ASSIGN_TASK'],
    roles: ['ADMIN', 'MANAGER', 'EMPLOYEE']
  },

  // Branch Management Module
  BRANCH: {
    requiredPermissions: ['CREATE_BRANCH', 'READ_BRANCH', 'UPDATE_BRANCH', 'DELETE_BRANCH'],
    roles: ['ADMIN']
  },

  // Service Management Module
  SERVICE: {
    requiredPermissions: ['CREATE_SERVICE', 'READ_SERVICE', 'UPDATE_SERVICE', 'DELETE_SERVICE'],
    roles: ['ADMIN', 'HR']
  },

  // Payment Methods Module
  PAYMENT_METHODS: {
    requiredPermissions: [
      'CREATE_PAYMENT_METHOD',
      'READ_PAYMENT_METHOD',
      'UPDATE_PAYMENT_METHOD',
      'DELETE_PAYMENT_METHOD'
    ],
    roles: ['ADMIN', 'HR']
  },

  // Invoice Management Module
  INVOICE: {
    requiredPermissions: ['CREATE_INVOICE', 'READ_INVOICE', 'UPDATE_INVOICE', 'DELETE_INVOICE'],
    roles: ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
  },

  // Bank Account Management Module
  BANK_ACCOUNT: {
    requiredPermissions: ['CREATE_BANK_ACCOUNT', 'READ_BANK_ACCOUNT', 'UPDATE_BANK_ACCOUNT', 'DELETE_BANK_ACCOUNT'],
    roles: ['ADMIN', 'HR', 'MANAGER']
  }
}

/**
 * Check if a user has access to a specific module
 * @param {string} moduleName - The module name (e.g., 'EMPLOYEE', 'CLIENT', etc.)
 * @param {string} userRole - The user's role
 * @param {Array} userPermissions - The user's permissions array
 * @returns {boolean} - Whether the user has access to the module
 */
export const hasModuleAccess = (moduleName, userRole, userPermissions = []) => {
  const moduleConfig = MODULE_PERMISSIONS[moduleName]

  if (!moduleConfig) {
    console.warn(`Module ${moduleName} not found in MODULE_PERMISSIONS`)
    return false
  }

  // Check if user's role has access to this module
  if (moduleConfig.roles.includes(userRole)) {
    return true
  }

  // If role-based check fails, check individual permissions
  // This is a fallback for cases where permissions might be assigned individually
  return moduleConfig.requiredPermissions.some(permission => userPermissions.includes(permission))
}

/**
 * Get accessible modules for a user based on their role
 * @param {string} userRole - The user's role
 * @param {Array} userPermissions - The user's permissions array
 * @returns {Array} - Array of accessible module names
 */
export const getAccessibleModules = (userRole, userPermissions = []) => {
  return Object.keys(MODULE_PERMISSIONS).filter(moduleName => hasModuleAccess(moduleName, userRole, userPermissions))
}

/**
 * Filter navigation items based on user role and permissions
 * @param {Array} navigationItems - Array of navigation items
 * @param {string} userRole - The user's role
 * @param {Array} userPermissions - The user's permissions array
 * @returns {Array} - Filtered navigation items
 */
export const filterNavigationByRole = (navigationItems, userRole, userPermissions = []) => {
  return navigationItems.filter(item => {
    // If item has a module property, check access
    if (item.module) {
      return hasModuleAccess(item.module, userRole, userPermissions)
    }

    // If item has children, filter them recursively
    if (item.children) {
      const filteredChildren = filterNavigationByRole(item.children, userRole, userPermissions)
      return filteredChildren.length > 0 // Only include if there are accessible children
    }

    // If no module restriction, allow access
    return true
  })
}

/**
 * Check if user can perform a specific action on a module
 * @param {string} moduleName - The module name
 * @param {string} action - The action (CREATE, READ, UPDATE, DELETE, etc.)
 * @param {string} userRole - The user's role
 * @param {Array} userPermissions - The user's permissions array
 * @returns {boolean} - Whether the user can perform the action
 */
export const canPerformAction = (moduleName, action, userRole, userPermissions = []) => {
  const moduleConfig = MODULE_PERMISSIONS[moduleName]

  if (!moduleConfig) {
    return false
  }

  const requiredPermission = `${action}_${moduleName}`

  // Check if user's role has access to this module
  if (moduleConfig.roles.includes(userRole)) {
    return true
  }

  // Check individual permission
  return userPermissions.includes(requiredPermission)
}

/**
 * Get user role display name
 * @param {string} role - The role constant
 * @returns {string} - Display name for the role
 */
export const getRoleDisplayName = role => {
  const roleNames = {
    ADMIN: 'Administrator',
    HR: 'Human Resources',
    MANAGER: 'Manager',
    EMPLOYEE: 'Employee'
  }

  return roleNames[role] || role
}
