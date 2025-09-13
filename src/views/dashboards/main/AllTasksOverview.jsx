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

const AllTasksOverview = () => {
  // Hook
  const theme = useTheme()

  // Mock data for task distribution
  const taskData = [
    { name: 'To do', value: 289, color: '#ff9f43' },
    { name: 'In progress', value: 43, color: '#00cfe8' },
    { name: 'Testing (on Development)', value: 80, color: '#ea5455' },
    { name: 'Done (on Development)', value: 120, color: '#9c27b0' },
    { name: 'Testing (on Live)', value: 17, color: '#28c76f' },
    { name: 'Rework (on Live)', value: 2, color: '#00d4aa' },
    { name: 'Done', value: 307, color: '#4caf50' },
    { name: 'Expired', value: 329, color: '#f44336' }
  ]

  const series = taskData.map(item => item.value)
  const labels = taskData.map(item => item.name)
  const colors = taskData.map(item => item.color)

  const options = {
    chart: {
      type: 'donut',
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',
      fontSize: '12px',
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: 'var(--mui-palette-text-primary)'
      },
      markers: {
        width: 8,
        height: 8,
        offsetX: -4
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Tasks',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--mui-palette-text-primary)',
              formatter: () => series.reduce((a, b) => a + b, 0).toString()
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: val => `${val} tasks`
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='All Tasks Overview'
        action={
          <Box className='flex items-center gap-1'>
            <i className='tabler-trending-up text-success' />
            <Typography variant='body2' color='success.main'>
              ↑ 3
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <AppReactApexCharts type='donut' height={350} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AllTasksOverview
