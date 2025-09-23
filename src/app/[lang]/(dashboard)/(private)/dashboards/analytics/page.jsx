'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Components Imports
import ClockInOutCard from '@views/dashboards/main/ClockInOutCard'
import TaskStatisticsCard from '@views/dashboards/main/TaskStatisticsCard'
import TimesheetChart from '@views/dashboards/main/TimesheetChart'
import LineAreaDailySalesChart from '@views/dashboards/analytics/LineAreaDailySalesChart'
import EarningReports from '@views/dashboards/analytics/EarningReports'
import MinimalInvoiceListTable from '@/views/apps/ecommerce/dashboard/MinimalInvoiceListTable'
import ItalianCalendar from '@views/dashboards/main/ItalianCalendar'

// Hooks Imports
import { useDashboardData } from '@/hooks/useDashboardData'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/profile` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getProfileData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/profile`)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  return res.json()
} */
const DashboardAnalytics = () => {
  // Get dashboard data using custom hook
  const { data, loading, error, refetch } = useDashboardData()

  // Handle loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress size={60} />
      </Box>
    )
  }

  // Handle error state
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={refetch} style={{ padding: '8px 16px', marginTop: '16px' }}>
            Retry
          </button>
        </Box>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Top Row - Clock In/Out and Task Statistics */}
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <ClockInOutCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <TaskStatisticsCard />
      </Grid>

      {/* Middle Row - Existing Analytics Cards */}
      <Grid size={{ xs: 12, md: 6 }}>
        <LineAreaDailySalesChart data={data} loading={loading} error={error} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <EarningReports data={data} loading={loading} error={error} />
      </Grid>

      {/* Bottom Row - Timesheet Chart and Invoice List (50/50) */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TimesheetChart />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MinimalInvoiceListTable
          invoiceData={
            data?.invoices?.map(invoice => {
              console.log('Invoice data:', invoice)
              console.log('Items:', invoice.items)
              console.log('Service name:', invoice.items?.[0]?.service?.name)
              return {
                id: invoice.id,
                invoiceId: invoice.invoiceId || invoice.invoiceNumber,
                name: invoice.client?.name || 'Unknown Client',
                companyEmail: invoice.client?.email || '',
                serviceName: invoice.items?.[0]?.service?.name || 'N/A',
                total: invoice.totalAmount || 0,
                issuedDate: new Date(invoice.issuedDate).toLocaleDateString(),
                invoiceStatus:
                  invoice.status === 'PAID'
                    ? 'Paid'
                    : invoice.status === 'UNPAID'
                      ? 'Unpaid'
                      : invoice.status === 'OVERDUE'
                        ? 'Past Due'
                        : invoice.status === 'CANCELLED'
                          ? 'Cancelled'
                          : 'Unpaid',
                balance: invoice.totalAmount || 0,
                dueDate: new Date(invoice.dueDate).toLocaleDateString(),
                avatar: null
              }
            }) || []
          }
        />
      </Grid>

      {/* Italian Calendar Row */}
      <Grid size={{ xs: 12 }}>
        <ItalianCalendar height='500px' showTitle={true} />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
