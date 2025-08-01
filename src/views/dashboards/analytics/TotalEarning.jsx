'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import classnames from 'classnames'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  { name: 'Earning', data: [15, 10, 20, 8, 12, 18, 12, 5] },
  { name: 'Expense', data: [-7, -10, -7, -12, -6, -9, -5, -8] }
]

const data = [
  {
    title: 'Total Revenue',
    subtitle: 'Client Payment',
    amount: 126,
    avatarColor: 'primary',
    avatarIcon: 'tabler-brand-paypal'
  },
  {
    title: 'Total Refund',
    subtitle: 'Cancelled',
    amount: 98,
    avatarColor: 'error',
    avatarIcon: 'tabler-currency-dollar',
    amountDiff: 'negative'
  }
]

const TotalEarning = () => {
  // Hooks
  const theme = useTheme()

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
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ['var(--mui-palette-background-paper)']
    },
    colors: ['var(--mui-palette-primary-main)', 'var(--mui-palette-secondary-main)'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
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
      borderColor: 'var(--mui-palette-divider)',
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -56,
        left: -13,
        right: 0,
        bottom: -15
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
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
            <Typography variant='h2'>87%</Typography>
            <div className='flex items-center gap-1'>
              <i className='tabler-chevron-up text-xl text-success' />
              <Typography color='success.main'>25.8%</Typography>
            </div>
          </div>
        }
      />
      <CardContent className='flex flex-col gap-4'>
        <AppReactApexCharts type='bar' height={189} width='100%' series={series} options={options} />
        {data.map((item, index) => (
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
              >{`${item.amountDiff === 'negative' ? '-' : '+'}$${item.amount}`}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
