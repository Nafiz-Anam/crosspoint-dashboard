'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
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

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const InvoiceContainer = ({ initialData }) => {
  const { t } = useTranslation()

  // States
  const [bankAccounts, setBankAccounts] = useState([])
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { data: session } = useSession()
  const router = useRouter()
  
  // Default company info - this is the base template
  // Note: This function needs to be called after t is available, so we'll use it in useEffect
  const getDefaultCompanyInfo = useCallback(() => ({
    companyName: 'Crosspoint',
    tagline: t('common.toMakeABetterCommunity'),
    address: 'Office 149, 450 South Brand Brooklyn',
    city: 'San Diego County, CA 91905, USA',
    phone: '+1 (123) 456 7891, +44 (876) 543 2198',
    email: 'info@crosspoint.com',
    website: 'www.crosspoint.com',
    logo: '/images/logos/main_logo.png'
  }), [t])

  // Function to get pre-filled data from sessionStorage
  // Only works in browser (client-side), not during SSR
  const getPrefillData = () => {
    // Check if we're in the browser (client-side)
    if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
      return null
    }
    
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
  // Note: getPrefillData is only called on client-side (in useEffect), not during SSR
  const [invoiceState, setInvoiceState] = useState(() => {
    // Don't call getPrefillData during SSR - it will be handled in useEffect
    const prefillData = typeof window !== 'undefined' ? getPrefillData() : null

    if (prefillData) {
      return {
        // Invoice form data
        selectedClient: prefillData.selectedClient || null,
        selectedSalesperson: prefillData.selectedSalesperson || null,
        issuedDate: prefillData.issuedDate ? new Date(prefillData.issuedDate) : new Date(),
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
        thanksMessage: prefillData.thanksMessage || '',
        taxRate: 0,
        discountAmount: 0,
        
        // Company info - starts with defaults, can be edited per invoice
        companyInfo: null // Will be initialized with defaults
      }
    }

    // Default state if no prefill data
    // Note: companyInfo is null here, will be initialized with defaults in useEffect
    return {
      // Invoice form data
      selectedClient: null,
      selectedSalesperson: null,
      issuedDate: null,
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
      discountAmount: 0,
      
      // Company info - starts with defaults, can be edited per invoice
      // Will be initialized with defaults when component mounts
      companyInfo: null
    }
  })

  // Set default thank you message and company info on mount
  useEffect(() => {
    if (!invoiceState.thanksMessage) {
      updateInvoiceState({ thanksMessage: t('invoices.defaultThankYouMessage') })
    }
    // Initialize company info with defaults if not already set
    if (!invoiceState.companyInfo) {
      updateInvoiceState({ companyInfo: getDefaultCompanyInfo() })
    }
    
    // Load prefill data from sessionStorage on client-side only
    if (typeof window !== 'undefined') {
      const prefillData = getPrefillData()
      if (prefillData) {
        // Apply prefill data to invoice state
        updateInvoiceState({
          selectedClient: prefillData.selectedClient || invoiceState.selectedClient,
          selectedSalesperson: prefillData.selectedSalesperson || invoiceState.selectedSalesperson,
          issuedDate: prefillData.issuedDate ? new Date(prefillData.issuedDate) : invoiceState.issuedDate,
          invoiceItems: prefillData.serviceItems || invoiceState.invoiceItems,
          employeeId: prefillData.selectedSalesperson?.id || invoiceState.employeeId,
          branchId: prefillData.selectedClient?.branchId || invoiceState.branchId,
          notes: prefillData.notes || invoiceState.notes,
          thanksMessage: prefillData.thanksMessage || invoiceState.thanksMessage
        })
      }
    }
  }, [t, getDefaultCompanyInfo])

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

      // Fetch all data in parallel (no longer fetching company info - using defaults)
      const [bankAccountsResponse, clientsResponse, servicesResponse, employeesResponse] =
        await Promise.all([
          bankAccountService.getActiveBankAccounts(session.accessToken),
          clientService.getAllClients(session.accessToken),
          serviceService.getAllServices(session.accessToken),
          employeeService.getAllEmployees(session.accessToken)
        ])

      console.log('Responses received:', {
        bankAccounts: bankAccountsResponse?.data?.bankAccounts?.length || 0,
        clients: clientsResponse?.data?.length || 0,
        services: servicesResponse?.data?.length || 0,
        employees: employeesResponse?.data?.length || 0
      })

      setBankAccounts(bankAccountsResponse.data?.bankAccounts || [])
      setClients(clientsResponse.data || [])
      setServices(servicesResponse.data || [])
      setEmployees(employeesResponse.data || [])
      
      // Initialize company info with defaults in invoiceState if not already set
      updateInvoiceState(prev => ({
        ...prev,
        companyInfo: prev.companyInfo || getDefaultCompanyInfo()
      }))

      // Debug client data
      console.log('Client response structure:', clientsResponse.data)
      console.log('Clients array (data):', clientsResponse.data)
      console.log('First client structure:', clientsResponse.data?.[0])
      console.log('Clients count:', clientsResponse.data?.length || 0)

      console.log('Data set successfully')
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(t('common.error') + ': ' + err.message)
    } finally {
      setLoading(false)
      console.log('Loading set to false')
    }
  }, [session?.accessToken, t])

  useEffect(() => {
    if (session?.accessToken) {
      fetchData()
    }
  }, [session?.accessToken])
  
  // Reset company info to defaults when component unmounts (user navigates away)
  // This ensures if user edited company info but didn't save invoice, it resets on next visit
  useEffect(() => {
    return () => {
      // Cleanup: When component unmounts (user navigates away), the state is lost
      // Next time they visit, it will initialize with defaults
      console.log('Invoice add page unmounting - company info will reset on next mount')
    }
  }, [])

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
            accountName: selectedAccount.accountName,
            accountNumber: selectedAccount.accountNumber,
            iban: selectedAccount.bankIban,
            swiftCode: selectedAccount.bankSwiftCode
          }
        }
      }

      return newState
    })
  }

  // Company info update handler - updates invoiceState only (temporary, per invoice)
  const handleCompanyInfoChange = newCompanyInfo => {
    // Update company info in invoiceState (not global)
    updateInvoiceState({ companyInfo: newCompanyInfo })
  }
  
  // Reset company info to defaults
  const resetCompanyInfo = () => {
    updateInvoiceState({ companyInfo: getDefaultCompanyInfo() })
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
              <div>{t('invoices.loadingInvoiceData')}</div>
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
          companyInfo={invoiceState.companyInfo || getDefaultCompanyInfo()}
          onCompanyInfoChange={handleCompanyInfoChange}
          onResetCompanyInfo={resetCompanyInfo}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <AddActions
          invoiceState={invoiceState}
          updateInvoiceState={updateInvoiceState}
          bankAccounts={bankAccounts}
          companyInfo={invoiceState.companyInfo || getDefaultCompanyInfo()}
          onResetCompanyInfo={resetCompanyInfo}
        />
      </Grid>
    </Grid>
  )
}

export default InvoiceContainer
