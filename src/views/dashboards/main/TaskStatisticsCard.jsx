'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Service Imports
import { services } from '@/services/ServiceFactory'

// Hooks Imports
import { useTranslation } from '@/hooks/useTranslation'

const TaskStatisticsCard = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTaskStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!session?.accessToken) {
        setError(t('dashboard.common.error'))
        return
      }

      const client = services.tasks.getApiClient(session.accessToken)

      // Use the same endpoint - backend handles role-based logic based on user token
      const response = await client.get(`${services.tasks.endpoint}/statistics`)

      if (response && response.data) {
        const stats = response.data.data || response.data
        setTaskStats({
          pending: stats.pending || 0,
          completed: stats.completed || 0,
          cancelled: stats.cancelled || 0
        })
      } else {
        setError(t('dashboard.common.error'))
      }
    } catch (err) {
      console.error('Error fetching task stats:', err)
      setError(err.message || t('dashboard.common.error'))
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken])

  // Fetch task statistics on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchTaskStats()
    }
  }, [session?.accessToken])

  const statsData = [
    {
      title: t('dashboard.taskStatistics.pendingActivities'),
      count: taskStats.pending,
      color: 'warning',
      icon: 'tabler-clock'
    },
    {
      title: t('dashboard.taskStatistics.completedActivities'),
      count: taskStats.completed,
      color: 'success',
      icon: 'tabler-check'
    },
    {
      title: t('dashboard.taskStatistics.cancelledActivities'),
      count: taskStats.cancelled,
      color: 'error',
      icon: 'tabler-x'
    }
  ]

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
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
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ mb: 3 }}>
          {t('dashboard.taskStatistics.title')}
        </Typography>{' '}
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={3} justifyContent='space-between'>
          {statsData.map((stat, index) => (
            <Grid key={index} xs={12} sm={4}>
              <Box className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' skin='light' size={40} color={stat.color}>
                  <i className={`${stat.icon} text-[20px]`} />
                </CustomAvatar>
                <Box>
                  <Typography variant='h4' color='text.primary'>
                    {stat.count}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TaskStatisticsCard
