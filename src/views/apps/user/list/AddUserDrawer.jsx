import { useEffect, useState, useCallback } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
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

  // Hooks
  const { data: session, status: sessionStatus } = useSession()
  const { t } = useTranslation()

  // Helper functions for role-based field restrictions
  const currentUserRole = session?.user?.roles || session?.user?.role || 'EMPLOYEE'

  const canEditEmail = () => {
    if ((!session?.user?.roles && !session?.user?.role) || !currentEmployee) return true
    return currentUserRole === 'ADMIN'
  }

  const canEditRole = () => {
    if ((!session?.user?.roles && !session?.user?.role) || !currentEmployee) return true
    return currentUserRole === 'ADMIN'
  }

  const getCreatableRoles = () => {
    if (currentUserRole === 'ADMIN') return ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE']
    if (currentUserRole === 'HR') return ['HR', 'MANAGER', 'EMPLOYEE']
    if (currentUserRole === 'MANAGER') return ['EMPLOYEE']
    return []
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
      branchId: session?.user?.role === 'MANAGER' ? session?.user?.branchId || '' : '',
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
      // If user is a manager, fetch only their branch details
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        // Fetch the specific branch details for the manager
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/${session.user.branchId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })
        const responseData = await response.json()

        if (response.ok) {
          const branchData = responseData.data || responseData
          setBranchesList([branchData])
        } else {
          // Fallback to mock data if API fails
          const managerBranch = {
            id: session.user.branchId,
            name: `Branch ${session.user.branchId}`,
            branchId: session.user.branchId,
            city: 'Current City'
          }
          setBranchesList([managerBranch])
        }
      } else {
        // For other roles, fetch all active branches
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/active`, {
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
      }
    } catch (error) {
      setBranchesError('Network error loading branches. Please try again.')
      console.error('Fetch error loading branches:', error)

      // For managers, provide fallback branch data even on error
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        const managerBranch = {
          id: session.user.branchId,
          name: `Branch ${session.user.branchId}`,
          branchId: session.user.branchId,
          city: 'Current City'
        }
        setBranchesList([managerBranch])
      }
    } finally {
      setBranchesLoading(false)
    }
  }, [sessionStatus, session?.accessToken, session?.user?.role, session?.user?.branchId])

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchBranchesList()
    }
  }, [sessionStatus, session?.accessToken])

  // Pre-select manager's branch when branches are loaded
  useEffect(() => {
    if (session?.user?.role === 'MANAGER' && session?.user?.branchId && branchesList.length > 0) {
      // Set the form value to the manager's branchId
      resetForm(prev => ({
        ...prev,
        branchId: session.user.branchId
      }))
    }
  }, [branchesList, session?.user?.role, session?.user?.branchId, resetForm])

  // Also set the branchId when the drawer opens for managers
  useEffect(() => {
    if (open && session?.user?.role === 'MANAGER' && session?.user?.branchId) {
      resetForm(prev => ({
        ...prev,
        branchId: session.user.branchId
      }))
    }
  }, [open, session?.user?.role, session?.user?.branchId, resetForm])

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
      nationalIdentificationNumber: data.nationalIdentificationNumber,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
      branchId: data.branchId || null,
      isActive: data.isActive
    }

    // Include role based on permissions
    const allowedRoles = getCreatableRoles()
    const desiredRole = data.role
    if (!isEditMode || canEditRole()) {
      if (allowedRoles.includes(desiredRole)) {
        payload.role = desiredRole
      } else {
        setLoading(false)
        toastService.showError('You are not allowed to create this role')
        return
      }
    }

    // Include email based on permissions
    if (!isEditMode || canEditEmail()) {
      payload.email = data.email
    }

    if (!isEditMode || (isEditMode && data.password)) {
      payload.password = data.password
    }

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

      if (response.ok) {
        toastService.handleApiSuccess(isEditMode ? 'updated' : 'created', 'Employee')
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
              required: t('employees.nationalIdRequired'),
              minLength: { value: 5, message: t('employees.nationalIdMinLength') },
              maxLength: { value: 20, message: t('employees.nationalIdMaxLength') }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('employees.fields.nationalIdentificationNumber')}
                placeholder={t('employees.enterNationalId')}
                required
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
              required: t('employees.dateOfBirthRequired'),
              validate: value => {
                if (!value) return t('employees.dateOfBirthRequired')
                const birthDate = new Date(value)
                const today = new Date()
                const age = today.getFullYear() - birthDate.getFullYear()
                const monthDiff = today.getMonth() - birthDate.getMonth()
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  return age - 1 < 16 ? t('employees.dateOfBirthMinAge') : null
                }
                return age < 16 ? t('employees.dateOfBirthMinAge') : null
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='date'
                label={t('employees.fields.dateOfBirth')}
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
                label={t('employees.fields.password')}
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
                    if (!selected) return <>{t('employees.selectBranch')}</>
                    const selectedBranch = branchesList.find(branch => branch.id === selected)
                    return selectedBranch ? `${selectedBranch.name} (${selectedBranch.branchId})` : ''
                  }
                }}
                required
                error={!!errors.branchId || !!branchesError}
                helperText={errors.branchId?.message || branchesError}
                disabled={branchesLoading || session?.user?.role === 'MANAGER'}
              >
                <MenuItem value=''>{t('employees.selectBranch')}</MenuItem>
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
                {getCreatableRoles().map(role => (
                  <MenuItem key={role} value={role}>
                    {t(`common.roles.${role}`)}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Status - Active/Inactive Dropdown */}
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label={t('employees.fields.status')}
                {...field}
                value={field.value ? 'active' : 'inactive'} // Convert boolean to string for display
                onChange={e => field.onChange(e.target.value === 'active')} // Convert back to boolean
              >
                <MenuItem value='active'>{t('employees.status.active')}</MenuItem>
                <MenuItem value='inactive'>{t('employees.status.inactive')}</MenuItem>
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
