'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material/styles'
import { useSession } from 'next-auth/react'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Service Imports
import { attendanceService } from '@/services/attendanceService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const TimesheetChart = () => {
  // Hook
  const theme = useTheme()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [timesheetData, setTimesheetData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTimesheetData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Get current month date range
      const { startDate, endDate } = attendanceService.getCurrentMonthRange()

      const response = await attendanceService.getMyAttendanceRange(startDate, endDate, session.accessToken)

      if (response.success && response.data) {
        // Process attendance data to create timesheet chart data
        const processedData = processAttendanceData(response.data)
        setTimesheetData(processedData)
      }
    } catch (err) {
      console.error('Error fetching timesheet data:', err)
      setError(t('dashboard.common.error'))
      // Fallback to mock data
      setTimesheetData(generateMockData())
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  // Fetch timesheet data on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchTimesheetData()
    }
  }, [session?.accessToken])

  const getDaysInCurrentMonth = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  }

  const processAttendanceData = attendanceRecords => {
    const daysInMonth = getDaysInCurrentMonth()
    const data = new Array(daysInMonth).fill(0)

    attendanceRecords.forEach(record => {
      if (record.checkIn && record.checkOut) {
        const day = new Date(record.date).getDate() - 1 // Convert to 0-based index
        if (day >= 0 && day < daysInMonth) {
          const checkIn = new Date(record.checkIn)
          const checkOut = new Date(record.checkOut)
          const hours = (checkOut - checkIn) / (1000 * 60 * 60) // Convert to hours
          data[day] = parseFloat(hours.toFixed(1))
        }
      }
    })

    return data
  }

  const generateMockData = () => {
    const daysInMonth = getDaysInCurrentMonth()
    const data = []

    for (let i = 1; i <= daysInMonth; i++) {
      // Mock data: some days with 8 hours, some with 0, some with partial hours
      const hours = Math.random() > 0.3 ? Math.random() * 8 : 0
      data.push(parseFloat(hours.toFixed(1)))
    }

    return data
  }

  const series = [
    {
      name: t('dashboard.timesheet.totalHours'),
      data: timesheetData
    }
  ]

  const options = {
    chart: {
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
      strokeColors: 'var(--mui-palette-background-paper)',
      hover: {
        size: 6
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
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: val => `${t('dashboard.common.today')} ${val}`
      },
      y: {
        formatter: val => `${val} ${t('dashboard.timesheet.hoursPerDay')}`
      }
    },
    xaxis: {
      categories: Array.from({ length: getDaysInCurrentMonth() }, (_, i) => i + 1),
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
      max: 8,
      tickAmount: 4,
      labels: {
        style: {
          colors: 'var(--mui-palette-text-disabled)',
          fontSize: '12px'
        },
        formatter: val => `${val}h`
      }
    },
    dataLabels: { enabled: false }
  }

  const getCurrentMonthName = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader
          title={t('dashboard.timesheet.title')}
          subheader={`${t('dashboard.timesheet.hoursWorkedIn')} ${getCurrentMonthName()}`}
        />
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress size={40} />
          <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
            {t('dashboard.common.loading')}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={t('dashboard.timesheet.title')}
        subheader={`${t('dashboard.timesheet.hoursWorkedIn')} ${getCurrentMonthName()}`}
      />
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <AppReactApexCharts type='line' height={300} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default TimesheetChart
