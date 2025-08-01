// MUI Imports
import Grid from '@mui/material/Grid2'

// Components Imports
import WebsiteAnalyticsSlider from '@views/dashboards/analytics/WebsiteAnalyticsSlider'
import LineAreaDailySalesChart from '@views/dashboards/analytics/LineAreaDailySalesChart'
import SalesOverview from '@views/dashboards/analytics/SalesOverview'
import EarningReports from '@views/dashboards/analytics/EarningReports'
import SupportTracker from '@views/dashboards/analytics/SupportTracker'
import SalesByCountries from '@views/dashboards/analytics/SalesByCountries'
import TotalEarning from '@views/dashboards/analytics/TotalEarning'
import MonthlyCampaignState from '@views/dashboards/analytics/MonthlyCampaignState'
import SourceVisits from '@views/dashboards/analytics/SourceVisits'
import ProjectsTable from '@views/dashboards/analytics/ProjectsTable'
import InvoiceListTable from '@views/apps/ecommerce/dashboard/InvoiceListTable'


// Data Imports
import { getInvoiceData, getProfileData } from '@/app/server/actions'
import MinimalInvoiceListTable from '@/views/apps/ecommerce/dashboard/MinimalInvoiceListTable'

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
const DashboardAnalytics = async () => {
  // Vars
  const data = await getProfileData()
  const invoiceData = await getInvoiceData()

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <LineAreaDailySalesChart />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <EarningReports />
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TotalEarning />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
        <ProjectsTable projectTable={data?.users.profile.projectTable} />
      </Grid>
      <Grid size={{ xs: 12, lg: 6 }}>
      <MinimalInvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
