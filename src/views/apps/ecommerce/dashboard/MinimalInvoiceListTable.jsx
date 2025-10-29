'use client'

// Component Imports
import InvoiceListTable from '@views/apps/invoice/list/InvoiceListTable'

const MinimalInvoiceListTable = () => {
  // Just render InvoiceListTable - it will fetch its own data from the API
  // Pass null for invoiceData so it knows to fetch from API instead of using provided data
  return <InvoiceListTable invoiceData={null} />
}

export default MinimalInvoiceListTable
