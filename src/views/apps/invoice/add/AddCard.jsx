'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useForm, Controller } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import CompanyInfoSection from '@/components/CompanyInfoSection'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Util Imports
import { useTranslation } from '@/hooks/useTranslation'

const AddCard = ({
  invoiceData,
  invoiceState,
  updateInvoiceState,
  bankAccounts = [],
  clients = [],
  services = [],
  employees = [],
  companyInfo = null,
  onCompanyInfoChange = () => {}
}) => {
  // Hooks
  const { t } = useTranslation()

  // Destructure from shared state
  const {
    selectedClient,
    selectedSalesperson,
    issuedDate,
    dueDate,
    invoiceItems,
    paymentMethod,
    paymentTerms,
    paymentTermsText,
    clientNotes,
    clientNotesText,
    bankDetails,
    invoiceNumber,
    thanksMessage,
    notes,
    taxRate
  } = invoiceState

  // Local API states - now passed as props
  // const [clients, setClients] = useState([])
  // const [services, setServices] = useState([])
  // const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)

  // Debug bank details
  console.log('AddCard bankDetails:', bankDetails)
  console.log('AddCard selectedBankAccount:', invoiceState.selectedBankAccount)
  console.log('AddCard categories:', categories)
  console.log('AddCard categoriesLoaded:', categoriesLoaded)
  console.log('AddCard invoiceItems:', invoiceItems)
  console.log('AddCard services:', services)
  console.log('First invoice item structure:', invoiceItems[0])

  const { data: session } = useSession()

  // Form control
  const { control, watch } = useForm({
    defaultValues: {
      items: invoiceItems
    }
  })

  // Watch for category changes
  const watchedItems = watch('items') || invoiceItems

  // Debug logging for arrays (after state declarations)
  // console.log('=== AddCard Debug Info ===')
  // console.log('Clients loaded:', clients.length)
  // console.log('Services loaded:', services.length)
  // console.log('Employees loaded:', employees.length)
  // console.log('Selected client ID:', selectedClient?.id)
  // console.log('Selected salesperson ID:', selectedSalesperson?.id)
  // console.log('Invoice items:', invoiceItems)
  // console.log('Loading state:', loading)
  // console.log('========================')

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // Data is now passed as props, no need to fetch

  // Extract categories from services
  useEffect(() => {
    if (services && Array.isArray(services) && services.length > 0) {
      console.log('Services data:', services)
      console.log(
        'Services with categories:',
        services.map(s => ({ name: s.name, category: s.category }))
      )
      const uniqueCategories = [...new Set(services.map(service => service.category).filter(Boolean))]
      console.log('Extracted categories:', uniqueCategories)
      setCategories(uniqueCategories || [])
      setCategoriesLoaded(true)
    } else {
      console.log('No services data available')
      setCategories([])
      setCategoriesLoaded(true)
    }
  }, [services])

  // Get filtered services based on selected category
  const getFilteredServices = categoryId => {
    if (!categoryId || !services || !Array.isArray(services)) return []
    const filtered = services.filter(service => service.category === categoryId)
    return filtered
  }

  // Update handlers that call parent function
  const handleClientChange = clientId => {
    if (!clients || clients.length === 0) return
    const client = clients.find(c => c.id === clientId)
    updateInvoiceState({ selectedClient: client, branchId: client?.branchId })
  }

  const handleSalespersonChange = employeeId => {
    if (!employees || employees.length === 0) return
    const employee = employees.find(emp => emp.id === employeeId)
    updateInvoiceState({ selectedSalesperson: employee, employeeId: employeeId })
  }

  const handleDateChange = (field, date) => {
    updateInvoiceState({ [field]: date })
  }

  const handleItemChange = (index, field, value) => {
    console.log('handleItemChange called:', { index, field, value, currentItems: invoiceItems })

    const updatedItems = [...invoiceItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    // Auto-populate rate when service is selected
    if (field === 'serviceId' && services && services.length > 0) {
      const selectedService = services.find(s => s.id === value)
      if (selectedService) {
        updatedItems[index].rate = selectedService.price
      }
    }

    // Reset service when category changes
    if (field === 'categoryId') {
      updatedItems[index].serviceId = ''
      updatedItems[index].rate = 0
    }

    console.log('Updated items after change:', updatedItems)
    updateInvoiceState({ invoiceItems: updatedItems })
  }

  const addInvoiceItem = () => {
    const newItems = [
      ...invoiceItems,
      {
        categoryId: '',
        serviceId: '',
        description: '',
        rate: 0,
        discount: 0
      }
    ]
    updateInvoiceState({ invoiceItems: newItems })
  }

  const removeInvoiceItem = index => {
    if (invoiceItems.length > 1) {
      const updatedItems = invoiceItems.filter((_, i) => i !== index)
      updateInvoiceState({ invoiceItems: updatedItems })
    }
  }

  // Calculation functions
  const calculateItemTotal = item => {
    const rate = parseFloat(item.rate) || 0
    const discount = parseFloat(item.discount) || 0
    const discountAmount = (rate * discount) / 100
    return rate - discountAmount
  }

  const calculateInvoiceTotal = () => {
    return invoiceItems.reduce((total, item) => {
      const itemTotal = calculateItemTotal(item)
      return total + (isNaN(itemTotal) ? 0 : itemTotal)
    }, 0)
  }

  const calculateSubtotal = () => {
    return invoiceItems.reduce((total, item) => {
      const rate = parseFloat(item.rate) || 0
      return total + (isNaN(rate) ? 0 : rate)
    }, 0)
  }

  const calculateTotalDiscount = () => {
    return invoiceItems.reduce((total, item) => {
      const rate = parseFloat(item.rate) || 0
      const discount = parseFloat(item.discount) || 0
      const discountAmount = (rate * discount) / 100
      return total + (isNaN(discountAmount) ? 0 : discountAmount)
    }, 0)
  }

  const calculateTax = () => {
    const subtotal = calculateInvoiceTotal()
    const taxRate = parseFloat(invoiceState.taxRate) || 0
    const tax = subtotal * (taxRate / 100)
    return isNaN(tax) ? 0 : tax
  }

  const calculateFinalTotal = () => {
    const subtotal = calculateInvoiceTotal()
    const tax = calculateTax()
    const total = subtotal + tax
    return isNaN(total) ? 0 : total
  }

  // Show loading if data is still being fetched
  if (loading) {
    return (
      <Card>
        <CardContent className='sm:!p-12'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <Typography>{t('invoices.loadingInvoiceData')}</Typography>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      key={`${invoiceState.invoiceNumber || 'new'}-${selectedClient?.id || 'no-client'}-${invoiceItems?.length || 0}`}
    >
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          {/* Header Section */}
          <Grid size={{ xs: 12 }}>
            <div className='p-6 bg-actionHover rounded'>
              <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                <div className='flex flex-col gap-6'>
                  <CompanyInfoSection
                    companyInfo={companyInfo}
                    onCompanyInfoChange={onCompanyInfoChange}
                    isEditable={true}
                    showEditButton={true}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-4'>
                    <Typography variant='h5' className='min-is-[95px]'>
                      {t('invoices.title')}
                    </Typography>
                    <CustomTextField
                      fullWidth
                      value={invoiceNumber || ''}
                      placeholder={t('invoices.invoiceNumberGenerated')}
                      slotProps={{
                        input: {
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }
                      }}
                    />
                  </div>
                  <div className='flex items-center'>
                    <Typography className='min-is-[95px] mie-4' color='text.primary'>
                      {t('invoices.dateIssued')}
                    </Typography>
                    <AppReactDatepicker
                      boxProps={{ className: 'is-full' }}
                      selected={issuedDate || new Date()}
                      placeholderText='YYYY-MM-DD'
                      dateFormat={'yyyy-MM-dd'}
                      onChange={date => handleDateChange('issuedDate', date)}
                      customInput={<CustomTextField fullWidth />}
                    />
                  </div>
                  <div className='flex items-center'>
                    <Typography className='min-is-[95px] mie-4' color='text.primary'>
                      {t('invoices.dateDue')}
                    </Typography>
                    <AppReactDatepicker
                      boxProps={{ className: 'is-full' }}
                      selected={dueDate}
                      placeholderText='YYYY-MM-DD'
                      dateFormat={'yyyy-MM-dd'}
                      onChange={date => handleDateChange('dueDate', date)}
                      customInput={<CustomTextField fullWidth />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Client and Bill To Section */}
          <Grid size={{ xs: 12 }}>
            <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
              <div className='flex flex-col gap-4'>
                <Typography className='font-medium' color='text.primary'>
                  {t('invoices.invoiceTo')}
                </Typography>
                <CustomTextField
                  select
                  className={classnames('min-is-[220px]', { 'is-1/2': isBelowSmScreen })}
                  value={selectedClient?.id || ''}
                  onChange={e => handleClientChange(e.target.value)}
                  label={t('invoices.selectClient')}
                >
                  <MenuItem value=''>
                    <em>{t('invoices.chooseClient')}</em>
                  </MenuItem>
                  {clients &&
                    clients.length > 0 &&
                    clients.map(client => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.name} - {client.email}
                      </MenuItem>
                    ))}
                </CustomTextField>

                {selectedClient ? (
                  <div>
                    <Typography>
                      <strong>{selectedClient.name}</strong>
                    </Typography>
                    <Typography>{selectedClient.email}</Typography>
                    {selectedClient.phone && <Typography>{selectedClient.phone}</Typography>}
                    {selectedClient.address && <Typography>{selectedClient.address}</Typography>}
                    {selectedClient.city && (
                      <Typography>
                        {selectedClient.city} {selectedClient.postalCode} ({selectedClient.province})
                      </Typography>
                    )}
                  </div>
                ) : (
                  <div>
                    <Typography color='textSecondary'>{t('invoices.noClientSelected')}</Typography>
                    <Typography color='textSecondary' variant='caption'>
                      Debug: selectedClient = {JSON.stringify(selectedClient)}
                    </Typography>
                  </div>
                )}
              </div>

              {/* Payment Method Section - Show bank details */}
              <div className='flex flex-col gap-4'>
                <Typography className='font-medium' color='text.primary'>
                  {t('invoices.paymentMethod')}
                </Typography>
                <div>
                  <div className='flex items-center gap-4'>
                    <Typography className='min-is-[100px]'>{t('invoices.totalDue')}</Typography>
                    <Typography className='font-medium text-primary'>${calculateFinalTotal().toFixed(2)}</Typography>
                  </div>
                  {bankDetails ? (
                    <>
                      <div className='flex items-center gap-4'>
                        <Typography className='min-is-[100px]'>{t('invoices.bankName')}</Typography>
                        <Typography>{bankDetails.bankName}</Typography>
                      </div>
                      <div className='flex items-center gap-4'>
                        <Typography className='min-is-[100px]'>{t('invoices.country')}</Typography>
                        <Typography>{bankDetails.country}</Typography>
                      </div>
                      <div className='flex items-center gap-4'>
                        <Typography className='min-is-[100px]'>{t('invoices.iban')}</Typography>
                        <Typography>{bankDetails.iban}</Typography>
                      </div>
                      <div className='flex items-center gap-4'>
                        <Typography className='min-is-[100px]'>{t('invoices.swiftCode')}</Typography>
                        <Typography>{bankDetails.swiftCode}</Typography>
                      </div>
                    </>
                  ) : (
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>{t('invoices.bankName')}</Typography>
                      <Typography color='textSecondary'>{t('invoices.noBankAccountSelected')}</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider className='border-dashed' />
          </Grid>

          {/* Service Items */}
          <Grid size={{ xs: 12 }}>
            <div className='flex justify-between items-center mb-4'>
              <Typography variant='h6' color='text.primary'>
                {t('invoices.services')}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('invoices.paymentMethod')} {paymentMethod || t('invoices.noBankAccountSelected')}
              </Typography>
            </div>

            {invoiceItems && invoiceItems.length > 0 ? (
              invoiceItems.map((item, index) => (
                <div
                  key={index}
                  className='border rounded p-4 mb-4 '
                  style={{ border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 16, padding: 16 }}
                >
                  <Grid container spacing={2} alignItems='flex-end'>
                    {/* Service Category */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.serviceCategory')}
                      </Typography>
                      <Controller
                        name={`items.${index}.categoryId`}
                        control={control}
                        defaultValue={item.categoryId || ''}
                        render={({ field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            {...field}
                            onChange={e => {
                              console.log('Category selected:', e.target.value)
                              field.onChange(e.target.value)
                              handleItemChange(index, 'categoryId', e.target.value)
                              handleItemChange(index, 'serviceId', '') // Reset service when category changes
                            }}
                          >
                            <MenuItem value=''>
                              <em>{t('invoices.selectCategory')}</em>
                            </MenuItem>
                            {!categoriesLoaded ? (
                              <MenuItem disabled>{t('invoices.loadingCategories')}</MenuItem>
                            ) : categories.length > 0 ? (
                              categories.map(category => (
                                <MenuItem key={category} value={category}>
                                  {category}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>{t('invoices.noCategoriesAvailable')}</MenuItem>
                            )}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    {/* Service Name */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.serviceName')}
                      </Typography>
                      <Controller
                        name={`items.${index}.serviceId`}
                        control={control}
                        defaultValue={item.serviceId || ''}
                        render={({ field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            {...field}
                            onChange={e => {
                              field.onChange(e.target.value)
                              handleItemChange(index, 'serviceId', e.target.value)
                            }}
                            disabled={!watchedItems[index]?.categoryId}
                          >
                            <MenuItem value=''>
                              <em>
                                {watchedItems[index]?.categoryId
                                  ? t('invoices.selectService')
                                  : t('invoices.selectCategoryFirst')}
                              </em>
                            </MenuItem>
                            {watchedItems[index]?.categoryId &&
                              getFilteredServices(watchedItems[index].categoryId).map(service => (
                                <MenuItem key={service.id} value={service.id}>
                                  {service.name} - €{service.price}
                                </MenuItem>
                              ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    {/* Rate */}
                    <Grid size={{ xs: 6, md: 1.5 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.rate')}
                      </Typography>
                      <div className='bg-gray-50 rounded border text-center min-h-[40px] flex items-center justify-center'>
                        <Typography variant='body1' className='font-medium'>
                          €{item.rate || 0}
                        </Typography>
                      </div>
                    </Grid>

                    {/* Discount */}
                    <Grid size={{ xs: 6, md: 1.5 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.discount')}
                      </Typography>
                      <CustomTextField
                        type='number'
                        fullWidth
                        value={item.discount}
                        onChange={e => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                        placeholder='0'
                        InputProps={{
                          endAdornment: <InputAdornment position='end'>%</InputAdornment>
                        }}
                        inputProps={{
                          min: 0,
                          max: 100,
                          style: { MozAppearance: 'textfield' }
                        }}
                        sx={{
                          '& input[type=number]::-webkit-outer-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                          },
                          '& input[type=number]::-webkit-inner-spin-button': {
                            WebkitAppearance: 'none',
                            margin: 0
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield'
                          }
                        }}
                      />
                    </Grid>

                    {/* Total */}
                    <Grid size={{ xs: 6, md: 2 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.total')}
                      </Typography>
                      <div className='bg-primary-50 rounded border text-center min-h-[40px] flex items-center justify-center border-primary-200'>
                        <Typography variant='h6' color='primary' className='font-semibold'>
                          €{calculateItemTotal(item).toFixed(2)}
                        </Typography>
                      </div>
                    </Grid>

                    {/* Delete Button */}
                    <Grid
                      size={{ xs: 6, md: 1 }}
                      className='flex justify-center'
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <IconButton
                        onClick={() => removeInvoiceItem(index)}
                        className='bg-red-100 hover:bg-red-200 transition-colors duration-200'
                        size='small'
                        sx={{
                          backgroundColor: '#fef2f2',
                          '&:hover': {
                            backgroundColor: '#fecaca'
                          },
                          borderRadius: '8px',
                          width: '40px',
                          height: '40px'
                        }}
                      >
                        <i className='tabler-x text-lg text-red-600' />
                      </IconButton>
                    </Grid>
                  </Grid>

                  {/* Description - Full Width Textarea */}
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12 }}>
                      <Typography className='font-medium mb-2' color='text.primary'>
                        {t('invoices.description')}
                      </Typography>
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder='Service description and notes...'
                        value={item.description}
                        onChange={e => handleItemChange(index, 'description', e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))
            ) : (
              <div className='text-center p-4'>
                <Typography color='textSecondary'>{t('invoices.noInvoiceItemsFound')}</Typography>
                <Typography color='textSecondary' variant='caption'>
                  Debug: invoiceItems = {JSON.stringify(invoiceItems)}
                </Typography>
              </div>
            )}

            <Grid size={{ xs: 12 }}>
              <Button
                size='small'
                variant='contained'
                onClick={addInvoiceItem}
                startIcon={<i className='tabler-plus' />}
              >
                {t('invoices.addService')}
              </Button>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider className='border-dashed' />
          </Grid>

          {/* Bottom Section */}
          <Grid size={{ xs: 12 }}>
            <div className='flex flex-col gap-4 lg:flex-row'>
              {/* Left Column - 70% width */}
              <div className='flex flex-col gap-4 lg:w-[70%] lg:pr-6'>
                <div className='flex flex-col gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    {t('invoices.salesperson')}
                  </Typography>
                  <CustomTextField
                    select
                    fullWidth
                    value={selectedSalesperson?.id || ''}
                    onChange={e => handleSalespersonChange(e.target.value)}
                    size='small'
                  >
                    <MenuItem value=''>
                      <em>{t('invoices.selectSalesperson')}</em>
                    </MenuItem>
                    {employees &&
                      employees.length > 0 &&
                      employees.map(employee => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.role}
                        </MenuItem>
                      ))}
                  </CustomTextField>
                </div>

                <CustomTextField
                  fullWidth
                  placeholder={t('invoices.thanksForBusiness')}
                  label={`${t('invoices.thanksMessage')}`}
                  value={thanksMessage || ''}
                  onChange={e => updateInvoiceState({ thanksMessage: e.target.value })}
                  required
                />

                {/* Payment Terms - Full Width within 70% column */}
                {paymentTerms && (
                  <div>
                    <InputLabel htmlFor='payment-terms-field' className='inline-flex mbe-1 text-textPrimary'>
                      {t('invoices.paymentTerms')}
                    </InputLabel>
                    <CustomTextField
                      id='payment-terms-field'
                      rows={4}
                      fullWidth
                      multiline
                      className='border rounded'
                      placeholder={t('invoices.enterPaymentTerms')}
                      value={paymentTermsText || ''}
                      onChange={e => updateInvoiceState({ paymentTermsText: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Right Column - 30% width - Totals Section */}
              <div className='lg:w-[30%] lg:pl-6'>
                <div className='flex flex-col gap-2 bg-gray-50 p-4 rounded'>
                  <div className='flex items-center justify-between'>
                    <Typography>{t('invoices.subtotalLabel')}</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${calculateSubtotal().toFixed(2)}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>{t('invoices.discountLabel')}</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${calculateTotalDiscount().toFixed(2)}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>
                      {t('invoices.taxLabel')} ({taxRate || 0}%):
                    </Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${calculateTax().toFixed(2)}
                    </Typography>
                  </div>
                  <Divider className='my-2' />
                  <div className='flex items-center justify-between'>
                    <Typography className='font-medium'>{t('invoices.totalLabel')}</Typography>
                    <Typography className='font-medium text-lg' color='primary'>
                      ${calculateFinalTotal().toFixed(2)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Client Notes Section - Separate full-width section */}
          <Grid size={{ xs: 12 }}>
            {clientNotes && (
              <>
                <Divider className='border-dashed my-4' />
                <div>
                  <InputLabel htmlFor='client-notes-field' className='inline-flex mbe-1 text-textPrimary'>
                    {t('invoices.clientNotes')}
                  </InputLabel>
                  <CustomTextField
                    id='client-notes-field'
                    rows={3}
                    fullWidth
                    multiline
                    className='border rounded'
                    placeholder={t('invoices.addClientNotes')}
                    value={clientNotesText || ''}
                    onChange={e => updateInvoiceState({ clientNotesText: e.target.value })}
                  />
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddCard
