'use client'

// Next Imports
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// Component Imports
import Preview from '@views/apps/invoice/preview'

// Service Imports
import invoiceService from '@/libs/invoiceService'

const PreviewPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [invoiceData, setInvoiceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (!session?.accessToken) {
        setError('Authentication required')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await invoiceService.getInvoiceById(params.id, session.accessToken)
        setInvoiceData(data)
      } catch (err) {
        console.error('Error fetching invoice:', err)
        setError(err.message || 'Failed to fetch invoice')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchInvoiceData()
    }
  }, [params.id, session?.accessToken])

  // Auto-print when print parameter is present
  useEffect(() => {
    if (searchParams.get('print') === 'true' && invoiceData && !loading) {
      // Wait a bit for the component to render, then trigger print
      setTimeout(() => {
        window.print()
      }, 1500)
    }
  }, [searchParams, invoiceData, loading])

  if (loading) {
    return <div>Loading invoice...</div>
  }

  if (error || !invoiceData) {
    return <div>Error: {error || 'Invoice not found'}</div>
  }

  return <Preview invoiceData={invoiceData} id={params.id} />
}

export default PreviewPage
