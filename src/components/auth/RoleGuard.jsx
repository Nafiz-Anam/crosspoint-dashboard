'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

/**
 * Higher-order component for protecting routes based on user role and permissions
 * @param {JSX.Element} WrappedComponent - Component to protect
 * @param {Object} options - Protection options
 * @param {string|Array} options.requiredRole - Required role(s) for access
 * @param {string} options.requiredModule - Required module for access
 * @param {string} options.requiredAction - Required action for access
 * @param {JSX.Element} options.fallback - Component to show if access is denied
 * @param {string} options.redirectTo - Path to redirect to if access is denied
 * @returns {JSX.Element} - Protected component or fallback
 */
const withRoleGuard = (WrappedComponent, options = {}) => {
  const {
    requiredRole,
    requiredModule,
    requiredAction,
    fallback = null,
    redirectTo = '/dashboards/analytics'
  } = options

  return function RoleGuardedComponent(props) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { hasAccess, canAction, isAuthenticated, isLoading } = useRoleBasedAccess()

    useEffect(() => {
      // Don't redirect while loading
      if (isLoading) return

      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        router.push('/auth/login')
        return
      }

      // Check role-based access
      if (requiredRole) {
        const userRole = session?.user?.role
        const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

        if (!allowedRoles.includes(userRole)) {
          if (redirectTo) {
            router.push(redirectTo)
          }
          return
        }
      }

      // Check module-based access
      if (requiredModule && !hasAccess(requiredModule)) {
        if (redirectTo) {
          router.push(redirectTo)
        }
        return
      }

      // Check action-based access
      if (requiredModule && requiredAction && !canAction(requiredModule, requiredAction)) {
        if (redirectTo) {
          router.push(redirectTo)
        }
        return
      }
    }, [
      isAuthenticated,
      isLoading,
      hasAccess,
      canAction,
      router,
      session,
      requiredRole,
      requiredModule,
      requiredAction
    ])

    // Show loading state
    if (isLoading) {
      return (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
        </div>
      )
    }

    // Show fallback if access is denied
    if (!isAuthenticated) {
      return (
        fallback || (
          <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Authentication Required</h2>
              <p className='text-gray-600'>Please log in to access this page.</p>
            </div>
          </div>
        )
      )
    }

    // Check access permissions
    if (requiredRole) {
      const userRole = session?.user?.role || session?.user?.roles
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

      if (!allowedRoles.includes(userRole)) {
        return (
          fallback || (
            <div className='flex items-center justify-center min-h-screen'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-gray-900 mb-4'>Access Denied</h2>
                <p className='text-gray-600'>You don't have permission to access this page.</p>
              </div>
            </div>
          )
        )
      }
    }

    if (requiredModule && !hasAccess(requiredModule)) {
      return (
        fallback || (
          <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Access Denied</h2>
              <p className='text-gray-600'>You don't have permission to access this module.</p>
            </div>
          </div>
        )
      )
    }

    if (requiredModule && requiredAction && !canAction(requiredModule, requiredAction)) {
      return (
        fallback || (
          <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Access Denied</h2>
              <p className='text-gray-600'>You don't have permission to perform this action.</p>
            </div>
          </div>
        )
      )
    }

    // Render the protected component
    return <WrappedComponent {...props} />
  }
}

export default withRoleGuard
