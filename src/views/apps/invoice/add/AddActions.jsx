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
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import { useTranslation } from '@/hooks/useTranslation'

const AddActions = ({
  invoiceState,
  updateInvoiceState,
  bankAccounts = [],
  isEdit = false,
  invoiceId = null,
  companyInfo = null,
  onResetCompanyInfo = null
}) => {
  // Local states
  const [saveStatus, setSaveStatus] = useState('')
  const [createdInvoiceId, setCreatedInvoiceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const { lang: locale } = useParams()
  const router = useRouter()
  const { t } = useTranslation()

  // Destructure from shared state
  const {
    paymentTerms,
    paymentTermsText,
    clientNotes,
    clientNotesText,
    selectedClient,
    invoiceItems,
    bankDetails,
    employeeId,
    branchId,
    notes,
    thanksMessage,
    taxRate,
    discountAmount,
    selectedSalesperson,
    selectedBankAccount,
    invoiceNumber
  } = invoiceState

  // Debug log to check state
  console.log('AddActions Debug State:', {
    selectedClient: selectedClient?.id,
    employeeId: employeeId || selectedSalesperson?.id,
    branchId: branchId || selectedClient?.branchId,
    thanksMessage: thanksMessage,
    invoiceItems: invoiceItems?.length
  })

  // Handlers that update shared state

  const handleBankAccountChange = bankAccountId => {
    updateInvoiceState({
      selectedBankAccount: bankAccountId
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
      errors.push(t('invoices.pleaseSelectClient'))
    }

    // Use fallback for branchId
    const finalBranchId = branchId || selectedClient?.branchId
    if (!finalBranchId) {
      errors.push(t('invoices.branchRequired'))
    }

    // Use fallback for employeeId
    const finalEmployeeId = employeeId || selectedSalesperson?.id
    if (!finalEmployeeId) {
      errors.push(t('invoices.pleaseSelectSalesperson'))
    }

    if (!thanksMessage?.trim()) {
      errors.push(t('invoices.pleaseAddThanksMessage'))
    }

    if (!invoiceItems || invoiceItems.length === 0) {
      errors.push(t('invoices.pleaseAddInvoiceItem'))
    }

    // Validate invoice items (NO QUANTITY CHECK)
    invoiceItems?.forEach((item, index) => {
      if (!item.serviceId) {
        errors.push(`Item ${index + 1}: ${t('invoices.service')} is required`)
      }
      // Description is now optional - removed validation
      if (!item.rate || parseFloat(item.rate) <= 0) {
        errors.push(`Item ${index + 1}: ${t('invoices.rate')} must be greater than 0`)
      }
      if (item.discount && parseFloat(item.discount) < 0) {
        errors.push(`Item ${index + 1}: ${t('invoices.discount')} cannot be negative`)
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
      let currentInvoiceNumber = invoiceNumber
      if (!currentInvoiceNumber) {
        currentInvoiceNumber = await generateInvoiceNumber()
        // Update the state with the generated invoice number
        updateInvoiceState({ invoiceNumber: currentInvoiceNumber })
      }

      // Use fallbacks for required fields
      const finalBranchId = branchId || selectedClient?.branchId
      const finalEmployeeId = employeeId || selectedSalesperson?.id

      if (isEdit) {
        // For edit mode, use single API call like create mode
        const payload = {
          clientId: selectedClient.id,
          branchId: finalBranchId,
          employeeId: finalEmployeeId,
          invoiceNumber: currentInvoiceNumber,
          thanksMessage: thanksMessage || t('invoices.defaultThankYouMessage'),
          notes: clientNotesText || null,
          paymentTerms: paymentTerms ? paymentTermsText : null,
          taxRate: taxRate || 0,
          discountAmount: discountAmount || 0,
          paymentMethod: selectedBankAccount ? 'Bank Transfer' : 'Internet Banking',
          bankAccountId: selectedBankAccount || null,
          // Company Information
          companyName: companyInfo?.companyName || null,
          companyTagline: companyInfo?.tagline || null,
          companyAddress: companyInfo?.address || null,
          companyCity: companyInfo?.city || null,
          companyPhone: companyInfo?.phone || null,
          companyEmail: companyInfo?.email || null,
          companyWebsite: companyInfo?.website || null,
          companyLogo: companyInfo?.logo || null,
          // Invoice Items
          items: invoiceItems.map(item => ({
            serviceId: item.serviceId,
            description: item.description,
            rate: parseFloat(item.rate),
            discount: parseFloat(item.discount || 0)
          }))
        }

        console.log('Updating invoice:', payload)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}`, {
          method: 'PATCH',
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
          setSaveStatus('updated')
          setCreatedInvoiceId(invoiceId)
          console.log('Invoice updated successfully:', responseData)

          // Update invoice state with updated invoice data
          updateInvoiceState({
            invoiceId: invoiceId,
            invoiceNumber: currentInvoiceNumber
          })

          // Reset company info to defaults after successful save
          if (onResetCompanyInfo) {
            onResetCompanyInfo()
          }

          // Clear success message after 3 seconds
          setTimeout(() => {
            setSaveStatus('')
            setApiSuccess(false)
          }, 3000)
        } else {
          const errorMessage = responseData.message || `Failed to update invoice: ${response.status}`
          setApiError(errorMessage)
          setSaveStatus('error')
          console.error('API Error:', responseData)
        }
      } else {
        // For create mode, use the original single API call
        const payload = {
          clientId: selectedClient.id,
          branchId: finalBranchId,
          employeeId: finalEmployeeId,
          invoiceNumber: currentInvoiceNumber,
          thanksMessage: thanksMessage || t('invoices.defaultThankYouMessage'),
          notes: clientNotesText || null,
          paymentTerms: paymentTerms ? paymentTermsText : null,
          taxRate: taxRate || 0,
          discountAmount: discountAmount || 0,
          paymentMethod: selectedBankAccount ? 'Bank Transfer' : 'Internet Banking',
          bankAccountId: selectedBankAccount || null,
          // Company Information
          companyName: companyInfo?.companyName || null,
          companyTagline: companyInfo?.tagline || null,
          companyAddress: companyInfo?.address || null,
          companyCity: companyInfo?.city || null,
          companyPhone: companyInfo?.phone || null,
          companyEmail: companyInfo?.email || null,
          companyWebsite: companyInfo?.website || null,
          companyLogo: companyInfo?.logo || null,
          items: invoiceItems.map(item => ({
            serviceId: item.serviceId,
            description: item.description,
            rate: parseFloat(item.rate),
            discount: parseFloat(item.discount || 0)
          }))
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/invoices`
        console.log(`Making API call to: ${apiUrl}`)
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
          const invoiceId = responseData.data.invoice.id
          setCreatedInvoiceId(invoiceId)
          console.log('Invoice created successfully:', responseData)

          // Update invoice state with created invoice data
          updateInvoiceState({
            invoiceId: invoiceId,
            invoiceNumber: responseData.data.invoice.invoiceNumber
          })

          // Reset company info to defaults after successful save
          if (onResetCompanyInfo) {
            onResetCompanyInfo()
          }
          
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
      }
    } catch (error) {
      const errorMessage = error.message || 'Network error or unexpected issue. Please try again.'
      setApiError(errorMessage)
      setSaveStatus('error')
      console.error(`Invoice ${isEdit ? 'update' : 'creation'} error:`, error)
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

  // Handle send invoice - removed email functionality
  // const handleSendInvoice = () => {
  //   if (createdInvoiceId) {
  //     setSendDrawerOpen(true)
  //   }
  // }

  // Calculate totals for display (NO QUANTITY)
  // Discount is now a flat rate, not percentage
  const calculateItemTotal = item => {
    const rate = parseFloat(item.rate) || 0
    const discount = parseFloat(item.discount) || 0
    // Discount is now a flat rate, not percentage - SIMPLE SUBTRACTION
    const total = rate - discount
    console.log('calculateItemTotal:', { rate, discount, total, item })
    return total
  }

  const calculateInvoiceTotal = () => {
    const result = (
      invoiceItems?.reduce((total, item) => {
        const itemTotal = calculateItemTotal(item)
        return total + (isNaN(itemTotal) ? 0 : itemTotal)
      }, 0) || 0
    )
    console.log('calculateInvoiceTotal:', { invoiceItems, result })
    return result
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
        const discount = parseFloat(item.discount) || 0
        // Discount is now a flat rate, not percentage
        return total + (isNaN(discount) ? 0 : discount)
      }, 0) || 0
    )
  }

  const calculateTax = () => {
    const subtotal = calculateInvoiceTotal()
    const tax = subtotal * ((taxRate || 0) / 100)
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
    selectedClient && invoiceItems?.length > 0 && thanksMessage?.trim() && finalEmployeeId && finalBranchId

  const isSaved = createdInvoiceId && saveStatus !== 'saving'

  // In edit mode, we should allow saving even if the invoice was previously saved
  const canSave = isEdit ? isReadyToSave : isReadyToSave && !isSaved

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
          disabled: !canSave || isLoading,
          sx: {
            backgroundColor: isSaved ? '#e8f5e8' : !canSave ? '#f5f5f5' : '#e3f2fd',
            color: isSaved ? '#2e7d32' : !canSave ? '#bdbdbd' : '#1976d2',
            '&:hover': {
              backgroundColor: isSaved ? '#e8f5e8' : !canSave ? '#f5f5f5' : '#bbdefb'
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
              {t('invoices.invoiceActions')}
            </Typography>

            {/* Send Invoice Button - Removed email functionality */}
            {/* <Button
              fullWidth
              {...getButtonProps('send')}
              className='capitalize'
              startIcon={<i className='tabler-send' />}
              onClick={handleSendInvoice}
            >
              Send Invoice
            </Button> */}

            {/* Preview Button */}
            <Button
              fullWidth
              component={isSaved ? Link : 'button'}
              {...getButtonProps('preview')}
              className='capitalize'
              href={isSaved ? getLocalizedUrl(`/apps/invoice/preview/${createdInvoiceId}`, locale) : undefined}
              onClick={!isSaved ? handlePreview : undefined}
            >
              {t('invoices.preview')}
            </Button>

            {/* Save Button */}
            <Button fullWidth {...getButtonProps('save')} className='capitalize' onClick={handleSaveInvoice}>
              {saveStatus === 'saving'
                ? t('invoices.saving')
                : saveStatus === 'updated'
                  ? t('invoices.updated')
                  : isSaved && !isEdit
                    ? t('invoices.saved')
                    : isEdit
                      ? t('invoices.updateInvoice')
                      : t('invoices.save')}
            </Button>

            {/* Status Messages */}
            {apiSuccess && saveStatus === 'success' && (
              <Alert severity='success' size='small'>
                {t('invoices.invoiceCreatedSuccessfully')}
                {invoiceNumber}
              </Alert>
            )}

            {apiSuccess && saveStatus === 'updated' && (
              <Alert severity='success' size='small'>
                {t('invoices.invoiceUpdatedSuccessfully')}
                {invoiceNumber}
              </Alert>
            )}

            {apiError && saveStatus === 'error' && (
              <Alert severity='error' size='small'>
                {apiError}
              </Alert>
            )}

            {!selectedClient && (
              <Alert severity='warning' size='small'>
                {t('invoices.pleaseSelectClient')}
              </Alert>
            )}

            {selectedClient && (!invoiceItems || invoiceItems.length === 0) && (
              <Alert severity='warning' size='small'>
                {t('invoices.pleaseAddInvoiceItem')}
              </Alert>
            )}

            {selectedClient && invoiceItems?.length > 0 && !thanksMessage?.trim() && (
              <Alert severity='warning' size='small'>
                {t('invoices.pleaseAddThanksMessage')}
              </Alert>
            )}

            {selectedClient && invoiceItems?.length > 0 && thanksMessage?.trim() && !finalEmployeeId && (
              <Alert severity='warning' size='small'>
                {t('invoices.pleaseSelectSalesperson')}
              </Alert>
            )}


            {/* Invoice Summary */}
            {invoiceItems?.length > 0 && (
              <div className='p-4 bg-gray-50 rounded-lg border'>
                <Typography variant='subtitle2' className='font-medium mb-3'>
                  {t('invoices.invoiceSummary')}
                </Typography>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{t('invoices.subtotalLabel')}</span>
                    <span>€{(() => {
                      // FLAT RATE DISCOUNT: Simple subtraction - rate - discount
                      const total = invoiceItems?.reduce((sum, item) => {
                        const rate = Number(item.rate) || 0
                        const discount = Number(item.discount) || 0
                        return sum + (rate - discount) // FLAT RATE: direct subtraction
                      }, 0) || 0
                      return total.toFixed(2)
                    })()}</span>
                  </div>
                  {(taxRate || 0) > 0 && (
                    <div className='flex justify-between text-sm'>
                      <span>
                        {t('invoices.taxLabel')} ({taxRate}%):
                      </span>
                      <span>€{calculateTax().toFixed(2)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className='flex justify-between text-sm'>
                      <span>{t('invoices.discountLabel')}</span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Divider className='my-2' />
                  <div className='flex justify-between font-medium text-base'>
                    <span>{t('invoices.totalLabel')}</span>
                    <span>€{(() => {
                      // FLAT RATE DISCOUNT: Calculate total with tax
                      const subtotal = invoiceItems?.reduce((sum, item) => {
                        const rate = Number(item.rate) || 0
                        const discount = Number(item.discount) || 0
                        return sum + (rate - discount) // FLAT RATE: direct subtraction
                      }, 0) || 0
                      const tax = subtotal * ((Number(taxRate) || 0) / 100)
                      const overallDiscount = Number(discountAmount) || 0
                      const finalTotal = subtotal + tax - overallDiscount
                      return finalTotal.toFixed(2)
                    })()}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Send Invoice Drawer - Removed email functionality */}
        {/* <SendInvoiceDrawer
          open={sendDrawerOpen}
          handleClose={() => setSendDrawerOpen(false)}
          invoiceId={createdInvoiceId}
          invoiceNumber={invoiceNumber}
        /> */}
      </Grid>

      {/* Invoice Settings */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <Typography variant='h6' className='mb-2'>
              {t('invoices.paymentSettings')}
            </Typography>

            <CustomTextField
              select
              fullWidth
              value={selectedBankAccount || ''}
              onChange={e => handleBankAccountChange(e.target.value)}
              label={t('invoices.paymentMethod')}
              helperText={t('invoices.selectBankAccountForPayment')}
              disabled={isSaved}
            >
              {bankAccounts.map(account => (
                <MenuItem key={account.id} value={account.id}>
                  <div className='flex flex-col'>
                    <span className='font-medium'>{account.bankName}</span>
                    <span className='text-sm text-gray-500'>{account.bankIban}</span>
                  </div>
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              fullWidth
              type='number'
              value={taxRate || 0}
              onChange={e => {
                const value = parseFloat(e.target.value) || 0
                if (value >= 0 && value <= 100) {
                  updateInvoiceState({ taxRate: value })
                }
              }}
              label={t('invoices.taxRate')}
              helperText={t('invoices.enterTaxRate')}
              disabled={isSaved}
              inputProps={{
                min: 0,
                max: 100,
                step: 0.1
              }}
            />

            <Divider />

            <Typography variant='subtitle2' className='font-medium'>
              {t('invoices.displayOptions')}
            </Typography>

            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer text-sm'>
                  {t('invoices.paymentTerms')}
                </InputLabel>
                <Typography variant='caption' color='text.secondary'>
                  {t('invoices.showPaymentTermsOnInvoice')}
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
                  {t('invoices.clientNotes')}
                </InputLabel>
                <Typography variant='caption' color='text.secondary'>
                  {t('invoices.displayClientNotesSection')}
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
