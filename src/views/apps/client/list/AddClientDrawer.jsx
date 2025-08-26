'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddClientDrawer = props => {
  // Props
  const { open, handleClose, currentClient, onClientAdded } = props

  // States
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)
  const [services, setServices] = useState([])
  const [branches, setBranches] = useState([])
  const [employees, setEmployees] = useState([])

  // Individual loading states for each dropdown
  const [servicesLoading, setServicesLoading] = useState(false)
  const [branchesLoading, setBranchesLoading] = useState(false)
  const [employeesLoading, setEmployeesLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      serviceId: '',
      branchId: '',
      assignedEmployeeId: '',
      status: 'PENDING'
    }
  })

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

  // Fetch branches
  const fetchBranches = async () => {
    if (!session?.accessToken) return

    setBranchesLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBranches(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching branches:', error)
    } finally {
      setBranchesLoading(false)
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

  // Effect to populate form fields when currentClient changes (for edit mode)
  useEffect(() => {
    if (currentClient) {
      resetForm({
        name: currentClient.name || '',
        email: currentClient.email || '',
        phone: currentClient.phone || '',
        address: currentClient.address || '',
        city: currentClient.city || '',
        postalCode: currentClient.postalCode || '',
        province: currentClient.province || '',
        serviceId: currentClient.serviceId || '',
        branchId: currentClient.branchId || '',
        assignedEmployeeId: currentClient.assignedEmployeeId || '',
        status: currentClient.status || 'PENDING'
      })
    } else {
      resetForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        province: '',
        serviceId: '',
        branchId: '',
        assignedEmployeeId: '',
        status: 'PENDING'
      })
    }
    setApiError(null)
    setApiSuccess(false)
  }, [open, currentClient, resetForm])

  // Fetch dropdown data when drawer opens
  useEffect(() => {
    if (open && session?.accessToken) {
      fetchServices()
      fetchBranches()
      fetchEmployees()
    }
  }, [open, session?.accessToken])

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
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      postalCode: data.postalCode || null,
      province: data.province || null,
      serviceId: data.serviceId,
      branchId: data.branchId,
      assignedEmployeeId: data.assignedEmployeeId || null,
      status: data.status
    }

    const isEditMode = !!currentClient
    const apiMethod = isEditMode ? 'PUT' : 'POST'
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/clients/${currentClient.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/clients`

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
        setApiSuccess(true)
        onClientAdded()
        handleReset()
      } else {
        const errorMessage =
          responseData.message || `Failed to ${isEditMode ? 'update' : 'create'} client: ${response.status}`
        setApiError(errorMessage)
      }
    } catch (error) {
      setApiError('Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      serviceId: '',
      branchId: '',
      assignedEmployeeId: '',
      status: 'PENDING'
    })
    setApiError(null)
    setApiSuccess(false)
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
        <Typography variant='h5'>{currentClient ? 'Edit Client' : 'Add New Client'}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        {apiError && (
          <Alert severity='error' onClose={() => setApiError(null)} sx={{ mb: 4, mx: 6, mt: 4 }}>
            {apiError}
          </Alert>
        )}
        {apiSuccess && (
          <Alert severity='success' onClose={() => setApiSuccess(false)} sx={{ mb: 4, mx: 6, mt: 4 }}>
            Client {currentClient ? 'updated' : 'added'} successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Client ID field, display only if editing */}
          {currentClient && (
            <CustomTextField
              fullWidth
              label='Client ID'
              value={currentClient.clientId || ''}
              disabled={true}
              sx={{ mb: 2 }}
            />
          )}

          <Controller
            name='name'
            control={control}
            rules={{ required: 'Client Name is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Client Name'
                placeholder='Mario Rossi'
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required.',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address.' }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='mario.rossi@email.com'
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Phone (Optional)' placeholder='+39 123 456 7890' />
            )}
          />

          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Address (Optional)' placeholder='Via Roma 123' />
            )}
          />

          <Controller
            name='city'
            control={control}
            render={({ field }) => <CustomTextField {...field} fullWidth label='City (Optional)' placeholder='Rome' />}
          />

          <Controller
            name='postalCode'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Postal Code (Optional)' placeholder='00100' />
            )}
          />

          <Controller
            name='province'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Province (Optional)' placeholder='RM' />
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
              >
                {servicesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Loading services...
                  </MenuItem>
                ) : services.length === 0 ? (
                  <MenuItem disabled>No services available</MenuItem>
                ) : (
                  services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name} - €{service.price}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

          <Controller
            name='branchId'
            control={control}
            rules={{ required: 'Branch is required.' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Branch'
                {...field}
                {...(errors.branchId && { error: true, helperText: errors.branchId.message })}
                InputProps={{
                  endAdornment: branchesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                }}
              >
                {branchesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Loading branches...
                  </MenuItem>
                ) : branches.length === 0 ? (
                  <MenuItem disabled>No branches available</MenuItem>
                ) : (
                  branches.map(branch => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name} - {branch.city}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

          <Controller
            name='assignedEmployeeId'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Assigned Employee (Optional)'
                {...field}
                InputProps={{
                  endAdornment: employeesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                }}
              >
                <MenuItem value=''>None</MenuItem>
                {employeesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Loading employees...
                  </MenuItem>
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
                <MenuItem value='PENDING'>Pending</MenuItem>
                <MenuItem value='ACTIVE'>Active</MenuItem>
                <MenuItem value='INACTIVE'>Inactive</MenuItem>
                <MenuItem value='COMPLETED'>Completed</MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? <CircularProgress size={24} /> : currentClient ? 'Update' : 'Submit'}
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddClientDrawer
