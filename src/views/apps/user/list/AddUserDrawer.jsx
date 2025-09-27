import { useEffect, useState, useCallback } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
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
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddEmployeeDrawer = props => {
  const { open, handleClose, currentEmployee, onEmployeeAdded } = props

  const [loading, setLoading] = useState(false)

  // States for fetching branches for the dropdown
  const [branchesList, setBranchesList] = useState([])
  const [branchesLoading, setBranchesLoading] = useState(true)
  const [branchesError, setBranchesError] = useState(null)

  // Permissions
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])

  // Hooks
  const { data: session, status: sessionStatus } = useSession()
  const { t } = useTranslation()

  // Helper functions for role-based field restrictions
  const canEditEmail = () => {
    console.log('AddUserDrawer canEditEmail debug:', {
      session: session,
      user: session?.user,
      roles: session?.user?.roles,
      role: session?.user?.role,
      currentEmployee: currentEmployee
    })

    if ((!session?.user?.roles && !session?.user?.role) || !currentEmployee) return true // Allow for new employees

    const currentUserRole = session.user.roles || session.user.role

    // Only Admin can edit email
    if (currentUserRole === 'ADMIN') return true

    // Everyone else cannot edit email
    return false
  }

  const canEditRole = () => {
    console.log('AddUserDrawer canEditRole debug:', {
      session: session,
      user: session?.user,
      roles: session?.user?.roles,
      role: session?.user?.role,
      currentEmployee: currentEmployee
    })

    if ((!session?.user?.roles && !session?.user?.role) || !currentEmployee) return true // Allow for new employees

    const currentUserRole = session.user.roles || session.user.role

    // Only Admin can edit role
    if (currentUserRole === 'ADMIN') return true

    // Everyone else cannot edit role
    return false
  }
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
      nationalIdentificationNumber: '',
      dateOfBirth: '',
      role: 'EMPLOYEE',
      branchId: '',
      isActive: true
    }
  })

  // Fetch branches
  const fetchBranchesList = useCallback(async () => {
    setBranchesLoading(true)
    setBranchesError(null)

    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setBranchesError(t('employees.authenticationRequired'))
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
  }, [sessionStatus, session?.accessToken])

  // Fetch permissions
  const fetchPermissions = useCallback(async () => {
    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      toastService.showError(t('employees.authenticationRequired'))
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
        await toastService.handleApiError(response, 'Failed to load permissions')
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error loading permissions. Please try again.')
      console.error('Fetch error loading permissions:', error)
    }
  }, [sessionStatus, session?.accessToken])

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchBranchesList()
      fetchPermissions() // Fetch permissions when authenticated
    }
  }, [sessionStatus, session?.accessToken])

  // Reset form for editing or adding
  useEffect(() => {
    if (currentEmployee) {
      // Use setTimeout to ensure the form is ready
      setTimeout(() => {
        resetForm({
          email: currentEmployee.email || '',
          password: '', // Password should never be pre-filled for security
          name: currentEmployee.name || '',
          nationalIdentificationNumber: currentEmployee.nationalIdentificationNumber || '',
          dateOfBirth: currentEmployee.dateOfBirth
            ? new Date(currentEmployee.dateOfBirth).toISOString().split('T')[0]
            : '',
          role: currentEmployee.role || 'EMPLOYEE',
          branchId: currentEmployee.branchId || '',
          isEmailVerified: currentEmployee.isEmailVerified ?? false,
          isActive: currentEmployee.isActive ?? true,
          employeeId: currentEmployee.employeeId || '' // Populate employeeId
        })
        setSelectedPermissions(currentEmployee.permissions || [])
      }, 100)
    } else {
      resetForm({
        email: '',
        password: '',
        name: '',
        nationalIdentificationNumber: '',
        dateOfBirth: '',
        role: 'EMPLOYEE',
        branchId: '',
        isEmailVerified: false,
        isActive: true,
        employeeId: ''
      })
      setSelectedPermissions([]) // Clear selected permissions in add mode
    }
  }, [open, currentEmployee, resetForm])

  const onSubmit = async data => {
    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Please log in again.')
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
      nationalIdentificationNumber: data.nationalIdentificationNumber || null,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
      branchId: data.branchId || null,
      isActive: data.isActive,
      permissions: selectedPermissions // Send selected permissions
    }

    // Include role based on permissions
    if (!isEditMode || canEditRole()) {
      payload.role = data.role
    }

    // Include email based on permissions
    if (!isEditMode || canEditEmail()) {
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

      if (response.ok) {
        const responseData = await response.json()
        toastService.handleApiSuccess(isEditMode ? 'updated' : 'created', 'Employee')
        console.log(`Employee ${isEditMode ? 'updated' : 'created'} successfully:`, responseData)
        onEmployeeAdded()
        handleReset()
      } else {
        await toastService.handleApiError(response, `Failed to ${isEditMode ? 'update' : 'create'} employee`)
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
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
      nationalIdentificationNumber: '',
      dateOfBirth: '',
      role: 'EMPLOYEE',
      branchId: '',
      isEmailVerified: false,
      isActive: true,
      employeeId: ''
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
        <Typography variant='h5'>
          {currentEmployee ? t('employees.editEmployee') : t('employees.addNewEmployee')}
        </Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Name */}
          <Controller
            name='name'
            control={control}
            rules={{
              required: t('employees.employeeNameRequired'),
              validate: value => value.trim() !== '' || t('employees.employeeNameRequired')
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('employees.fields.name')}
                placeholder={t('employees.enterName')}
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* National Identification Number */}
          <Controller
            name='nationalIdentificationNumber'
            control={control}
            rules={{
              minLength: { value: 5, message: 'National ID must be at least 5 characters' },
              maxLength: { value: 20, message: 'National ID must be at most 20 characters' }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='National Identification Number'
                placeholder='Enter national ID number'
                error={!!errors.nationalIdentificationNumber}
                helperText={errors.nationalIdentificationNumber?.message}
              />
            )}
          />

          {/* Date of Birth */}
          <Controller
            name='dateOfBirth'
            control={control}
            rules={{
              required: 'Date of birth is required.',
              validate: value => {
                if (!value) return 'Date of birth is required.'
                const birthDate = new Date(value)
                const today = new Date()
                const age = today.getFullYear() - birthDate.getFullYear()
                const monthDiff = today.getMonth() - birthDate.getMonth()
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  return age - 1 < 16 ? 'Employee must be at least 16 years old.' : null
                }
                return age < 16 ? 'Employee must be at least 16 years old.' : null
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='date'
                label='Date of Birth'
                required
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={control}
            rules={{
              required: t('employees.emailRequired'),
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: t('employees.emailInvalid')
              },
              validate: value => value.trim() !== '' || t('employees.emailRequired')
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label={t('employees.fields.email')}
                placeholder={t('employees.enterEmail')}
                required
                error={!!errors.email}
                helperText={
                  errors.email?.message ||
                  (!canEditEmail() && currentEmployee ? 'You do not have permission to change this email' : '')
                }
                disabled={!!currentEmployee && !canEditEmail()}
                InputProps={{
                  readOnly: !!currentEmployee && !canEditEmail()
                }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name='password'
            control={control}
            rules={{
              required: !currentEmployee && t('employees.passwordRequired'),
              minLength: {
                value: 8,
                message: t('employees.passwordMinLength')
              },
              validate: value =>
                !currentEmployee || value === '' || value.length >= 8 || t('employees.passwordMinLength')
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='password'
                label={currentEmployee ? t('employees.password') : t('employees.password')}
                placeholder={t('employees.enterPassword')}
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
            rules={{ required: t('employees.branchRequired') }}
            defaultValue=''
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label={t('employees.selectBranch')}
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
            rules={{ required: t('employees.roleRequired') }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label={t('employees.selectRole')}
                {...field}
                required
                error={!!errors.role}
                helperText={
                  errors.role?.message ||
                  (!canEditRole() && currentEmployee ? 'You do not have permission to change this role' : '')
                }
                disabled={!!currentEmployee && !canEditRole()}
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
              {t('employees.selectPermissions')}
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
                    input={<OutlinedInput label={t('employees.selectPermissions')} />}
                  >
                    {/* Empty state placeholder */}
                    {permissions.length === 0 && (
                      <MenuItem disabled>
                        <em>{t('employees.noRolesAvailable')}</em>
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
              loadingText={currentEmployee ? t('employees.updating') : t('employees.creating')}
              disabled={loading}
            >
              {currentEmployee ? t('employees.update') : t('employees.create')}
            </LoadingButton>
            <LoadingButton variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              {t('employees.cancel')}
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddEmployeeDrawer
