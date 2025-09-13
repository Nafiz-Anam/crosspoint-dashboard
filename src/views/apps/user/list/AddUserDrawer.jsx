import { useEffect, useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert' // For error messages
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react' // Import useSession to get token

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddEmployeeDrawer = props => {
  const { open, handleClose, currentEmployee, onEmployeeAdded } = props

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)

  // States for fetching branches for the dropdown
  const [branchesList, setBranchesList] = useState([])
  const [branchesLoading, setBranchesLoading] = useState(true)
  const [branchesError, setBranchesError] = useState(null)

  // Permissions
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])

  // Hooks
  const { data: session, status: sessionStatus } = useSession()
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'EMPLOYEE',
      branchId: '',
      isActive: true
    }
  })

  // Fetch branches
  const fetchBranchesList = async () => {
    setBranchesLoading(true)
    setBranchesError(null)

    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setBranchesError('Authentication required to load branches.')
      setBranchesLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      const responseData = await response.json()

      if (response.ok) {
        setBranchesList(responseData.data || responseData)
      } else {
        const errorMessage = responseData.message || `Failed to load branches: ${response.status}`
        setBranchesError(errorMessage)
        console.error('API Error loading branches:', responseData)
      }
    } catch (error) {
      setBranchesError('Network error loading branches. Please try again.')
      console.error('Fetch error loading branches:', error)
    } finally {
      setBranchesLoading(false)
    }
  }

  // Fetch permissions
  const fetchPermissions = async () => {
    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setApiError('Authentication required to load permissions.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permissions/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      const responseData = await response.json()

      if (response.ok) {
        setPermissions(responseData.data.permissions || [])
      } else {
        const errorMessage = responseData.message || `Failed to load permissions: ${response.status}`
        setApiError(errorMessage)
        console.error('API Error loading permissions:', responseData)
      }
    } catch (error) {
      setApiError('Network error loading permissions. Please try again.')
      console.error('Fetch error loading permissions:', error)
    }
  }

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchBranchesList()
      fetchPermissions() // Fetch permissions when authenticated
    }
  }, [sessionStatus, session?.accessToken])

  // Reset form for editing or adding
  useEffect(() => {
    if (currentEmployee) {
      resetForm({
        email: currentEmployee.email || '',
        password: '', // Password should never be pre-filled for security
        name: currentEmployee.name || '',
        role: currentEmployee.role || 'EMPLOYEE',
        branchId: currentEmployee.branchId || '',
        isEmailVerified: currentEmployee.isEmailVerified ?? false,
        isActive: currentEmployee.isActive ?? true,
        employeeId: currentEmployee.employeeId || '' // Populate employeeId
      })
      setSelectedPermissions(currentEmployee.permissions || [])
    } else {
      resetForm({
        email: '',
        password: '',
        name: '',
        role: 'EMPLOYEE',
        branchId: '',
        isEmailVerified: false,
        isActive: true,
        employeeId: ''
      })
      setSelectedPermissions([]) // Clear selected permissions in add mode
    }

    setApiError(null)
    setApiSuccess(false)
  }, [open, currentEmployee, resetForm])

  const onSubmit = async data => {
    setLoading(true)
    setApiError(null)
    setApiSuccess(false)

    if (!session?.accessToken) {
      setApiError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    const isEditMode = !!currentEmployee
    const apiMethod = isEditMode ? 'PATCH' : 'POST'
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/employees/${currentEmployee.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/employees`

    const payload = {
      name: data.name || null,
      role: data.role,
      branchId: data.branchId || null,
      isActive: data.isActive,
      permissions: selectedPermissions // Send selected permissions
    }

    // Only include email for new employees
    if (!isEditMode) {
      payload.email = data.email
    }

    if (!isEditMode || (isEditMode && data.password)) {
      payload.password = data.password
    }

    try {
      console.log(`Making API call to: ${apiUrl} with method: ${apiMethod}`, payload)
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
        console.log(`Employee ${isEditMode ? 'updated' : 'created'} successfully:`, responseData)
        onEmployeeAdded()
        handleReset()
      } else {
        const errorMessage =
          responseData.message || `Failed to ${isEditMode ? 'update' : 'create'} employee: ${response.status}`
        setApiError(errorMessage)
        console.error('API Error:', responseData)
      }
    } catch (error) {
      setApiError('Network error or unexpected issue. Please try again.')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({
      email: currentEmployee?.email || '',
      password: '',
      name: '',
      role: 'EMPLOYEE',
      branchId: '',
      isEmailVerified: false,
      isActive: true,
      employeeId: ''
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
        <Typography variant='h5'>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</Typography>
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
            Employee {currentEmployee ? 'updated' : 'added'} successfully!
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Name */}
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Name is required.',
              validate: value => value.trim() !== '' || 'Name cannot be empty'
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Name'
                placeholder='Jane Doe'
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required.',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address'
              },
              validate: value => value.trim() !== '' || 'Email cannot be empty'
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='employee@example.com'
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={!!currentEmployee} // Disable in edit mode
                InputProps={{
                  readOnly: !!currentEmployee // Make read-only in edit mode
                }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name='password'
            control={control}
            rules={{
              required: !currentEmployee && 'Password is required.',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              validate: value =>
                !currentEmployee || value === '' || value.length >= 8 || 'Password must be at least 8 characters'
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='password'
                label={currentEmployee ? 'New Password (Optional)' : 'Password'}
                placeholder='············'
                required={!currentEmployee}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          {/* Branch - Required */}
          <Controller
            name='branchId'
            control={control}
            rules={{ required: 'Branch is required.' }}
            defaultValue=''
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Branch'
                {...field}
                value={field.value ?? ''}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: selected => {
                    if (!selected) return <>Select a Branch</>
                    const selectedBranch = branchesList.find(branch => branch.id === selected)
                    return selectedBranch ? `${selectedBranch.name} (${selectedBranch.branchId})` : ''
                  }
                }}
                required
                error={!!errors.branchId || !!branchesError}
                helperText={errors.branchId?.message || branchesError}
                disabled={branchesLoading}
              >
                <MenuItem value=''>Select a Branch</MenuItem>
                {branchesList.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name} ({branch.branchId})
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Role - Required */}
          <Controller
            name='role'
            control={control}
            rules={{ required: 'Role is required.' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Role'
                {...field}
                required
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value='ADMIN'>Admin</MenuItem>
                <MenuItem value='MANAGER'>Manager</MenuItem>
                <MenuItem value='HR'>HR</MenuItem>
                <MenuItem value='EMPLOYEE'>Employee</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Permissions - Required */}
          <Box sx={{ width: '100%' }}>
            <InputLabel required error={!!errors.permissions}>
              Select Permissions
            </InputLabel>
            <Controller
              name='permissions'
              control={control}
              rules={{
                validate: value =>
                  (selectedPermissions && selectedPermissions.length > 0) || 'At least one permission is required'
              }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    multiple
                    fullWidth
                    displayEmpty // This ensures the placeholder shows
                    value={selectedPermissions}
                    renderValue={selected => {
                      if (selected.length === 0) {
                        return <Typography variant='body1'>Select permissions</Typography>
                      }
                      return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {selected.map(value => (
                            <Chip key={value} label={value} size='small' />
                          ))}
                        </Box>
                      )
                    }}
                    error={!!errors.permissions}
                    onChange={e => setSelectedPermissions(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 280 }
                      }
                    }}
                    input={<OutlinedInput label='Select Permissions' />}
                  >
                    {/* Empty state placeholder */}
                    {permissions.length === 0 && (
                      <MenuItem disabled>
                        <em>No permissions available</em>
                      </MenuItem>
                    )}

                    {permissions.map(permission => (
                      <MenuItem key={permission} value={permission}>
                        <Checkbox checked={selectedPermissions.includes(permission)} />
                        <Typography>{permission}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.permissions && (
                    <Typography variant='caption' color='error' sx={{ mt: 1, display: 'block' }}>
                      {errors.permissions.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Box>

          {/* Status - Active/Inactive Dropdown */}
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status'
                {...field}
                value={field.value ? 'active' : 'inactive'} // Convert boolean to string for display
                onChange={e => field.onChange(e.target.value === 'active')} // Convert back to boolean
              >
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
              loadingText={currentEmployee ? 'Updating...' : 'Creating...'}
              disabled={loading}
            >
              {currentEmployee ? 'Update' : 'Submit'}
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

export default AddEmployeeDrawer
