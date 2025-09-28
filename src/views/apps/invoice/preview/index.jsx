'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'

const Preview = ({ invoiceData, invoiceState, id, onInvoiceUpdate }) => {
  // Local state for invoice data
  const [localInvoiceData, setLocalInvoiceData] = useState(invoiceData)

  // Handle Print Button Click
  const handleButtonClick = () => {
    window.print()
  }

  // Handle status update
  const handleStatusUpdate = newStatus => {
    // Update local state
    setLocalInvoiceData(prev => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        status: newStatus
      }
    }))

    // Notify parent component
    if (onInvoiceUpdate) {
      onInvoiceUpdate(newStatus)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 9 }}>
        <PreviewCard invoiceData={localInvoiceData} invoiceState={invoiceState} id={id} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <PreviewActions
          id={id}
          invoiceData={localInvoiceData}
          onButtonClick={handleButtonClick}
          onStatusUpdate={handleStatusUpdate}
        />
      </Grid>
    </Grid>
  )
}

export default Preview
