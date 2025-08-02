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
import CircularProgress from '@mui/material/CircularProgress' // For loading indicator
import Alert from '@mui/material/Alert' // For error messages
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react' // Import useSession to get token

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddEmployeeDrawer = props => {
  // Props
  const { open, handleClose, currentEmployee, onEmployeeAdded } = props // currentEmployee for edit mode

  // States for form submission
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)

  // States for fetching branches for the dropdown
  const [branchesList, setBranchesList] = useState([])
  const [branchesLoading, setBranchesLoading] = useState(true)
  const [branchesError, setBranchesError] = useState(null)

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
      password: '', // Password field for creation
      name: '',
      role: 'EMPLOYEE', // Default role
      branchId: '', // Optional branchId
      isEmailVerified: false,
      isActive: true
    }
  })

  // Function to fetch branches for the dropdown
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

  // Effect to fetch branches list on component mount or session change
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchBranchesList()
    }
  }, [sessionStatus, session?.accessToken])

  // Effect to populate form fields when currentEmployee changes (for edit mode)
  useEffect(() => {
    if (currentEmployee) {
      resetForm({
        email: currentEmployee.email || '',
        password: '', // Password should never be pre-filled for security
        name: currentEmployee.name || '',
        role: currentEmployee.role || 'EMPLOYEE',
        branchId: currentEmployee.branchId || '', // Populate branchId
        isEmailVerified: currentEmployee.isEmailVerified ?? false,
        isActive: currentEmployee.isActive ?? true
      })
    } else {
      // Reset form to default values when switching to add mode
      resetForm({
        email: '',
        password: '',
        name: '',
        role: 'EMPLOYEE',
        branchId: '',
        isEmailVerified: false,
        isActive: true
      })
    }
    // Clear any previous API messages when drawer opens/mode changes
    setApiError(null)
    setApiSuccess(false)
  }, [open, currentEmployee, resetForm]) // Depend on 'open' to reset when drawer closes/opens

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
    const apiMethod = isEditMode ? 'PUT' : 'POST'
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/employees/${currentEmployee.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/employees`

    // Construct payload based on schema and mode
    const payload = {
      email: data.email,
      name: data.name || null, // Optional
      role: data.role,
      branchId: data.branchId || null, // Optional
      isEmailVerified: data.isEmailVerified,
      isActive: data.isActive
    }

    // Only include password if it's a new employee or password field is explicitly filled in edit mode
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
        onEmployeeAdded() // Trigger re-fetch in parent
        handleReset() // Close drawer and reset form
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
      email: '',
      password: '',
      name: '',
      role: 'EMPLOYEE',
      branchId: '',
      isEmailVerified: false,
      isActive: true
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
          {/* Employee ID field, display only if editing, and make it read-only */}
          {currentEmployee && (
            <CustomTextField
              fullWidth
              label='Employee ID'
              value={currentEmployee.employeeId || ''}
              disabled={true}
              sx={{ mb: 2 }}
            />
          )}

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
                placeholder='employee@example.com'
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: !currentEmployee && 'Password is required.' }} // Password required only for new employee
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='password'
                label={currentEmployee ? 'New Password (Optional)' : 'Password'}
                placeholder='············'
                {...(errors.password && { error: true, helperText: errors.password.message })}
              />
            )}
          />
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Name (Optional)' placeholder='Jane Doe' />
            )}
          />
          <Controller
            name='role'
            control={control}
            rules={{ required: 'Role is required.' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-role'
                label='Select Role'
                {...field}
                {...(errors.role && { error: true, helperText: errors.role.message })}
              >
                <MenuItem value='ADMIN'>Admin</MenuItem>
                <MenuItem value='EMPLOYEE'>Employee</MenuItem>
                <MenuItem value='MANAGER'>Manager</MenuItem>
                {/* Add other roles from your Role enum if applicable */}
              </CustomTextField>
            )}
          />
          <Controller
            name='branchId'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-branch'
                label='Select Branch (Optional)'
                {...field}
                disabled={branchesLoading} // Disable while branches are loading
                {...(branchesError && { error: true, helperText: branchesError })}
              >
                <MenuItem value=''>None</MenuItem> {/* Option for no branch */}
                {branchesList.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name} ({branch.branchId})
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
          <Controller
            name='isEmailVerified'
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label='Email Verified' />
            )}
          />
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label='Is Active' />
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? <CircularProgress size={24} /> : currentEmployee ? 'Update' : 'Submit'}
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

export default AddEmployeeDrawer
