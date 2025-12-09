'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const EditCard = ({ invoiceData, id, data, clients, services, employees }) => {
  // Hooks
  const { t } = useTranslation()
  // States
  const [selectData, setSelectData] = useState(invoiceData?.client || null)
  const [count, setCount] = useState(invoiceData?.items?.length || 1)
  const [issueDate, setIssueDate] = useState(invoiceData?.issuedDate ? new Date(invoiceData.issuedDate) : new Date())
  const [invoiceItems, setInvoiceItems] = useState(invoiceData?.items || [])
  const [categories, setCategories] = useState([])
  const [isFormReady, setIsFormReady] = useState(false)

  // Form control
  const { control, watch, reset, setValue } = useForm({
    defaultValues: {
      items: invoiceItems || []
    }
  })

  // Watch for category changes
  const watchedItems = watch('items') || invoiceItems

  // Initialize form when data is ready
  useEffect(() => {
    if (invoiceItems && invoiceItems.length > 0 && services && services.length > 0) {
      reset({
        items: invoiceItems
      })
      setIsFormReady(true)
    }
  }, [invoiceItems, services, reset])

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

  // Extract categories from services
  useEffect(() => {
    if (services && services.length > 0) {
      const uniqueCategories = [...new Set(services.map(service => service.category).filter(Boolean))]
      setCategories(uniqueCategories)
    }
  }, [services])

  // Get filtered services based on selected category
  const getFilteredServices = categoryId => {
    if (!categoryId) return []
    return services.filter(service => service.category === categoryId)
  }

  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-item').remove()
  }

  // Show loading state while form initializes
  if (!isFormReady) {
    return (
      <Card>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center items-center py-8'>
            <Typography variant='h6' color='text.secondary'>
              Loading invoice data...
            </Typography>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className='sm:!p-12'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <div className='p-6 rounded bg-actionHover'>
                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2.5'>
                      <Logo />
                    </div>
                    <div>
                      <Typography color='text.primary'>Office 149, 450 South Brand Brooklyn</Typography>
                      <Typography color='text.primary'>San Diego County, CA 91905, USA</Typography>
                      <Typography color='text.primary'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                      <Typography variant='h5' className='min-is-[95px]'>
                        Invoice
                      </Typography>
                      <CustomTextField
                        fullWidth
                        value={id}
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
                        Date Issued:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issueDate}
                        id='payment-date'
                        onChange={date => date !== null && setIssueDate(date)}
                        customInput={<CustomTextField fullWidth />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
                  <CustomTextField
                    select
                    className='is-1/2 min-is-[220px] sm:is-auto'
                    value={selectData?.id || ''}
                    onChange={e => {
                      const selectedClient = clients?.find(client => client.id === e.target.value)
                      setSelectData(selectedClient || null)
                    }}
                  >
                    <MenuItem value=''>
                      <em>Select Client</em>
                    </MenuItem>
                    {clients?.map((client, index) => (
                      <MenuItem key={index} value={client.id}>
                        {client.name} - {client.email}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  {selectData ? (
                    <div>
                      <Typography>
                        <strong>{selectData.name}</strong>
                      </Typography>
                      <Typography>{selectData.email}</Typography>
                      {selectData.phone && <Typography>{selectData.phone}</Typography>}
                      {selectData.address && <Typography>{selectData.address}</Typography>}
                      {selectData.city && (
                        <Typography>
                          {selectData.city}
                        </Typography>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Typography color='textSecondary'>No client selected</Typography>
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    {t('invoices.paymentMethod')}
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>€{invoiceData?.totalAmount || 0}</Typography>
                    </div>
                    {invoiceData?.bankAccount ? (
                      <>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>Bank name:</Typography>
                          <Typography>{invoiceData.bankAccount.bankName}</Typography>
                        </div>
                        {invoiceData.bankAccount.accountName && (
                          <div className='flex items-center gap-4'>
                            <Typography className='min-is-[100px]'>Account Name:</Typography>
                            <Typography>{invoiceData.bankAccount.accountName}</Typography>
                          </div>
                        )}
                        {invoiceData.bankAccount.accountNumber && (
                          <div className='flex items-center gap-4'>
                            <Typography className='min-is-[100px]'>Account Number:</Typography>
                            <Typography>{invoiceData.bankAccount.accountNumber}</Typography>
                          </div>
                        )}
                        {invoiceData.bankAccount.bankIban && (
                          <div className='flex items-center gap-4'>
                            <Typography className='min-is-[100px]'>IBAN:</Typography>
                            <Typography>{invoiceData.bankAccount.bankIban}</Typography>
                          </div>
                        )}
                        {invoiceData.bankAccount.bankSwiftCode && (
                          <div className='flex items-center gap-4'>
                            <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                            <Typography>{invoiceData.bankAccount.bankSwiftCode}</Typography>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className='flex items-center gap-4'>
                        <Typography className='min-is-[100px]'>Bank name:</Typography>
                        <Typography color='textSecondary'>No bank account selected</Typography>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              {invoiceItems?.map((item, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded', {
                    'mbs-8': !isBelowMdScreen,
                    '!mbs-14': index !== 0 && !isBelowMdScreen,
                    'gap-5': isBelowMdScreen
                  })}
                >
                  <Grid container spacing={5} className='m-0 p-5' alignItems='flex-end'>
                    {/* Service Category */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Service Category
                      </Typography>
                      <Controller
                        name={`items.${index}.categoryId`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            {...field}
                            className='mbe-5'
                            onChange={e => {
                              field.onChange(e.target.value)
                              // Reset service when category changes
                              setValue(`items.${index}.serviceId`, '')
                              setValue(`items.${index}.rate`, 0)
                            }}
                          >
                            <MenuItem value=''>
                              <em>Select Category</em>
                            </MenuItem>
                            {categories.map(category => (
                              <MenuItem key={category} value={category}>
                                {category}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    </Grid>

                    {/* Service Name */}
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Service Name
                      </Typography>
                      <Controller
                        name={`items.${index}.serviceId`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            select
                            fullWidth
                            {...field}
                            className='mbe-5'
                            disabled={!watchedItems[index]?.categoryId}
                            onChange={e => {
                              field.onChange(e.target.value)
                              // Auto-populate rate when service is selected
                              if (services && services.length > 0) {
                                const selectedService = services.find(s => s.id === e.target.value)
                                if (selectedService) {
                                  setValue(`items.${index}.rate`, selectedService.price)
                                }
                              }
                            }}
                          >
                            <MenuItem value=''>
                              <em>{watchedItems[index]?.categoryId ? 'Select Service' : 'Select Category First'}</em>
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
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Rate
                      </Typography>
                      <Controller
                        name={`items.${index}.rate`}
                        control={control}
                        render={({ field }) => (
                          <div className='bg-gray-50 rounded border text-center min-h-[40px] flex items-center justify-center mbe-5'>
                            <Typography variant='body1' className='font-medium'>
                              €{field.value || 0}
                            </Typography>
                          </div>
                        )}
                      />
                    </Grid>

                    {/* Discount */}
                    <Grid size={{ xs: 6, md: 1.5 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Discount
                      </Typography>
                      <Controller
                        name={`items.${index}.discount`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            {...(isBelowMdScreen && { fullWidth: true })}
                            type='number'
                            placeholder='0'
                            {...field}
                            className='mbe-5'
                            onChange={e => {
                              field.onChange(parseFloat(e.target.value) || 0)
                            }}
                            slotProps={{
                              input: {
                                inputProps: { min: 0, step: 0.01 },
                                startAdornment: <InputAdornment position='start'>€</InputAdornment>
                              }
                            }}
                          />
                        )}
                      />
                    </Grid>

                    {/* Total */}
                    <Grid size={{ xs: 6, md: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Total
                      </Typography>
                      <Controller
                        name={`items.${index}.total`}
                        control={control}
                        render={({ field }) => {
                          const rate = watchedItems[index]?.rate || 0
                          const discount = watchedItems[index]?.discount || 0
                          // Discount is now a flat rate, not percentage
                          const total = rate - discount
                          return (
                            <div className='bg-primary-50 rounded border text-center min-h-[40px] flex items-center justify-center border-primary-200 mbe-5'>
                              <Typography variant='h6' color='primary' className='font-semibold'>
                                €{total.toFixed(2)}
                              </Typography>
                            </div>
                          )
                        }}
                      />
                    </Grid>

                    {/* Delete Button */}
                    <Grid
                      size={{ xs: 6, md: 1 }}
                      className='flex justify-center'
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <IconButton
                        onClick={() => {
                          const updatedItems = invoiceItems.filter((_, i) => i !== index)
                          setInvoiceItems(updatedItems)
                        }}
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
                  <Grid container spacing={5} className='m-0 p-5' sx={{ mt: 2 }}>
                    <Grid size={{ xs: 12 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Description
                      </Typography>
                      <Controller
                        name={`items.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            rows={3}
                            fullWidth
                            multiline
                            {...field}
                            placeholder='Service description and notes...'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <div className='flex flex-col justify-start border-is'>
                    <IconButton
                      size='small'
                      onClick={() => {
                        const updatedItems = invoiceItems.filter((_, i) => i !== index)
                        setInvoiceItems(updatedItems)
                      }}
                    >
                      <i className='tabler-x text-2xl text-actionActive' />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Grid size={{ xs: 12 }}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => {
                    setInvoiceItems([
                      ...invoiceItems,
                      {
                        categoryId: '',
                        serviceId: '',
                        description: '',
                        rate: 0,
                        discount: 0,
                        total: 0
                      }
                    ])
                  }}
                  startIcon={<i className='tabler-plus' />}
                >
                  Add Service
                </Button>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                  <div className='flex items-center gap-2'>
                    <Typography className='font-medium' color='text.primary'>
                      Salesperson:
                    </Typography>
                    <CustomTextField select value={invoiceData?.employee?.id || ''}>
                      <MenuItem value=''>
                        <em>Select Salesperson</em>
                      </MenuItem>
                      {employees?.map((employee, idx) => (
                        <MenuItem key={idx} value={employee.id}>
                          {employee.name} - {employee.email}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                  <CustomTextField
                    value={invoiceData?.thanksMessage || t('invoices.defaultThankYouMessage')}
                    label={t('invoices.thanksMessage')}
                  />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      €{invoiceData?.subTotalAmount || 0}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      €{invoiceData?.discountAmount || 0}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Tax ({invoiceData?.taxRate || 0}%):</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      €{invoiceData?.taxAmount || 0}
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Total:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      €{invoiceData?.totalAmount || 0}
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel htmlFor='invoice-note' className='inline-flex mbe-1 text-textPrimary'>
                Note:
              </InputLabel>
              <CustomTextField
                id='invoice-note'
                rows={2}
                fullWidth
                multiline
                className='border rounded'
                defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default EditCard
