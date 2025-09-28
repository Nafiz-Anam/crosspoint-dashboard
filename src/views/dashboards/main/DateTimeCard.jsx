'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const DateTimeCard = () => {
  const { t } = useTranslation()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = date => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Box className='flex flex-row items-center text-left gap-2 px-3 py-1'>
      {/* Time Display */}
      <Typography
        variant='body1'
        className='font-semibold text-text-primary'
        sx={{
          fontFamily: 'monospace',
          letterSpacing: '0.05em',
          fontSize: '1rem',
          fontWeight: 600
        }}
      >
        {formatTime(currentTime)}
      </Typography>

      {/* Separator */}
      <Typography variant='caption' color='text.disabled' className='font-normal' sx={{ fontSize: '0.75rem' }}>
        |
      </Typography>

      {/* Date Display */}
      <Typography variant='caption' color='text.secondary' className='font-normal' sx={{ fontSize: '0.75rem' }}>
        {formatDate(currentTime)}
      </Typography>
    </Box>
  )
}

export default DateTimeCard
