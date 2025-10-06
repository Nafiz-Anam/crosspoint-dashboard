'use client'

import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import {
  hasModuleAccess,
  getAccessibleModules,
  filterNavigationByRole,
  canPerformAction,
  getRoleDisplayName
} from '@/utils/roleBasedAccess'

/**
 * Custom hook for role-based access control
 * @returns {Object} - Access control utilities and user info
 */
export const useRoleBasedAccess = () => {
  const { data: session, status } = useSession()

  const userRole = session?.user?.role
  const userPermissions = session?.user?.permissions || []

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  // Memoize accessible modules to avoid recalculation
  const accessibleModules = useMemo(() => {
    if (!isAuthenticated || !userRole) return []
    return getAccessibleModules(userRole, userPermissions)
  }, [isAuthenticated, userRole, userPermissions])

  /**
   * Check if user has access to a specific module
   * @param {string} moduleName - The module name
   * @returns {boolean} - Whether the user has access
   */
  const hasAccess = moduleName => {
    if (!isAuthenticated || !userRole) return false
    return hasModuleAccess(moduleName, userRole, userPermissions)
  }

  /**
   * Check if user can perform a specific action
   * @param {string} moduleName - The module name
   * @param {string} action - The action
   * @returns {boolean} - Whether the user can perform the action
   */
  const canAction = (moduleName, action) => {
    if (!isAuthenticated || !userRole) return false
    return canPerformAction(moduleName, action, userRole, userPermissions)
  }

  /**
   * Filter navigation items based on user access
   * @param {Array} navigationItems - Navigation items to filter
   * @returns {Array} - Filtered navigation items
   */
  const filterNavigation = navigationItems => {
    if (!isAuthenticated || !userRole) return navigationItems.filter(item => !item.module) // Show only non-module items
    return filterNavigationByRole(navigationItems, userRole, userPermissions)
  }

  /**
   * Get user role display name
   * @returns {string} - Display name for the role
   */
  const getRoleName = () => {
    return getRoleDisplayName(userRole)
  }

  /**
   * Check if user is admin
   * @returns {boolean} - Whether user is admin
   */
  const isAdmin = () => {
    return userRole === 'ADMIN'
  }

  /**
   * Check if user is HR
   * @returns {boolean} - Whether user is HR
   */
  const isHR = () => {
    return userRole === 'HR'
  }

  /**
   * Check if user is manager
   * @returns {boolean} - Whether user is manager
   */
  const isManager = () => {
    return userRole === 'MANAGER'
  }

  /**
   * Check if user is employee
   * @returns {boolean} - Whether user is employee
   */
  const isEmployee = () => {
    return userRole === 'EMPLOYEE'
  }

  return {
    // User info
    userRole,
    userPermissions,
    isAuthenticated,
    isLoading,
    getRoleName,

    // Role checks
    isAdmin,
    isHR,
    isManager,
    isEmployee,

    // Access control
    hasAccess,
    canAction,
    accessibleModules,
    filterNavigation
  }
}

export default useRoleBasedAccess
