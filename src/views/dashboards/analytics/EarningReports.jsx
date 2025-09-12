// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const EarningReports = ({ data, loading, error }) => {
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
  const weeklyEarnings = data?.weeklyEarnings || {}
  const invoiceStats = data?.invoiceStats || {}
  const stats = data?.stats || {}
  const chartData = weeklyEarnings.chartData || [0, 0, 0, 0, 0, 0, 0]
  const weeklyTotal = weeklyEarnings.weeklyTotal || 0
  const growthPercentage = weeklyEarnings.growthPercentage || 0
  const revenue = invoiceStats.revenue || 0
  const paidAmount = invoiceStats.paidAmount || 0
  const unpaidAmount = invoiceStats.unpaidAmount || 0
  const overdueAmount = invoiceStats.overdueAmount || 0

  // Calculate progress percentages (relative to revenue)
  const earningsProgress = revenue > 0 ? 100 : 0
  const paidProgress = revenue > 0 ? (paidAmount / revenue) * 100 : 0
  const outstandingProgress = revenue > 0 ? ((unpaidAmount + overdueAmount) / revenue) * 100 : 0

  const series = [{ data: chartData }]

  const metricsData = [
    {
      title: 'Earnings',
      progress: earningsProgress,
      stats: `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      progressColor: 'primary',
      avatarColor: 'primary',
      avatarIcon: 'tabler-currency-dollar'
    },
    {
      title: 'Paid',
      progress: paidProgress,
      stats: `$${paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      progressColor: 'success',
      avatarColor: 'success',
      avatarIcon: 'tabler-check'
    },
    {
      title: 'Outstanding',
      progress: outstandingProgress,
      stats: `$${(unpaidAmount + overdueAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      progressColor: 'warning',
      avatarColor: 'warning',
      avatarIcon: 'tabler-clock'
    }
  ]

  // Vars
  const primaryColorWithOpacity = 'var(--mui-palette-primary-lightOpacity)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      x: {
        show: true,
        formatter: (val, { dataPointIndex }) => {
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          return days[dataPointIndex] || `Day ${dataPointIndex + 1}`
        }
      },
      y: {
        formatter: (val, { seriesIndex, dataPointIndex }) => {
          return `Earnings: $${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        }
      },
      marker: { show: true },
      style: {
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const day = days[dataPointIndex] || `Day ${dataPointIndex + 1}`
        const value = series[seriesIndex][dataPointIndex]
        return `
          <div style="padding: 8px 12px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 4px;">${day}</div>
            <div style="color: #666;">Earnings: $${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
          </div>
        `
      }
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: 'var(--mui-palette-divider)',
      padding: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '42%'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      primaryColorWithOpacity,
      'var(--mui-palette-primary-main)',
      primaryColorWithOpacity,
      primaryColorWithOpacity
    ],
    states: {
      hover: {
        filter: { type: 'lighten', value: 0.1 }
      },
      active: {
        filter: { type: 'lighten', value: 0.1 }
      }
    },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          fontSize: '13px',
          colors: 'var(--mui-palette-text-disabled)',
          fontFamily: 'inherit'
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        formatter: val => `$${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        style: {
          fontSize: '11px',
          colors: 'var(--mui-palette-text-disabled)',
          fontFamily: 'inherit'
        }
      }
    }
  }

  return (
    <Card className='h-[100%] flex flex-col justify-between'>
      <CardHeader
        title='Earning Reports'
        subheader='Weekly Earnings Overview'
        action={<OptionMenu options={['Last Week', 'Last Month', 'Last Year']} />}
        className='pbe-0'
      />
      <CardContent className='flex flex-col gap-5 max-md:gap-5 max-[1015px]:gap-[62px] max-[1051px]:gap-10 max-[1200px]:gap-5 max-[1310px]:gap-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col gap-3 is-full sm:is-[unset]'>
            <div className='flex items-center gap-2.5'>
              <Typography variant='h2'>
                ${weeklyTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Typography>
              <Chip
                size='small'
                variant='tonal'
                color={growthPercentage >= 0 ? 'success' : 'error'}
                label={`${growthPercentage >= 0 ? '+' : ''}${growthPercentage.toFixed(1)}%`}
              />
            </div>
            <Typography variant='body2' className='text-balance'>
              Weekly earnings compared to last week
            </Typography>
          </div>
          <AppReactApexCharts type='bar' height={163} width='100%' series={series} options={options} />
        </div>
        <div className='flex flex-col sm:flex-row gap-6 p-5 border rounded'>
          {metricsData.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 is-full'>
              <div className='flex items-center gap-2'>
                <CustomAvatar skin='light' variant='rounded' color={item.avatarColor} size={26}>
                  <i className={classnames(item.avatarIcon, 'text-lg')} />
                </CustomAvatar>
                <Typography variant='h6' className='leading-6 font-normal'>
                  {item.title}
                </Typography>
              </div>
              <Typography variant='h4'>{item.stats}</Typography>
              <LinearProgress
                value={item.progress}
                variant='determinate'
                color={item.progressColor}
                className='max-bs-1'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningReports
