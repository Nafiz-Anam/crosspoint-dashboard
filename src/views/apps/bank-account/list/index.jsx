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
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Component Imports
import BankAccountListTable from './BankAccountListTable'
import AddBankAccountDrawer from './AddBankAccountDrawer'
import EditBankAccountDrawer from './EditBankAccountDrawer'
import toastService from '@/services/toastService'

const BankAccountList = () => {
  // States
  const [bankAccounts, setBankAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [editingBankAccount, setEditingBankAccount] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortType: 'desc'
  })

  // Hooks
  const { data: session, status } = useSession()

  // Fetch bank accounts
  const fetchBankAccounts = useCallback(async () => {
    if (status === 'loading') return
    if (status === 'unauthenticated' || !session?.accessToken) {
      setError('Authentication required to fetch bank accounts. Please log in.')
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const responseData = await response.json()
        setBankAccounts(responseData.data?.bankAccounts || [])
      } else {
        await toastService.handleApiError(response, 'Failed to fetch bank accounts')
        return
      }
    } catch (err) {
      console.error('Error fetching bank accounts:', err)
      await toastService.handleApiError(err, 'Failed to fetch bank accounts')
    } finally {
      setLoading(false)
    }
  }, [status, session?.accessToken, filters])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBankAccounts()
    } else if (status === 'unauthenticated') {
      setError('Not authenticated. Please log in to view bank accounts.')
      setLoading(false)
    }
  }, [status, session?.accessToken, filters])

  // Handle filter changes
  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  // Handle bank account actions
  const handleBankAccountAction = async (action, bankAccountId, data = null) => {
    if (!session?.accessToken) {
      setError('Authentication required to perform this action.')
      return
    }

    try {
      switch (action) {
        case 'edit':
          // Open edit drawer with bank account data
          setEditingBankAccount(data)
          setEditDrawerOpen(true)
          break

        case 'delete':
          const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${bankAccountId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            }
          })

          if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json()
            throw new Error(errorData.message || 'Failed to delete bank account')
          }
          break

        case 'update':
          const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${bankAccountId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'x-client-type': 'web',
              Authorization: `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(data)
          })

          if (!updateResponse.ok) {
            const errorData = await updateResponse.json()
            throw new Error(errorData.message || 'Failed to update bank account')
          }
          break
        default:
          break
      }

      // Refresh data after action (except for edit)
      if (action !== 'edit') {
        await fetchBankAccounts()
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err)
      await toastService.handleApiError(err, `Failed to ${action} bank account`)
    }
  }

  // Handle add bank account
  const handleAddBankAccount = async bankAccountData => {
    if (!session?.accessToken) {
      toastService.showError('Authentication required to add bank account.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(bankAccountData)
      })

      if (response.ok) {
        toastService.handleApiSuccess('created', 'Bank Account')
        setAddDrawerOpen(false)
        await fetchBankAccounts()
      } else {
        await toastService.handleApiError(response, 'Failed to add bank account')
      }
    } catch (err) {
      console.error('Error adding bank account:', err)
      await toastService.handleApiError(err, 'Network error or unexpected issue. Please try again.')
    }
  }

  // Handle edit bank account
  const handleEditBankAccount = async bankAccountData => {
    if (!session?.accessToken) {
      toastService.showError('Authentication required to edit bank account.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts/${editingBankAccount.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(bankAccountData)
      })

      if (response.ok) {
        toastService.handleApiSuccess('updated', 'Bank Account')
        setEditDrawerOpen(false)
        setEditingBankAccount(null)
        await fetchBankAccounts()
      } else {
        await toastService.handleApiError(response, 'Failed to update bank account')
      }
    } catch (err) {
      console.error('Error editing bank account:', err)
      await toastService.handleApiError(err, 'Network error or unexpected issue. Please try again.')
    }
  }

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
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

      {/* Bank Account List Table */}
      <Grid size={{ xs: 12 }}>
        <BankAccountListTable
          bankAccountData={bankAccounts}
          onFilterChange={handleFilterChange}
          onBankAccountAction={handleBankAccountAction}
          filters={filters}
          onAddBankAccount={() => setAddDrawerOpen(true)}
        />
      </Grid>

      {/* Add Bank Account Drawer */}
      <AddBankAccountDrawer open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} onAdd={handleAddBankAccount} />

      {/* Edit Bank Account Drawer */}
      <EditBankAccountDrawer
        open={editDrawerOpen}
        onClose={() => {
          setEditDrawerOpen(false)
          setEditingBankAccount(null)
        }}
        onEdit={handleEditBankAccount}
        bankAccount={editingBankAccount}
      />
    </Grid>
  )
}

export default BankAccountList
