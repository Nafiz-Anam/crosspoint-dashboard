'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
          <Typography variant='h6' sx={{ mb: 1 }}>
            Dashboard Error
          </Typography>
          <Typography variant='body2'>{error}</Typography>
          <Typography variant='caption' sx={{ display: 'block', mt: 1, opacity: 0.7 }}>
            User Role: {userRole} | Loading: {loading ? 'Yes' : 'No'}
          </Typography>
        </Alert>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant='contained' onClick={refetch} sx={{ mt: 1 }}>
            {t('dashboard.common.retry')}
          </Button>
          <Button variant='outlined' onClick={() => window.location.reload()} sx={{ mt: 1 }}>
            Refresh Page
          </Button>
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
          {/* Do not pass taskData so the component hits the real /tasks API */}
          <MinimalTaskListTable />
        </Grid>
      )}

      {/* Invoice List Row */}
      <Grid size={{ xs: 12, md: 12 }}>
        {/* Do not pass invoiceData so the component hits the real /invoices API */}
        <MinimalInvoiceListTable />
      </Grid>

      {/* Italian Calendar Row */}
      <Grid size={{ xs: 12 }}>
        <ItalianCalendar height='500px' showTitle={true} />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
