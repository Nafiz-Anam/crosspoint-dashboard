// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
// import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer' // Removed email functionality

// Service Imports
import invoiceService from '@/libs/invoiceService'
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { useSession } from 'next-auth/react'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const PreviewActions = ({ id, invoiceData, onButtonClick, onStatusUpdate }) => {
  // States
  // const [sendDrawerOpen, setSendDrawerOpen] = useState(false) // Removed email functionality
  const [isDownloading, setIsDownloading] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const { t } = useTranslation()
  const { data: session } = useSession()

  // Get current invoice status
  const currentStatus = invoiceData?.invoice?.status || invoiceData?.status
  const isPaid = currentStatus === 'PAID'

  // Handle status toggle
  const handleStatusToggle = async () => {
    if (!id) return

    if (!session?.accessToken) {
      toastService.showError(t('invoices.authenticationRequired'))
      return
    }

    setIsUpdatingStatus(true)
    try {
      const newStatus = isPaid ? 'UNPAID' : 'PAID'

      const response = await invoiceService.updateInvoice(id, { status: newStatus }, session.accessToken)

      if (response.success) {
        toastService.showSuccess(isPaid ? t('invoices.markedAsUnpaid') : t('invoices.markedAsPaid'))

        // Notify parent component to refresh data
        if (onStatusUpdate) {
          onStatusUpdate(newStatus)
        }
      } else {
        toastService.showError(response.message || t('invoices.failedToUpdateStatus'))
      }
    } catch (error) {
      console.error('Error updating invoice status:', error)
      toastService.showError(t('invoices.failedToUpdateStatus'))
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  // Handle download
  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      console.log('Downloading invoice:', id)

      // Use the existing print functionality but trigger save as PDF
      window.print()
    } catch (error) {
      console.error('Error downloading invoice:', error)
      window.print()
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent className='flex flex-col gap-4'>
          {/* Status Toggle Button */}
          <Button
            fullWidth
            variant='contained'
            color={isPaid ? 'warning' : 'success'}
            className='capitalize'
            onClick={handleStatusToggle}
            disabled={isUpdatingStatus}
            startIcon={
              isUpdatingStatus ? (
                <CircularProgress size={16} color='inherit' />
              ) : (
                <i className={isPaid ? 'tabler-x' : 'tabler-check'} />
              )
            }
          >
            {isUpdatingStatus ? t('invoices.updating') : isPaid ? t('invoices.markAsUnpaid') : t('invoices.markAsPaid')}
          </Button>

          {/* Send Invoice Button - Removed email functionality */}
          {/* <Button
            fullWidth
            variant='contained'
            color='primary'
            className='capitalize'
            startIcon={<i className='tabler-send' />}
            onClick={() => setSendDrawerOpen(true)}
          >
            Send Invoice
          </Button> */}
          <Button
            fullWidth
            variant='tonal'
            color='info'
            className='capitalize'
            onClick={handleDownload}
            disabled={isDownloading}
            startIcon={<i className='tabler-download' />}
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
          <div className='flex items-center gap-4'>
            <Button
              fullWidth
              variant='tonal'
              color='info'
              className='capitalize'
              onClick={onButtonClick}
              startIcon={<i className='tabler-printer' />}
            >
              Print
            </Button>
            <Button
              fullWidth
              component={Link}
              variant='tonal'
              color='secondary'
              className='capitalize'
              href={getLocalizedUrl(`/apps/invoice/edit/${id}`, locale)}
              startIcon={<i className='tabler-pencil' />}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* SendInvoiceDrawer - Removed email functionality */}
      {/* <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} /> */}
    </>
  )
}

export default PreviewActions
