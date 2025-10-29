'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Utils
import { getItalianDate, formatItalianTime, formatItalianDate } from '@/utils/timezone'

const DateTimeCard = () => {
  const { t } = useTranslation()
  const params = useParams()
  const locale = params?.lang || 'it'
  const [currentTime, setCurrentTime] = useState(getItalianDate())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getItalianDate())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = date => {
    return formatItalianTime(date, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }, locale)
  }

  const formatDate = date => {
    return formatItalianDate(date, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }, locale)
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
