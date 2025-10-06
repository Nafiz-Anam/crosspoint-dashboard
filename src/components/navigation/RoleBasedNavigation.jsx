'use client'

import { useTranslation } from '@/hooks/useTranslation'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import verticalMenuItems from '@/data/navigation/verticalMenuItems'

/**
 * Role-based navigation component that filters menu items based on user permissions
 * @param {Object} props - Component props
 * @param {Function} props.render - Render function that receives filtered menu items
 * @returns {JSX.Element} - Rendered navigation
 */
const RoleBasedNavigation = ({ render }) => {
  const { t } = useTranslation()
  const { filterNavigation, isAuthenticated, isLoading } = useRoleBasedAccess()

  // Get all menu items
  const allMenuItems = verticalMenuItems(t)

  // Filter menu items based on user role and permissions
  const filteredMenuItems = isAuthenticated ? filterNavigation(allMenuItems) : []

  // Show loading state while authentication is being checked
  if (isLoading) {
    return render ? render([]) : null
  }

  // If not authenticated, return empty array or show login prompt
  if (!isAuthenticated) {
    return render ? render([]) : null
  }

  return render ? render(filteredMenuItems) : null
}

export default RoleBasedNavigation
