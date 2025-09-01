'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import AddCard from '@views/apps/invoice/add/AddCard'
import AddActions from '@views/apps/invoice/add/AddActions'

const InvoiceContainer = ({ initialData }) => {
  // SHARED STATE - This connects AddCard and AddActions
  const [invoiceState, setInvoiceState] = useState({
    // Invoice form data
    selectedClient: null,
    selectedSalesperson: null,
    issuedDate: null,
    dueDate: null,
    invoiceItems: [
      {
        serviceId: '',
        description: '',
        rate: 0,
        discount: 0
      }
    ],

    // Settings from AddActions
    paymentMethod: 'Internet Banking',
    paymentTerms: true,
    clientNotes: false,
    paymentStub: false,

    // Bank details that change based on payment method
    bankDetails: {
      bankName: 'American Bank',
      country: 'United States',
      iban: 'ETD95476213874685',
      swiftCode: 'BR91905'
    }
  })

  // Update function passed to both components
  const updateInvoiceState = updates => {
    setInvoiceState(prev => {
      const newState = { ...prev, ...updates }

      // When payment method changes, update bank details
      if (updates.paymentMethod) {
        switch (updates.paymentMethod) {
          case 'Internet Banking':
            newState.bankDetails = {
              bankName: 'American Bank',
              country: 'United States',
              iban: 'ETD95476213874685',
              swiftCode: 'BR91905'
            }
            break
          case 'Credit Card':
            newState.bankDetails = {
              bankName: 'Chase Bank',
              country: 'United States',
              iban: 'CH894321098765432',
              swiftCode: 'CHASUS33'
            }
            break
          case 'Paypal':
            newState.bankDetails = {
              bankName: 'PayPal Holdings',
              country: 'United States',
              iban: 'PP123456789012345',
              swiftCode: 'PYPLUS33'
            }
            break
          default:
            break
        }
      }

      return newState
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 9 }}>
        <AddCard invoiceData={initialData} invoiceState={invoiceState} updateInvoiceState={updateInvoiceState} />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <AddActions invoiceState={invoiceState} updateInvoiceState={updateInvoiceState} />
      </Grid>
    </Grid>
  )
}

export default InvoiceContainer
