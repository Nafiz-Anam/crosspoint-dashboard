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
      postalCode: '',
      province: '',
      branchId: '',
      status: 'PENDING'
    },
    mode: 'onChange' // Enable real-time validation
  })

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
        postalCode: currentClient.postalCode || '',
        province: currentClient.province || '',

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
        postalCode: '',
        province: '',

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
      nationalIdentificationNumber: data.nationalIdentificationNumber?.trim() || null,
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      address: data.address?.trim() || null,
      city: data.city?.trim() || null,
      postalCode: data.postalCode?.trim() || null,
      province: data.province?.trim() || null,
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
        result = await enhancedClientService.updateClient(currentClient.id, payload, session.accessToken, {
          showToast: true,
          successMessage: t('clients.clientUpdatedSuccessfully'),
          errorMessage: t('clients.failedToUpdateClient'),
          showLoading: false // We're handling loading state manually
        })
      } else {
        result = await enhancedClientService.createClient(payload, session.accessToken, {
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
      postalCode: '',
      province: '',
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
                disabled={isViewMode}
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
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='nationalIdentificationNumber'
            control={control}
            rules={{
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
                {...(errors.email && { error: true, helperText: errors.email.message })}
              />
            )}
          />

          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.phone')}
                placeholder={t('clients.enterPhone')}
                disabled={isViewMode}
              />
            )}
          />

          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('clients.fields.address')}
                placeholder={t('clients.enterAddress')}
                disabled={isViewMode}
              />
            )}
          />

          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.city')} (${t('clients.optional')})`}
                placeholder={t('clients.enterCity')}
                disabled={isViewMode}
              />
            )}
          />

          <Controller
            name='postalCode'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.postalCode')} (${t('clients.optional')})`}
                placeholder={t('clients.enterPostalCode')}
                disabled={isViewMode}
              />
            )}
          />

          <Controller
            name='province'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={`${t('clients.fields.province')} (${t('clients.optional')})`}
                placeholder={t('clients.enterProvince')}
                disabled={isViewMode}
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
