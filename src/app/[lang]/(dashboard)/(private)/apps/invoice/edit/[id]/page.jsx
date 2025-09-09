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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

        // Populate invoice state with existing data
        if (invoiceResponse?.invoice) {
          const invoice = invoiceResponse.invoice
          // console.log('Populating invoice state with data:', invoice)
          // console.log('Invoice client:', invoice.client)
          // console.log('Invoice items:', invoice.items)
          // console.log('Invoice employee:', invoice.employee)

          const populatedState = {
            selectedClient: invoice.client,
            selectedSalesperson: invoice.employee,
            issuedDate: invoice.issuedDate ? new Date(invoice.issuedDate) : null,
            dueDate: invoice.dueDate ? new Date(invoice.dueDate) : null,
            invoiceNumber: invoice.invoiceNumber,
            invoiceItems:
              invoice.items?.length > 0
                ? invoice.items.map(item => ({
                    serviceId: item.serviceId,
                    description: item.description,
                    rate: item.rate,
                    discount: item.discount,
                    total: item.total
                  }))
                : [
                    {
                      serviceId: '',
                      description: '',
                      rate: 0,
                      discount: 0
                    }
                  ],
            paymentTerms: !!invoice.paymentTerms,
            paymentTermsText: invoice.paymentTerms || 'Net 30 days',
            clientNotes: !!invoice.notes,
            clientNotesText: invoice.notes || '',
            paymentStub: false,
            selectedBankAccount: invoice.bankAccountId,
            bankDetails: invoice.bankAccount
              ? {
                  bankName: invoice.bankAccount.bankName,
                  country: invoice.bankAccount.bankCountry,
                  iban: invoice.bankAccount.bankIban,
                  swiftCode: invoice.bankAccount.bankSwiftCode
                }
              : null,
            employeeId: invoice.employeeId,
            branchId: invoice.branchId,
            notes: invoice.notes || '',
            thanksMessage: invoice.thanksMessage || 'Thank you for your business!',
            taxRate: invoice.taxRate || 0,
            discountAmount: invoice.discountAmount || 0
          }

          // console.log('Setting invoice state to:', populatedState)
          setInvoiceState(populatedState)
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

  // Debug: Monitor invoiceState changes
  // useEffect(() => {
  //   console.log('Invoice state changed:', invoiceState)
  //   console.log('Selected client in state:', invoiceState.selectedClient)
  //   console.log('Invoice items in state:', invoiceState.invoiceItems)
  // }, [invoiceState])

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
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <AddActions
          invoiceState={invoiceState}
          updateInvoiceState={updateInvoiceState}
          bankAccounts={bankAccounts}
          isEdit={true}
          invoiceId={params.id}
        />
      </Grid>
    </Grid>
  )
}

export default EditPage
