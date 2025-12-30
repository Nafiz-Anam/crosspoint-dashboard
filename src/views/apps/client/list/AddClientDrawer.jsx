'use client'

// React Imports
import { useEffect, useState } from 'react'

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

// Service Imports
import toastService from '@/services/toastService'
import enhancedClientService from '@/services/enhancedClientService'
import apiClient from '@/services/apiClient'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddClientDrawer = props => {
  // Props
  const { open, handleClose, currentClient, onClientAdded, isViewMode = false } = props

  // States
  const [loading, setLoading] = useState(false)
  const [branches, setBranches] = useState([])

  // Individual loading states for each dropdown
  const [branchesLoading, setBranchesLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()
  const { t } = useTranslation()
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      nationalIdentificationNumber: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      additionalPhone: '',
      createdBy: '',
      branchId: session?.user?.role === 'MANAGER' ? session?.user?.branchId || '' : '',
      status: 'PENDING'
    },
    mode: 'onChange' // Enable real-time validation
  })

  // Fetch branches
  const fetchBranches = async () => {
    console.log('Fetching branches...')
    setBranchesLoading(true)
    try {
      // If user is a manager, fetch only their branch details
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        // Fetch the specific branch details for the manager
        const response = await apiClient.get(`/branches/${session.user.branchId}`)
        const data = response.data
        const branchData = data.data || data
        setBranches([branchData])
      } else {
        // For other roles, fetch all active branches
        const response = await apiClient.get('/branches/active')
        const data = response.data
        setBranches(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching branches:', error)

      // For managers, provide fallback branch data even on error
      if (session?.user?.role === 'MANAGER' && session?.user?.branchId) {
        const managerBranch = {
          id: session.user.branchId,
          name: `Branch ${session.user.branchId}`,
          branchId: session.user.branchId,
          city: 'Current City'
        }
        setBranches([managerBranch])
      }
    } finally {
      setBranchesLoading(false)
    }
  }

  // Valid status values
  const validStatuses = ['ACTIVE', 'PENDING', 'PROCESSING', 'CANCELLED', 'COMPLETED']

  // Effect to populate form fields when currentClient changes (for edit mode)
  useEffect(() => {
    if (currentClient) {
      // Ensure status is valid, fallback to PENDING if invalid
      const validStatus = validStatuses.includes(currentClient.status) ? currentClient.status : 'PENDING'

      resetForm({
        name: currentClient.name || '',
        nationalIdentificationNumber: currentClient.nationalIdentificationNumber || '',
        email: currentClient.email || '',
        phone: currentClient.phone || '',
        address: currentClient.address || '',
        city: currentClient.city || '',
        additionalPhone: currentClient.additionalPhone || '',
        createdBy: currentClient.createdBy || '',

        branchId: currentClient.branchId || '',

        status: validStatus
      })
    } else {
      resetForm({
        name: '',
        nationalIdentificationNumber: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        additionalPhone: '',
        createdBy: '',

        branchId: '',

        status: 'PENDING'
      })
    }
  }, [open, currentClient, resetForm])

  // Fetch dropdown data when drawer opens
  useEffect(() => {
    if (open && session?.accessToken) {
      fetchBranches()
    }
  }, [open, session?.accessToken])

  // Pre-select manager's branch when branches are loaded
  useEffect(() => {
    if (session?.user?.role === 'MANAGER' && session?.user?.branchId && branches.length > 0) {
      resetForm(prev => ({
        ...prev,
        branchId: session.user.branchId
      }))
    }
  }, [branches, session?.user?.role, session?.user?.branchId, resetForm])

  // Also set the branchId when the drawer opens for managers
  useEffect(() => {
    if (open && session?.user?.role === 'MANAGER' && session?.user?.branchId) {
      resetForm(prev => ({
        ...prev,
        branchId: session.user.branchId
      }))
    }
  }, [open, session?.user?.role, session?.user?.branchId, resetForm])

  const onSubmit = async data => {
    // Prevent submission in view mode
    if (isViewMode) {
      return
    }

    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    // Validate required fields
    if (!data.name?.trim()) {
      toastService.showError(t('clients.clientNameRequired'))
      setLoading(false)
      return
    }

    if (!data.nationalIdentificationNumber?.trim()) {
      toastService.showError(t('clients.nationalIdRequired'))
      setLoading(false)
      return
    }

    if (!data.email?.trim()) {
      toastService.showError(t('clients.emailRequired'))
      setLoading(false)
      return
    }

    if (!data.branchId) {
      toastService.showError('Please select a branch.')
      setLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      toastService.showError(t('clients.emailInvalid'))
      setLoading(false)
      return
    }

    const payload = {
      name: data.name.trim(),
      nationalIdentificationNumber: data.nationalIdentificationNumber.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      address: data.address?.trim() || null,
      city: data.city?.trim() || null,
      additionalPhone: data.additionalPhone?.trim() || null,
      createdBy: data.createdBy?.trim() || null,
      branchId: data.branchId,
      status: data.status
    }

    // Validate status before sending
    if (!validStatuses.includes(data.status)) {
      toastService.showError(t('clients.networkError'))
      setLoading(false)
      return
    }

    const isEditMode = !!currentClient

    try {
      let result
      if (isEditMode) {
        result = await enhancedClientService.updateClient(currentClient.id, payload, null, {
          showToast: true,
          successMessage: t('clients.clientUpdatedSuccessfully'),
          errorMessage: t('clients.failedToUpdateClient'),
          showLoading: false // We're handling loading state manually
        })
      } else {
        result = await enhancedClientService.createClient(payload, null, {
          showToast: true,
          successMessage: t('clients.clientCreatedSuccessfully'),
          errorMessage: t('clients.failedToCreateClient'),
          showLoading: false // We're handling loading state manually
        })
      }

      onClientAdded()
      handleReset()
    } catch (error) {
      // Error is already handled by the enhanced service with toast
      console.error('Client operation error:', error)
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
      additionalPhone: '',
      createdBy: '',
      branchId: '',
      status: 'PENDING'
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
          {isViewMode ? t('clients.viewClient') : currentClient ? t('clients.editClient') : t('clients.addNewClient')}
        </Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Client ID field, display only if editing or viewing */}
          {currentClient && (
            <CustomTextField
              fullWidth
              label={t('clients.fields.clientId')}
              value={currentClient.clientId || ''}
              disabled={true}
              sx={{ mb: 2 }}
            />
          )}

          <Controller
            name='branchId'
            control={control}
            rules={{ required: t('clients.branchRequired') }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label={t('clients.selectBranch')}
                {...field}
                {...(errors.branchId && { error: true, helperText: errors.branchId.message })}
                disabled={isViewMode || session?.user?.role === 'MANAGER'}
                required
                InputProps={{
                  endAdornment: branchesLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
                }}
              >
                {branchesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    {t('clients.loadingBranches')}
                  </MenuItem>
                ) : branches.length === 0 ? (
                  <MenuItem disabled>{t('clients.noBranchesAvailable')}</MenuItem>
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
            name='name'
            control={control}
            rules={{
              required: t('clients.clientNameRequired'),
              minLength: {
                value: 2,
                message: t('clients.nameMinLength')
              },
              maxLength: {
                value: 100,
                message: t('clients.nameMaxLength')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.name')}
                placeholder={t('clients.enterName')}
                disabled={isViewMode}
                required
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='nationalIdentificationNumber'
            control={control}
            rules={{
              required: t('clients.nationalIdRequired'),
              minLength: { value: 5, message: t('clients.nationalIdMinLength') },
              maxLength: { value: 20, message: t('clients.nationalIdMaxLength') }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.nationalIdentificationNumber')}
                placeholder={t('clients.enterNationalId')}
                disabled={isViewMode}
                required
                {...(errors.nationalIdentificationNumber && {
                  error: true,
                  helperText: errors.nationalIdentificationNumber.message
                })}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{
              required: t('clients.emailRequired'),
              pattern: { value: /^\S+@\S+\.\S+$/, message: t('clients.emailInvalid') }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label={t('clients.fields.email')}
                placeholder={t('clients.enterEmail')}
                disabled={isViewMode}
                required
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='phone'
            control={control}
            rules={{
              required: t('clients.phoneRequired'),
              pattern: {
                value: /^[\+]?[0-9\s\-\(\)]{8,20}$/,
                message: t('clients.phoneInvalid')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.phone')}
                placeholder={t('clients.enterPhone')}
                disabled={isViewMode}
                required
                {...(errors.phone && { error: true, helperText: errors.phone.message })}
              />
            )}
          />

          <Controller
            name='address'
            control={control}
            rules={{
              required: t('clients.addressRequired'),
              minLength: {
                value: 5,
                message: t('clients.addressMinLength')
              },
              maxLength: {
                value: 200,
                message: t('clients.addressMaxLength')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.address')}
                placeholder={t('clients.enterAddress')}
                disabled={isViewMode}
                required
                {...(errors.address && { error: true, helperText: errors.address.message })}
              />
            )}
          />

          <Controller
            name='city'
            control={control}
            rules={{
              minLength: {
                value: 2,
                message: t('clients.cityMinLength')
              },
              maxLength: {
                value: 50,
                message: t('clients.cityMaxLength')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.city')} (${t('clients.optional')})`}
                placeholder={t('clients.enterCity')}
                disabled={isViewMode}
                {...(errors.city && { error: true, helperText: errors.city.message })}
              />
            )}
          />

          <Controller
            name='additionalPhone'
            control={control}
            rules={{
              pattern: {
                value: /^[\+]?[0-9\s\-\(\)]{8,20}$/,
                message: t('clients.phoneInvalid')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.additionalPhone')} (${t('clients.optional')})`}
                placeholder={t('clients.enterAdditionalPhone')}
                disabled={isViewMode}
                {...(errors.additionalPhone && { error: true, helperText: errors.additionalPhone.message })}
              />
            )}
          />

          <Controller
            name='createdBy'
            control={control}
            rules={{
              maxLength: {
                value: 100,
                message: t('clients.nameMaxLength')
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.createdBy')} (${t('clients.optional')})`}
                placeholder={t('clients.enterCreatedBy')}
                disabled={isViewMode}
                {...(errors.createdBy && { error: true, helperText: errors.createdBy.message })}
              />
            )}
          />

          {/* <Controller
            name='status'
            control={control}
            rules={{ required: t('clients.statusRequired') }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status'
                {...field}
                {...(errors.status && { error: true, helperText: errors.status.message })}
              >
                <MenuItem value='ACTIVE'>Active</MenuItem>
                <MenuItem value='PENDING'>Pending</MenuItem>
                <MenuItem value='PROCESSING'>Processing</MenuItem>
                <MenuItem value='CANCELLED'>Cancelled</MenuItem>
                <MenuItem value='COMPLETED'>Completed</MenuItem>
              </CustomTextField>
            )}
          /> */}

          <div className='flex items-center gap-4'>
            {!isViewMode && (
              <LoadingButton
                variant='contained'
                type='submit'
                loading={loading}
                loadingText={currentClient ? t('clients.updating') : t('clients.creating')}
                disabled={loading}
              >
                {currentClient ? t('clients.update') : t('clients.create')}
              </LoadingButton>
            )}
            <LoadingButton variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              {isViewMode ? t('clients.close') : t('clients.cancel')}
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddClientDrawer
