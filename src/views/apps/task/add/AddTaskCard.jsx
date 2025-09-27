'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Services
import toastService from '@/services/toastService'

const AddTaskCard = () => {
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
  const router = useRouter()
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
    },
    mode: 'onChange', // Enable real-time validation
    reValidateMode: 'onChange' // Re-validate on change
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

  // Effect to set pre-selected client if available
  useEffect(() => {
    if (preSelectedClientId) {
      resetForm(prev => ({
        ...prev,
        clientId: preSelectedClientId
      }))
    }
  }, [preSelectedClientId, resetForm])

  // Fetch dropdown data when component mounts
  useEffect(() => {
    if (session?.accessToken) {
      fetchClients()
      fetchCategories()
      fetchServices()
      fetchEmployees()
    }
  }, [session?.accessToken])

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

    // Check if form has validation errors
    if (Object.keys(errors).length > 0) {
      toastService.showError('Please fix validation errors before submitting')
      setLoading(false)
      return
    }

    // Validate all required fields before API call
    const requiredFields = {
      description: data.description?.trim(),
      clientId: data.clientId,
      categoryId: data.categoryId,
      serviceId: data.serviceId,
      assignedEmployeeId: data.assignedEmployeeId,
      status: data.status,
      startDate: data.startDate,
      dueDate: data.dueDate
    }

    // Check if any required field is empty
    const emptyFields = Object.entries(requiredFields).filter(
      ([key, value]) => !value || (typeof value === 'string' && !value.trim())
    )

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(([key]) => {
        const fieldLabels = {
          description: 'Description',
          clientId: 'Client',
          categoryId: 'Category',
          serviceId: 'Service',
          assignedEmployeeId: 'Assigned Employee',
          status: 'Status',
          startDate: 'Start Date',
          dueDate: 'Due Date'
        }
        return fieldLabels[key] || key
      })

      toastService.showError(`Please fill all required fields: ${fieldNames.join(', ')}`)
      setLoading(false)
      return
    }

    // Validate date order
    const startDate = new Date(data.startDate)
    const dueDate = new Date(data.dueDate)
    if (startDate >= dueDate) {
      toastService.showError('Start date must be before due date')
      setLoading(false)
      return
    }

    const payload = {
      description: data.description.trim(),
      clientId: data.clientId,
      serviceId: data.serviceId,
      assignedEmployeeId: data.assignedEmployeeId,
      status: data.status,
      startDate: data.startDate,
      dueDate: data.dueDate
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (response.ok) {
        toastService.showSuccess('Task created successfully!')
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
        // Redirect to task list after successful creation
        setTimeout(() => {
          router.push('/apps/task/list')
        }, 2000)
      } else {
        const errorMessage = responseData.message || `Failed to create task: ${response.status}`
        await toastService.handleApiError(response, errorMessage)
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Redirect to task list
    router.push('/apps/task/list')
  }

  return (
    <Card>
      <CardHeader title='Create New Task' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Controller
                name='clientId'
                control={control}
                rules={{ required: 'Client is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Select Client *'
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
                name='categoryId'
                control={control}
                rules={{ required: 'Category is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Select Category *'
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
                    label='Select Service *'
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
                        {!watchedCategoryId
                          ? 'Please select a category first'
                          : 'No services available for this category'}
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
                    label='Assign To Employee *'
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
                name='startDate'
                control={control}
                rules={{ required: 'Start date is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Start Date *'
                    InputLabelProps={{ shrink: true }}
                    {...(errors.startDate && { error: true, helperText: errors.startDate.message })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='dueDate'
                control={control}
                rules={{ required: 'Due date is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label='Due Date *'
                    InputLabelProps={{ shrink: true }}
                    {...(errors.dueDate && { error: true, helperText: errors.dueDate.message })}
                  />
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
                    label='Status *'
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

            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: 'Description is required.' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label='Description *'
                    placeholder='Enter task description'
                    {...(errors.description && { error: true, helperText: errors.description.message })}
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
                  loadingText='Creating...'
                  disabled={loading || Object.keys(errors).length > 0}
                >
                  Create Task
                </LoadingButton>
                <LoadingButton variant='tonal' color='error' type='button' onClick={handleCancel} disabled={loading}>
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

export default AddTaskCard
