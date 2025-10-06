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
import MinimalTaskListTable from '@views/dashboards/main/MinimalTaskListTable'
import MinimalInvoiceListTable from '@/views/apps/ecommerce/dashboard/MinimalInvoiceListTable'
import ItalianCalendar from '@views/dashboards/main/ItalianCalendar'

// Hooks Imports
import { useDashboardData } from '@/hooks/useDashboardData'
import { useTranslation } from '@/hooks/useTranslation'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

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
  const { t } = useTranslation()
  const { userRole, isEmployee, isHR } = useRoleBasedAccess()

  // Debug: Log user role for troubleshooting
  console.log('Dashboard - User Role:', userRole)
  console.log('Dashboard - isEmployee():', isEmployee())
  console.log('Dashboard - isHR():', isHR())

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
            {t('dashboard.common.retry')}
          </button>
        </Box>
      </Box>
    )
  }

  return (
    <Grid container spacing={6}>
      {/* Top Row - Clock In/Out and Task Statistics */}
      <Grid size={{ xs: 12, sm: isHR() ? 12 : 6, md: isHR() ? 12 : 6 }}>
        <ClockInOutCard />
      </Grid>
      {!isHR() && (
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TaskStatisticsCard />
        </Grid>
      )}

      {/* Middle Row - Analytics Cards (conditional based on role) */}
      {!isEmployee() && (
        <Grid size={{ xs: 12, md: 6 }}>
          <LineAreaDailySalesChart data={data} loading={loading} error={error} />
        </Grid>
      )}

      {/* Timesheet Chart - Full width for employees, half width for others */}
      <Grid size={{ xs: 12, md: isEmployee() ? 12 : 6 }}>
        <TimesheetChart />
      </Grid>

      {/* Task List Row - Hidden for HR users */}
      {!isHR() && (
        <Grid size={{ xs: 12, md: 12 }}>
          <MinimalTaskListTable
            taskData={
              data?.tasks?.map(task => ({
                id: task.id,
                title: task.title,
                clientName: task.client?.name || 'N/A',
                serviceName: task.service?.name || 'N/A',
                status: task.status,
                dueDate: task.dueDate,
                assignedTo: task.assignedTo?.name || 'N/A'
              })) || []
            }
          />
        </Grid>
      )}

      {/* Invoice List Row */}
      <Grid size={{ xs: 12, md: 12 }}>
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
