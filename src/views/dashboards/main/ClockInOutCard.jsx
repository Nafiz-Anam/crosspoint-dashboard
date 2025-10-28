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
import ClockOutNoteDialog from '@/components/ClockOutNoteDialog'

// Service Imports
import { attendanceService } from '@/services/attendanceService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Utils
import { toItalianTime, formatItalianTime } from '@/utils/timezone'

const ClockInOutCard = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [attendanceData, setAttendanceData] = useState(null)
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [clockOutLoading, setClockOutLoading] = useState(false)

  const fetchTodayAttendance = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await attendanceService.getMyAttendance(null, session.accessToken)

      if (response.success && response.data) {
        setAttendanceData(response.data)
        setIsClockedIn(!!response.data.checkIn && !response.data.checkOut)
        if (response.data.checkIn) {
          setClockInTime(toItalianTime(new Date(response.data.checkIn)))
        }
      }
    } catch (err) {
      console.error('Error fetching attendance:', err)
      setError(t('dashboard.common.error'))
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
      setError(t('dashboard.common.error'))
      return
    }

    if (isClockedIn) {
      // Show note dialog for clock out
      setShowNoteDialog(true)
    } else {
      // Clock in directly
      try {
        setLoading(true)
        setError(null)

        const response = await attendanceService.checkIn(session.accessToken)
        if (response.success) {
          setIsClockedIn(true)
          setClockInTime(toItalianTime(new Date(response.data.checkIn)))
          setAttendanceData(response.data)
        }
      } catch (err) {
        console.error('Clock in error:', err)
        setError(err.message || t('dashboard.common.error'))
      } finally {
        setLoading(false)
      }
    }
  }

  const handleClockOutWithNote = async note => {
    if (!session?.accessToken) {
      setError(t('dashboard.common.error'))
      return
    }

    try {
      setClockOutLoading(true)
      setError(null)

      const response = await attendanceService.checkOut(session.accessToken, note)
      if (response.success) {
        setIsClockedIn(false)
        setClockInTime(null)
        setAttendanceData(response.data)
        setShowNoteDialog(false)
      }
    } catch (err) {
      console.error('Clock out error:', err)
      setError(err.message || t('dashboard.common.error'))
    } finally {
      setClockOutLoading(false)
    }
  }

  const handleCloseNoteDialog = () => {
    if (!clockOutLoading) {
      setShowNoteDialog(false)
    }
  }

  const formatTime = date => {
    if (!date) return ''
    return formatItalianTime(date, {
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
            {t('dashboard.common.loading')}
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
            <Typography
              component='span'
              sx={{
                fontStyle: error.includes('*') ? 'italic' : 'normal',
                '& *': { fontStyle: 'italic' }
              }}
              dangerouslySetInnerHTML={{
                __html: error.replace(/\*(.*?)\*/g, '<em>$1</em>')
              }}
            />
          </Alert>
        )}

        <CustomAvatar variant='rounded' skin='light' size={44} color={isClockedIn ? 'success' : 'error'}>
          <i className='tabler-clock text-[28px]' />
        </CustomAvatar>

        <div className='flex flex-col gap-y-1'>
          <Typography variant='h6' color='text.primary'>
            {isClockedIn ? t('dashboard.clockInOut.currentlyClockedIn') : t('dashboard.clockInOut.currentlyClockedOut')}
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
          {loading
            ? t('dashboard.common.loading')
            : isClockedIn
              ? t('dashboard.clockInOut.clockOut')
              : t('dashboard.clockInOut.clockIn')}
        </Button>

        {/* Clock Out Note Dialog */}
        <ClockOutNoteDialog
          open={showNoteDialog}
          onClose={handleCloseNoteDialog}
          onConfirm={handleClockOutWithNote}
          loading={clockOutLoading}
        />
      </CardContent>
    </Card>
  )
}

export default ClockInOutCard
