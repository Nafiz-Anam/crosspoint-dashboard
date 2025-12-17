'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Component Imports
import InvoiceListTable from './InvoiceListTable'
// import InvoiceStatsCard from './InvoiceStatsCard' // Commented out for now

// Util Imports
import { useTranslation } from '@/hooks/useTranslation'
import toastService from '@/services/toastService'

const InvoiceList = () => {
  // Hooks
  const { t } = useTranslation()

  // States
  const [invoices, setInvoices] = useState([])
  // const [stats, setStats] = useState(null) // Commented out for now
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [branches, setBranches] = useState([])
  const [branchesLoading, setBranchesLoading] = useState(false)
  
  // Debug: Log branches state changes
  useEffect(() => {
    console.log('📊 Branches state updated:', branches, 'Length:', branches?.length)
  }, [branches])
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortType: 'desc',
    branchId: ''
  })

  // Hooks
  const { data: session, status } = useSession()

  // Fetch branches
  const fetchBranches = useCallback(async () => {
    console.log('🔄 fetchBranches function called', { hasToken: !!session?.accessToken, role: session?.user?.role, branchId: session?.user?.branchId })
    if (!session?.accessToken) {
      console.log('⚠️ No access token, skipping fetchBranches')
      return
    }

    console.log('🔄 Starting to fetch branches...')
    setBranchesLoading(true)
    try {
      // If user is a manager, fetch only their branch details
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/${session.user.branchId}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('📊 Manager branch API response:', data)
          const branchData = data.data || data
          console.log('📊 Manager branch data:', branchData)
          setBranches(Array.isArray(branchData) ? branchData : [branchData])
        } else {
          console.error('Failed to fetch manager branch:', response.status)
        }
      } else {
        // For other roles, fetch all active branches
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/active`, {
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('📊 Branches API response:', data)
          // Handle different possible response structures
          let branchesData = []
          if (Array.isArray(data)) {
            branchesData = data
          } else if (Array.isArray(data.data)) {
            branchesData = data.data
          } else if (data.data && !Array.isArray(data.data)) {
            // If data.data is a single object, wrap it in array
            branchesData = [data.data]
          }
          console.log('📊 Branches array after processing:', branchesData, 'Length:', branchesData.length)
          setBranches(branchesData)
        } else {
          console.error('Failed to fetch branches:', response.status, response.statusText)
          const errorData = await response.json().catch(() => ({}))
          console.error('Error details:', errorData)
        }
      }
    } catch (error) {
      console.error('Error fetching branches:', error)
    } finally {
      setBranchesLoading(false)
    }
  }, [session?.accessToken, session?.user?.role, session?.user?.branchId])

  // Fetch invoices and stats
  // NOTE: This is no longer used - child component handles all fetching
  // Keeping it for potential future use but it won't be called
  const fetchData = useCallback(async () => {
    if (status === 'loading') return
    if (status === 'unauthenticated' || !session?.accessToken) {
      setError(t('auth.authenticationRequired'))
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Build query string for filters (only for initial load)
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams.append(key, value)
        }
      })

      // Fetch invoices only (stats commented out for now)
      const invoicesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const invoicesData = await invoicesResponse.json()

      if (invoicesResponse.ok) {
        setInvoices(invoicesData.data?.invoices || [])
      } else {
        throw new Error(invoicesData.message || 'Failed to fetch invoices')
      }

      // Stats functionality commented out for now
      // const [invoicesResponse, statsResponse] = await Promise.all([
      //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices?${queryParams.toString()}`, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-client-type': 'web',
      //       Authorization: `Bearer ${session.accessToken}`
      //     }
      //   }),
      //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/stats?${queryParams.toString()}`, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'x-client-type': 'web',
      //       Authorization: `Bearer ${session.accessToken}`
      //     }
      //   })
      // ])

      // const invoicesData = await invoicesResponse.json()
      // const statsData = await statsResponse.json()

      // if (invoicesResponse.ok) {
      //   setInvoices(invoicesData.data?.invoices || [])
      // } else {
      //   throw new Error(invoicesData.message || 'Failed to fetch invoices')
      // }

      // if (statsResponse.ok) {
      //   setStats(statsData.data?.stats || null)
      // } else {
      //   console.warn('Failed to fetch stats:', statsData.message)
      //   setStats(null)
      // }
    } catch (err) {
      console.error('Error fetching invoice data:', err)
      setError(err.message || t('common.error'))
    } finally {
      setLoading(false)
    }
  }, [status, session?.accessToken]) // Removed filters - child component handles all filtering

  // Only fetch on initial mount or when session changes, not when filters change
  // The child component (InvoiceListTable) handles all filtering independently
  useEffect(() => {
    console.log('🔄 Invoice list useEffect triggered:', { status, hasToken: !!session?.accessToken })
    if (status === 'authenticated' && session?.accessToken) {
      console.log('🔄 Calling fetchBranches (initial load only)')
      fetchBranches()
      // Don't fetch invoices here - let the child component handle it
      // This prevents conflicts when filters change
      setLoading(false) // Set loading to false since child will handle its own loading
    } else if (status === 'unauthenticated') {
      setError('Not authenticated. Please log in to view invoices.')
      setLoading(false)
    } else if (status === 'loading') {
      // Keep loading state while session is loading
      setLoading(true)
    }
  }, [status, session?.accessToken, fetchBranches]) // Removed filters and fetchData from dependencies

  // Handle filter changes
  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Handle invoice actions
  const handleInvoiceAction = async (action, invoiceId, data = null) => {
    if (!session?.accessToken) {
      setError('Authentication required to perform this action.')
      return
    }

    try {
      switch (action) {
        case 'delete':
          const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            }
          })

          if (!deleteResponse.ok) {
            // Clone response before reading (so handleApiError can read it)
            const responseClone = deleteResponse.clone()
            // Read original for error details
            const errorData = await deleteResponse.json().catch(() => ({}))
            console.error('API Error deleting invoice:', errorData)
            // Show error toast using the cloned response
            await toastService.handleApiError(responseClone, 'Failed to delete invoice')
            throw new Error(errorData.message || 'Failed to delete invoice')
          } else {
            // Show success toast
            toastService.handleApiSuccess('deleted', 'Invoice')
          }
          break

        case 'updateStatus':
          console.log('Updating invoice status:', { invoiceId, status: data.status })
          const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}/status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify({ status: data.status })
          })

          if (!updateResponse.ok) {
            // Clone response before reading (so handleApiError can read it)
            const responseClone = updateResponse.clone()
            // Read original for error details
            const errorData = await updateResponse.json().catch(() => ({}))
            console.error('Status update failed:', errorData)
            // Show error toast using the cloned response
            await toastService.handleApiError(responseClone, 'Failed to update invoice status')
            throw new Error(errorData.message || 'Failed to update invoice status')
          }

          const updateResult = await updateResponse.json()
          console.log('Status update successful:', updateResult)
          break
        default:
          break
      }

      // Refresh data after action
      await fetchData()

      // Show success message for status updates
      if (action === 'updateStatus') {
        const statusText = data.status === 'PAID' ? 'paid' : 'unpaid'
        toastService.handleApiSuccess('updated', 'Invoice status')
        console.log(`Invoice marked as ${statusText} successfully`)
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err)
      setError(err.message || `Failed to ${action} invoice`)
    }
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ mb: 4 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Error Alert */}
      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        </Grid>
      )}

      {/* Invoice List Table */}
      <Grid size={{ xs: 12 }}>
        <InvoiceListTable
          invoiceData={null}
          onFilterChange={handleFilterChange}
          onInvoiceAction={handleInvoiceAction}
          filters={filters}
          branches={branches}
          branchesLoading={branchesLoading}
        />
      </Grid>
    </Grid>
  )
}

export default InvoiceList
