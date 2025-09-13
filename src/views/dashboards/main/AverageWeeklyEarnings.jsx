'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const AverageWeeklyEarnings = () => {
  // Hook
  const theme = useTheme()

  // Mock data for weekly earnings chart
  const weeklyEarningsData = [0, 50, 100, 150, 200, 250, 38] // Mon to Sun

  const series = [
    {
      name: 'Weekly Earnings',
      data: weeklyEarningsData
    }
  ]

  const options = {
    chart: {
      type: 'line',
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['var(--mui-palette-success-main)'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      colors: ['var(--mui-palette-success-main)'],
      strokeColors: 'var(--mui-palette-background-paper)'
    },
    grid: {
      strokeDashArray: 6,
      borderColor: 'var(--mui-palette-divider)',
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -20,
        left: -5,
        right: 10,
        bottom: -10
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '12px'
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      max: 300,
      tickAmount: 6,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '12px'
        },
        formatter: val => `$${val}`
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: {
        formatter: val => `$${val}`
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Average Weekly Earnings' subheader='This Week Average' />
      <CardContent>
        <Box className='flex flex-col gap-y-4'>
          {/* Main Stats */}
          <Box className='flex items-center justify-between'>
            <Typography variant='h3' color='success.main'>
              $38
            </Typography>
            <Box className='flex items-center gap-1'>
              <i className='tabler-trending-up text-success' />
              <Typography variant='body2' color='success.main'>
                +0.0% vs last week
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ height: 200 }}>
            <AppReactApexCharts type='line' height={200} series={series} options={options} />
          </Box>

          {/* Invoice Summary */}
          <Box className='flex flex-col gap-y-2'>
            <Typography variant='body2' color='text.secondary'>
              Total Invoices This Week: 1 invoices
            </Typography>
            <Box className='flex flex-wrap gap-4'>
              <Typography variant='body2' color='success.main'>
                Paid Invoices: 0 paid
              </Typography>
              <Typography variant='body2' color='warning.main'>
                Unpaid Invoices: 1 unpaid
              </Typography>
              <Typography variant='body2' color='error.main'>
                Overdue Invoices: 0 overdue
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AverageWeeklyEarnings
