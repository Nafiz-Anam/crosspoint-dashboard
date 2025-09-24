'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Services
import toastService from '@/services/toastService'

const AddTaskDrawer = props => {
  // Props
  const { open, handleClose, currentTask, onTaskAdded } = props

  // States
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState([])
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [employees, setEmployees] = useState([])

  // Individual loading states for each dropdown
  const [clientsLoading, setClientsLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(false)
  const [employeesLoading, setEmployeesLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const preSelectedClientId = searchParams?.get('clientId')

  const {
    control,
    reset: resetForm,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      description: '',
      clientId: preSelectedClientId || '',
      categoryId: '',
      serviceId: '',
      assignedEmployeeId: '',
      status: 'PENDING',
      startDate: '',
      dueDate: ''
    }
  })

  const watchedClientId = watch('clientId')
  const watchedCategoryId = watch('categoryId')
  const watchedServiceId = watch('serviceId')

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

  // Fetch categories
  const fetchCategories = async () => {
    if (!session?.accessToken) return

    setCategoriesLoading(true)
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
        const services = data.data || []
        // Extract unique categories from services
        const uniqueCategories = [...new Set(services.map(service => service.category).filter(Boolean))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setCategoriesLoading(false)
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

  // Effect to populate form fields when currentTask changes (for edit mode)
  useEffect(() => {
    if (currentTask) {
      resetForm({
        description: currentTask.description || '',
        clientId: currentTask.clientId || '',
        serviceId: currentTask.serviceId || '',
        assignedEmployeeId: currentTask.assignedEmployeeId || '',
        status: currentTask.status || 'PENDING',
        priority: currentTask.priority || 'MEDIUM',
        dueDate: currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : '',
        startDate: currentTask.startDate ? new Date(currentTask.startDate).toISOString().split('T')[0] : '',
        notes: currentTask.notes || ''
      })
    } else {
      resetForm({
        description: '',
        clientId: preSelectedClientId || '',
        serviceId: '',
        assignedEmployeeId: '',
        status: 'PENDING',
        dueDate: '',
        startDate: '',
        notes: ''
      })
    }
  }, [open, currentTask, resetForm, preSelectedClientId])

  // Fetch dropdown data when drawer opens
  useEffect(() => {
    if (open && session?.accessToken) {
      fetchClients()
      fetchCategories()
      fetchServices()
      fetchEmployees()
    }
  }, [open, session?.accessToken])

  // Available services - filter by selected category
  const availableServices = useMemo(() => {
    if (!watchedCategoryId) return []
    return services.filter(service => service.category === watchedCategoryId)
  }, [watchedCategoryId, services])

  // Reset serviceId when category changes
  useEffect(() => {
    if (watchedCategoryId) {
      resetForm({
        ...watch(),
        serviceId: ''
      })
    }
  }, [watchedCategoryId, resetForm, watch])

  const onSubmit = async data => {
    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    const payload = {
      description: data.description || null,
      clientId: data.clientId,
      serviceId: data.serviceId,
      assignedEmployeeId: data.assignedEmployeeId,
      status: data.status,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null
    }

    const isEditMode = !!currentTask
    const apiMethod = isEditMode ? 'PATCH' : 'POST'
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/tasks/${currentTask.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/tasks`

    try {
      const response = await fetch(apiUrl, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (response.ok) {
        toastService.showSuccess(`Task ${isEditMode ? 'updated' : 'created'} successfully!`)
        onTaskAdded()
        handleReset()
      } else {
        const errorMessage =
          responseData.message || `Failed to ${isEditMode ? 'update' : 'create'} task: ${response.status}`
        await toastService.handleApiError(response, errorMessage)
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({
      description: '',
      clientId: preSelectedClientId || '',
      categoryId: '',
      serviceId: '',
      assignedEmployeeId: '',
      status: 'PENDING',
      startDate: '',
      dueDate: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>{currentTask ? 'Edit Task' : 'Add New Task'}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
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

          <Controller
            name='categoryId'
            control={control}
            rules={{ required: 'Category is required.' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Category'
                {...field}
                {...(errors.categoryId && { error: true, helperText: errors.categoryId.message })}
                InputProps={{
                  endAdornment: categoriesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                }}
              >
                {categoriesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Loading categories...
                  </MenuItem>
                ) : categories.length === 0 ? (
                  <MenuItem disabled>No categories available</MenuItem>
                ) : (
                  categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

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
                disabled={!watchedCategoryId}
              >
                {servicesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Loading services...
                  </MenuItem>
                ) : availableServices.length === 0 ? (
                  <MenuItem disabled>
                    {!watchedCategoryId ? 'Please select a category first' : 'No services available for this category'}
                  </MenuItem>
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

          <div className='flex items-center gap-4'>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
              loadingText={currentTask ? 'Updating...' : 'Creating...'}
              disabled={loading}
            >
              {currentTask ? 'Update' : 'Create'}
            </LoadingButton>
            <LoadingButton variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              Cancel
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddTaskDrawer
