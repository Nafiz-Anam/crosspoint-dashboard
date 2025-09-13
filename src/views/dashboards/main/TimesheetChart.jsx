'use client'

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
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Service Imports
import { attendanceService } from '@/services/attendanceService'

const TimesheetChart = () => {
  // Hook
  const theme = useTheme()
  const { data: session } = useSession()
  const [timesheetData, setTimesheetData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch timesheet data on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchTimesheetData()
    }
  }, [session?.accessToken])

  const fetchTimesheetData = async () => {
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
      setError('Failed to fetch timesheet data')
      // Fallback to mock data
      setTimesheetData(generateMockData())
    } finally {
      setLoading(false)
    }
  }

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
      name: 'Hours Worked',
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
        formatter: val => `Day ${val}`
      },
      y: {
        formatter: val => `${val} hours`
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
        <CardHeader title='My Timesheet' subheader={`Hours worked in ${getCurrentMonthName()}`} />
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
            Loading timesheet data...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='My Timesheet' subheader={`Hours worked in ${getCurrentMonthName()}`} />
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
