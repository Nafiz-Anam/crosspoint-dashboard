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

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { getTaskDueDateColor, getTaskTimeRemaining } from '@/utils/dateColorUtils'

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
  const { t } = useTranslation()

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
        await toastService.handleApiError(response, t('tasks.failedToCreateTask'))
      }
    } catch (error) {
      await toastService.handleApiError(error, t('tasks.networkError'))
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
            <Typography className='ml-4'>{t('tasks.loadingTasks')}</Typography>
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
            {t('tasks.taskDetails')} not found or you don&apos;t have permission to view this task.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        title={`${t('tasks.title')}: ${task.title}`}
        action={
          <Box className='flex gap-2'>
            <Button
              variant='outlined'
              onClick={() => router.push(getLocalizedUrl(`/apps/task/edit/${task.id}`, params.lang))}
              startIcon={<i className='tabler-edit' />}
            >
              {t('tasks.edit')}
            </Button>
            <Button
              variant='contained'
              onClick={() => router.push(getLocalizedUrl('/apps/task/list', params.lang))}
              startIcon={<i className='tabler-arrow-left' />}
            >
              {t('common.back')}
            </Button>
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              {t('tasks.basicInformation')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.taskId')}
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.taskId || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.fields.status')}
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    variant='tonal'
                    label={(() => {
                      const statusKey = task.status?.toLowerCase()
                      let translatedStatus = task.status

                      // Map status values to translations
                      const statusTranslations = {
                        pending: t('tasks.status.pending'),
                        in_progress: t('tasks.status.inProgress'),
                        completed: t('tasks.status.completed'),
                        cancelled: t('tasks.status.cancelled'),
                        on_hold: t('tasks.status.onHold')
                      }

                      if (statusTranslations[statusKey]) {
                        translatedStatus = statusTranslations[statusKey]
                      }

                      return translatedStatus
                    })()}
                    size='small'
                    color={taskStatusObj[task.status]}
                    className='capitalize'
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.createdDate')}
                </Typography>
                <Typography variant='body1'>{formatDateTime(task.createdAt)}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Description */}
          {task.description && (
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                {t('tasks.description')}
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
              {t('tasks.clientInformation')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.clientName')}
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.client?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.clientEmail')}
                </Typography>
                <Typography variant='body1'>{task.client?.email || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.clientPhone')}
                </Typography>
                <Typography variant='body1'>{task.client?.phone || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('employees.fields.branch')}
                </Typography>
                <Typography variant='body1'>{task.client?.branch?.name || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Service Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              {t('tasks.serviceInformation')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.serviceName')}
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.service?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.servicePrice')}
                </Typography>
                <Typography variant='body1'>{task.service?.price ? `€${task.service.price}` : '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.serviceCategory')}
                </Typography>
                <Typography variant='body1'>{task.service?.category || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Assignment Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              {t('tasks.assignmentInformation')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.assignedEmployee')}
                </Typography>
                <Typography variant='body1' className='font-medium'>
                  {task.assignedEmployee?.name || '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.employeeRole')}
                </Typography>
                <Typography variant='body1'>{task.assignedEmployee?.role || '-'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.employeeEmail')}
                </Typography>
                <Typography variant='body1'>{task.assignedEmployee?.email || '-'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Timeline Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              {t('tasks.timeline')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.startDate')}
                </Typography>
                <Typography variant='body1'>{formatDate(task.startDate)}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.dueDate')}
                </Typography>
                <div className='flex flex-col'>
                  <Typography variant='body1' color={getTaskDueDateColor(task.dueDate, task.status)}>
                    {formatDate(task.dueDate)}
                  </Typography>
                  {getTaskTimeRemaining(task.dueDate, task.status) && (
                    <Typography variant='caption' color={getTaskDueDateColor(task.dueDate, task.status)}>
                      {getTaskTimeRemaining(task.dueDate, task.status)}
                    </Typography>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.estimatedHours')}
                </Typography>
                <Typography variant='body1'>
                  {task.estimatedHours ? `${task.estimatedHours} ${t('tasks.hours')}` : '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.actualHours')}
                </Typography>
                <Typography variant='body1'>
                  {task.actualHours ? `${task.actualHours} ${t('tasks.hours')}` : '-'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>
              {t('tasks.additionalInformation')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant='body2' color='text.secondary'>
                  {t('tasks.lastUpdated')}
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
