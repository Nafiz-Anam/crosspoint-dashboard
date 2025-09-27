'use client'

// Next Imports
import dynamic from 'next/dynamic'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Hook Imports
import { useEarningsData } from '@/hooks/useEarningsData'
import { useTranslation } from '@/hooks/useTranslation'

const LineAreaDailySalesChart = ({ data, loading, error }) => {
  // Hooks
  const theme = useTheme()
  const { t } = useTranslation()
  const { data: earningsData, loading: earningsLoading, error: earningsError, period, changePeriod } = useEarningsData()

  // Handle loading and error states
  if (loading || earningsLoading) {
    return (
      <Card className='h-[100%] flex flex-col justify-center items-center'>
        <CircularProgress />
        <Typography variant='body2' sx={{ mt: 2 }}>
          {t('earnings.loadingEarnings')}
        </Typography>
      </Card>
    )
  }

  if (error || earningsError) {
    return (
      <Card className='h-[100%] flex flex-col justify-center items-center'>
        <Alert severity='error' sx={{ width: '100%' }}>
          {error || earningsError}
        </Alert>
      </Card>
    )
  }

  // Prepare chart data
  const chartData = earningsData?.chartData || [0, 0, 0, 0, 0, 0, 0]
  const periodTotal = earningsData?.periodTotal || 0
  const periodAverage = earningsData?.periodAverage || 0
  const growthPercentage = earningsData?.growthPercentage || 0
  const labels = earningsData?.labels || [
    t('dashboard.timePeriods.monday'),
    t('dashboard.timePeriods.tuesday'),
    t('dashboard.timePeriods.wednesday'),
    t('dashboard.timePeriods.thursday'),
    t('dashboard.timePeriods.friday'),
    t('dashboard.timePeriods.saturday'),
    t('dashboard.timePeriods.sunday')
  ]

  // Get period-specific labels and series name
  const getPeriodInfo = period => {
    switch (period) {
      case 'week':
        return {
          seriesName: t('earnings.dailyEarnings'),
          xAxisLabels: [
            t('dashboard.timePeriods.monday'),
            t('dashboard.timePeriods.tuesday'),
            t('dashboard.timePeriods.wednesday'),
            t('dashboard.timePeriods.thursday'),
            t('dashboard.timePeriods.friday'),
            t('dashboard.timePeriods.saturday'),
            t('dashboard.timePeriods.sunday')
          ],
          periodLabel: t('earnings.thisWeekAverage')
        }
      case 'month':
        return {
          seriesName: t('earnings.weeklyEarnings'),
          xAxisLabels: [
            t('dashboard.timePeriods.week1'),
            t('dashboard.timePeriods.week2'),
            t('dashboard.timePeriods.week3'),
            t('dashboard.timePeriods.week4')
          ],
          periodLabel: t('earnings.thisMonthAverage')
        }
      case 'year':
        return {
          seriesName: t('earnings.monthlyEarnings'),
          xAxisLabels: [
            t('dashboard.timePeriods.january'),
            t('dashboard.timePeriods.february'),
            t('dashboard.timePeriods.march'),
            t('dashboard.timePeriods.april'),
            t('dashboard.timePeriods.may'),
            t('dashboard.timePeriods.june'),
            t('dashboard.timePeriods.july'),
            t('dashboard.timePeriods.august'),
            t('dashboard.timePeriods.september'),
            t('dashboard.timePeriods.october'),
            t('dashboard.timePeriods.november'),
            t('dashboard.timePeriods.december')
          ],
          periodLabel: t('earnings.thisYearAverage')
        }
      default:
        return {
          seriesName: t('earnings.dailyEarnings'),
          xAxisLabels: [
            t('dashboard.timePeriods.monday'),
            t('dashboard.timePeriods.tuesday'),
            t('dashboard.timePeriods.wednesday'),
            t('dashboard.timePeriods.thursday'),
            t('dashboard.timePeriods.friday'),
            t('dashboard.timePeriods.saturday'),
            t('dashboard.timePeriods.sunday')
          ],
          periodLabel: t('earnings.thisWeekAverage')
        }
    }
  }

  const periodInfo = getPeriodInfo(period)
  const xAxisLabels = labels.length > 0 ? labels : periodInfo.xAxisLabels

  const series = [
    {
      name: periodInfo.seriesName,
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
          return xAxisLabels[dataPointIndex] || `${periodInfo.seriesName} ${dataPointIndex + 1}`
        }
      },
      y: {
        formatter: val =>
          `${periodInfo.seriesName}: $${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      },
      marker: { show: true },
      style: {
        fontSize: '12px',
        fontFamily: theme.typography.fontFamily
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const label = xAxisLabels[dataPointIndex] || `${periodInfo.seriesName} ${dataPointIndex + 1}`
        const value = series[seriesIndex][dataPointIndex]
        return `
          <div style="padding: 8px 12px; background: white; border: 1px solid #e0e0e0; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="font-weight: 600; margin-bottom: 4px;">${label}</div>
            <div style="color: #666;">${periodInfo.seriesName}: $${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
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
      categories: xAxisLabels,
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
      <CardHeader
        title={periodInfo.periodLabel}
        className='pbe-0'
        action={
          <ButtonGroup size='small' variant='outlined'>
            <Button variant={period === 'week' ? 'contained' : 'outlined'} onClick={() => changePeriod('week')}>
              {t('earnings.week')}
            </Button>
            <Button variant={period === 'month' ? 'contained' : 'outlined'} onClick={() => changePeriod('month')}>
              {t('earnings.month')}
            </Button>
            <Button variant={period === 'year' ? 'contained' : 'outlined'} onClick={() => changePeriod('year')}>
              {t('earnings.year')}
            </Button>
          </ButtonGroup>
        }
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', pt: 0, justifyContent: 'space-between' }}>
        {/* Main Stats */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            {periodInfo.periodLabel}
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              color: theme.palette.success.main,
              mb: 1
            }}
          >
            ${periodAverage.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </Typography>
          <Chip
            label={`↗ ${growthPercentage >= 0 ? '+' : ''}${growthPercentage.toFixed(1)}% ${t('earnings.vsLastWeek')}`}
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
              {t('earnings.totalWeeklyRevenue')}
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              ${periodTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              {t('earnings.averagePerDay')}
            </Typography>
            <Typography variant='body2' fontWeight={600} color='success.main'>
              ${periodAverage.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              {t('earnings.growthVsPreviousWeek')}
            </Typography>
            <Typography variant='body2' fontWeight={600} color={growthPercentage >= 0 ? 'success.main' : 'error.main'}>
              {growthPercentage >= 0 ? '+' : ''}
              {growthPercentage.toFixed(1)}%
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='body2' color='text.secondary'>
              Data Points
            </Typography>
            <Typography variant='body2' fontWeight={600} color='primary.main'>
              {chartData.length} {period === 'week' ? 'days' : period === 'month' ? 'weeks' : 'months'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LineAreaDailySalesChart
