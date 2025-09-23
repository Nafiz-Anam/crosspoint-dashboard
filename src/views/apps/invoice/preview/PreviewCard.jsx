// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

// Component Imports
// import Logo from '@components/layout/shared/Logo'
import CompanyInfoSection from '@/components/CompanyInfoSection'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import './print.css'

const PreviewCard = ({ invoiceData, invoiceState, id }) => {
  // Use invoiceData from API instead of invoiceState
  const invoice = invoiceData?.invoice || invoiceData

  // Extract data from API response
  const selectedClient = invoice?.client
  const selectedSalesperson = invoice?.employee
  const issuedDate = invoice?.issuedDate
  const dueDate = invoice?.dueDate
  const invoiceItems = invoice?.items || []
  const paymentMethod = invoice?.paymentMethod
  const paymentTerms = invoice?.paymentTerms
  const paymentTermsText = invoice?.paymentTerms
  const bankDetails = invoice?.bankAccount // This might need to be fetched separately

  // Extract company info from invoice data
  const invoiceCompanyInfo = {
    companyName: invoice?.companyName,
    tagline: invoice?.companyTagline,
    address: invoice?.companyAddress,
    city: invoice?.companyCity,
    phone: invoice?.companyPhone,
    email: invoice?.companyEmail,
    website: invoice?.companyWebsite,
    logo: invoice?.companyLogo
  }

  // Debug logging
  console.log('PreviewCard - Invoice data:', invoice)
  console.log('PreviewCard - Extracted company info:', invoiceCompanyInfo)
  console.log('PreviewCard - Notes:', invoice?.notes)
  console.log('PreviewCard - Thanks Message:', invoice?.thanksMessage)
  console.log('PreviewCard - Payment Terms:', invoice?.paymentTerms)

  // Calculation functions
  const calculateItemTotal = item => {
    const discountAmount = (item.rate * (item.discount || 0)) / 100
    return item.rate - discountAmount
  }

  const calculateSubtotal = () => {
    return invoice?.subTotalAmount || 0
  }

  const calculateTotalDiscount = () => {
    // Calculate total discount from items
    const itemDiscounts = invoiceItems.reduce((total, item) => {
      const discountPercent = item.discount || 0
      const discountAmount = (item.rate * discountPercent) / 100
      return total + discountAmount
    }, 0)

    // Add overall invoice discount if any
    const overallDiscount = invoice?.discountAmount || 0

    return itemDiscounts + overallDiscount
  }

  const calculateInvoiceTotal = () => {
    return invoice?.totalAmount || 0
  }

  const calculateTax = () => {
    return invoice?.taxAmount || 0
  }

  const calculateFinalTotal = () => {
    return invoice?.totalAmount || 0
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
                  <CompanyInfoSection companyInfo={invoiceCompanyInfo} isEditable={false} showEditButton={false} />
                </div>
                <div className='flex flex-col gap-6'>
                  <Typography variant='h5'>{`Invoice #${invoice?.invoiceNumber || invoice?.invoiceId || id || 'INV-001'}`}</Typography>
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
                          <Typography>{bankDetails.bankCountry}</Typography>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>IBAN:</Typography>
                          <Typography>{bankDetails.bankIban}</Typography>
                        </div>
                        <div className='flex items-center gap-4'>
                          <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                          <Typography>{bankDetails.bankSwiftCode}</Typography>
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
                        <Typography color='text.primary'>
                          {item.service?.name || item.serviceName || 'Service'}
                        </Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.description || ''}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>${item.rate || 0}</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>{item.discount || 0}%</Typography>
                      </td>
                      <td>
                        <Typography color='text.primary'>
                          ${item.total || calculateItemTotal(item).toFixed(2)}
                        </Typography>
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
                {invoice?.thanksMessage && <Typography>{invoice.thanksMessage}</Typography>}

                {/* Payment Terms */}
                {paymentTerms && (
                  <div className='flex flex-col gap-1'>
                    <Typography className='font-medium' color='text.primary'>
                      Payment Terms:
                    </Typography>
                    <Typography>{paymentTerms}</Typography>
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
                  <Typography>Tax ({invoice?.taxRate || 0}%):</Typography>
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

          {/* Note Section - Only show if note exists */}
          {invoice?.notes && (
            <Grid size={{ xs: 12 }}>
              <Typography>
                <Typography component='span' className='font-medium' color='text.primary'>
                  Note:
                </Typography>{' '}
                {invoice.notes}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
