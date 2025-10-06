'use client'

import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

/**
 * Component that conditionally renders content based on user role and permissions
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Content to render
 * @param {string|Array} props.roles - Required role(s) for rendering
 * @param {string} props.module - Required module for rendering
 * @param {string} props.action - Required action for rendering
 * @param {JSX.Element} props.fallback - Content to render if access is denied
 * @param {boolean} props.requireAll - If true, user must have all specified roles (for arrays)
 * @returns {JSX.Element|null} - Rendered content or null
 */
const ConditionalRender = ({ children, roles, module, action, fallback = null, requireAll = false }) => {
  const { hasAccess, canAction, isAuthenticated, isLoading, userRole, isAdmin, isHR, isManager, isEmployee } =
    useRoleBasedAccess()

  // Don't render anything while loading
  if (isLoading) {
    return null
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return fallback
  }

  // Check role-based access
  if (roles) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    if (requireAll) {
      // User must have ALL specified roles (useful for multiple role requirements)
      const hasAllRoles = allowedRoles.every(role => {
        switch (role) {
          case 'ADMIN':
            return isAdmin()
          case 'HR':
            return isHR()
          case 'MANAGER':
            return isManager()
          case 'EMPLOYEE':
            return isEmployee()
          default:
            return userRole === role
        }
      })

      if (!hasAllRoles) {
        return fallback
      }
    } else {
      // User must have ANY of the specified roles
      const hasAnyRole = allowedRoles.some(role => {
        switch (role) {
          case 'ADMIN':
            return isAdmin()
          case 'HR':
            return isHR()
          case 'MANAGER':
            return isManager()
          case 'EMPLOYEE':
            return isEmployee()
          default:
            return userRole === role
        }
      })

      if (!hasAnyRole) {
        return fallback
      }
    }
  }

  // Check module-based access
  if (module && !hasAccess(module)) {
    return fallback
  }

  // Check action-based access
  if (module && action && !canAction(module, action)) {
    return fallback
  }

  // Render the content
  return children
}

export default ConditionalRender
