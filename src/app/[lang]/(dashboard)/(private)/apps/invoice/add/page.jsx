'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Service Imports
import bankAccountService from '@/libs/bankAccountService'

// Component Imports
import AddCard from '@views/apps/invoice/add/AddCard'
import AddActions from '@views/apps/invoice/add/AddActions'

const InvoiceContainer = ({ initialData }) => {
  // States
  const [bankAccounts, setBankAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()

  // SHARED STATE - This connects AddCard and AddActions
  const [invoiceState, setInvoiceState] = useState({
    // Invoice form data
    selectedClient: null,
    selectedSalesperson: null,
    issuedDate: null,
    dueDate: null,
    invoiceNumber: null,
    invoiceItems: [
      {
        serviceId: '',
        description: '',
        rate: 0,
        discount: 0
      }
    ],

    // Settings from AddActions
    paymentTerms: true,
    paymentTermsText: 'Net 30 days',
    clientNotes: false,
    clientNotesText: '',
    paymentStub: false,
    selectedBankAccount: null,

    // Bank details that change based on selected bank account
    bankDetails: null,

    // Additional properties
    employeeId: null,
    branchId: null,
    notes: '',
    thanksMessage: 'Thank you for your business!',
    taxRate: 0,
    discountAmount: 0
  })

  // Fetch bank accounts
  const fetchBankAccounts = async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)
      setError(null)
      const response = await bankAccountService.getActiveBankAccounts(session.accessToken)
      setBankAccounts(response.data?.bankAccounts || [])
    } catch (err) {
      console.error('Error fetching bank accounts:', err)
      setError('Failed to fetch bank accounts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.accessToken) {
      fetchBankAccounts()
    }
  }, [session?.accessToken])

  // Update function passed to both components
  const updateInvoiceState = updates => {
    setInvoiceState(prev => {
      const newState = { ...prev, ...updates }

      // When bank account is selected, update bank details
      if (updates.selectedBankAccount) {
        const selectedAccount = bankAccounts.find(account => account.id === updates.selectedBankAccount)
        if (selectedAccount) {
          newState.bankDetails = {
            bankName: selectedAccount.bankName,
            country: selectedAccount.bankCountry,
            iban: selectedAccount.bankIban,
            swiftCode: selectedAccount.bankSwiftCode
          }
        }
      }

      return newState
    })
  }

  if (loading) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </div>
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Alert severity='error' sx={{ mb: 4 }}>
            {error}
          </Alert>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 9 }}>
        <AddCard
          invoiceData={initialData}
          invoiceState={invoiceState}
          updateInvoiceState={updateInvoiceState}
          bankAccounts={bankAccounts}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <AddActions invoiceState={invoiceState} updateInvoiceState={updateInvoiceState} bankAccounts={bankAccounts} />
      </Grid>
    </Grid>
  )
}

export default InvoiceContainer
