// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Component Imports
import SendInvoiceDrawer from '@views/apps/invoice/shared/SendInvoiceDrawer'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const PreviewActions = ({ id, onButtonClick }) => {
  // States
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

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
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className='capitalize'
            startIcon={<i className='tabler-send' />}
            onClick={() => setSendDrawerOpen(true)}
          >
            Send Invoice
          </Button>
          <Button
            fullWidth
            variant='tonal'
            color='success'
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
      <SendInvoiceDrawer open={sendDrawerOpen} handleClose={() => setSendDrawerOpen(false)} />
    </>
  )
}

export default PreviewActions
