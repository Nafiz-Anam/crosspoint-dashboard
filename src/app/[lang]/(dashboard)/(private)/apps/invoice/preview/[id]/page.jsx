'use client'

// Next Imports
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// Component Imports
import Preview from '@views/apps/invoice/preview'

// Service Imports
import invoiceService from '@/libs/invoiceService'

const PreviewPage = () => {
  const params = useParams()
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

  if (loading) {
    return <div>Loading invoice...</div>
  }

  if (error || !invoiceData) {
    return <div>Error: {error || 'Invoice not found'}</div>
  }

  return <Preview invoiceData={invoiceData} id={params.id} />
}

export default PreviewPage
