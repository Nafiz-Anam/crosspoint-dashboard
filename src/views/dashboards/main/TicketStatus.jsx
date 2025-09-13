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

const TicketStatus = () => {
  // Hook
  const theme = useTheme()

  // Mock data
  const ticketStats = {
    new: 0,
    open: 0,
    closed: 0
  }

  // Mock data for last 30 days chart
  const generateChartData = () => {
    const data = []
    for (let i = 15; i >= 1; i--) {
      data.push(0) // All zeros as shown in the image
    }
    return data
  }

  const chartData = generateChartData()
  const categories = Array.from({ length: 15 }, (_, i) => 15 - i)

  const series = [
    {
      name: 'New Tickets',
      data: chartData
    }
  ]

  const options = {
    chart: {
      type: 'line',
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['var(--mui-palette-primary-main)'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      colors: ['var(--mui-palette-primary-main)'],
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
      categories: categories,
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
      max: 5,
      tickAmount: 5,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '12px'
        }
      }
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: {
        formatter: val => `${val} tickets`
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Ticket Status' />
      <CardContent>
        <Box className='flex flex-col gap-y-4'>
          {/* Ticket Status List */}
          <Box className='flex flex-col gap-y-2'>
            <Box className='flex items-center gap-2'>
              <Box className='w-3 h-3 rounded-full' sx={{ backgroundColor: 'warning.main' }} />
              <Typography variant='body2'>New: {ticketStats.new}</Typography>
            </Box>
            <Box className='flex items-center gap-2'>
              <Box className='w-3 h-3 rounded-full' sx={{ backgroundColor: 'error.main' }} />
              <Typography variant='body2'>Open: {ticketStats.open}</Typography>
            </Box>
            <Box className='flex items-center gap-2'>
              <Box className='w-3 h-3 rounded-full' sx={{ backgroundColor: 'primary.main' }} />
              <Typography variant='body2'>Closed: {ticketStats.closed}</Typography>
            </Box>
          </Box>

          {/* Chart Title */}
          <Typography variant='body2' color='text.secondary'>
            New tickets in last 30 days
          </Typography>

          {/* Chart */}
          <Box sx={{ height: 200 }}>
            <AppReactApexCharts type='line' height={200} series={series} options={options} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TicketStatus
