'use client'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const InvoiceStatsCard = ({ stats }) => {
  if (!stats) {
    return null
  }

  const statsData = [
    {
      title: 'Total Invoices',
      value: stats.totalInvoices || 0,
      icon: 'tabler-file-text',
      color: 'primary',
      change: null
    },
    {
      title: 'Total Amount',
      value: `€${(stats.totalAmount || 0).toLocaleString()}`,
      icon: 'tabler-currency-dollar',
      color: 'success',
      change: null
    },
    {
      title: 'Paid Invoices',
      value: stats.paidInvoices || 0,
      icon: 'tabler-check',
      color: 'success',
      change: null
    },
    {
      title: 'Unpaid Invoices',
      value: stats.unpaidInvoices || 0,
      icon: 'tabler-clock',
      color: 'warning',
      change: null
    },
    {
      title: 'Overdue Invoices',
      value: stats.overdueInvoices || 0,
      icon: 'tabler-alert-circle',
      color: 'error',
      change: null
    },
    {
      title: 'Tax Amount',
      value: `€${(stats.taxAmount || 0).toLocaleString()}`,
      icon: 'tabler-percentage',
      color: 'info',
      change: null
    }
  ]

  return (
    <Grid container spacing={4}>
      {statsData.map((stat, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box>
                  <Typography variant='h4' color='text.primary' sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                    {stat.title}
                  </Typography>
                </Box>
                <CustomAvatar skin='light' color={stat.color} sx={{ width: 42, height: 42 }}>
                  <i className={`${stat.icon} text-xl`} />
                </CustomAvatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Status Breakdown */}
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 3 }}>
              Status Breakdown
            </Typography>
            <Grid container spacing={3}>
              {stats.statusBreakdown &&
                Object.entries(stats.statusBreakdown).map(([status, count]) => (
                  <Grid key={status} size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                      <Box>
                        <Typography variant='h5' color='text.primary'>
                          {count}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {status}
                        </Typography>
                      </Box>
                      <Chip
                        label={status}
                        color={
                          status === 'PAID'
                            ? 'success'
                            : status === 'UNPAID'
                              ? 'warning'
                              : status === 'OVERDUE'
                                ? 'error'
                                : 'default'
                        }
                        variant='tonal'
                        size='small'
                      />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvoiceStatsCard
