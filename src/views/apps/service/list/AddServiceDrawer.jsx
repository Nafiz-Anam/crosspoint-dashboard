'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddServiceDrawer = props => {
  // Props
  const { open, handleClose, currentService, onServiceAdded } = props

  // States
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [apiSuccess, setApiSuccess] = useState(false)

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
    // Clear any previous API messages when drawer opens/mode changes
    setApiError(null)
    setApiSuccess(false)
  }, [open, currentService, resetForm])

  const onSubmit = async data => {
    setLoading(true)
    setApiError(null)
    setApiSuccess(false)

    if (!session?.accessToken) {
      setApiError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    // Convert price to float
    const priceValue = parseFloat(data.price)
    if (isNaN(priceValue) || priceValue < 0) {
      setApiError('Please enter a valid positive price.')
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
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/services/${currentService.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/services`

    try {
      console.log(`Making API call to: ${apiUrl} with method: ${apiMethod}`)
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
        console.log(`Service ${isEditMode ? 'updated' : 'created'} successfully:`, responseData)
        onServiceAdded()
        handleReset()
      } else {
        const errorMessage =
          responseData.message || `Failed to ${isEditMode ? 'update' : 'create'} service: ${response.status}`
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
      name: '',
      price: '',
      category: ''
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
        <Typography variant='h5'>{currentService ? 'Edit Service' : 'Add New Service'}</Typography>
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
            Service {currentService ? 'updated' : 'added'} successfully!
          </Alert>
        )}
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
                label='Category'
                placeholder='Select a category'
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
            rules={{ required: 'Service Name is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Service Name'
                placeholder='Contract Review and Analysis'
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='price'
            control={control}
            rules={{
              required: 'Price is required.',
              pattern: {
                value: /^\d+(\.\d{0,2})?$/,
                message: 'Please enter a valid price (e.g., 150.00)'
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
                label='Price'
                placeholder='150.00'
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
              loadingText={currentService ? 'Updating...' : 'Creating...'}
              disabled={loading}
            >
              {currentService ? 'Update' : 'Submit'}
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

export default AddServiceDrawer
