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
import apiClient from '@/services/apiClient'

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
    console.log('🔄 fetchBranches function called', { role: session?.user?.role, branchId: session?.user?.branchId })
    
    console.log('🔄 Starting to fetch branches...')
    setBranchesLoading(true)
    try {
      // If user is a manager, fetch only their branch details
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        const response = await apiClient.get(`/branches/${session.user.branchId}`)
        const branchData = response.data.data || response.data
        console.log('📊 Manager branch data:', branchData)
        setBranches(Array.isArray(branchData) ? branchData : [branchData])
      } else {
        // For other roles, fetch all active branches
        const response = await apiClient.get('/branches/active')
        const data = response.data
        
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
      }
    } catch (error) {
      console.error('Error fetching branches:', error)
      await toastService.handleApiError(error, 'Failed to fetch branches')
    } finally {
      setBranchesLoading(false)
    }
  }, [session?.user?.role, session?.user?.branchId])

  // fetchData function removed as child component handles all fetching

  // Only fetch on initial mount or when session changes, not when filters change
  // The child component (InvoiceListTable) handles all filtering independently
  useEffect(() => {
    console.log('🔄 Invoice list useEffect triggered:', { status })
    if (status === 'authenticated') {
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
  }, [status, fetchBranches])

  // Handle filter changes
  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Handle invoice actions
  const handleInvoiceAction = async (action, invoiceId, data = null) => {
    try {
      switch (action) {
        case 'delete':
          await apiClient.delete(`/invoices/${invoiceId}`)
          toastService.handleApiSuccess('deleted', 'Invoice')
          break

        case 'updateStatus':
          console.log('Updating invoice status:', { invoiceId, status: data.status })
          await apiClient.patch(`/invoices/${invoiceId}/status`, { status: data.status })
          
          const statusText = data.status === 'PAID' ? 'paid' : 'unpaid'
          toastService.handleApiSuccess('updated', 'Invoice status')
          console.log(`Invoice marked as ${statusText} successfully`)
          break
        default:
          break
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err)
      await toastService.handleApiError(err, `Failed to ${action} invoice`)
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
