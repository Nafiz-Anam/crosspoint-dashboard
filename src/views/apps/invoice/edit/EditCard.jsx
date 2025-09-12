'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
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

const EditCard = ({ invoiceData, id, data, clients, services, employees }) => {
  // States
  const [selectData, setSelectData] = useState(invoiceData?.client || null)
  const [count, setCount] = useState(invoiceData?.items?.length || 1)
  const [issueDate, setIssueDate] = useState(invoiceData?.issuedDate ? new Date(invoiceData.issuedDate) : new Date())
  const [dueDate, setDueDate] = useState(invoiceData?.dueDate ? new Date(invoiceData.dueDate) : null)
  const [invoiceItems, setInvoiceItems] = useState(invoiceData?.items || [])

  // Hooks
  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-item').remove()
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
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Due:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={dueDate}
                        id='payment-date'
                        onChange={date => date !== null && setDueDate(date)}
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
                          {selectData.city} {selectData.postalCode} ({selectData.province})
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
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>$12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>American Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>United States</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
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
                  <Grid container spacing={5} className='m-0 p-5'>
                    <Grid size={{ xs: 12, md: 5, lg: 6 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Service
                      </Typography>
                      <CustomTextField
                        select
                        fullWidth
                        value={item.serviceId || ''}
                        className='mbe-5'
                        onChange={e => {
                          const updatedItems = [...invoiceItems]
                          updatedItems[index].serviceId = e.target.value
                          setInvoiceItems(updatedItems)
                        }}
                      >
                        <MenuItem value=''>
                          <em>Select Service</em>
                        </MenuItem>
                        {services?.map((service, idx) => (
                          <MenuItem key={idx} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                      <CustomTextField
                        rows={2}
                        fullWidth
                        multiline
                        value={item.description || ''}
                        onChange={e => {
                          const updatedItems = [...invoiceItems]
                          updatedItems[index].description = e.target.value
                          setInvoiceItems(updatedItems)
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3, lg: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Rate
                      </Typography>
                      <CustomTextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        type='number'
                        placeholder='0'
                        value={item.rate || 0}
                        className='mbe-5'
                        onChange={e => {
                          const updatedItems = [...invoiceItems]
                          updatedItems[index].rate = parseFloat(e.target.value) || 0
                          setInvoiceItems(updatedItems)
                        }}
                        slotProps={{
                          input: {
                            inputProps: { min: 0 }
                          }
                        }}
                      />
                      <div className='flex flex-col'>
                        <Typography component='span' color='text.primary'>
                          Discount:
                        </Typography>
                        <div className='flex gap-2'>
                          <Typography component='span' color='text.primary'>
                            {item.discount || 0}%
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Discount
                      </Typography>
                      <CustomTextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        type='number'
                        placeholder='0'
                        value={item.discount || 0}
                        onChange={e => {
                          const updatedItems = [...invoiceItems]
                          updatedItems[index].discount = parseFloat(e.target.value) || 0
                          setInvoiceItems(updatedItems)
                        }}
                        slotProps={{
                          input: {
                            inputProps: { min: 0, max: 100 }
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Total
                      </Typography>
                      <Typography>${item.total || 0}</Typography>
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
                          {employee.name} - {employee.role}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                  <CustomTextField
                    value={invoiceData?.thanksMessage || 'Thanks for your business'}
                    label='Thanks Message'
                  />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${invoiceData?.subTotalAmount || 0}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${invoiceData?.discountAmount || 0}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Tax ({invoiceData?.taxRate || 21}%):</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${invoiceData?.taxAmount || 0}
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Total:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      ${invoiceData?.totalAmount || 0}
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
