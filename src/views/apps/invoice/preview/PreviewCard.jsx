// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import './print.css'

const PreviewCard = ({ invoiceData, invoiceState, id }) => {
  // Destructure invoice state
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
    bankDetails
  } = invoiceState || {}

  // Calculation functions
  const calculateItemTotal = item => {
    const discountAmount = (item.rate * (item.discount || 0)) / 100
    return item.rate - discountAmount
  }

  const calculateSubtotal = () => {
    return invoiceItems?.reduce((total, item) => total + (item.rate || 0), 0) || 0
  }

  const calculateTotalDiscount = () => {
    return invoiceItems?.reduce((total, item) => total + (item.rate * (item.discount || 0)) / 100, 0) || 0
  }

  const calculateInvoiceTotal = () => {
    return invoiceItems?.reduce((total, item) => total + calculateItemTotal(item), 0) || 0
  }

  const calculateTax = () => {
    return calculateInvoiceTotal() * 0.21
  }

  const calculateFinalTotal = () => {
    return calculateInvoiceTotal() + calculateTax()
  }

  const formatDate = date => {
    if (!date) return 'Not set'
    return date instanceof Date ? date.toLocaleDateString() : date
  }

  return (
    <Card className='previewCard'>
      <CardContent className='sm:!p-12'>
        <Grid container spacing={6}>
          {/* Header Section */}
          <Grid size={{ xs: 12 }}>
            <div className='p-6 bg-actionHover rounded'>
              <div className='flex justify-between gap-y-4 flex-col sm:flex-row'>
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
                <div className='flex flex-col gap-6'>
                  <Typography variant='h5'>{`Invoice #${id || 'INV-001'}`}</Typography>
                  <div className='flex flex-col gap-1'>
                    <Typography color='text.primary'>{`Date Issued: ${formatDate(issuedDate)}`}</Typography>
                    <Typography color='text.primary'>{`Date Due: ${formatDate(dueDate)}`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          {/* Client and Bill To Section */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
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
                    <Typography color='textSecondary'>No client selected</Typography>
                  )}
                </div>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Payment Method:</Typography>
                      <Typography className='font-medium'>{paymentMethod || 'Not set'}</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography className='font-medium'>${calculateFinalTotal().toFixed(2)}</Typography>
                    </div>
                    {bankDetails && (
                      <>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>Bank name:</Typography>
                          <Typography>{bankDetails.bankName}</Typography>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>Country:</Typography>
                          <Typography>{bankDetails.country}</Typography>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>IBAN:</Typography>
                          <Typography>{bankDetails.iban}</Typography>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                          <Typography>{bankDetails.swiftCode}</Typography>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {/* Services Table */}
          <Grid size={{ xs: 12 }}>
            <div className='overflow-x-auto border rounded'>
              <table className={tableStyles.table}>
                <thead className='border-bs-0'>
                  <tr>
                    <th className='!bg-transparent'>Service</th>
                    <th className='!bg-transparent'>Description</th>
                    <th className='!bg-transparent'>Rate</th>
                    <th className='!bg-transparent'>Discount</th>
                    <th className='!bg-transparent'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Typography color='text.primary'>{item.serviceName || 'Service'}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.description || 'No description'}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>${item.rate || 0}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.discount || 0}%</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>${calculateItemTotal(item).toFixed(2)}</Typography>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={5}>
                        <Typography color='textSecondary' align='center'>
                          No services added
                        </Typography>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Grid>

          {/* Bottom Section */}
          <Grid size={{ xs: 12 }}>
            <div className='flex justify-between flex-col gap-y-4 sm:flex-row'>
              <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                <div className='flex items-center gap-2'>
                  <Typography className='font-medium' color='text.primary'>
                    Salesperson:
                  </Typography>
                  <Typography>
                    {selectedSalesperson ? `${selectedSalesperson.name} - ${selectedSalesperson.role}` : 'Not assigned'}
                  </Typography>
                </div>
                <Typography>Thanks for your business</Typography>

                {/* Payment Terms */}
                {paymentTerms && paymentTermsText && (
                  <div className='p-3 bg-blue-50 rounded border-l-4 border-blue-400'>
                    <Typography className='font-medium text-blue-800 mb-1'>Payment Terms:</Typography>
                    <Typography className='text-blue-600'>{paymentTermsText}</Typography>
                  </div>
                )}

                {/* Client Notes */}
                {clientNotes && clientNotesText && (
                  <div className='p-3 bg-green-50 rounded border-l-4 border-green-400'>
                    <Typography className='font-medium text-green-800 mb-1'>Client Notes:</Typography>
                    <Typography className='text-green-600'>{clientNotesText}</Typography>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className='min-is-[200px]'>
                <div className='flex items-center justify-between'>
                  <Typography>Subtotal:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    ${calculateSubtotal().toFixed(2)}
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography>Discount:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    ${calculateTotalDiscount().toFixed(2)}
                  </Typography>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography>Tax (21%):</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    ${calculateTax().toFixed(2)}
                  </Typography>
                </div>
                <Divider className='mlb-2' />
                <div className='flex items-center justify-between'>
                  <Typography className='font-medium'>Total:</Typography>
                  <Typography className='font-medium' color='text.primary'>
                    ${calculateFinalTotal().toFixed(2)}
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider className='border-dashed' />
          </Grid>

          {/* Note Section */}
          <Grid size={{ xs: 12 }}>
            <Typography>
              <Typography component='span' className='font-medium' color='text.primary'>
                Note:
              </Typography>{' '}
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
