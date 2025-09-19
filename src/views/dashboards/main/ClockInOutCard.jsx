'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Service Imports
import { attendanceService } from '@/services/attendanceService'

const ClockInOutCard = () => {
  const { data: session } = useSession()
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [attendanceData, setAttendanceData] = useState(null)

  const fetchTodayAttendance = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await attendanceService.getMyAttendance(null, session.accessToken)

      if (response.success && response.data) {
        setAttendanceData(response.data)
        setIsClockedIn(!!response.data.checkIn && !response.data.checkOut)
        if (response.data.checkIn) {
          setClockInTime(new Date(response.data.checkIn))
        }
      }
    } catch (err) {
      console.error('Error fetching attendance:', err)
      setError('Failed to fetch attendance data')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  // Fetch today's attendance on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchTodayAttendance()
    }
  }, [session?.accessToken])

  const handleClockInOut = async () => {
    if (!session?.accessToken) {
      setError('Authentication required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (isClockedIn) {
        // Clock out
        const response = await attendanceService.checkOut(session.accessToken)
        if (response.success) {
          setIsClockedIn(false)
          setClockInTime(null)
          setAttendanceData(response.data)
        }
      } else {
        // Clock in
        const response = await attendanceService.checkIn(session.accessToken)
        if (response.success) {
          setIsClockedIn(true)
          setClockInTime(new Date(response.data.checkIn))
          setAttendanceData(response.data)
        }
      }
    } catch (err) {
      console.error('Clock in/out error:', err)
      setError(err.message || 'Failed to clock in/out')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = date => {
    if (!date) return ''
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (loading && !attendanceData) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent className='flex flex-col gap-y-4 items-center justify-center h-full'>
          <CircularProgress size={40} />
          <Typography variant='body2' color='text.secondary'>
            Loading attendance...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent className='flex flex-col gap-y-4 items-start h-full'>
        {error && (
          <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <CustomAvatar variant='rounded' skin='light' size={44} color={isClockedIn ? 'success' : 'error'}>
          <i className='tabler-clock text-[28px]' />
        </CustomAvatar>

        <div className='flex flex-col gap-y-1'>
          <Typography variant='h6' color='text.primary'>
            {isClockedIn ? 'You are currently clocked in' : 'You are currently clocked out'}
          </Typography>
          {isClockedIn && clockInTime && (
            <Typography variant='body2' color='text.secondary'>
              Since {formatTime(clockInTime)}
            </Typography>
          )}
        </div>

        <Button
          variant='contained'
          color={isClockedIn ? 'error' : 'primary'}
          onClick={handleClockInOut}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={16} />
            ) : (
              <i className={isClockedIn ? 'tabler-clock-off' : 'tabler-clock'} />
            )
          }
          sx={{ mt: 1 }}
        >
          {loading ? 'Processing...' : isClockedIn ? 'Clock Out' : 'Clock In'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ClockInOutCard
