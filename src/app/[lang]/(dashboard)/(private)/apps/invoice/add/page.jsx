'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Service Imports
import bankAccountService from '@/libs/bankAccountService'
import clientService from '@/libs/clientService'
import serviceService from '@/libs/serviceService'
import employeeService from '@/libs/employeeService'
import { companyInfoService } from '@/services/companyInfoService'

// Component Imports
import AddCard from '@views/apps/invoice/add/AddCard'
import AddActions from '@views/apps/invoice/add/AddActions'

const InvoiceContainer = ({ initialData }) => {
  // States
  const [bankAccounts, setBankAccounts] = useState([])
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])
  const [companyInfo, setCompanyInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()

  // Function to get pre-filled data from sessionStorage
  const getPrefillData = () => {
    try {
      const prefillData = sessionStorage.getItem('invoicePrefillData')
      if (prefillData) {
        const parsed = JSON.parse(prefillData)
        // Clear the data after reading it
        sessionStorage.removeItem('invoicePrefillData')
        return parsed
      }
    } catch (error) {
      console.error('Error parsing prefill data:', error)
    }
    return null
  }

  // SHARED STATE - This connects AddCard and AddActions
  const [invoiceState, setInvoiceState] = useState(() => {
    const prefillData = getPrefillData()

    if (prefillData) {
      return {
        // Invoice form data
        selectedClient: prefillData.selectedClient || null,
        selectedSalesperson: prefillData.selectedSalesperson || null,
        issuedDate: prefillData.issuedDate ? new Date(prefillData.issuedDate) : new Date(),
        dueDate: prefillData.dueDate ? new Date(prefillData.dueDate) : null,
        invoiceNumber: null,
        invoiceItems: prefillData.serviceItems || [
          {
            categoryId: '',
            serviceId: '',
            description: '',
            rate: 0,
            discount: 0
          }
        ],

        // Settings from AddActions
        paymentTerms: false,
        paymentTermsText: '',
        clientNotes: false,
        clientNotesText: '',
        paymentStub: false,
        selectedBankAccount: null,

        // Bank details that change based on selected bank account
        bankDetails: null,

        // Additional properties
        employeeId: prefillData.selectedSalesperson?.id || null,
        branchId: prefillData.selectedClient?.branchId || null,
        notes: prefillData.notes || '',
        thanksMessage: '',
        taxRate: 0,
        discountAmount: 0
      }
    }

    // Default state if no prefill data
    return {
      // Invoice form data
      selectedClient: null,
      selectedSalesperson: null,
      issuedDate: null,
      dueDate: null,
      invoiceNumber: null,
      invoiceItems: [
        {
          categoryId: '',
          serviceId: '',
          description: '',
          rate: 0,
          discount: 0
        }
      ],

      // Settings from AddActions
      paymentTerms: false,
      paymentTermsText: '',
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
      thanksMessage: '',
      taxRate: 0,
      discountAmount: 0
    }
  })

  // Fetch all required data
  const fetchData = useCallback(async () => {
    console.log('fetchData called, session:', !!session, 'accessToken:', !!session?.accessToken)

    if (!session?.accessToken) {
      console.log('No session or access token, returning early')
      return
    }

    try {
      setLoading(true)
      setError(null)
      console.log('Starting to fetch data...')

      // Fetch all data in parallel
      const [bankAccountsResponse, clientsResponse, servicesResponse, employeesResponse, companyInfoResponse] =
        await Promise.all([
          bankAccountService.getActiveBankAccounts(session.accessToken),
          clientService.getClients(session.accessToken),
          serviceService.getServices(session.accessToken),
          employeeService.getEmployees(session.accessToken),
          companyInfoService.getCompanyInfo(session.accessToken)
        ])

      console.log('Responses received:', {
        bankAccounts: bankAccountsResponse?.data?.bankAccounts?.length || 0,
        clients: clientsResponse?.data?.clients?.length || 0,
        services: servicesResponse?.data?.length || 0,
        employees: employeesResponse?.data?.length || 0,
        companyInfo: !!companyInfoResponse?.data
      })

      setBankAccounts(bankAccountsResponse.data?.bankAccounts || [])
      setClients(clientsResponse.data?.clients || [])
      setServices(servicesResponse.data || [])
      setEmployees(employeesResponse.data || [])
      setCompanyInfo(companyInfoResponse.data || null)

      console.log('Data set successfully')
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch required data: ' + err.message)
    } finally {
      setLoading(false)
      console.log('Loading set to false')
    }
  }, [session?.accessToken])

  useEffect(() => {
    if (session?.accessToken) {
      fetchData()
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

  // Company info update handler
  const handleCompanyInfoChange = async newCompanyInfo => {
    try {
      if (session?.accessToken) {
        await companyInfoService.updateCompanyInfo(newCompanyInfo, session.accessToken)
      }
      setCompanyInfo(newCompanyInfo)
    } catch (error) {
      console.error('Error updating company info:', error)
      // Still update local state even if API call fails
      setCompanyInfo(newCompanyInfo)
    }
  }

  console.log('Render state:', { loading, error, session: !!session, accessToken: !!session?.accessToken })

  if (loading) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px'
            }}
          >
            <CircularProgress />
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <div>Loading invoice data...</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Session: {session ? 'Yes' : 'No'} | Token: {session?.accessToken ? 'Yes' : 'No'}
              </div>
            </div>
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
          clients={clients}
          services={services}
          employees={employees}
          companyInfo={companyInfo}
          onCompanyInfoChange={handleCompanyInfoChange}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <AddActions
          invoiceState={invoiceState}
          updateInvoiceState={updateInvoiceState}
          bankAccounts={bankAccounts}
          companyInfo={companyInfo}
        />
      </Grid>
    </Grid>
  )
}

export default InvoiceContainer
