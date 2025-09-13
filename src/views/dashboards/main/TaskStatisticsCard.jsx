'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Service Imports
import { taskService } from '@/services/taskService'

const TaskStatisticsCard = () => {
  const { data: session } = useSession()
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch task statistics on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchTaskStats()
    }
  }, [session?.accessToken])

  const fetchTaskStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await taskService.getMyTaskStats(session.accessToken)

      if (response.success && response.data) {
        setTaskStats(response.data)
      }
    } catch (err) {
      console.error('Error fetching task stats:', err)
      setError('Failed to fetch task statistics')
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      title: 'Pending Tasks',
      count: taskStats.pending,
      color: 'warning',
      icon: 'tabler-clock'
    },
    {
      title: 'Completed Tasks',
      count: taskStats.completed,
      color: 'success',
      icon: 'tabler-check'
    },
    {
      title: 'Cancelled Tasks',
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
            Loading task statistics...
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
        <Typography variant='h5' sx={{ mb: 3 }}>
          My Tasks Overview
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4 }}>
              <Box className='flex items-center justify-between'>
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
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TaskStatisticsCard
