'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const TotalEarning = ({ data, loading, error }) => {
  // Hooks
  const theme = useTheme()

  // Handle loading and error states
  if (loading) {
    return (
      <Card className='h-[100%] flex flex-col justify-center items-center'>
        <CircularProgress />
        <Typography variant='body2' sx={{ mt: 2 }}>
          Loading earnings data...
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

  // Prepare data
  const invoiceStats = data?.invoiceStats || {}
  const weeklyEarnings = data?.weeklyEarnings || {}
  const revenue = invoiceStats.revenue || 0
  const expenses = invoiceStats.expenses || 0
  const profit = invoiceStats.profit || 0
  const paidAmount = invoiceStats.paidAmount || 0
  const unpaidAmount = invoiceStats.unpaidAmount || 0
  const overdueAmount = invoiceStats.overdueAmount || 0

  // Calculate percentages
  const totalAmount = revenue + Math.abs(expenses)
  const revenuePercentage = totalAmount > 0 ? (revenue / totalAmount) * 100 : 0
  const expensePercentage = totalAmount > 0 ? (Math.abs(expenses) / totalAmount) * 100 : 0

  // Create chart data
  const series = [
    { name: 'Revenue', data: weeklyEarnings.chartData || [0, 0, 0, 0, 0, 0, 0] },
    { name: 'Expenses', data: Array(7).fill(0) } // Placeholder for expenses
  ]

  const metricsData = [
    {
      title: 'Total Revenue',
      subtitle: 'Paid Invoices',
      amount: paidAmount,
      avatarColor: 'primary',
      avatarIcon: 'tabler-brand-paypal'
    },
    {
      title: 'Outstanding',
      subtitle: 'Unpaid Invoices',
      amount: unpaidAmount + overdueAmount,
      avatarColor: 'error',
      avatarIcon: 'tabler-currency-dollar',
      amountDiff: 'negative'
    }
  ]

  // Vars
  const options = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        enabled: false
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontFamily: theme.typography.fontFamily,
      labels: {
        colors: 'var(--mui-palette-text-secondary)'
      }
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: (val, { dataPointIndex }) => {
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          return days[dataPointIndex] || `Day ${dataPointIndex + 1}`
        }
      },
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          const seriesName = seriesIndex === 0 ? 'Revenue' : 'Expenses'
          return `${seriesName}: $${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        }
      },
      marker: { show: true },
      style: {
        fontSize: '12px',
        fontFamily: theme.typography.fontFamily
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-warning-main)'],
    states: {
      hover: {
        filter: { type: 'lighten', value: 0.1 }
      },
      active: {
        filter: { type: 'lighten', value: 0.1 }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '40%',
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all'
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: 'var(--mui-palette-divider)',
      yaxis: {
        lines: { show: true }
      },
      padding: {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10
      }
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        show: true,
        style: {
          fontSize: '12px',
          colors: 'var(--mui-palette-text-disabled)',
          fontFamily: theme.typography.fontFamily
        }
      },
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
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
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: '55%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 7,
              columnWidth: '40%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '25%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: '28%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '38%' }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Total Earning'
        action={<OptionMenu options={['Refresh', 'Share', 'Update']} />}
        subheader={
          <div className='flex items-center gap-2'>
            <Typography variant='h2'>{revenuePercentage.toFixed(0)}%</Typography>
            <div className='flex items-center gap-1'>
              <i
                className={`tabler-chevron-${revenuePercentage >= 50 ? 'up' : 'down'} text-xl text-${revenuePercentage >= 50 ? 'success' : 'error'}`}
              />
              <Typography color={`${revenuePercentage >= 50 ? 'success' : 'error'}.main`}>
                {revenuePercentage.toFixed(1)}%
              </Typography>
            </div>
          </div>
        }
      />
      <CardContent className='flex flex-col gap-4'>
        <AppReactApexCharts type='bar' height={189} width='100%' series={series} options={options} />
        {metricsData.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={38}>
              <i className={classnames(item.avatarIcon, 'text-[22px]')} />
            </CustomAvatar>
            <div className='flex justify-between items-center is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
              <Typography
                className='font-medium'
                color={`${item.amountDiff === 'negative' ? 'error' : 'success'}.main`}
              >{`${item.amountDiff === 'negative' ? '-' : '+'}$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
