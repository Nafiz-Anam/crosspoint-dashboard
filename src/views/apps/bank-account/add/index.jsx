'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
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
import AddBankAccountForm from './AddBankAccountForm'
import apiClient from '@/services/apiClient'

const AddBankAccount = () => {
  // States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Hooks
  const { data: session, status } = useSession()
  const router = useRouter()

  // Handle form submission
  const handleSubmit = async bankAccountData => {
    try {
      setLoading(true)
      setError(null)

      await apiClient.post('/bank-accounts', bankAccountData)

      setSuccess(true)
      // Redirect to bank account list after 2 seconds
      setTimeout(() => {
        router.push('/apps/bank-account/list')
      }, 2000)
    } catch (err) {
      console.error('Error adding bank account:', err)
      setError(err.response?.data?.message || err.message || 'Failed to add bank account')
    } finally {
      setLoading(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    router.push('/apps/bank-account/list')
  }

  if (status === 'loading') {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'unauthenticated') {
    return <Alert severity='error'>Authentication required. Please log in to add payment method.</Alert>
  }

  return (
    <Grid container spacing={6}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                  Add Payment Method
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Add a new payment method for invoice payments
                </Typography>
              </Box>
              <Button variant='outlined' onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Error Alert */}
      {error && (
        <Grid size={{ xs: 12 }}>
          <Alert severity='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        </Grid>
      )}

      {/* Success Alert */}
      {success && (
        <Grid size={{ xs: 12 }}>
          <Alert severity='success'>Payment method added successfully! Redirecting to list page...</Alert>
        </Grid>
      )}

      {/* Add Bank Account Form */}
      <Grid size={{ xs: 12 }}>
        <AddBankAccountForm onSubmit={handleSubmit} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default AddBankAccount
