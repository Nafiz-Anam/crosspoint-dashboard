'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const LineAreaDailySalesChart = ({ data, loading, error }) => {
  // Hook
  const theme = useTheme()

  // Handle loading and error states
  if (loading) {
    return (
      <Card className='h-[100%] flex flex-col justify-center items-center'>
        <CircularProgress />
        <Typography variant='body2' sx={{ mt: 2 }}>
          Loading dashboard data...
        </Typography>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className='h-[100%] flex flex-col justify-center items-center'>
        <Alert severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Card>
    )
  }

  // Prepare chart data
  const weeklyEarnings = data?.weeklyEarnings || {}
  const chartData = weeklyEarnings.chartData || [0, 0, 0, 0, 0, 0, 0]
  const weeklyTotal = weeklyEarnings.weeklyTotal || 0
  const weeklyAverage = weeklyEarnings.weeklyAverage || 0
  const growthPercentage = weeklyEarnings.growthPercentage || 0

  const series = [
    {
      name: 'Daily Earnings',
      data: chartData
    }
  ]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: false },
      height: 90
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      x: {
        show: true,
        formatter: (val, { dataPointIndex }) => {
          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          return days[dataPointIndex] || `Day ${dataPointIndex + 1}`
        }
      },
      y: {
        formatter: val =>
          `Daily Earnings: $${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      },
      marker: { show: true },
      style: {
        fontSize: '12px',
        fontFamily: theme.typography.fontFamily
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const day = days[dataPointIndex] || `Day ${dataPointIndex + 1}`
        const value = series[seriesIndex][dataPointIndex]
        return `
          <div style="padding: 8px 12px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 4px;">${day}</div>
            <div style="color: #666;">Daily Earnings: $${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
          </div>
        `
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: 'var(--mui-palette-divider)',
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.1,
        opacityFrom: 0.6,
        shadeIntensity: 1,
        stops: [0, 90, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.6,
              color: theme.palette.success.main
            },
            {
              offset: 90,
              opacity: 0.2,
              color: theme.palette.success.main
            },
            {
              opacity: 0,
              offset: 100,
              color: 'var(--mui-palette-background-paper)'
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.success.main
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        show: true,
        style: {
          fontSize: '11px',
          colors: 'var(--mui-palette-text-disabled)',
          fontFamily: theme.typography.fontFamily
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        formatter: val => `$${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        style: {
          fontSize: '11px',
          colors: 'var(--mui-palette-text-disabled)',
          fontFamily: theme.typography.fontFamily
        }
      }
    }
  }

  return (
    <Card className='h-[100%] flex flex-col justify-between'>
      <CardHeader title='Average Weekly Earnings' className='pbe-0' />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 0, justifyContent: 'space-between' }}>
        {/* Main Stats */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            This Week Average
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              color: theme.palette.success.main,
              mb: 1
            }}
          >
            ${weeklyAverage.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </Typography>
          <Chip
            label={`↗ ${growthPercentage >= 0 ? '+' : ''}${growthPercentage.toFixed(1)}% vs last week`}
            size='small'
            sx={{
              bgcolor: growthPercentage >= 0 ? theme.palette.success.light + '20' : theme.palette.error.light + '20',
              color: growthPercentage >= 0 ? theme.palette.success.main : theme.palette.error.main,
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          />
        </Box>

        {/* Chart */}
        <Box sx={{ height: 90, mb: 2, position: 'relative', zIndex: 1 }}>
          <AppReactApexCharts type='area' height={110} width='100%' series={series} options={options} />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Additional Business Metrics */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Total Invoices This Week
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              {data?.stats?.overview?.totalInvoices || 0} invoices
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Paid Invoices
            </Typography>
            <Typography variant='body2' fontWeight={600} color='success.main'>
              {data?.stats?.invoiceStatus?.paid || 0} paid
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Unpaid Invoices
            </Typography>
            <Typography variant='body2' fontWeight={600} color='warning.main'>
              {data?.stats?.invoiceStatus?.unpaid || 0} unpaid
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Overdue Invoices
            </Typography>
            <Typography variant='body2' fontWeight={600} color='error.main'>
              {data?.stats?.invoiceStatus?.overdue || 0} overdue
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LineAreaDailySalesChart
