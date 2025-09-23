'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const EditTaskCard = ({ taskId }) => {
  // States
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)
  const [taskData, setTaskData] = useState(null)
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])

  // Individual loading states for each dropdown
  const [clientsLoading, setClientsLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(false)
  const [employeesLoading, setEmployeesLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const router = useRouter()

  const {
    control,
    reset: resetForm,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      clientId: '',
      serviceId: '',
      assignedEmployeeId: '',
      status: 'PENDING',
      priority: 'MEDIUM',
      dueDate: '',
      startDate: '',
      estimatedHours: '',
      actualHours: '',
      notes: ''
    }
  })

  const watchedClientId = watch('clientId')

  // Fetch task data
  const fetchTaskData = async () => {
    if (!session?.accessToken || !taskId) return

    setFetchLoading(true)
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
        const task = data.data.task
        setTaskData(task)

        // Populate form with task data
        resetForm({
          title: task.title || '',
          description: task.description || '',
          clientId: task.clientId || '',
          serviceId: task.serviceId || '',
          assignedEmployeeId: task.assignedEmployeeId || '',
          status: task.status || 'PENDING',
          priority: task.priority || 'MEDIUM',
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
          startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
          estimatedHours: task.estimatedHours || '',
          actualHours: task.actualHours || '',
          notes: task.notes || ''
        })
      } else {
        setApiError('Failed to fetch task data')
      }
    } catch (error) {
      console.error('Error fetching task:', error)
      setApiError('Network error fetching task data')
    } finally {
      setFetchLoading(false)
    }
  }

  // Fetch clients
  const fetchClients = async () => {
    if (!session?.accessToken) return

    setClientsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setClients(data.data?.clients || data.data || [])
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setClientsLoading(false)
    }
  }

  // Fetch services
  const fetchServices = async () => {
    if (!session?.accessToken) return

    setServicesLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setServices(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setServicesLoading(false)
    }
  }

  // Fetch employees
  const fetchEmployees = async () => {
    if (!session?.accessToken) return

    setEmployeesLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setEmployees(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setEmployeesLoading(false)
    }
  }

  // Valid status and priority values
  const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD']
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

  // Fetch all data when component mounts
  useEffect(() => {
    if (session?.accessToken) {
      fetchTaskData()
      fetchClients()
      fetchServices()
      fetchEmployees()
    }
  }, [session?.accessToken, taskId])

  // Filter services based on selected client
  const availableServices = useMemo(() => {
    if (!watchedClientId) return services

    const selectedClient = clients.find(client => client.id === watchedClientId)
    if (!selectedClient) return services

    // Filter services to show only the one associated with the client
    return services.filter(service => service.id === selectedClient.serviceId)
  }, [watchedClientId, clients, services])

  const onSubmit = async data => {
    setLoading(true)
    setApiError(null)
    setApiSuccess(false)

    if (!session?.accessToken) {
      setApiError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    const payload = {
      title: data.title,
      description: data.description || null,
      clientId: data.clientId,
      serviceId: data.serviceId,
      assignedEmployeeId: data.assignedEmployeeId,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      estimatedHours: data.estimatedHours ? parseFloat(data.estimatedHours) : null,
      actualHours: data.actualHours ? parseFloat(data.actualHours) : null,
      notes: data.notes || null
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (response.ok) {
        setApiSuccess(true)
        // Redirect to task list after successful update
        setTimeout(() => {
          router.push('/apps/task/list')
        }, 2000)
      } else {
        const errorMessage = responseData.message || `Failed to update task: ${response.status}`
        setApiError(errorMessage)
      }
    } catch (error) {
      setApiError('Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <Card>
        <CardContent>
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <span className='ml-4'>Loading task data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!taskData) {
    return (
      <Card>
        <CardContent>
          <Alert severity='error'>Task not found or you don't have permission to edit this task.</Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title={`Edit Task: ${taskData.title}`} />
      <CardContent>
        {apiError && (
          <Alert severity='error' onClose={() => setApiError(null)} sx={{ mb: 4 }}>
            {apiError}
          </Alert>
        )}
        {apiSuccess && (
          <Alert severity='success' onClose={() => setApiSuccess(false)} sx={{ mb: 4 }}>
            Task updated successfully! Redirecting to task list...
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Controller
                name='title'
                control={control}
                rules={{ required: 'Task title is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Task Title'
                    placeholder='Enter task title'
                    {...(errors.title && { error: true, helperText: errors.title.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='priority'
                control={control}
                rules={{ required: 'Priority is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Priority'
                    {...field}
                    {...(errors.priority && { error: true, helperText: errors.priority.message })}
                  >
                    {validPriorities.map(priority => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label='Description (Optional)'
                    placeholder='Enter task description'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='clientId'
                control={control}
                rules={{ required: 'Client is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Select Client'
                    {...field}
                    {...(errors.clientId && { error: true, helperText: errors.clientId.message })}
                    InputProps={{
                      endAdornment: clientsLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                    }}
                  >
                    {clientsLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        Loading clients...
                      </MenuItem>
                    ) : clients.length === 0 ? (
                      <MenuItem disabled>No clients available</MenuItem>
                    ) : (
                      clients.map(client => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.name} - {client.email}
                        </MenuItem>
                      ))
                    )}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='serviceId'
                control={control}
                rules={{ required: 'Service is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Select Service'
                    {...field}
                    {...(errors.serviceId && { error: true, helperText: errors.serviceId.message })}
                    InputProps={{
                      endAdornment: servicesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                    }}
                  >
                    {servicesLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        Loading services...
                      </MenuItem>
                    ) : availableServices.length === 0 ? (
                      <MenuItem disabled>No services available</MenuItem>
                    ) : (
                      availableServices.map(service => (
                        <MenuItem key={service.id} value={service.id}>
                          {service.name} - €{service.price}
                        </MenuItem>
                      ))
                    )}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='assignedEmployeeId'
                control={control}
                rules={{ required: 'Assigned employee is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Assign To Employee'
                    {...field}
                    {...(errors.assignedEmployeeId && { error: true, helperText: errors.assignedEmployeeId.message })}
                    InputProps={{
                      endAdornment: employeesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                    }}
                  >
                    {employeesLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        Loading employees...
                      </MenuItem>
                    ) : employees.length === 0 ? (
                      <MenuItem disabled>No employees available</MenuItem>
                    ) : (
                      employees.map(employee => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.name} - {employee.role}
                        </MenuItem>
                      ))
                    )}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='status'
                control={control}
                rules={{ required: 'Status is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Status'
                    {...field}
                    {...(errors.status && { error: true, helperText: errors.status.message })}
                  >
                    {validStatuses.map(status => (
                      <MenuItem key={status} value={status}>
                        {status.replace('_', ' ')}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='dueDate'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Due Date (Optional)'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='startDate'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Start Date (Optional)'
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='estimatedHours'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Estimated Hours (Optional)'
                    placeholder='0'
                    inputProps={{ min: 0, step: 0.5 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='actualHours'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Actual Hours (Optional)'
                    placeholder='0'
                    inputProps={{ min: 0, step: 0.5 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='notes'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label='Notes (Optional)'
                    placeholder='Enter any additional notes'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <div className='flex items-center gap-4'>
                <LoadingButton
                  variant='contained'
                  type='submit'
                  loading={loading}
                  loadingText='Updating...'
                  disabled={loading}
                >
                  Update Task
                </LoadingButton>
                <LoadingButton
                  variant='tonal'
                  color='secondary'
                  type='button'
                  onClick={() => router.push('/apps/task/list')}
                  disabled={loading}
                >
                  Cancel
                </LoadingButton>
              </div>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditTaskCard
