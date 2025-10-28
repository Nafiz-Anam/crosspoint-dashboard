'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Component Imports
import InvoiceForm from './InvoiceForm'

// Service Imports
import invoiceService from '@/libs/invoiceService'
import clientService from '@/libs/clientService'
import serviceService from '@/libs/serviceService'
import branchService from '@/libs/branchService'
import bankAccountService from '@/libs/bankAccountService'
import employeeService from '@/libs/employeeService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddInvoice = () => {
  const { t } = useTranslation()

  // States
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [branches, setBranches] = useState([])
  const [bankAccounts, setBankAccounts] = useState([])
  const [employees, setEmployees] = useState([])

  // Fetch required data
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [clientsRes, servicesRes, branchesRes, bankAccountsRes, employeesRes] = await Promise.all([
        clientService.getAllClients(),
        serviceService.getAllServices(),
        branchService.getActiveBranches(null),
        bankAccountService.getActiveBankAccounts(),
        employeeService.getAllEmployees()
      ])

      setClients(clientsRes.data || [])
      setServices(servicesRes.data || [])
      setBranches(branchesRes.data?.branches || [])
      setBankAccounts(bankAccountsRes.data?.bankAccounts || [])
      setEmployees(employeesRes.data || [])
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message || t('common.error'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle form submit
  const handleSubmit = async invoiceData => {
    try {
      setLoading(true)
      await invoiceService.createInvoice(invoiceData)
      // Redirect to invoice list or show success message
      window.location.href = '/apps/invoice/list'
    } catch (err) {
      console.error('Error creating invoice:', err)
      setError(err.message || t('common.error'))
    } finally {
      setLoading(false)
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
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                  {t('invoices.createNewInvoice')}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {t('invoices.fillDetailsToCreate')}
                </Typography>
              </Box>
              <Button
                variant='outlined'
                startIcon={<i className='tabler-arrow-left' />}
                onClick={() => window.history.back()}
              >
                {t('common.back')}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Invoice Form */}
      <Grid size={{ xs: 12 }}>
        <InvoiceForm
          clients={clients}
          services={services}
          branches={branches}
          bankAccounts={bankAccounts}
          employees={employees}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Grid>
    </Grid>
  )
}

export default AddInvoice
