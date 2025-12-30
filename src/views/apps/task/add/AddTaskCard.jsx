'use client'

// React Imports
import { useEffect, useState, useCallback } from 'react'
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
import CustomAutocomplete from '@core/components/mui/Autocomplete'

// Services
import toastService from '@/services/toastService'
import apiClient from '@/services/apiClient'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddTaskCard = ({ onTaskCreated }) => {
  // States
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState([])
  const [allServices, setAllServices] = useState([]) // All services for category extraction
  const [services, setServices] = useState([]) // Filtered services for selected category
  const [employees, setEmployees] = useState([])
  const [categories, setCategories] = useState([]) // Dynamic categories extracted from services

  // Individual loading states for each dropdown
  const [clientsLoading, setClientsLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(false)
  const [employeesLoading, setEmployeesLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedClientId = searchParams?.get('clientId')

  const {
    control,
    reset: resetForm,
    handleSubmit,
    watch,
    setValue,
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
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const watchedClientId = watch('clientId')
  const watchedCategoryId = watch('categoryId')
  const watchedServiceId = watch('serviceId')

  // Fetch clients
  const fetchClients = useCallback(async () => {
    console.log('Fetching clients...')
    setClientsLoading(true)
    try {
      const response = await apiClient.get('/clients/list/all')
      const data = response.data
      setClients(data.data?.clients || data.data || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setClientsLoading(false)
    }
  }, [])

  // Fetch all services to extract categories (like invoice form)
  const fetchAllServices = useCallback(async () => {
    console.log('Fetching all services for categories...')
    setCategoriesLoading(true)
    try {
      const response = await apiClient.get('/services/list/all')
      const data = response.data
      const servicesData = data.data || []
      setAllServices(servicesData)
      
      // Extract unique categories from services (same as invoice form)
      const uniqueCategories = [...new Set(servicesData.map(service => service.category).filter(Boolean))]
      setCategories(uniqueCategories || [])
      console.log('Extracted categories from services:', uniqueCategories)
    } catch (error) {
      console.error('Error fetching all services:', error)
    } finally {
      setCategoriesLoading(false)
    }
  }, [])

  // Fetch services filtered by category
  const fetchServices = useCallback(
    async (category = null) => {
      console.log(`Fetching services for category: ${category || 'all'}`)
      setServicesLoading(true)
      try {
        const response = await apiClient.get('/services/list/all', {
          params: category ? { category } : {}
        })
        const data = response.data
        setServices(data.data || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setServicesLoading(false)
      }
    }, [])

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    console.log('Fetching employees...')
    setEmployeesLoading(true)
    try {
      const response = await apiClient.get('/employees/list/all')
      const data = response.data
      setEmployees(data.data || [])
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setEmployeesLoading(false)
    }
  }, [])

  // Valid status and priority values
  const validStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD']

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
    fetchClients()
    fetchEmployees()
    fetchAllServices() // Fetch all services to extract categories
  }, [fetchClients, fetchEmployees, fetchAllServices])

  // Handle category changes and fetch services
  useEffect(() => {
    if (watchedCategoryId) {
      // Fetch services for selected category from backend
      fetchServices(watchedCategoryId)
      // Reset service selection when category changes
      setValue('serviceId', '')
    } else {
      // Clear services when no category selected
      setServices([])
    }
  }, [watchedCategoryId, fetchServices, setValue])

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
      const response = await apiClient.post('/tasks', payload)
      const responseData = response.data

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
      // Call parent callback to refresh task list
      if (onTaskCreated) {
        onTaskCreated(responseData.data)
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Call parent callback to close the form
    if (onTaskCreated) {
      onTaskCreated(null) // Pass null to indicate cancellation
    }
  }

  return (
    <Card>
      <CardHeader title={t('tasks.createNewTask')} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='clientId'
                control={control}
                rules={{ required: 'Client is required.' }}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomAutocomplete
                    {...field}
                    fullWidth
                    size='small'
                    options={clients}
                    loading={clientsLoading}
                    value={clients.find(client => client.id === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.id : '')
                    }}
                    getOptionLabel={option => {
                      if (typeof option === 'string') return option
                      return `${option.name} - ${option.email}`
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        label={`${t('tasks.selectClient')} *`}
                        {...(errors.clientId && { error: true, helperText: errors.clientId.message })}
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {clientsLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }
                        }}
                      />
                    )}
                    noOptionsText={clients.length === 0 ? t('tasks.noClientsAvailable') : 'No options'}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='categoryId'
                control={control}
                rules={{ required: t('tasks.categoryRequired') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomAutocomplete
                    {...field}
                    fullWidth
                    size='small'
                    options={categories}
                    loading={categoriesLoading}
                    value={value || null}
                    onChange={(event, newValue) => {
                      onChange(newValue || '')
                    }}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                    label={`${t('tasks.selectCategory')} *`}
                    {...(errors.categoryId && { error: true, helperText: errors.categoryId.message })}
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {categoriesLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }
                        }}
                      />
                    )}
                    noOptionsText={categories.length === 0 ? t('tasks.noCategoriesAvailable') : 'No options'}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='serviceId'
                control={control}
                rules={{ required: t('tasks.serviceRequired') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomAutocomplete
                    {...field}
                    fullWidth
                    size='small'
                    options={services}
                    loading={servicesLoading}
                    disabled={!watchedCategoryId}
                    value={services.find(service => service.id === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.id : '')
                    }}
                    getOptionLabel={option => {
                      if (typeof option === 'string') return option
                      return `${option.name} - €${option.price}`
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        label={`${t('tasks.selectService')} *`}
                        {...(errors.serviceId && { error: true, helperText: errors.serviceId.message })}
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {servicesLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }
                        }}
                      />
                    )}
                    noOptionsText={
                      !watchedCategoryId
                        ? t('tasks.selectCategoryFirst')
                        : services.length === 0
                          ? t('tasks.noServicesAvailable')
                          : 'No options'
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='assignedEmployeeId'
                control={control}
                rules={{ required: t('tasks.employeeRequired') }}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomAutocomplete
                    {...field}
                    fullWidth
                    size='small'
                    options={employees}
                    loading={employeesLoading}
                    value={employees.find(employee => employee.id === value) || null}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.id : '')
                    }}
                    getOptionLabel={option => {
                      if (typeof option === 'string') return option
                      return `${option.name} - ${option.email}`
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        label={`${t('tasks.assignToEmployee')} *`}
                        {...(errors.assignedEmployeeId && { error: true, helperText: errors.assignedEmployeeId.message })}
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {employeesLoading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </>
                            )
                          }
                        }}
                      />
                    )}
                    noOptionsText={employees.length === 0 ? t('tasks.noEmployeesAvailable') : 'No options'}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='startDate'
                control={control}
                rules={{ required: t('tasks.startDateRequired') }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label={`${t('tasks.startDate')} *`}
                    InputLabelProps={{ shrink: true }}
                    {...(errors.startDate && { error: true, helperText: errors.startDate.message })}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='dueDate'
                control={control}
                rules={{ required: t('tasks.dueDateRequired') }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='date'
                    label={`${t('tasks.dueDate')} *`}
                    InputLabelProps={{ shrink: true }}
                    {...(errors.dueDate && { error: true, helperText: errors.dueDate.message })}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='status'
                control={control}
                rules={{ required: t('tasks.statusRequired') }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label={`${t('tasks.fields.status')} *`}
                    {...field}
                    {...(errors.status && { error: true, helperText: errors.status.message })}
                  >
                    {validStatuses.map(status => {
                      // Map status values to correct translation keys
                      const statusKeyMap = {
                        PENDING: 'pending',
                        IN_PROGRESS: 'inProgress',
                        COMPLETED: 'completed',
                        CANCELLED: 'cancelled',
                        ON_HOLD: 'onHold'
                      }
                      const translationKey = statusKeyMap[status] || status.toLowerCase()
                      return (
                        <MenuItem key={status} value={status}>
                          {t(`tasks.status.${translationKey}`) || status.replace('_', ' ')}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name='description'
                control={control}
                rules={{ required: t('tasks.descriptionRequired') }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    multiline
                    rows={3}
                    label={`${t('tasks.description')} *`}
                    placeholder={t('tasks.enterTaskDescription')}
                    {...(errors.description && { error: true, helperText: errors.description.message })}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <div className='flex items-center gap-4'>
                <LoadingButton
                  variant='contained'
                  type='submit'
                  loading={loading}
                  loadingText={t('tasks.creating')}
                  disabled={loading || Object.keys(errors).length > 0}
                >
                  {t('tasks.createTask')}
                </LoadingButton>
                <LoadingButton variant='tonal' color='error' type='button' onClick={handleCancel} disabled={loading}>
                  {t('tasks.cancel')}
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
