'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import ConditionalRender from '@/components/auth/ConditionalRender'

/**
 * Example component showing how to use role-based access control
 * This demonstrates different ways to protect content based on user roles
 */
const ProtectedPageExample = () => {
  const { userRole, isAuthenticated, isLoading, hasAccess, canAction, isAdmin, isHR, isManager, isEmployee } =
    useRoleBasedAccess()

  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Role-Based Access Control Example</h1>

      {/* User Info */}
      <div className='bg-gray-100 p-4 rounded-lg mb-6'>
        <h2 className='text-xl font-semibold mb-2'>Current User Info</h2>
        <p>
          <strong>Role:</strong> {userRole}
        </p>
        <p>
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </p>
      </div>

      {/* Method 1: Using ConditionalRender component */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Method 1: Using ConditionalRender Component</h2>

        <ConditionalRender roles={['ADMIN']}>
          <div className='bg-red-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-red-800'>Admin Only Content</h3>
            <p>This content is only visible to administrators.</p>
          </div>
        </ConditionalRender>

        <ConditionalRender roles={['ADMIN', 'HR']}>
          <div className='bg-blue-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-blue-800'>Admin & HR Content</h3>
            <p>This content is visible to administrators and HR.</p>
          </div>
        </ConditionalRender>

        <ConditionalRender module='CLIENT'>
          <div className='bg-green-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-green-800'>Client Module Content</h3>
            <p>This content is visible to users with access to the Client module.</p>
          </div>
        </ConditionalRender>

        <ConditionalRender module='EMPLOYEE' action='CREATE'>
          <div className='bg-purple-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-purple-800'>Employee Creation Content</h3>
            <p>This content is visible to users who can create employees.</p>
          </div>
        </ConditionalRender>
      </div>

      {/* Method 2: Using hooks directly */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Method 2: Using Hooks Directly</h2>

        {isAdmin() && (
          <div className='bg-red-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-red-800'>Admin Hook Content</h3>
            <p>This content uses the isAdmin() hook.</p>
          </div>
        )}

        {isHR() && (
          <div className='bg-blue-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-blue-800'>HR Hook Content</h3>
            <p>This content uses the isHR() hook.</p>
          </div>
        )}

        {hasAccess('CLIENT') && (
          <div className='bg-green-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-green-800'>Client Access Hook Content</h3>
            <p>This content uses the hasAccess(&apos;CLIENT&apos;) hook.</p>
          </div>
        )}

        {canAction('EMPLOYEE', 'CREATE') && (
          <div className='bg-purple-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-purple-800'>Employee Create Action Hook Content</h3>
            <p>This content uses the canAction(&apos;EMPLOYEE&apos;, &apos;CREATE&apos;) hook.</p>
          </div>
        )}
      </div>

      {/* Method 3: Complex conditional logic */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Method 3: Complex Conditional Logic</h2>

        {(isAdmin() || isHR()) && (
          <div className='bg-yellow-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-yellow-800'>Admin or HR Content</h3>
            <p>This content is visible to both administrators and HR.</p>
          </div>
        )}

        {isEmployee() && hasAccess('CLIENT') && (
          <div className='bg-indigo-100 p-4 rounded-lg mb-2'>
            <h3 className='font-semibold text-indigo-800'>Employee with Client Access</h3>
            <p>This content is visible to employees who have client access.</p>
          </div>
        )}
      </div>

      {/* Module Access Matrix */}
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Module Access Matrix</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-4 py-2 text-left'>Module</th>
                <th className='px-4 py-2 text-left'>Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-4 py-2 border-b'>Employee Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('EMPLOYEE') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Client Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('CLIENT') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Task Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('TASK') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Branch Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('BRANCH') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Service Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('SERVICE') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Payment Methods</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('PAYMENT_METHODS') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Invoice Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('INVOICE') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className='px-4 py-2 border-b'>Roles Management</td>
                <td className='px-4 py-2 border-b'>
                  {hasAccess('ROLES') ? (
                    <span className='text-green-600 font-semibold'>✓ Has Access</span>
                  ) : (
                    <span className='text-red-600 font-semibold'>✗ No Access</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProtectedPageExample
