'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Service Imports
import invoiceService from '@/libs/invoiceService'
import bankAccountService from '@/libs/bankAccountService'
import clientService from '@/libs/clientService'
import serviceService from '@/libs/serviceService'
import employeeService from '@/libs/employeeService'
import { companyInfoService } from '@/services/companyInfoService'

// Component Imports
import AddCard from '@views/apps/invoice/add/AddCard'
import AddActions from '@views/apps/invoice/add/AddActions'

const EditPage = () => {
  const params = useParams()
  const { data: session } = useSession()
  const [invoiceData, setInvoiceData] = useState(null)
  const [bankAccounts, setBankAccounts] = useState([])
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])
  const [companyInfo, setCompanyInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [forceRender, setForceRender] = useState(0)

  // SHARED STATE - This connects AddCard and AddActions (same as create flow)
  const [invoiceState, setInvoiceState] = useState({
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
    paymentTerms: true,
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
  })

  // Fetch invoice data and bank accounts
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
        setError('Authentication required')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Fetch invoice data and bank accounts in parallel
        const [invoiceResponse, bankAccountsResponse, clientsResponse, servicesResponse, employeesResponse] =
          await Promise.all([
            invoiceService.getInvoiceById(params.id, session.accessToken),
            bankAccountService.getActiveBankAccounts(session.accessToken),
            clientService.getClients(session.accessToken),
            serviceService.getServices(session.accessToken),
            employeeService.getEmployees(session.accessToken)
          ])

        setInvoiceData(invoiceResponse)
        setBankAccounts(bankAccountsResponse.data?.bankAccounts || [])
        setClients(clientsResponse.data?.clients || [])
        setServices(servicesResponse.data || [])
        setEmployees(employeesResponse.data || employeesResponse || [])

        // Use company info from invoice data if available, otherwise fetch from global company info
        if (invoiceResponse && (invoiceResponse.companyName || invoiceResponse.companyEmail)) {
          // Use company info from invoice data
          const invoiceCompanyInfo = {
            companyName: invoiceResponse.companyName,
            tagline: invoiceResponse.companyTagline,
            address: invoiceResponse.companyAddress,
            city: invoiceResponse.companyCity,
            phone: invoiceResponse.companyPhone,
            email: invoiceResponse.companyEmail,
            website: invoiceResponse.companyWebsite,
            logo: invoiceResponse.companyLogo
          }
          setCompanyInfo(invoiceCompanyInfo)
          console.log('Using company info from invoice:', invoiceCompanyInfo)
        } else {
          // Fallback to global company info if invoice doesn't have company info
          try {
            const companyInfoResponse = await companyInfoService.getCompanyInfo(session.accessToken)
            setCompanyInfo(companyInfoResponse.data || null)
            console.log('Using global company info:', companyInfoResponse.data)
          } catch (error) {
            console.error('Error fetching global company info:', error)
            setCompanyInfo(null)
          }
        }

        console.log('Fetched data:')
        console.log('Invoice:', invoiceResponse)
        console.log('Clients:', clientsResponse.data?.clients)
        console.log('Services:', servicesResponse.data)
        console.log('Employees:', employeesResponse.data)
        console.log('Bank Accounts:', bankAccountsResponse.data?.bankAccounts)

        // Populate invoice state with existing data
        if (invoiceResponse) {
          console.log('Invoice response bankAccount:', invoiceResponse.bankAccount)
          console.log('Invoice response bankAccountId:', invoiceResponse.bankAccountId)

          // Find bank account details from the fetched bank accounts
          const selectedBankAccount = bankAccountsResponse.data?.bankAccounts?.find(
            account => account.id === invoiceResponse.bankAccountId
          )
          console.log('Found bank account:', selectedBankAccount)

          // Create the populated state
          const populatedState = {
            selectedClient: invoiceResponse.client,
            selectedSalesperson: invoiceResponse.employee,
            issuedDate: invoiceResponse.issuedDate ? new Date(invoiceResponse.issuedDate) : new Date(),
            dueDate: invoiceResponse.dueDate ? new Date(invoiceResponse.dueDate) : null,
            invoiceNumber: invoiceResponse.invoiceNumber,
            invoiceItems:
              invoiceResponse.items?.length > 0
                ? invoiceResponse.items.map(item => ({
                    categoryId: item.service?.category || '',
                    serviceId: item.serviceId,
                    description: item.description,
                    rate: item.rate,
                    discount: item.discount || 0,
                    total: item.total
                  }))
                : [
                    {
                      categoryId: '',
                      serviceId: '',
                      description: '',
                      rate: 0,
                      discount: 0
                    }
                  ],
            paymentTerms: !!invoiceResponse.paymentTerms,
            paymentTermsText: invoiceResponse.paymentTerms || 'Net 30 days',
            clientNotes: !!invoiceResponse.notes,
            clientNotesText: invoiceResponse.notes || '',
            paymentStub: false,
            selectedBankAccount: invoiceResponse.bankAccountId,
            bankDetails: selectedBankAccount
              ? {
                  bankName: selectedBankAccount.bankName,
                  country: selectedBankAccount.bankCountry,
                  iban: selectedBankAccount.bankIban,
                  swiftCode: selectedBankAccount.bankSwiftCode
                }
              : null,
            employeeId: invoiceResponse.employeeId,
            branchId: invoiceResponse.branchId,
            notes: invoiceResponse.notes || '',
            thanksMessage: invoiceResponse.thanksMessage || 'Thank you for your business!',
            taxRate: invoiceResponse.taxRate || 21,
            discountAmount: invoiceResponse.discountAmount || 0
          }

          console.log('Populated state bankDetails:', populatedState.bankDetails)
          console.log('Populated state selectedBankAccount:', populatedState.selectedBankAccount)

          // Set the state
          setInvoiceState(populatedState)

          // Force re-render
          setForceRender(prev => prev + 1)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message || 'Failed to fetch invoice data')
      } finally {
        setLoading(false)
      }
    }

    if (params.id && session?.accessToken) {
      fetchData()
    }
  }, [params.id, session?.accessToken])

  // Update function passed to both components
  const updateInvoiceState = updates => {
    console.log('updateInvoiceState called with:', updates)
    setInvoiceState(prev => {
      console.log('Previous state:', prev)
      const newState = { ...prev, ...updates }
      console.log('New state:', newState)

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

  // Debug: Monitor invoiceState changes
  useEffect(() => {
    console.log('Invoice state changed:', invoiceState)
    console.log('Selected client in state:', invoiceState.selectedClient)
    console.log('Invoice items in state:', invoiceState.invoiceItems)
    console.log('Invoice number in state:', invoiceState.invoiceNumber)
    console.log('Thanks message in state:', invoiceState.thanksMessage)
    console.log('Issued date in state:', invoiceState.issuedDate)
    console.log('Due date in state:', invoiceState.dueDate)
  }, [invoiceState])

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

  // Debug: Check if we have data before rendering
  console.log('About to render AddCard with invoiceState:', invoiceState)
  console.log('Has selectedClient:', !!invoiceState.selectedClient)
  console.log('Has invoiceNumber:', !!invoiceState.invoiceNumber)
  console.log('Force render count:', forceRender)

  if (error || !invoiceData) {
    return (
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <Alert severity='error' sx={{ mb: 4 }}>
            {error || 'Invoice not found'}
          </Alert>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 9 }}>
        <AddCard
          invoiceData={invoiceData}
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
          isEdit={true}
          invoiceId={params.id}
          companyInfo={companyInfo}
        />
      </Grid>
    </Grid>
  )
}

export default EditPage
