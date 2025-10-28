'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid2'
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
    if (!session?.accessToken) return

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
          const branchData = data.data || data
          setBranches([branchData])
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
          setBranches(data.data || [])
        }
      }
    } catch (error) {
      console.error('Error fetching branches:', error)
    } finally {
      setBranchesLoading(false)
    }
  }, [session?.accessToken, session?.user?.role, session?.user?.branchId])

  // Fetch invoices and stats
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

      // Build query string for filters
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
  }, [status, session?.accessToken, filters])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBranches()
      fetchData()
    } else if (status === 'unauthenticated') {
      setError('Not authenticated. Please log in to view invoices.')
      setLoading(false)
    }
  }, [status, session?.accessToken, filters, fetchBranches])

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
            const errorData = await deleteResponse.json()
            throw new Error(errorData.message || 'Failed to delete invoice')
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
            const errorData = await updateResponse.json()
            console.error('Status update failed:', errorData)
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
        console.log(`Invoice marked as ${statusText} successfully`)
        // You can add a toast notification here if you have a toast service
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
          invoiceData={invoices}
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
