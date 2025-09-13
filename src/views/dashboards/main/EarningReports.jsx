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

const EarningReports = () => {
  // Hook
  const theme = useTheme()

  // Mock data for earnings bar chart
  const earningsData = [0, 0, 0, 0, 0, 0, 269] // Mon to Sun, only Wed has data

  const series = [
    {
      name: 'Earnings',
      data: earningsData
    }
  ]

  const options = {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['var(--mui-palette-primary-main)'],
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
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
      <CardHeader title='Earning Reports' subheader='Weekly Earnings Overview' />
      <CardContent>
        <Box className='flex flex-col gap-y-4'>
          {/* Main Stats */}
          <Box className='flex items-center justify-between'>
            <Typography variant='h3' color='text.primary'>
              $269
            </Typography>
            <Box className='flex items-center gap-1'>
              <i className='tabler-trending-up text-success' />
              <Typography variant='body2' color='success.main'>
                +0.0%
              </Typography>
            </Box>
          </Box>

          <Typography variant='body2' color='text.secondary'>
            Weekly earnings compared to last week
          </Typography>

          {/* Chart */}
          <Box sx={{ height: 200 }}>
            <AppReactApexCharts type='bar' height={200} series={series} options={options} />
          </Box>

          {/* Summary Boxes */}
          <Box className='flex flex-wrap gap-4'>
            <Box className='flex items-center gap-2 p-3 bg-grey-50 rounded-lg'>
              <i className='tabler-currency-dollar text-primary' />
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Earnings
                </Typography>
                <Typography variant='h6' color='text.primary'>
                  $269.10
                </Typography>
              </Box>
            </Box>
            <Box className='flex items-center gap-2 p-3 bg-grey-50 rounded-lg'>
              <i className='tabler-check text-success' />
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Paid
                </Typography>
                <Typography variant='h6' color='text.primary'>
                  $0.00
                </Typography>
              </Box>
            </Box>
            <Box className='flex items-center gap-2 p-3 bg-grey-50 rounded-lg'>
              <i className='tabler-clock text-warning' />
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  Outstanding
                </Typography>
                <Typography variant='h6' color='text.primary'>
                  $269.10
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EarningReports
