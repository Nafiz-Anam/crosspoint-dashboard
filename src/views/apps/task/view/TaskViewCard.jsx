'use client'

// React Imports
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

// Third-party Imports
import { useSession } from 'next-auth/react'

// Services
import toastService from '@/services/toastService'

// Utils
import { getLocalizedUrl } from '@/utils/i18n'

const taskStatusObj = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
  ON_HOLD: 'secondary'
}

const TaskViewCard = () => {
  // States
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState(null)

  // Hooks
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const taskId = params.id

  // Function to fetch task data
  const fetchTaskData = async () => {
    if (!session?.accessToken || !taskId) return

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setTask(data.data.task)
      } else {
        await toastService.handleApiError(response, 'Failed to fetch task data')
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error fetching task data')
    } finally {
      setLoading(false)
    }
  }

  // Effect to fetch task data
  useEffect(() => {
    if (session?.accessToken && taskId) {
      fetchTaskData()
    }
  }, [session?.accessToken, taskId])

  // Function to format date
  const formatDate = dateString => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Function to format date and time
  const formatDateTime = dateString => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent>
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading task details...</Typography>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!task) {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6' color='error'>
            Task not found or you don&apos;t have permission to view this task.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title={`Task: ${task.title}`}
        action={
          <Box className='flex gap-2'>
            <Button
              variant='outlined'
              onClick={() => router.push(getLocalizedUrl(`/apps/task/edit/${task.id}`, params.lang))}
              startIcon={<i className='tabler-edit' />}
            >
              Edit Task
            </Button>
            <Button
              variant='contained'
              onClick={() => router.push(getLocalizedUrl('/apps/task/list', params.lang))}
              startIcon={<i className='tabler-arrow-left' />}
            >
              Back to List
            </Button>
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Task ID
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.taskId || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    variant='tonal'
                    label={task.status}
                    size='small'
                    color={taskStatusObj[task.status]}
                    className='capitalize'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Created Date
                </Typography>
                <Typography variant='body1'>{formatDateTime(task.createdAt)}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Description */}
          {task.description && (
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Description
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
                {task.description}
              </Typography>
            </Grid>
          )}

          {/* Client Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Client Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Client Name
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.client?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Client Email
                </Typography>
                <Typography variant='body1'>{task.client?.email || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Client Phone
                </Typography>
                <Typography variant='body1'>{task.client?.phone || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Branch
                </Typography>
                <Typography variant='body1'>{task.client?.branch?.name || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Service Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Service Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Service Name
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.service?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Service Price
                </Typography>
                <Typography variant='body1'>{task.service?.price ? `€${task.service.price}` : '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Service Category
                </Typography>
                <Typography variant='body1'>{task.service?.category || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Assignment Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Assignment Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Assigned Employee
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.assignedEmployee?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Employee Role
                </Typography>
                <Typography variant='body1'>{task.assignedEmployee?.role || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Employee Email
                </Typography>
                <Typography variant='body1'>{task.assignedEmployee?.email || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Timeline Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Timeline
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Start Date
                </Typography>
                <Typography variant='body1'>{formatDate(task.startDate)}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Due Date
                </Typography>
                <Typography variant='body1'>{formatDate(task.dueDate)}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Estimated Hours
                </Typography>
                <Typography variant='body1'>{task.estimatedHours ? `${task.estimatedHours} hours` : '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  Actual Hours
                </Typography>
                <Typography variant='body1'>{task.actualHours ? `${task.actualHours} hours` : '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              Additional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  Last Updated
                </Typography>
                <Typography variant='body1'>{formatDateTime(task.updatedAt)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TaskViewCard
