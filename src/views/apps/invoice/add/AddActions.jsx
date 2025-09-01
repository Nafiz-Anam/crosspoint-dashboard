'use client'

// React Imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

// Component Imports
import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const AddActions = ({ invoiceState, updateInvoiceState }) => {
  // Local states
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [createdInvoiceId, setCreatedInvoiceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const { lang: locale } = useParams()
  const router = useRouter()

  // Destructure from shared state
  const {
    paymentMethod,
    paymentTerms,
    clientNotes,
    selectedClient,
    invoiceItems,
    bankDetails,
    employeeId,
    branchId,
    dueDate,
    notes,
    thanksMessage,
    taxRate,
    discountAmount,
    selectedSalesperson
  } = invoiceState

  // Debug log to check state
  console.log('AddActions Debug State:', {
    selectedClient: selectedClient?.id,
    employeeId: employeeId || selectedSalesperson?.id,
    branchId: branchId || selectedClient?.branchId,
    thanksMessage: thanksMessage,
    invoiceItems: invoiceItems?.length,
    dueDate: dueDate
  })

  // Payment method options with different bank details
  const paymentMethods = [
    {
      value: 'Internet Banking',
      label: 'Internet Banking',
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    },
    {
      value: 'Credit Card',
      label: 'Credit Card',
      bankName: 'Chase Bank',
      country: 'United States',
      iban: 'CH894321098765432',
      swiftCode: 'CHASUS33'
    },
    {
      value: 'Paypal',
      label: 'PayPal',
      bankName: 'PayPal Holdings',
      country: 'United States',
      iban: 'PP123456789012345',
      swiftCode: 'PYPLUS33'
    },
    {
      value: 'Debit Card',
      label: 'Debit Card',
      bankName: 'Wells Fargo',
      country: 'United States',
      iban: 'WF567890123456789',
      swiftCode: 'WFBIUS6S'
    },
    {
      value: 'UPI Transfer',
      label: 'UPI Transfer',
      bankName: 'State Bank of India',
      country: 'India',
      iban: 'IN987654321098765',
      swiftCode: 'SBININBB'
    }
  ]

  // Handlers that update shared state
  const handlePaymentMethodChange = method => {
    const selectedPaymentMethod = paymentMethods.find(pm => pm.value === method)

    updateInvoiceState({
      paymentMethod: method,
      bankDetails: {
        bankName: selectedPaymentMethod.bankName,
        country: selectedPaymentMethod.country,
        iban: selectedPaymentMethod.iban,
        swiftCode: selectedPaymentMethod.swiftCode
      }
    })
  }

  const handleToggleChange = (field, value) => {
    updateInvoiceState({ [field]: value })
  }

  // Generate invoice number function
  const generateInvoiceNumber = async () => {
    if (!session?.accessToken) {
      throw new Error('Authentication token not found. Please log in again.')
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/invoices/generate-number`

    try {
      console.log(`Making API call to: ${apiUrl}`)
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log('Invoice number generated successfully:', responseData)
        return responseData.data.invoiceNumber
      } else {
        const errorMessage = responseData.message || `Failed to generate invoice number: ${response.status}`
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Generate invoice number error:', error)
      throw error
    }
  }

  // Validation function
  const validateInvoiceData = () => {
    const errors = []

    if (!selectedClient?.id) {
      errors.push('Please select a client')
    }

    // Use fallback for branchId
    const finalBranchId = branchId || selectedClient?.branchId
    if (!finalBranchId) {
      errors.push('Branch ID is required')
    }

    // Use fallback for employeeId
    const finalEmployeeId = employeeId || selectedSalesperson?.id
    if (!finalEmployeeId) {
      errors.push('Employee ID is required')
    }

    if (!dueDate) {
      errors.push('Due date is required')
    }

    if (!thanksMessage?.trim()) {
      errors.push('Thanks message is required')
    }

    if (!invoiceItems || invoiceItems.length === 0) {
      errors.push('At least one invoice item is required')
    }

    // Validate invoice items (NO QUANTITY CHECK)
    invoiceItems?.forEach((item, index) => {
      if (!item.serviceId) {
        errors.push(`Item ${index + 1}: Service is required`)
      }
      if (!item.description?.trim()) {
        errors.push(`Item ${index + 1}: Description is required`)
      }
      if (!item.rate || parseFloat(item.rate) <= 0) {
        errors.push(`Item ${index + 1}: Rate must be greater than 0`)
      }
      if (item.discount && parseFloat(item.discount) < 0) {
        errors.push(`Item ${index + 1}: Discount cannot be negative`)
      }
    })

    return errors
  }

  // Save invoice function
  const handleSaveInvoice = async () => {
    setIsLoading(true)
    setApiError(null)
    setApiSuccess(false)
    setSaveStatus('saving')

    if (!session?.accessToken) {
      setApiError('Authentication token not found. Please log in again.')
      setIsLoading(false)
      setSaveStatus('error')
      return
    }

    try {
      // Validate data
      const validationErrors = validateInvoiceData()
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }

      // Generate invoice number if not provided
      let invoiceNumber = invoiceState.invoiceNumber
      if (!invoiceNumber) {
        invoiceNumber = await generateInvoiceNumber()
      }

      // Use fallbacks for required fields
      const finalBranchId = branchId || selectedClient?.branchId
      const finalEmployeeId = employeeId || selectedSalesperson?.id

      // Prepare invoice payload
      const payload = {
        clientId: selectedClient.id,
        branchId: finalBranchId,
        employeeId: finalEmployeeId,
        invoiceNumber: invoiceNumber,
        dueDate: new Date(dueDate).toISOString(),
        thanksMessage: thanksMessage || 'Thank you for your business!',
        notes: notes || null,
        paymentTerms: paymentTerms ? invoiceState.paymentTermsText || 'Net 30 days' : null,
        taxRate: taxRate || 0,
        discountAmount: discountAmount || 0,
        paymentMethod: paymentMethod || 'Internet Banking',
        bankName: bankDetails?.bankName || null,
        bankCountry: bankDetails?.country || null,
        bankIban: bankDetails?.iban || null,
        bankSwiftCode: bankDetails?.swiftCode || null,
        items: invoiceItems.map(item => ({
          serviceId: item.serviceId,
          description: item.description,
          quantity: 1, // Default quantity since removed from UI
          rate: parseFloat(item.rate),
          discount: parseFloat(item.discount || 0)
        }))
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/invoices`

      console.log(`Making API call to: ${apiUrl} with method: POST`)
      console.log('Payload:', payload)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (response.ok) {
        setApiSuccess(true)
        setSaveStatus('success')
        setCreatedInvoiceId(responseData.data.invoice.id)
        console.log('Invoice created successfully:', responseData)

        // Update invoice state with created invoice data
        updateInvoiceState({
          invoiceId: responseData.data.invoice.id,
          invoiceNumber: responseData.data.invoice.invoiceNumber
        })

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveStatus('')
          setApiSuccess(false)
        }, 3000)
      } else {
        const errorMessage = responseData.message || `Failed to create invoice: ${response.status}`
        setApiError(errorMessage)
        setSaveStatus('error')
        console.error('API Error:', responseData)
      }
    } catch (error) {
      const errorMessage = error.message || 'Network error or unexpected issue. Please try again.'
      setApiError(errorMessage)
      setSaveStatus('error')
      console.error('Invoice creation error:', error)
    } finally {
      setIsLoading(false)

      // Clear error message after 5 seconds
      if (apiError || saveStatus === 'error') {
        setTimeout(() => {
          setApiError(null)
          setSaveStatus('')
        }, 5000)
      }
    }
  }

  // Handle preview navigation
  const handlePreview = () => {
    if (createdInvoiceId) {
      router.push(getLocalizedUrl(`/apps/invoice/preview/${createdInvoiceId}`, locale))
    }
  }

  // Handle send invoice
  const handleSendInvoice = () => {
    if (createdInvoiceId) {
      setSendDrawerOpen(true)
    }
  }

  // Calculate totals for display (NO QUANTITY)
  const calculateItemTotal = item => {
    const rate = parseFloat(item.rate) || 0
    const discount = parseFloat(item.discount) || 0
    const discountAmount = (rate * discount) / 100
    return rate - discountAmount
  }

  const calculateInvoiceTotal = () => {
    return (
      invoiceItems?.reduce((total, item) => {
        const itemTotal = calculateItemTotal(item)
        return total + (isNaN(itemTotal) ? 0 : itemTotal)
      }, 0) || 0
    )
  }

  const calculateSubtotal = () => {
    return (
      invoiceItems?.reduce((total, item) => {
        const rate = parseFloat(item.rate) || 0
        return total + (isNaN(rate) ? 0 : rate)
      }, 0) || 0
    )
  }

  const calculateTotalDiscount = () => {
    return (
      invoiceItems?.reduce((total, item) => {
        const rate = parseFloat(item.rate) || 0
        const discount = parseFloat(item.discount) || 0
        const discountAmount = (rate * discount) / 100
        return total + (isNaN(discountAmount) ? 0 : discountAmount)
      }, 0) || 0
    )
  }

  const calculateTax = () => {
    const subtotal = calculateInvoiceTotal()
    const tax = subtotal * ((taxRate || 21) / 100)
    return isNaN(tax) ? 0 : tax
  }

  const calculateFinalTotal = () => {
    const subtotal = calculateInvoiceTotal()
    const tax = calculateTax()
    const discount = discountAmount || 0
    const total = subtotal + tax - discount
    return isNaN(total) ? 0 : total
  }

  // Check if invoice is ready to save
  const finalEmployeeId = employeeId || selectedSalesperson?.id
  const finalBranchId = branchId || selectedClient?.branchId

  const isReadyToSave =
    selectedClient && invoiceItems?.length > 0 && thanksMessage?.trim() && finalEmployeeId && finalBranchId && dueDate

  const isSaved = createdInvoiceId && saveStatus !== 'saving'

  // Button styling based on state
  const getButtonProps = buttonType => {
    switch (buttonType) {
      case 'send':
        return {
          variant: 'contained',
          color: 'primary',
          disabled: !isSaved || isLoading,
          sx: {
            backgroundColor: !isSaved || isLoading ? '#e0e0e0' : '#1976d2',
            color: !isSaved || isLoading ? '#9e9e9e' : 'white',
            '&:hover': {
              backgroundColor: !isSaved || isLoading ? '#e0e0e0' : '#1565c0'
            },
            '&:disabled': {
              backgroundColor: '#f5f5f5',
              color: '#bdbdbd'
            }
          }
        }
      case 'preview':
        return {
          variant: 'tonal',
          color: 'secondary',
          disabled: !isSaved || isLoading,
          sx: {
            backgroundColor: !isSaved || isLoading ? '#f5f5f5' : '#e3f2fd',
            color: !isSaved || isLoading ? '#bdbdbd' : '#1976d2',
            '&:hover': {
              backgroundColor: !isSaved || isLoading ? '#f5f5f5' : '#bbdefb'
            },
            '&:disabled': {
              backgroundColor: '#f5f5f5',
              color: '#bdbdbd'
            }
          }
        }
      case 'save':
        return {
          variant: 'tonal',
          color: isSaved ? 'success' : 'secondary',
          disabled: !isReadyToSave || isSaved || isLoading,
          sx: {
            backgroundColor: isSaved ? '#e8f5e8' : !isReadyToSave ? '#f5f5f5' : '#e3f2fd',
            color: isSaved ? '#2e7d32' : !isReadyToSave ? '#bdbdbd' : '#1976d2',
            '&:hover': {
              backgroundColor: isSaved ? '#e8f5e8' : !isReadyToSave ? '#f5f5f5' : '#bbdefb'
            },
            '&:disabled': {
              backgroundColor: isSaved ? '#e8f5e8' : '#f5f5f5',
              color: isSaved ? '#2e7d32' : '#bdbdbd'
            }
          }
        }
      default:
        return {}
    }
  }

  return (
    <Grid container spacing={6}>
      {/* Action Buttons */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Typography variant='h6' className='mb-2'>
              Invoice Actions
            </Typography>

            {/* Send Invoice Button */}
            <Button
              fullWidth
              {...getButtonProps('send')}
              className='capitalize'
              startIcon={<i className='tabler-send' />}
              onClick={handleSendInvoice}
            >
              Send Invoice
            </Button>

            {/* Preview Button */}
            <Button
              fullWidth
              component={isSaved ? Link : 'button'}
              {...getButtonProps('preview')}
              className='capitalize'
              href={isSaved ? getLocalizedUrl(`/apps/invoice/preview/${createdInvoiceId}`, locale) : undefined}
              onClick={!isSaved ? handlePreview : undefined}
            >
              Preview
            </Button>

            {/* Save Button */}
            <Button fullWidth {...getButtonProps('save')} className='capitalize' onClick={handleSaveInvoice}>
              {saveStatus === 'saving' ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
            </Button>

            {/* Status Messages */}
            {apiSuccess && saveStatus === 'success' && (
              <Alert severity='success' size='small'>
                Invoice created successfully! Invoice #{invoiceState.invoiceNumber}
              </Alert>
            )}

            {apiError && saveStatus === 'error' && (
              <Alert severity='error' size='small'>
                {apiError}
              </Alert>
            )}

            {!selectedClient && (
              <Alert severity='warning' size='small'>
                Please select a client to continue
              </Alert>
            )}

            {selectedClient && (!invoiceItems || invoiceItems.length === 0) && (
              <Alert severity='warning' size='small'>
                Please add at least one invoice item
              </Alert>
            )}

            {selectedClient && invoiceItems?.length > 0 && !thanksMessage?.trim() && (
              <Alert severity='warning' size='small'>
                Please add a thanks message
              </Alert>
            )}

            {selectedClient && invoiceItems?.length > 0 && thanksMessage?.trim() && !finalEmployeeId && (
              <Alert severity='warning' size='small'>
                Please select a salesperson
              </Alert>
            )}

            {selectedClient && invoiceItems?.length > 0 && thanksMessage?.trim() && finalEmployeeId && !dueDate && (
              <Alert severity='warning' size='small'>
                Please select a due date
              </Alert>
            )}

            {/* Invoice Summary */}
            {invoiceItems?.length > 0 && (
              <div className='p-4 bg-gray-50 rounded-lg border'>
                <Typography variant='subtitle2' className='font-medium mb-3'>
                  Invoice Summary
                </Typography>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Subtotal:</span>
                    <span>${calculateInvoiceTotal().toFixed(2)}</span>
                  </div>
                  {(taxRate || 21) > 0 && (
                    <div className='flex justify-between text-sm'>
                      <span>Tax ({taxRate || 21}%):</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className='flex justify-between text-sm'>
                      <span>Discount:</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Divider className='my-2' />
                  <div className='flex justify-between font-medium text-base'>
                    <span>Total:</span>
                    <span>${calculateFinalTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Send Invoice Drawer */}
        <SendInvoiceDrawer
          open={sendDrawerOpen}
          handleClose={() => setSendDrawerOpen(false)}
          invoiceId={createdInvoiceId}
          invoiceNumber={invoiceState.invoiceNumber}
        />
      </Grid>

      {/* Invoice Settings */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Typography variant='h6' className='mb-2'>
              Payment Settings
            </Typography>

            <CustomTextField
              select
              fullWidth
              value={paymentMethod || 'Internet Banking'}
              onChange={e => handlePaymentMethodChange(e.target.value)}
              label='Accept payments via'
              helperText='Changing this will update bank details in invoice'
              disabled={isSaved}
            >
              {paymentMethods.map(method => (
                <MenuItem key={method.value} value={method.value}>
                  <div className='flex items-center gap-2'>
                    <i className={`tabler-${method.value === 'Paypal' ? 'brand-paypal' : 'credit-card'} text-lg`} />
                    {method.label}
                  </div>
                </MenuItem>
              ))}
            </CustomTextField>

            <Divider />

            <Typography variant='subtitle2' className='font-medium'>
              Display Options
            </Typography>

            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer text-sm'>
                  Payment Terms
                </InputLabel>
                <Typography variant='caption' color='text.secondary'>
                  Show payment terms on invoice
                </Typography>
              </div>
              <Switch
                checked={paymentTerms || false}
                onChange={e => handleToggleChange('paymentTerms', e.target.checked)}
                id='invoice-edit-payment-terms'
                disabled={isSaved}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer text-sm'>
                  Client Notes
                </InputLabel>
                <Typography variant='caption' color='text.secondary'>
                  Display client notes section
                </Typography>
              </div>
              <Switch
                checked={clientNotes || false}
                onChange={e => handleToggleChange('clientNotes', e.target.checked)}
                id='invoice-edit-client-notes'
                disabled={isSaved}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddActions
