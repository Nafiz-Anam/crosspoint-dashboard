'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddServiceDrawer = props => {
  // Props
  const { open, handleClose, currentService, onServiceAdded } = props

  // States
  const [loading, setLoading] = useState(false)

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
      price: '',
      category: ''
    }
  })

  // Effect to populate form fields when currentService changes (for edit mode)
  useEffect(() => {
    if (currentService) {
      resetForm({
        name: currentService.name || '',
        price: currentService.price?.toString() || '',
        category: currentService.category || ''
      })
    } else {
      // Reset form to default values when switching to add mode
      resetForm({
        name: '',
        price: '',
        category: ''
      })
    }
    // Clear any previous state when drawer opens/mode changes
  }, [open, currentService, resetForm])

  const onSubmit = async data => {
    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError(t('services.authenticationTokenNotFound'))
      setLoading(false)
      return
    }

    // Convert price to float
    const priceValue = parseFloat(data.price)
    if (isNaN(priceValue) || priceValue < 0) {
      toastService.showError(t('services.priceInvalid'))
      setLoading(false)
      return
    }

    const payload = {
      name: data.name,
      price: priceValue,
      category: data.category || null
    }

    const isEditMode = !!currentService
    const apiMethod = isEditMode ? 'PUT' : 'POST'
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
    const apiUrl = isEditMode ? `${baseUrl}/services/${currentService.id}` : `${baseUrl}/services`

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
        const responseData = await response.json()
        toastService.handleApiSuccess(isEditMode ? 'updated' : 'created', 'Service')
        onServiceAdded()
        handleReset()
      } else {
        await toastService.handleApiError(response, `Failed to ${isEditMode ? 'update' : 'create'} service`)
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
      name: '',
      price: '',
      category: ''
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
        <Typography variant='h5'>{currentService ? t('services.editService') : t('services.addNewService')}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Service ID field, display only if editing, and make it disabled */}
          {currentService && (
            <CustomTextField
              fullWidth
              label='Service ID'
              value={currentService.serviceId || ''}
              disabled={true}
              sx={{ mb: 2 }}
            />
          )}

          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                select
                label={t('services.fields.category')}
                placeholder={t('services.selectCategory')}
                value={field.value || ''}
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='Consulting'>Consulting</MenuItem>
                <MenuItem value='Development'>Development</MenuItem>
                <MenuItem value='Design'>Design</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='name'
            control={control}
            rules={{ required: t('services.serviceNameRequired') }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label={t('services.fields.name')}
                placeholder={t('services.enterName')}
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='price'
            control={control}
            rules={{
              required: t('services.priceRequired'),
              pattern: {
                value: /^\d+(\.\d{0,2})?$/,
                message: t('services.priceInvalid')
              },
              validate: {
                positive: value => {
                  const numValue = parseFloat(value)
                  return numValue > 0 || 'Price must be greater than 0'
                }
              }
            }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='text'
                label={t('services.fields.price')}
                placeholder={t('services.enterPrice')}
                onKeyPress={e => {
                  // Allow only numbers, decimal point, and backspace
                  const char = String.fromCharCode(e.which)
                  if (!/[0-9.]/.test(char)) {
                    e.preventDefault()
                  }
                  // Prevent multiple decimal points
                  if (char === '.' && field.value.includes('.')) {
                    e.preventDefault()
                  }
                }}
                sx={{
                  '& input[type=number]': {
                    MozAppearance: 'textfield'
                  },
                  '& input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  },
                  '& input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0
                  }
                }}
                {...(errors.price && { error: true, helperText: errors.price.message })}
              />
            )}
          />

          <div className='flex items-center gap-4'>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
              loadingText={currentService ? t('services.updating') : t('services.creating')}
              disabled={loading}
            >
              {currentService ? t('services.update') : t('services.create')}
            </LoadingButton>
            <LoadingButton variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              {t('services.cancel')}
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddServiceDrawer
