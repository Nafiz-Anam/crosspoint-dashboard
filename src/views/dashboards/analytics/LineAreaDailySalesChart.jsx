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

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const series = [
  {
    name: 'Daily Earnings',
    data: [2800, 3200, 2950, 3800, 4200, 3650, 4500]
  }
]

const LineAreaDailySalesChart = () => {
  // Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
      height: 90
    },
    tooltip: {
      enabled: true,
      x: { show: false },
      y: {
        formatter: val => `$${val.toLocaleString()}`
      },
      marker: { show: false }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5
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
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false }
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
            $3,457
          </Typography>
          <Chip
            label='↗ +12.5% vs last month'
            size='small'
            sx={{
              bgcolor: theme.palette.success.light + '20',
              color: theme.palette.success.main,
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

        {/* Additional Law Firm Metrics */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Billable Hours Today
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              32.5 hrs
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Cases Closed This Week
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              7 cases
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Outstanding Invoices
            </Typography>
            <Typography variant='body2' fontWeight={600} color='warning.main'>
              $18,950
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              New Clients This Month
            </Typography>
            <Typography variant='body2' fontWeight={600} color='primary.main'>
              12 clients
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LineAreaDailySalesChart
